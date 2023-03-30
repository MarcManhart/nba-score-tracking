import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, find, map, Observable, of } from 'rxjs';
import { Team } from '../models/Team';
import { formatDate } from '@angular/common';
import { Result } from '../models/Result';
import { PeriodResults } from '../models/PeriodStats';

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
   * @returns
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
   * @param teamCode
   * @returns
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
   *
   * @param id
   * @param dates
   * @returns
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
   *
   *
   * @param data
   * @returns
   */
  private calcAvgPtsScored(
    id: number,
    data: Result[]
  ): {
    avgPtsScored: number;
    avgPtsConceded: number;
  } {
    let avgpts = {
      avgPtsScored: 0,
      avgPtsConceded: 0,
    };

    data.forEach((result: Result) => {
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

    avgpts.avgPtsScored = Math.round(avgpts.avgPtsScored / data.length);
    avgpts.avgPtsConceded = Math.round(avgpts.avgPtsConceded / data.length);

    return avgpts;
  }
}
