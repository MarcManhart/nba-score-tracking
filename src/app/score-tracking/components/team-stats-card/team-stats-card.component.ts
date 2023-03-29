import { formatDate } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Result } from 'src/app/shared/models/Result';
import { Team } from 'src/app/shared/models/Team';
import { NBADataService } from 'src/app/shared/services/nba-data.service';
import { TeamStoreService } from 'src/app/shared/services/team-store.service';

const PERIOD_IN_DAYS: number = 12;

@Component({
  selector: 'app-team-stats-card',
  templateUrl: './team-stats-card.component.html',
  styleUrls: ['./team-stats-card.component.scss'],
})
export class TeamStatsCardComponent implements OnInit {
  @Input() public teamId: number = 0;
  public team$: Observable<Team | null> | null = null; // since the store can manipulated from developer tools, its possible, that a wrong id was given and therefore the team observable is possibly null
  public results$: Observable<Result[]> | null = null;

  constructor(
    private teamStoreService: TeamStoreService,
    private nbaDataService: NBADataService
  ) {}

  ngOnInit(): void {
    const dates: Date[] = [];
    for (let i = 0; i < PERIOD_IN_DAYS; i++)
      dates.push(new Date(new Date().setDate(new Date().getDate() - i)));

    //--------
    this.team$ = this.nbaDataService.getAllTeams().pipe(
      map((teams: Team[]) => {
        return teams.find((team: Team) => team.id == this.teamId) ?? null;
      })
    );

    //--------
    this.results$ = this.nbaDataService.getResultsOfTeamForPeriod(
      this.teamId,
      dates
    );
  }

  onClickClose() {
    this.teamStoreService.removeTeamFromStore(this.teamId);
  }
}
