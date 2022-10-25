import React, { useContext } from 'react';
import { Web3Context } from '../../context/Web3Context/Web3Context';
import { Link } from 'react-router-dom';
import * as S from './styles.js';

const Home = () => {
  const { selectedAccount } = useContext(Web3Context);
  return (
    <S.HomeContainer>
      <p>Current Address: {selectedAccount}</p>
      <S.FormTitle>Select an Option</S.FormTitle>
      <S.FormBox>
        <S.FormItem to="/admin">Admin</S.FormItem>
        <S.FormItem to="/pharma">Pharma</S.FormItem>
        <S.FormItem to="/regulator">Regulator</S.FormItem>
        <S.FormItem to="/buyer">Buyer</S.FormItem>
      </S.FormBox>
    </S.HomeContainer>
  );
};

export { Home };
