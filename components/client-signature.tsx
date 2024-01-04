"use client";

import { BrowserProvider } from "ethers";
import { useWeb3ModalProvider } from "@web3modal/ethers/react";

const ClientSignature = () => {
  const { walletProvider } = useWeb3ModalProvider();

  async function onSignMessage() {
    // @ts-ignore
    const provider = new BrowserProvider(walletProvider);
    const signer = await provider.getSigner();
    const signature = await signer?.signMessage(
      "localhost:3000  wants you to sign in with your Ethereum account"
    );
    alert(signature);
    console.log(signature);
  }
  return <button onClick={() => onSignMessage()}>Sign Message</button>;
};

export default ClientSignature;
