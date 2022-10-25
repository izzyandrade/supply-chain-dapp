import styled from 'styled-components';

export const AdminContainer = styled.div`
  width: 100vp;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const FormTitle = styled.h1`
  font-size: 20px;
  color: black;
  text-align: center;
`;

export const FormBox = styled.div`
  width: 30%;
  height: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: #a8a2a2;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  height: 30%;
`;

export const FormItemText = styled.div`
  font-size: 14px;
  width: 20%;
  text-align: center;
`;

export const FormItemInput = styled.input`
  width: 60%;
  text-align: center;
`;

export const FormItemSubmit = styled.button`
  width: 10%;
  text-align: center;
`;
