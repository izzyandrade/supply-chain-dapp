import React, { useContext, useState } from 'react';
import { Web3Context } from '../../../../context/Web3Context/Web3Context';
import * as S from './styles';

export const SendToRegulation = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [upc, setUpc] = useState('');
  const [regulatorId, setRegulatorId] = useState('');

  const fields = [
    {
      name: 'UPC',
      value: upc,
      changeFunction: (event) => setUpc(event.target.value),
    },
    {
      name: 'RegulatorID',
      value: regulatorId,
      changeFunction: (event) => setRegulatorId(event.target.value),
    },
  ];

  //TODO: verify if fields are valid!

  const callSendToRegulation = async () => {
    try {
      const response = await supplyChain.methods
        .sendToRegulation(upc, regulatorId)
        .send({ from: selectedAccount });
      console.log(response);
      alert(`Medicine with UPC ${upc} was sent to regulator ${regulatorId}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.OperationBox>
      <h4>SEND TO REGULATION</h4>
      {fields.map((field) => {
        return (
          <S.OperationInputContainer>
            <S.FieldTitle>{field.name}</S.FieldTitle>
            <S.OperationInput
              placeholder={`Insert ${field.name}`}
              value={field.value}
              onChange={field.changeFunction}
            />
          </S.OperationInputContainer>
        );
      })}
      <button onClick={callSendToRegulation}>Send</button>
    </S.OperationBox>
  );
};
