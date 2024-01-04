"use client";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { siweConfig } from "./siwe";

const projectId = "f99348a02685fe294caf5fb62c9413bd";

const mainnet = {
  chainId: 1,
  name: "Ethereum",
  currency: "ETH",
  explorerUrl: "https://etherscan.io",
  rpcUrl: "https://cloudflare-eth.com",
};

const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com",
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  siweConfig: siweConfig,
  chains: [mainnet],
  projectId,
});

const Web3ModalProvider = ({ children }: { children: React.ReactNode }) => {
  return children;
};

export default Web3ModalProvider;
