import React, { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import { ProduceMedicine } from '../../components/pharma/operations/ProduceMedicine';
import { TestMedicine } from '../../components/pharma/operations/TestMedicine';
import * as S from './styles';
import { SendToRegulation } from '../../components/pharma/operations/SendToRegulation';
import { PutUpForSale } from '../../components/pharma/operations/PutUpForSale';

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
    </S.PharmaContainer>
  );
};
