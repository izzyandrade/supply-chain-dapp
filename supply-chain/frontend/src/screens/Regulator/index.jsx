import React, { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import { ApproveMedicine } from '../../components/regulator/operations/ApproveMedicine';
import * as S from './styles';

export const Regulator = () => {
  const { selectedAccount } = useContext(Web3Context);
  return (
    <S.RegulatorContainer>
      <p>Current Address: {selectedAccount}</p>
      <S.FormTitle>Regulator Operations</S.FormTitle>
      <S.FormBox>
        <ApproveMedicine />
      </S.FormBox>
    </S.RegulatorContainer>
  );
};
