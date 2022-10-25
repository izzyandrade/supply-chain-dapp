import React, { useContext } from 'react';
import { useState } from 'react';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import { Link } from 'react-router-dom';
import * as S from './styles.js';

const Admin = () => {
  const { selectedAccount, supplyChain } = useContext(Web3Context);
  const [pharma, setPharma] = useState('');
  const [regulator, setRegulator] = useState('');
  const [buyer, setBuyer] = useState('');

  //TODO: add user feedback for success and errors on adding actors

  const addPharma = async () => {
    const response = await supplyChain.methods
      .addPharma(pharma)
      .send({ from: selectedAccount });
    console.log('response', response);
  };

  const addRegulator = async () => {
    const response = await supplyChain.methods
      .addRegulator(regulator)
      .send({ from: selectedAccount });
    console.log('response', response);
  };

  const addBuyer = async () => {
    const response = await supplyChain.methods
      .addBuyer(buyer)
      .send({ from: selectedAccount });
    console.log('response', response);
  };

  return (
    <S.AdminContainer>
      <p>Current Address: {selectedAccount}</p>
      <S.FormTitle>Add new operators</S.FormTitle>
      <S.FormBox>
        <S.FormItem>
          <S.FormItemText>Add Pharma: </S.FormItemText>
          <S.FormItemInput
            onChange={(event) => setPharma(event.target.value)}
            value={pharma}
            placeholder="Insert Pharma Address"
          />
          <S.FormItemSubmit onClick={addPharma}>Add</S.FormItemSubmit>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemText>Add Regulator: </S.FormItemText>
          <S.FormItemInput
            onChange={(event) => setRegulator(event.target.value)}
            value={regulator}
            placeholder="Insert Regulator Address"
          />
          <S.FormItemSubmit onClick={addRegulator}>Add</S.FormItemSubmit>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemText>Add Buyer: </S.FormItemText>
          <S.FormItemInput
            onChange={(event) => setBuyer(event.target.value)}
            value={buyer}
            placeholder="Insert Buyer Address"
          />
          <S.FormItemSubmit onClick={addBuyer}>Add</S.FormItemSubmit>
        </S.FormItem>
        <Link to="/">Go back</Link>
      </S.FormBox>
    </S.AdminContainer>
  );
};

export { Admin };
