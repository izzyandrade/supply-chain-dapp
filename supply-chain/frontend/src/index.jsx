import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import { Home, Admin } from './screens';
import { Web3Context } from './context/Web3Context/Web3Context';
import SupplyChainArtifact from './contracts/SupplyChain.json';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/admin',
    element: <Admin />,
  },
]);

const Providers = ({ children }) => {
  const [selectedAccount, setSelectedAccount] = useState('0x0');
  const [supplyChain, setSupplyChain] = useState();

  const loadBlockchainData = async () => {
    const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
    const accounts = await web3.eth.getAccounts();
    setSelectedAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = SupplyChainArtifact.networks[networkId];
    const supplyChainContract = new web3.eth.Contract(
      SupplyChainArtifact.abi,
      deployedNetwork.address
    );
    setSupplyChain(supplyChainContract);
  };

  useEffect(() => {
    const init = async () => {
      await loadBlockchainData();
    };
    init();
  }, []);

  return (
    <Web3Context.Provider value={{ selectedAccount, supplyChain }}>
      {children}
    </Web3Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  </React.StrictMode>
);
