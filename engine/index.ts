import prompt from "prompt-sync";
import fs from "fs";
const prompter = prompt({sigint: true});

import {rtpTest} from "./rtpTest";
import { BALL_HIGH, BALL_LOW, NUM_BALLS } from "./mathsData";
import { pickRandomNumbers, play } from "./play";

enum Message {
    WELCOME = "Welcome to the lottery game! Type 'help' if you are stuck",
    DESCRIPTION = "How to play: you select 6 different numbers from 1 to 59, and then we randomly choose 6 from 1 to 59, if 3 or more of our numbers match you win a prize!",
    HELP = "To see a list of the actions enter 'help actions', to use an action enter the action name",
    HELP_ACTIONS = "The actions are as follows, 'manual', 'lucky dip', 'quick run', 'reset', to see more help for any of the options enter 'help ' followed by the action name",
    HELP_MANUAL = "Manual mode is where you select 6 random numbers yourself, and then we randomly choose 6 to compare",
    HELP_LUCKY_DIP = "Lucky dip is where we select 6 random number for you, and then randomly choose 6 to compare",
    HELP_START = "Start can only be done after you have either chosen your numbers manually, or done a lucky dip, it will play out the game and award any winnings, you can run start any number of times once you have selected some numbers",
    HELP_QUICK_RUN = "Quick run will instruct you to enter a number of games to simulate and a file name, and then play the game N times and output the results to your chosen file",
    HELP_RESET = "Reset can be done after choosing manual or lucky dip, it will reset your choice and allow you to pick again",
    BAD_NUMBERS = "Numbers are invalid",
    NUMBERS_PROMPT = "Enter your numbers space separated i.e. '1 2 3 4 5 6': ",
    NO_NUMBERS_TO_START = "please choose numbers with manual or lucky dip before starting, type 'help' for more help",
};
const HelpMessages: Map<String, Message> = new Map([
    ["actions", Message.HELP_ACTIONS],
    ["manual", Message.HELP_MANUAL],
    ["lucky dip", Message.HELP_LUCKY_DIP],
    ["start", Message.HELP_START],
    ["quick run", Message.HELP_QUICK_RUN],
    ["reset", Message.HELP_RESET],
]);
enum Option {
    HELP,
    MANUAL,
    LUCKY_DIP,
    START,
    RESET,
    QUIT,
    NONE,
};
const OptionKeys: Map<string, Option> = new Map([
    ["help", Option.HELP],
    ["manual", Option.MANUAL],
    ["lucky dip", Option.LUCKY_DIP],
    ["start", Option.START],
    ["reset", Option.RESET],
    ["quit", Option.QUIT]
]);

class GameData {
    state: GameState
    playerNumbers: number[] | null
    houseNumbers: number[] | null

    constructor() {
        this.state = GameState.IDLE,
        this.playerNumbers = null;
        this.houseNumbers = null;
    }
}

enum GameState {
    IDLE,
    MANUAL_SELECTED,
    LUCKY_DIP_SELECTED,
    PLAYING,
    QUITTING
}

function resetGame(input: string, gameData: GameData) {
    console.log("resetting game data")
    gameData.state = GameState.IDLE;
    gameData.houseNumbers = null;
    gameData.playerNumbers = null;
}

const OPTION_HANDLERS: Map<Option, (input: string, gameData: GameData) => void> = new Map([
    [Option.MANUAL, handleManual],
    [Option.LUCKY_DIP, handleLuckyDip],
    [Option.QUIT, quitGame],
    [Option.START, handleStart],
    [Option.RESET, resetGame]
]);


function handleInput(input: string, gameData: GameData) {
    let inputWords = input.split(" ");
    if(inputWords[0] === "help") {
        handleHelp(inputWords.join(" "), gameData);
        return;
    }
    let option = OptionKeys.get(input);
    if(option === undefined){
        console.log("supply better input ya drongo");
        return;
    }
    let handler = OPTION_HANDLERS.get(option);
    if(!handler){
        console.log(`input '${input}' not recognised, please enter 'help' for help on how to play`);
    } else {
        handler(input, gameData);
    }
}

function quitGame(input: string, gameData: GameData) {
    gameData.state = GameState.QUITTING;
}

function checkNumbersValid(numbers: number[]) {
    let correctAmount = numbers.length === NUM_BALLS;
    let allInRange = numbers.every(num => num >= BALL_LOW && num <= BALL_HIGH);
    return correctAmount && allInRange;
}

function handleManual(input: string, gameData: GameData): void {
    const numbersStr = prompter(Message.NUMBERS_PROMPT);
    const playerNumbers = numbersStr.split(" ").map(num => parseInt(num));
    let valid = checkNumbersValid(playerNumbers);
    if(!valid){
        console.log(Message.BAD_NUMBERS);
    } else {
        console.log(`setting numbers to ${playerNumbers}`);
        gameData.playerNumbers = playerNumbers;
    }
}

function handleQuickPlay(input: string, gameData: GameData): void {
    const numRuns = parseInt(prompter("How many runs: "));
    const outputFile = prompter("Output filename: ");
    let result = rtpTest(numRuns);
    fs.writeFileSync(outputFile, JSON.stringify(result, null, "\t"), {}); 
}

function handleLuckyDip(input: string, gameData: GameData): void {
    gameData.playerNumbers = pickRandomNumbers(BALL_LOW, BALL_HIGH + 1, NUM_BALLS);
    console.log(`randomly picked ${gameData.playerNumbers}`);
}

function handleStart(input: string, gameData: GameData): void {
    if(gameData.playerNumbers !== null) {
        const result = play(gameData.playerNumbers);
        console.log("your result is: ");
        console.log(result);
    } else {
        console.log(Message.NO_NUMBERS_TO_START);
    }
}

function handleHelp(input: string, gameData: GameData): void {
    let helpWords = input.split(" ");
    helpWords.shift();
    let helpOption = helpWords.join(" ");

    if(helpWords.length === 0) {
        console.log(Message.HELP)
    } else {
        let helpMsg = HelpMessages.get(helpOption);
        if(helpMsg === undefined){
            console.log("this help type was not recognised, please enter 'help options' to see a list of allowed options for help")
        } else {
            console.log(helpMsg);
        }
    }
}

function main() {
    
    console.log(Message.WELCOME);
    let gameData = new GameData();

    while(gameData.state !== GameState.QUITTING) {
        let input = prompter("input: ");
        handleInput(input, gameData);
    }

}

main()