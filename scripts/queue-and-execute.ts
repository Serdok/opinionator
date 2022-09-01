import hardhat from "hardhat";
import {queueAndExecute} from "../tasks/queue-and-execute";

queueAndExecute(hardhat)
    .then(console.log)
    .then(_ => process.exit(0))
    .catch(err => {
        console.error(err);
        process.exit(1);
    })