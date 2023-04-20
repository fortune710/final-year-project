import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: "sepolia",
  networks: {
  
    hardhat: {
      
    },
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/4i6yxljN8mOdz6YDc2xSKEFmlAQ58bdX",
      accounts: [`0x8d329f4186655cc0867acbe970d83f51fb9bbed5440575af2a4398b4b898fb4e`]
    },
    localhost: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x01f3faccdb424c265fce526197845ed5a46aa4ea5ebf85298b748795c9222392"]
    }
 },
};

export default config;
