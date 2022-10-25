import React, { useContext, useState } from 'react';
import { Web3Context } from '../../../../context/Web3Context/Web3Context';
import * as S from './styles';

export const PutUpForSale = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [upc, setUpc] = useState('');
  const [price, setPrice] = useState('');

  const fields = [
    {
      name: 'UPC',
      value: upc,
      changeFunction: (event) => setUpc(event.target.value),
    },
    {
      name: 'Price',
      value: price,
      changeFunction: (event) => setPrice(event.target.value),
    },
  ];

  //TODO: verify if fields are valid!

  const sendPutUpForSale = async () => {
    try {
      const response = await supplyChain.methods
        .sendToMarket(upc, price)
        .send({ from: selectedAccount });
      console.log(response);
      alert(`Medicine with UPC ${upc} was sent to market costing ${price} WEI`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.OperationBox>
      <h4>SEND TO MARKET</h4>
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
      <button onClick={sendPutUpForSale}>Send</button>
    </S.OperationBox>
  );
};
