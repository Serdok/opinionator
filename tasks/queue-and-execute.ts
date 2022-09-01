import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Box, Opinionator} from '../typechain-types'
import {BOX_FUNC, BOX_VALUE, DEV_NETWORKS, MIN_DELAY, PROPOSAL_DESCRIPTION} from "../constants";
import {time} from "@nomicfoundation/hardhat-network-helpers";

export async function queue({ethers}: {ethers: HardhatRuntimeEnvironment['ethers']}, description: string = PROPOSAL_DESCRIPTION, func: string = BOX_FUNC, args: any[] = [BOX_VALUE]) {
    const box: Box = await ethers.getContract('Box');
    const governor: Opinionator = await ethers.getContract('Opinionator');

    // @ts-ignore
    const encodedFunction: string = box.interface.encodeFunctionData(func, args);
    const hash = ethers.utils.id(description);

    console.log(`Queuing proposal '${description}'...`);
    await governor.queue([box.address], [0], [encodedFunction], hash);
}

export async function execute({ethers}: {ethers: HardhatRuntimeEnvironment['ethers']}, description: string = PROPOSAL_DESCRIPTION, func: string = BOX_FUNC, args: any[] = [BOX_VALUE]) {
    const box: Box = await ethers.getContract('Box');
    const governor: Opinionator = await ethers.getContract('Opinionator');

    // @ts-ignore
    const encodedFunction: string = box.interface.encodeFunctionData(func, args);
    const hash = ethers.utils.id(description);

    console.log(`Executing proposal '${description}'...`);
    await governor.execute([box.address], [0], [encodedFunction], hash);
    return await box.get();
}

export async function queueAndExecute({ethers, network}: {ethers: HardhatRuntimeEnvironment['ethers'], network: HardhatRuntimeEnvironment['network']}, description: string = PROPOSAL_DESCRIPTION, func: string = BOX_FUNC, args: any[] = [BOX_VALUE]) {
    await queue({ethers}, description, func, args);
    await waitUntilProposalExecutes({ethers, network});
    return await execute({ethers}, description, func, args);
}

export async function waitUntilProposalExecutes({ethers, network}: {ethers: HardhatRuntimeEnvironment['ethers'], network: HardhatRuntimeEnvironment['network']}, proposalId?: string) {
    // Wait until the proposal is executed if we are in a development network
    if (DEV_NETWORKS.includes(network.name)) {
        await time.increase(MIN_DELAY + 1);
    }

    if (proposalId) {
        const governor: Opinionator = await ethers.getContract('Opinionator');
        return await governor.state(proposalId);
    }
}