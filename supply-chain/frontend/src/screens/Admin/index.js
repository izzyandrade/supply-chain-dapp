import React from 'react';
import * as S from './styles.js';

const Admin = () => {
  return (
    <S.AdminContainer>
      <S.FormTitle>Add new operators</S.FormTitle>
      <S.FormBox>
        <S.FormItem>
          <S.FormItemText>Add Pharma: </S.FormItemText>
          <S.FormItemInput></S.FormItemInput>
          <S.FormItemSubmit>Add</S.FormItemSubmit>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemText>Add Regulator: </S.FormItemText>
          <S.FormItemInput></S.FormItemInput>
          <S.FormItemSubmit>Add</S.FormItemSubmit>
        </S.FormItem>
        <S.FormItem>
          <S.FormItemText>Add Buyer: </S.FormItemText>
          <S.FormItemInput></S.FormItemInput>
          <S.FormItemSubmit>Add</S.FormItemSubmit>
        </S.FormItem>
      </S.FormBox>
    </S.AdminContainer>
  );
};

export { Admin };
