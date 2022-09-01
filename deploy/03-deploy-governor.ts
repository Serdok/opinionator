import {DeployFunction} from "hardhat-deploy/dist/types";
import {ethers, getNamedAccounts} from "hardhat";

import {QUORUM, VOTING_DELAY, VOTING_PERIOD} from "../constants";
import {GoodBoi, Timelock} from "../typechain-types";

const deployGovernor: DeployFunction = async function (hre) {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const token: GoodBoi = await ethers.getContract('GoodBoi');
    const timelock: Timelock = await ethers.getContract('Timelock');

    await deploy("Opinionator", {
        from: deployer,
        args: [token.address, timelock.address, QUORUM, VOTING_DELAY, VOTING_PERIOD],
        log: true,
        waitConfirmations: 1,
    });
}

deployGovernor.tags = ["all", "governor"]
export default deployGovernor;