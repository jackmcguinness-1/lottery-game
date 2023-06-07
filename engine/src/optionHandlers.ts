import {GameData, GameState} from "./model";
import { NUM_BALLS, BALL_LOW, BALL_HIGH } from "./mathsData";
import {Message, HelpMessages} from "./userInput";
import {rtpTest} from "./rtpTest";
import fs from "fs";
import {play} from "./play";
import {pickRandomNumbers} from "./play";

import prompt from "prompt-sync";
const prompter = prompt({sigint: true});

export function handleQuit(_: string, gameData: GameData) {
    gameData.state = GameState.QUITTING;
}

export function handleReset(input: string, gameData: GameData) {
    console.log("resetting game data")
    gameData.state = GameState.IDLE;
    gameData.houseNumbers = null;
    gameData.playerNumbers = null;
}

export function checkNumbersValid(numbers: number[]) {
    let correctAmount = numbers.length === NUM_BALLS;
    let allInRange = numbers.every(num => num >= BALL_LOW && num <= BALL_HIGH);
    return correctAmount && allInRange;
}

export function handleManual(_: string, gameData: GameData): void {
    const numbersStr = prompter(Message.NUMBERS_PROMPT);
    const playerNumbers = numbersStr.split(" ").map(num => parseInt(num));
    let valid = checkNumbersValid(playerNumbers);
    if(!valid){
        console.log(Message.BAD_NUMBERS);
    } else {
        console.log(`setting numbers to ${playerNumbers}`);
        gameData.playerNumbers = playerNumbers;
        gameData.state = GameState.MANUAL_SELECTED;
    }
}

export function handleQuickRun(_: string, gameData: GameData): void {
    const numRuns = parseInt(prompter("How many runs: "));
    const outputFile = prompter("Output filename: ");
    let result = rtpTest(numRuns);
    fs.writeFileSync(outputFile, JSON.stringify(result, null, "\t"), {}); 
}

export function handleLuckyDip(_: string, gameData: GameData): void {
    gameData.playerNumbers = pickRandomNumbers(BALL_LOW, BALL_HIGH + 1, NUM_BALLS);
    gameData.state = GameState.LUCKY_DIP_SELECTED;
    console.log(`randomly picked ${gameData.playerNumbers}`);
}

export function handleStart(_: string, gameData: GameData): void {
    if(gameData.playerNumbers !== null) {
        const result = play(gameData.playerNumbers);
        console.log("your result is: ");
        console.log(result);
    } else {
        console.log(Message.NO_NUMBERS_TO_START);
    }
}

export function handleHelp(input: string, _: GameData): void {
    let helpWords = input.split(" ");
    helpWords.shift();
    let helpOption = helpWords.join(" ");

    if(helpWords.length === 0) {
        console.log(Message.HELP)
    } else {
        let helpMsg = HelpMessages.get(helpOption);
        if(helpMsg === undefined){
            console.log(Message.BAD_HELP);
        } else {
            console.log(helpMsg);
        }
    }
}