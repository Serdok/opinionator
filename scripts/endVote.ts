import hardhat, {network} from "hardhat";
import {waitUntilProposalEnds} from "../tasks/proposal";
import {readFile} from "fs";
import {PROPOSALS_FILE} from "../constants";

const chooseRandomIndex = (array: Array<any>): number => Math.floor(Math.random() * array.length);

readFile(PROPOSALS_FILE, 'utf-8', async (err, data) => {
    if (err) {
        throw err;
    }

    const proposals: Array<string> = JSON.parse(data)[network.config.chainId!];
    const proposalId = proposals[chooseRandomIndex(proposals)];
    console.log(`ending votes for proposal ${proposalId}...`);

    await waitUntilProposalEnds(hardhat, proposalId);
});

waitUntilProposalEnds(hardhat)
    .then(_ => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });