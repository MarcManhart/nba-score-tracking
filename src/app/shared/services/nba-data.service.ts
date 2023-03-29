import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Team } from '../models/Team';
import { formatDate } from '@angular/common';
import { Result } from '../models/Result';

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

  getAllTeams(): Observable<Team[]> {
    const URL = `${NBA_API_BASE_URL}/teams`;

    return this.http
      .get<{ data: Team[] }>(URL, httpOptions)
      .pipe(map((result: { data: Team[] }) => result.data));
  }

  getResultsOfTeamForPeriod(id: number, dates: Date[]): Observable<Result[]> {
    // transform all dates into on long GET parameter string
    let dateParametersStr = '';
    dates.forEach((date: Date) => {
      dateParametersStr +=
        DATES_PARAM_PREFIX + formatDate(date, 'yyyy-MM-dd', 'en-US');
    });

    let url = `${NBA_API_BASE_URL}/games?page=0${dateParametersStr}&per_page=12&team_ids[]=${id}`;
    console.log(`GET ${url}`);

    return this.http
      .get<{ data: Result[] }>(url, httpOptions)
      .pipe(map((r: { data: Result[] }) => r.data));
  }
}
