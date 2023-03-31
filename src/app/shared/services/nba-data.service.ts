import { formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { PeriodResults } from '../models/PeriodStats';
import { Result } from '../models/Result';
import { Team } from '../models/Team';

const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  }),
};
const NBA_API_BASE_URL = 'https://free-nba.p.rapidapi.com';
const DATES_PARAM_PREFIX = '&dates[]=';
const DUMMY_TEAM: Team = {
  id: -1,
  abbreviation: 'unknown',
  city: 'unknown',
  conference: 'unknown',
  full_name: 'unknown',
  division: 'unknown',
};
const DUMMY_PERIOD_RESULTS: PeriodResults = {
  gameResults: [],
  avgPtsScored: 0,
  avgPtsConceded: 0,
};

@Injectable({
  providedIn: 'root',
})
export class NBADataService {
  constructor(private http: HttpClient) {}

  /**
   * Get all available Teams
   *
   * @returns an Observable over all NBA Teams
   */
  public getAllTeams(): Observable<Team[]> {
    const URL = `${NBA_API_BASE_URL}/teams`;

    return this.http
      .get<{ data: Team[] }>(URL, httpOptions)
      .pipe(map((result: { data: Team[] }) => result.data));
  }

  /**
   * Get data of a specific team
   *
   * @param teamCode the team name abbreviation (e.g. SAC)
   * @returns Observable over the Team
   */
  public getTeamByCode(teamCode: string | undefined | null): Observable<Team> {
    const URL = `${NBA_API_BASE_URL}/teams/${teamCode}`;

    return this.getAllTeams().pipe(
      map((teams: Team[]) => {
        let foundTeam: Team | undefined = teams.find(
          (team: Team) => team.abbreviation === teamCode
        );
        return foundTeam ?? DUMMY_TEAM;
      })
    );
  }

  /**
   * Will return an Object with contains the results as well as the average points of scores
   *
   * @param id the ID of the Team; can also be undefined or null
   * @param dates an array of Dates
   * @returns an observable over the requested PeriodResults OR an dummy object
   */
  public getResultsOfTeamForPeriod(
    id: number | undefined | null,
    dates: Date[]
  ): Observable<PeriodResults> {
    // transform all dates into on long GET parameter string
    let dateParametersStr = '';
    dates.forEach((date: Date) => {
      dateParametersStr +=
        DATES_PARAM_PREFIX + formatDate(date, 'yyyy-MM-dd', 'en-US');
    });

    let url = `${NBA_API_BASE_URL}/games?page=0${dateParametersStr}&per_page=12&team_ids[]=${id}`;

    if (id === undefined || id === null) {
      return of(DUMMY_PERIOD_RESULTS);
    }

    return this.http.get<{ data: Result[] }>(url, httpOptions).pipe(
      map(({ data }) => {
        return {
          gameResults: data,
          ...this.calcAvgPtsScored(id, data),
        };
      })
    );
  }

  /**
   *  Helper Method to get the average points
   *
   * @param id the ID of the Team
   * @param results the results witch contains the neccssary score informations
   * @returns an Objects with to avg scores in it
   */
  private calcAvgPtsScored(
    id: number,
    results: Result[]
  ): {
    avgPtsScored: number;
    avgPtsConceded: number;
  } {
    let avgpts = {
      avgPtsScored: 0,
      avgPtsConceded: 0,
    };

    results.forEach((result: Result) => {
      let ownTeamPts = 0;
      let oppTeamPts = 0;
      if (result.home_team.id === id) {
        ownTeamPts = result.home_team_score;
        oppTeamPts = result.visitor_team_score;
      } else {
        oppTeamPts = result.home_team_score;
        ownTeamPts = result.visitor_team_score;
      }

      avgpts.avgPtsScored += ownTeamPts;
      avgpts.avgPtsConceded += oppTeamPts;
    });

    avgpts.avgPtsScored = Math.round(avgpts.avgPtsScored / results.length);
    avgpts.avgPtsConceded = Math.round(avgpts.avgPtsConceded / results.length);

    return avgpts;
  }
}
