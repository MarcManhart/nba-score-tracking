import { Result } from "./Result";

export type PeriodResults = {
    gameResults: Result[],
    avgPtsScored: number,
    avgPtsConceded: number,
}