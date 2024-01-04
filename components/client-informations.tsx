"use client";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";

const ClientInformations = () => {
  const { address, chainId, isConnected } = useWeb3ModalAccount();

  return (
    <div>
      <div>Address: {address}</div>
      <div>ChainId: {chainId}</div>
      <div>IsConnected: {isConnected.toString()}</div>
    </div>
  );
};

export default ClientInformations;
