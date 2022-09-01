import {DeployFunction} from "hardhat-deploy/dist/types";
import {ethers, getNamedAccounts} from "hardhat";

import {GoodBoi} from "../typechain-types";

async function delegate(token_address: string, account: string) {
    const token: GoodBoi = await ethers.getContractAt('GoodBoi', token_address);
    await token.delegate(account);
    const checkpoints = await token.numCheckpoints(account);
    console.log(`\t\t checkpoints: ${checkpoints}`);
}

const deployToken: DeployFunction = async function (hre) {
    const { deployments } = hre;
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = await deploy("GoodBoi", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    });

    log(`\tDelegating 'GoodBoi' to ${deployer}...`);
    await delegate(contract.address, deployer);
    log('\tDone.');
}

deployToken.tags = ["all", "governor"]
export default deployToken;


