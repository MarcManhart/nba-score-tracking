import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TEAM_IDS_STORAGE_KEY: string = 'teamids';

@Injectable({
  providedIn: 'root',
})
export class TeamStoreService {
  public teamIdsSubject: BehaviorSubject<number[]> = new BehaviorSubject<
    number[]
  >(this.getIdsFromStorage());

  constructor() { }
  
  private getIdsFromStorage(): number[] {
    const storeOuput: string | null =
      localStorage.getItem(TEAM_IDS_STORAGE_KEY);
    return storeOuput ? JSON.parse(storeOuput) : [];
  }

  private setIdsInStorage(teamIds: number[]): void {
    localStorage.setItem(TEAM_IDS_STORAGE_KEY, JSON.stringify(teamIds));
  }
  /**
   * Will add a id of a team to the local storage if not already present.
   *
   * @param teamId the id of the team
   */
  public addTeam(teamId: number): void {
    // get
    let teamIdsFromStorage = this.teamIdsSubject.value;

    // dublicate check
    let alreadyAdded: boolean = false;
    for (let id of teamIdsFromStorage) {
      if (id === teamId) {
        alreadyAdded = true;
        break;
      }
    }

    // add and write
    if (!alreadyAdded) {
      teamIdsFromStorage.push(teamId);
      this.setIdsInStorage(teamIdsFromStorage);
    }

    // inform
    this.teamIdsSubject.next(teamIdsFromStorage);
  }

  /**
   * Will remove a Team id from the local storage
   *
   * @param teamId The id of the Team
   */
  public removeTeamFromStore(teamId: number): void {
    // get
    let teamIdsFromStorage = this.teamIdsSubject.value;

    // remove
    teamIdsFromStorage = teamIdsFromStorage.filter((id) => id !== teamId);

    // save
    this.setIdsInStorage(teamIdsFromStorage);

    // inform
    this.teamIdsSubject.next(teamIdsFromStorage);
  }
}
