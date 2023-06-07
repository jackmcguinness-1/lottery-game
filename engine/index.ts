import prompt from "prompt-sync";
const prompter = prompt({sigint: true});

import {GameState, GameData} from "./src/model";
import {handleHelp, handleLuckyDip, handleManual, handleQuickRun, handleStart, handleQuit, handleReset} from "./src/optionHandlers";
import {Option, Message, OptionKeys} from "./src/userInput";

const OPTION_HANDLERS: Map<Option, (input: string, gameData: GameData) => void> = new Map([
    [Option.MANUAL, handleManual],
    [Option.LUCKY_DIP, handleLuckyDip],
    [Option.QUICK_RUN, handleQuickRun],
    [Option.QUIT, handleQuit],
    [Option.START, handleStart],
    [Option.RESET, handleReset],
    [Option.DUMP, (_, gameData) => {console.log(gameData)}]
]);

function handleInput(input: string, gameData: GameData) {
    let inputWords = input.split(" ");
    if(inputWords[0] === "help") {
        handleHelp(inputWords.join(" "), gameData);
        return;
    }
    let option = OptionKeys.get(input);
    if(option === undefined){
        console.log(Message.BAD_OPTION);
        return;
    }
    let handler = OPTION_HANDLERS.get(option);
    if(!handler){
        console.log(`input '${input}' not recognised, please enter 'help' for help on how to play`);
    } else {
        handler(input, gameData);
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