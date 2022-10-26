import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ProduceMedicine } from '../../components/pharma/operations/ProduceMedicine';
import { PutUpForSale } from '../../components/pharma/operations/PutUpForSale';
import { SendToRegulation } from '../../components/pharma/operations/SendToRegulation';
import { TestMedicine } from '../../components/pharma/operations/TestMedicine';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import * as S from './styles';

export const Pharma = () => {
  const { selectedAccount } = useContext(Web3Context);
  return (
    <S.PharmaContainer>
      <p>Current Address: {selectedAccount}</p>
      <S.FormTitle>Pharma Operations</S.FormTitle>
      <S.FormBox>
        <ProduceMedicine />
        <TestMedicine />
        <SendToRegulation />
        <PutUpForSale />
      </S.FormBox>
      <Link to="/">Go back</Link>
    </S.PharmaContainer>
  );
};
