import {DeployFunction} from "hardhat-deploy/dist/types";
import {getNamedAccounts} from "hardhat";

import {MIN_DELAY} from "../constants";

const deployTimelock: DeployFunction = async function (hre) {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    await deploy("Timelock", {
        from: deployer,
        args: [MIN_DELAY, [] /* proposers */, [] /* executors */],
        log: true,
        waitConfirmations: 1,
    });
}

deployTimelock.tags = ['all', 'timelock'];
export default deployTimelock;