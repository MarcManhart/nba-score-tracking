import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

const TEAM_NAMES_STORAGE_KEY: string = 'teamNames';

@Injectable({
  providedIn: 'root',
})
export class TeamStoreService {
  public teamNamesSubject: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >(this.getNamesFromStorage());

  constructor() {}

  /**
   * Will add a name of a team to the local storage if not already present.
   *
   * @param teamName the name of the team
   */
  public addTeam(teamName: string): void {
    // get
    let teamNamesFromStorage = this.teamNamesSubject.value;

    // dublicate check
    let alreadyAdded: boolean = false;
    for (let name of teamNamesFromStorage) {
      if (name === teamName) {
        alreadyAdded = true;
        break;
      }
    }

    // add and write
    if (!alreadyAdded) {
      teamNamesFromStorage.push(teamName);
      this.setNamesFromStorage(teamNamesFromStorage);
    }

    // inform
    this.teamNamesSubject.next(teamNamesFromStorage);
  }

  /**
   * Will remove a Team name from the local storage
   *
   * @param teamName The Name of the Team
   */
  public removeZipFromStore(teamName: string): void {
    // get
    let teamNamesFromStorage = this.teamNamesSubject.value;

    // remove
    teamNamesFromStorage = teamNamesFromStorage.filter(
      (name) => name !== teamName
    );

    // save
    this.setNamesFromStorage(teamNamesFromStorage);

    // inform
    this.teamNamesSubject.next(teamNamesFromStorage);
  }

  private getNamesFromStorage(): string[] {
    const storeOuput: string | null = localStorage.getItem(
      TEAM_NAMES_STORAGE_KEY
    );
    return storeOuput ? JSON.parse(storeOuput) : [];
  }

  private setNamesFromStorage(teamNames: string[]): void {
    localStorage.setItem(TEAM_NAMES_STORAGE_KEY, JSON.stringify(teamNames));
  }
}
