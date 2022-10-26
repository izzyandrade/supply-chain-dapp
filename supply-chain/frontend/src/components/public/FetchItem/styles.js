import styled from 'styled-components';

export const FetchItemBox = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  background-color: #a8a2a2;
  min-height: 300px;
  align-items: center;
  justify-content: flex-start;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: 10px;
  width: 40%;
`;

export const InputTitle = styled.p`
  font-weight: bold;
  font-size: 14px;
  margin-right: 15px;
`;

export const InputField = styled.input`
  height: 20px;
  border-radius: 10px;
  border-color: 1px solid black;
  padding: 5px;
  margin-right: 10px;
`;

export const FetchButton = styled.button`
  background-color: lightgreen;
  height: 30px;
`;

export const ItemFetchedContainer = styled.div``;
