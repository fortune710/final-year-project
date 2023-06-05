import { currentUserAtom } from "@/jotai";
import { Web3Auth } from "@web3auth/modal";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { useSetAtom } from "jotai";
import { useEffect, useState } from "react";

export default function useAuth() {
  //Initialize within your constructor
  const [web3auth, setWeb3auth] = useState<Web3Auth>();
  const openLoginAdapter = new OpenloginAdapter({
    loginSettings: {}
  })

  const setCurrentUser = useSetAtom(currentUserAtom);

  useEffect(() => {
    const web3auth = new Web3Auth({
      clientId: "BMK3-CWe3JcsuTf1Ccd7zr92HclDVqiabiS1_h54Chlosle0GN6lMOvmLsTL_EKzXI0kfrAIHLuESjTU-zHfywY", // Get your Client ID from Web3Auth Dashboard
      chainConfig: {
        chainNamespace: "eip155",
        chainId: "0x1", // Please use 0x5 for Goerli Testnet
      },
    });
    setWeb3auth(web3auth);
  }, [])

  async function handleLogin() {
    await web3auth!.initModal();
    await web3auth!.connect();
    const user = await web3auth!.getUserInfo();
    console.log(user)
    return {
      email: user.email,
      profileUrl: user.profileImage
    };
  }
    
  return { handleLogin };
}