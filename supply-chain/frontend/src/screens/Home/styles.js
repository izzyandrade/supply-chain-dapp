import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HomeContainer = styled.div`
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
  width: 40%;
  height: 30%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background-color: #a8a2a2;
`;

export const FormItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20%;
  height: 30%;
  background-color: white;
  color: black;
  border: 2px solid black;
  &:hover {
    cursor: pointer;
  }
`;
