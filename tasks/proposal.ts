import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Box, Opinionator} from "../typechain-types";
import {mine} from "@nomicfoundation/hardhat-network-helpers";
import {BOX_FUNC, BOX_VALUE, DEV_NETWORKS, PROPOSAL_DESCRIPTION, VOTING_DELAY, VOTING_PERIOD} from "../constants";
import {BigNumber, ContractReceipt, ContractTransaction} from "ethers";

export async function createProposal({ethers}: {ethers: HardhatRuntimeEnvironment['ethers']}, description: string = PROPOSAL_DESCRIPTION, func: string = BOX_FUNC, args: any[] = [BOX_VALUE]) {
    const governor: Opinionator = await ethers.getContract('Opinionator');
    const box: Box = await ethers.getContract('Box');

    // @ts-ignore
    const encodedFunction: string = box.interface.encodeFunctionData(func, args);
    const tx: ContractTransaction = await governor.propose([box.address], [0], [encodedFunction], description);
    const receipt: ContractReceipt = await tx.wait();
    const proposalId: BigNumber = receipt.events?.find(evt => evt.event === 'ProposalCreated')?.args?.proposalId;

    console.log(`proposal '${description}' has id ${proposalId}`);
    return proposalId;
}

export async function waitUntilProposalStarts({ethers, network}: {ethers: HardhatRuntimeEnvironment['ethers'], network: HardhatRuntimeEnvironment['network']}, proposalId?: string) {
    // Wait until the proposal is active if we are in a development network
    if (DEV_NETWORKS.includes(network.name)) {
        await mine(VOTING_DELAY + 1);
    }

    if (proposalId) {
        const governor: Opinionator = await ethers.getContract('Opinionator');
        return await governor.state(proposalId);
    }
}

export async function waitUntilProposalEnds({ethers, network}: {ethers: HardhatRuntimeEnvironment['ethers'], network: HardhatRuntimeEnvironment['network']}, proposalId?: string) {
    // Wait until the proposal ends if we are in a development network
    if (DEV_NETWORKS.includes(network.name)) {
        await mine(VOTING_PERIOD + 1);
    }

    if (proposalId) {
        const governor: Opinionator = await ethers.getContract('Opinionator');
        return await governor.state(proposalId);
    }
}