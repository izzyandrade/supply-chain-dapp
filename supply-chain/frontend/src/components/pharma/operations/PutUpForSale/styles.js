import styled from 'styled-components';

export const OperationBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 23%;
  height: 80%;
  background-color: white;
  color: black;
  border: 2px solid black;
`;

export const OperationInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 96%;
`;

export const FieldTitle = styled.p`
  font-size: 12px;
  width: 20%;
`;

export const OperationInput = styled.input`
  width: 70%;
  text-align: center;
`;
