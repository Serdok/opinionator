import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";


const config: HardhatUserConfig = {
    solidity: {
        version: "0.8.9",
    },
    networks: {
        hardhat: {
            chainId: 31337,
            allowUnlimitedContractSize: true
        },
        localhost: {
            chainId: 31337,
            allowUnlimitedContractSize: true
        },
    },
    mocha: {
        timeout: 200000,  // 200 seconds max
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
    },
};

export default config;
