import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PeriodResults } from 'src/app/shared/models/PeriodStats';
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
  public results$: Observable<PeriodResults> | null = null;
  public logoLoaded: boolean = false;

  constructor(
    private teamStoreService: TeamStoreService,
    private nbaDataService: NBADataService
  ) {}

  ngOnInit(): void {
    // get the team
    this.team$ = this.nbaDataService.getAllTeams().pipe(
      map((teams: Team[]) => {
        return teams.find((team: Team) => team.id == this.teamId) ?? null;
      })
    );

    // get the results
    this.results$ = this.nbaDataService.getResultsOfTeamForPeriod(
      this.teamId,
      this.getDatesOfLastNDays(PERIOD_IN_DAYS)
    );
  }

  private getDatesOfLastNDays(n: number) {
    const dates: Date[] = [];
    for (let i = 0; i < n; i++)
      dates.push(new Date(new Date().setDate(new Date().getDate() - i)));
    return dates;
  }

  public onClickClose(): void {
    this.teamStoreService.removeTeamFromStore(this.teamId);
  }

  public wonTheGame(result: Result): boolean {
    if (result.home_team.id == this.teamId) {
      return result.home_team_score > result.visitor_team_score;
    } else {
      return result.visitor_team_score > result.home_team_score;
    }
  }
}
