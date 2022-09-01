import {DeployFunction} from "hardhat-deploy/dist/types";
import {ethers, getNamedAccounts} from "hardhat";

import {ADDRESS_ZERO} from "../constants";
import {Opinionator, Timelock} from "../typechain-types";

const setupGovernance: DeployFunction = async function (hre) {
    const { deployments } = hre;
    const { log } = deployments;
    const { deployer } = await getNamedAccounts();

    const timelock: Timelock = await ethers.getContract('Timelock', deployer);
    const governor: Opinionator = await ethers.getContract('Opinionator', deployer);

    log('Setting up roles...');
    const proposerRole = await timelock.PROPOSER_ROLE();
    const executorRole = await timelock.EXECUTOR_ROLE();
    const adminRole = await timelock.TIMELOCK_ADMIN_ROLE();

    await timelock.grantRole(proposerRole, governor.address);
    await timelock.grantRole(executorRole, ADDRESS_ZERO);
    await timelock.revokeRole(adminRole, deployer);
}

setupGovernance.tags = ['all', 'setup'];
export default setupGovernance;
