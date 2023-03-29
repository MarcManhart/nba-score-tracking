import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class NBADataService {
  constructor(private http: HttpClient) {}

  public getAllTeams(): Observable<Team[]> {
    const URL = `${NBA_API_BASE_URL}/teams`;

    return this.http
      .get<{ data: Team[] }>(URL, httpOptions)
      .pipe(map((result: { data: Team[] }) => result.data));
  }

  public getResultsOfTeamForPeriod(
    id: number,
    dates: Date[]
  ): Observable<PeriodResults> {
    // transform all dates into on long GET parameter string
    let dateParametersStr = '';
    dates.forEach((date: Date) => {
      dateParametersStr +=
        DATES_PARAM_PREFIX + formatDate(date, 'yyyy-MM-dd', 'en-US');
    });

    let url = `${NBA_API_BASE_URL}/games?page=0${dateParametersStr}&per_page=12&team_ids[]=${id}`;
    console.log(`GET ${url}`);

    return this.http.get<{ data: Result[] }>(url, httpOptions).pipe(
      map(({ data }) => {
        return {
          gameResults: data,
          ...this.calcAvgPtsScored(id, data),
        };
      })
    );
  }

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

// {
//   "id": 858467,
//   "date": "2023-03-26T00:00:00.000Z",
//   "home_team": {
//       "id": 10,
//       "abbreviation": "GSW",
//       "city": "Golden State",
//       "conference": "West",
//       "division": "Pacific",
//       "full_name": "Golden State Warriors",
//       "name": "Warriors"
//   },
//   "home_team_score": 96,
//   "period": 4,
//   "postseason": false,
//   "season": 2022,
//   "status": "Final",
//   "time": "Final",
//   "visitor_team": {
//       "id": 18,
//       "abbreviation": "MIN",
//       "city": "Minnesota",
//       "conference": "West",
//       "division": "Northwest",
//       "full_name": "Minnesota Timberwolves",
//       "name": "Timberwolves"
//   },
//   "visitor_team_score": 99
// }
