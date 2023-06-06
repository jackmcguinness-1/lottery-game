
import {checkWins} from "./wincheck";
import {PAYTABLE, WinResult, BALL_HIGH, BALL_LOW, NUM_BALLS} from "./mathsData";

function randInt(low: number, high: number): number {
    let rand = Math.random();
    let scaled = low + Math.floor(rand * (high - low));
    return scaled;
}

export function pickRandomNumbers(low: number, high: number, count: number): number[]{
    let numbers = new Array();
    for(let i = 0; i < count; i++){
        let nextNumber = randInt(low, high);
        if(numbers.includes(nextNumber)){
            i--;
        } else{
            numbers.push(nextNumber)
        }
    }
    return numbers;
}

export type PlayResult = {
    playerNumbers: number[],
    houseNumbers: number[],
    winResult: WinResult
}

export function play(playerNumbers: number[]): PlayResult {
    let houseNumbers = pickRandomNumbers(BALL_LOW, BALL_HIGH+1, NUM_BALLS);
    let winResult = checkWins(PAYTABLE, playerNumbers, houseNumbers);
    let playResult = {
        playerNumbers,
        houseNumbers,
        winResult
    };
    return playResult;
}