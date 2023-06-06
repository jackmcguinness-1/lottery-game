import {WinResult} from "./mathsData"

export class StatsMeters {
    CASH_IN: number
    CASH_OUT: number
    CNT_OAK: number[]
    WIN_OAK: number[]
    constructor() {
        this.CASH_IN = 0;
        this.CASH_OUT = 0;
        this.CNT_OAK = new Array(59).fill(0);
        this.WIN_OAK = new Array(59).fill(0);
    }

    meterResult(winResult: WinResult) {
        this.CASH_IN += 1; // constant stake
        this.CASH_OUT += winResult.payout;
        this.CNT_OAK[winResult.matchingNumbers.length] += 1;
        this.WIN_OAK[winResult.matchingNumbers.length] += winResult.payout;
    }
}
