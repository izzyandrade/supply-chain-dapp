import React, { useContext, useState } from 'react';
import { Web3Context } from '../../../../context/Web3Context/Web3Context';
import * as S from './styles';

export const ReplenishHospitals = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [upc, setUpc] = useState('');

  const fields = [
    {
      name: 'UPC',
      value: upc,
      changeFunction: (event) => setUpc(event.target.value),
    },
  ];

  //TODO: verify if fields are valid!

  const sendReplenishHospitals = async () => {
    try {
      const response = await supplyChain.methods
        .replenishHospitals(upc)
        .send({ from: selectedAccount });
      console.log(response);
      alert(`Medicine with UPC ${upc} is now available to hospitals`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.OperationBox>
      <h4>REPLENISH HOSPITALS</h4>
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
      <button onClick={sendReplenishHospitals}>Send</button>
    </S.OperationBox>
  );
};
