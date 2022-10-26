import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BuyMedicine } from '../../components/buyer/operations/BuyMedicine';
import { ReplenishHospitals } from '../../components/buyer/operations/ReplenishHospitals';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import * as S from './styles';

export const Buyer = () => {
  const { selectedAccount } = useContext(Web3Context);
  return (
    <S.BuyerContainer>
      <p>Current Address: {selectedAccount}</p>
      <S.FormTitle>Buyer Operations</S.FormTitle>
      <S.FormBox>
        <BuyMedicine />
        <ReplenishHospitals />
      </S.FormBox>
      <Link to="/">Go back</Link>
    </S.BuyerContainer>
  );
};
