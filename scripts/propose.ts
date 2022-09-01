import hardhat, {network} from 'hardhat';
import {createProposal, waitUntilProposalStarts} from "../tasks/proposal";
import {existsSync, readFileSync, writeFileSync} from "fs";
import {PROPOSALS_FILE} from "../constants";

createProposal(hardhat)
    .then(id => {
        const proposals = existsSync(PROPOSALS_FILE) ? JSON.parse(readFileSync(PROPOSALS_FILE, 'utf-8')) : {};
        const proposal: Array<string> = proposals[network.config.chainId!.toString()] ?? [];
        proposal.push(id.toString());
        proposals[network.config.chainId!.toString()] = proposal;
        writeFileSync(PROPOSALS_FILE, JSON.stringify(proposals));
    })
    .then(_ => waitUntilProposalStarts(hardhat))
    .then(_ => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    });