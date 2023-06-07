export enum Message {
    WELCOME = "Welcome to the lottery game! Type 'help' if you are stuck",
    DESCRIPTION = "How to play: you select 6 different numbers from 1 to 59, and then we randomly choose 6 from 1 to 59, if 3 or more of our numbers match you win a prize!",
    HELP = "To see a list of the options enter 'help options', to use an option enter the option name, to play the game you must select manual or lucky dip, then start",
    HELP_OPTIONS = "The options are as follows, 'manual', 'lucky dip', 'start', 'quick run', 'reset', to see more help for any of the options enter 'help ' followed by the option name",
    HELP_MANUAL = "Manual mode is where you select 6 random numbers yourself, and then we randomly choose 6 to compare",
    HELP_LUCKY_DIP = "Lucky dip is where we select 6 random number for you, and then randomly choose 6 to compare",
    HELP_START = "Start can only be done after you have either chosen your numbers manually, or done a lucky dip, it will play out the game and award any winnings, you can run start any number of times once you have selected some numbers",
    HELP_QUICK_RUN = "Quick run will instruct you to enter a number of games to simulate and a file name, and then play the game N times and output the results to your chosen file",
    HELP_RESET = "Reset can be done after choosing manual or lucky dip, it will reset your choice and allow you to pick again",
    BAD_NUMBERS = "Numbers are invalid",
    NUMBERS_PROMPT = "Enter your numbers ispace separated i.e. '1 2 3 4 5 6': ",
    NO_NUMBERS_TO_START = "Please choose numbers with manual or lucky dip before starting, type 'help' for more help",
    BAD_OPTION = "Option not recognised",
    BAD_HELP = "Help not recognised for this input"
};
export const HelpMessages: Map<String, Message> = new Map([
    ["options", Message.HELP_OPTIONS],
    ["manual", Message.HELP_MANUAL],
    ["lucky dip", Message.HELP_LUCKY_DIP],
    ["start", Message.HELP_START],
    ["quick run", Message.HELP_QUICK_RUN],
    ["reset", Message.HELP_RESET],
]);
export enum Option {
    HELP,
    MANUAL,
    LUCKY_DIP,
    QUICK_RUN,
    START,
    RESET,
    QUIT,
    DUMP,
    NONE,
};
export const OptionKeys: Map<string, Option> = new Map([
    ["help", Option.HELP],
    ["manual", Option.MANUAL],
    ["lucky dip", Option.LUCKY_DIP],
    ["quick run", Option.QUICK_RUN],
    ["start", Option.START],
    ["reset", Option.RESET],
    ["quit", Option.QUIT],
    ["dump", Option.DUMP]
]);
