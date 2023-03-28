import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Team } from '../models/Team';

const httpOptions = {
  headers: new HttpHeaders({
    'X-RapidAPI-Key': '2QMXSehDLSmshDmRQcKUIAiQjIZAp1UvKUrjsnewgqSP6F5oBX',
    'X-RapidAPI-Host': 'free-nba.p.rapidapi.com',
  }),
};

const NBA_API_BASE_URL = 'https://free-nba.p.rapidapi.com';

@Injectable({
  providedIn: 'root',
})
export class NBADataService {
  constructor(private http: HttpClient) {}

  getAllTeams(): Observable<Team[]> {
    const URL = `${NBA_API_BASE_URL}/teams`;

    return this.http
      .get<{ data: Team[] }>(URL, httpOptions)
      .pipe(map((result) => result.data));
  }
}
