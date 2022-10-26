import React, { useContext, useState } from 'react';
import { Web3Context } from '../../../../context/Web3Context/Web3Context';
import * as S from './styles';

export const BuyMedicine = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [upc, setUpc] = useState('');
  const [valueToSend, setValueToSend] = useState('');

  const fields = [
    {
      name: 'UPC',
      value: upc,
      changeFunction: (event) => setUpc(event.target.value),
    },
    {
      name: 'valueToSend',
      value: valueToSend,
      changeFunction: (event) => setValueToSend(event.target.value),
    },
  ];

  //TODO: verify if fields are valid!

  const sendBuyMedicine = async () => {
    try {
      const response = await supplyChain.methods
        .buyMedicine(upc)
        .send({ from: selectedAccount, value: valueToSend });
      console.log(response);
      alert(`Medicine with UPC ${upc} was bought and sent back to buyer`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.OperationBox>
      <h4>BUY MEDICINE</h4>
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
      <button onClick={sendBuyMedicine}>Send</button>
    </S.OperationBox>
  );
};
