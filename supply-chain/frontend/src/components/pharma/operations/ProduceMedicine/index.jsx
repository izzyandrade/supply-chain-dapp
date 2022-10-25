import React, { useContext, useState } from 'react';
import { Web3Context } from '../../../../context/Web3Context/Web3Context';
import * as S from './styles';

export const ProduceMedicine = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [upc, setUpc] = useState('');
  const [pharmaName, setPharmaName] = useState('');
  const [pharmaInformation, setPharmaInformation] = useState('');
  const [pharmaCountry, setPharmaCountry] = useState('');
  const [productName, setProductName] = useState('');

  const fields = [
    {
      name: 'UPC',
      value: upc,
      changeFunction: (event) => setUpc(event.target.value),
    },
    {
      name: 'pharmaName',
      value: pharmaName,
      changeFunction: (event) => setPharmaName(event.target.value),
    },
    {
      name: 'pharmaInformation',
      value: pharmaInformation,
      changeFunction: (event) => setPharmaInformation(event.target.value),
    },
    {
      name: 'pharmaCountry',
      value: pharmaCountry,
      changeFunction: (event) => setPharmaCountry(event.target.value),
    },
    {
      name: 'productName',
      value: productName,
      changeFunction: (event) => setProductName(event.target.value),
    },
  ];

  //TODO: verify if fields are valid!

  const sendProduceMedicine = async () => {
    try {
      const response = await supplyChain.methods
        .produceMedicine(
          upc,
          pharmaName,
          pharmaInformation,
          pharmaCountry,
          productName
        )
        .send({ from: selectedAccount });
      console.log(response);
      alert(`Medicine ${productName} was produced with UPC ${upc}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.OperationBox>
      <h4>PRODUCE MEDICINE</h4>
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
      <button onClick={sendProduceMedicine}>Send</button>
    </S.OperationBox>
  );
};
