import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { PeriodResults } from 'src/app/shared/models/PeriodStats';
import { Result } from 'src/app/shared/models/Result';
import { Team } from 'src/app/shared/models/Team';
import { NBADataService } from 'src/app/shared/services/nba-data.service';
import { TeamStoreService } from 'src/app/shared/services/team-store.service';

const PERIOD_IN_DAYS: number = 12;

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.scss'],
})
export class ResultsCardComponent {
  team$: Observable<Team>;
  periodResults$: Observable<PeriodResults>;

  constructor(
    private route: ActivatedRoute,
    private nbaDataService: NBADataService
  ) {
    this.team$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const teamCode = params.get('teamCode');
        return this.nbaDataService.getTeamByCode(teamCode);
      })
    );

    this.periodResults$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const teamCode = params.get('teamCode');
        return this.nbaDataService.getTeamByCode(teamCode);
      }),
      switchMap((team: Team) => {
        return this.nbaDataService.getResultsOfTeamForPeriod(
          team.id,
          this.getDatesOfLastNDays(PERIOD_IN_DAYS)
        );
      })
    );
  }

  private getDatesOfLastNDays(n: number) {
    const dates: Date[] = [];
    for (let i = 0; i < n; i++)
      dates.push(new Date(new Date().setDate(new Date().getDate() - i)));
    return dates;
  }
}
