import {HardhatRuntimeEnvironment} from "hardhat/types";
import {Opinionator} from '../typechain-types';
import {BigNumberish} from "ethers";
import {SignerWithAddress} from "@nomiclabs/hardhat-ethers/signers";

export enum ThreeWayVote { Against = 0, For = 1, Abstain = 2, _TOTAL}
export namespace ThreeWayVote {
    export function toString(vote: ThreeWayVote): string {
        return ThreeWayVote[vote];
    }

    export function fromString(vote: string): ThreeWayVote {
        return (ThreeWayVote as any)[vote];
    }
}

export async function castVote({ethers, network}: {ethers: HardhatRuntimeEnvironment['ethers'], network: HardhatRuntimeEnvironment['network']}, proposalId: BigNumberish, voter: SignerWithAddress, opinion: ThreeWayVote, reason?: string) {
    reason = reason ?? '';

    const governor: Opinionator = await ethers.getContract('Opinionator');
    await governor.connect(voter).castVoteWithReason(proposalId, opinion, reason);
    console.log(`voter ${voter.address} casted a vote for proposal ${proposalId} - ${ThreeWayVote.toString(opinion)}: ${reason}`);
}