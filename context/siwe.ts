import { SiweMessage } from "siwe";
import { SIWESession, createSIWEConfig } from "@web3modal/siwe";
import type {
  SIWECreateMessageArgs,
  SIWEVerifyMessageArgs,
} from "@web3modal/core";

const url = "https://cd72-2a01-e0a-944-4180-3cab-dcec-a1d8-63dd.ngrok-free.app";

async function getSessionInfo() {
  const res: any = await fetch(`${url}/api/auth/me`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

  if (res.status !== 200) return null;

  const message = res.message;
  return {
    chainId: 1,
    address: message?.split(": ")[1] || "",
  };
}

async function getNonce() {
  const res = await fetch(`${url}/api/auth/nonce`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  const nonce = res.nonce;
  return nonce;
}

async function verifySignature(message: string, signature: string) {
  const res = await fetch(`${url}/api/auth/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
  return res;
}

export const siweConfig = createSIWEConfig({
  createMessage: ({ nonce, address, chainId }: SIWECreateMessageArgs) =>
    new SiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement: "Sign in With Ethereum.",
    }).prepareMessage(),
  getNonce: async () => {
    // Fetch nonce from your SIWE server
    const nonce = await getNonce();
    console.log("Nonce =", nonce);
    if (!nonce) {
      throw new Error("Failed to get nonce!");
    }

    return nonce;
  },
  getSession: async () => {
    console.log("get session");
    // Fetch currently authenticated user
    const session = await getSessionInfo();
    console.log("session=", session);
    //const session = await getSession();
    if (!session) {
      throw new Error("Failed to get session!");
    }

    const { address, chainId } = session;

    return { address, chainId };
  },
  verifyMessage: async ({ message, signature }: SIWEVerifyMessageArgs) => {
    try {
      const { status } = await verifySignature(message, signature);
      console.log("Status:=", status);
      // Use your SIWE server to verify if the message and the signature are valid
      // Your back-end will tipically rely on SiweMessage(message).validate(signature)
      const isValid = status === 200;
      //const isValid = await validateMessage({ message, signature });

      return isValid;
    } catch (error) {
      return false;
    }
  },
  signOut: async () => {
    try {
      console.log("sign out");

      // Sign out by calling the relevant endpoint on your back-end
      //await signOut();

      return true;
    } catch (error) {
      return false;
    }
  },
  onSignIn: (session?: SIWESession) => {
    console.log("on sign in");
    console.log("session", session);
  },
});
