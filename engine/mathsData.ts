
export type Paytable = number[];

export type WinResult = {
    matchingNumbers: number[],
    payout: number
}

export const PAYTABLE: Paytable = [0, 0, 0, 100, 200, 500];

export const BALL_LOW = 1;
export const BALL_HIGH = 59;
export const NUM_BALLS = 6;