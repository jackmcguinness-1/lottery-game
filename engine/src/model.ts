export class GameData {
    state: GameState
    playerNumbers: number[] | null
    houseNumbers: number[] | null

    constructor() {
        this.state = GameState.IDLE,
        this.playerNumbers = null;
        this.houseNumbers = null;
    }
}

export enum GameState {
    IDLE,
    MANUAL_SELECTED,
    LUCKY_DIP_SELECTED,
    QUITTING
}