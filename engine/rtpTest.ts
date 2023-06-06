import {WinResult, BALL_HIGH, BALL_LOW, NUM_BALLS, PAYTABLE} from "./mathsData";
import {StatsMeters} from "./stats";
import { pickRandomNumbers} from "./play";
import { checkWins } from "./wincheck";

export function rtpTest(numRuns: number): StatsMeters {
    let totalMeters = new StatsMeters();

    for(let i = 0; i < numRuns; i++) {
        if(i % (numRuns / 100) == 0){
            console.log(`${100 * i/numRuns}% complete`);
        }
        let playerNumbers = pickRandomNumbers(BALL_LOW, BALL_HIGH + 1, NUM_BALLS);
        let houseNumbers = pickRandomNumbers(BALL_LOW, BALL_HIGH + 1, NUM_BALLS);
        let result = checkWins(PAYTABLE, playerNumbers, houseNumbers);
        totalMeters.meterResult(result);
    }

    console.log("100% complete");

    return totalMeters;
}