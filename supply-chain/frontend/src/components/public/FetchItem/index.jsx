import React from 'react';
import { useContext } from 'react';
import { useState } from 'react';
import { Web3Context } from '../../../context/Web3Context/Web3Context';
import * as S from './styles';

const FetchItem = () => {
  const [upc, setUpc] = useState('');
  const [itemToShow, setItemToShow] = useState(null);
  const { supplyChain } = useContext(Web3Context);

  const fetchItem = async () => {
    try {
      const item = await supplyChain.methods.fetchItem(upc).call();
      console.log('RESPONSE: ', item);
      setItemToShow(item);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <S.FetchItemBox>
      <h4>FETCH ITEM</h4>
      <S.InputContainer>
        <S.InputTitle>UPC</S.InputTitle>
        <S.InputField
          placeholder="Insert UPC"
          onChange={(event) => setUpc(event.target.value)}
          value={upc}
        />
        <S.FetchButton onClick={fetchItem}>FETCH</S.FetchButton>
      </S.InputContainer>
      {itemToShow && (
        <S.ItemFetchedContainer>
          <h3>{itemToShow.productName}</h3>
          <p>Pharma Name: {itemToShow.originPharmaName}</p>
          <p>Pharma Information: {itemToShow.originPharmaInformation}</p>
          <p>Pharma Country: {itemToShow.originPharmaCountry}</p>
          <p>Pharma Id: {itemToShow.originPharmaId}</p>
          <p>Item State: {itemToShow.itemState}</p>
          <p>Item Price: {itemToShow.productPrice}</p>
          <p>OwnerId: {itemToShow.ownerId}</p>
          <p>RegulatorId: {itemToShow.regulatorId}</p>
        </S.ItemFetchedContainer>
      )}
    </S.FetchItemBox>
  );
};

export default FetchItem;
