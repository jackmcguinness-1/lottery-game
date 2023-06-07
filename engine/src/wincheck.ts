import {Paytable, WinResult} from "./mathsData";

export function checkWins(paytable: Paytable, nums1: number[], nums2: number[]): WinResult{
    let matchingNumbers = nums1.filter(num => nums2.includes(num));
    let payout = paytable[Math.min(matchingNumbers.length, paytable.length - 1)];
    return {
        matchingNumbers,
        payout
    };
}