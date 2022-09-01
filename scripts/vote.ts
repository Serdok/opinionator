import hardhat, {ethers, network} from "hardhat";
import {castVote, ThreeWayVote} from "../tasks/vote";
import {readFile} from "fs";
import {PROPOSALS_FILE} from "../constants";
import {HardhatRuntimeEnvironment} from "hardhat/types";

const chooseRandomIndex = (array: Array<any>): number => Math.floor(Math.random() * array.length);

const chooseValues = async (ethers: HardhatRuntimeEnvironment['ethers'], data: string) => {
    const voters = await ethers.getSigners();
    const voter = voters[chooseRandomIndex(voters)];
    console.log(`chosen voter ${voters.indexOf(voter)}`);

    const proposals: Array<string> = JSON.parse(data)[network.config.chainId!];
    // const opinion = chooseRandomEnum(ThreeWayVote._TOTAL);
    const opinion = ThreeWayVote.For;
    const reason = 'I want it that way :^)';

    return {proposal: proposals[chooseRandomIndex(proposals)], voter, opinion, reason};
}

const max_retries = 20;
let retry = 0;
const vote = async (ethers: HardhatRuntimeEnvironment['ethers'], data: string) => {
    try {
        const { proposal, reason, opinion, voter} = await chooseValues(ethers, data);
        await castVote(hardhat, proposal, voter, opinion, reason);
    } catch (err: any) {
        retry += 1;
        if (retry > max_retries) {
            throw err;
        }

        if (err?.reason === "Error: VM Exception while processing transaction: reverted with reason string 'GovernorVotingSimple: vote already cast'") {
            console.error('already voted, choosing again...');
            await vote(ethers, data);
        }
    }
}

readFile(PROPOSALS_FILE, 'utf-8', async (err, data) => {
    if (err) {
        throw err;
    }

    try {
        const voters = await ethers.getSigners();
        console.log(`${voters.length} voters available`);

        await vote(ethers, data);
    } catch (err: any) {
        throw err;
    }
});
