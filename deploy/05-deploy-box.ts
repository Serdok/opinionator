import {DeployFunction} from "hardhat-deploy/dist/types";
import {ethers, getNamedAccounts} from "hardhat";

const deployBox: DeployFunction = async function (hre) {
    const { deployments } = hre;
    const { deploy } = deployments;
    const { deployer } = await getNamedAccounts();

    const contract = await deploy("Box", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1,
    });

    const box = await ethers.getContractAt('Box', contract.address);
    const timelock = await ethers.getContract('Timelock');
    await box.transferOwnership(timelock.address);
}

deployBox.tags = ['all', 'box'];
export default deployBox;