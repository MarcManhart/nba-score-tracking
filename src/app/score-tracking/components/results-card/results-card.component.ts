import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, shareReplay, switchMap } from 'rxjs';
import { PeriodResults } from 'src/app/shared/models/PeriodStats';
import { Team } from 'src/app/shared/models/Team';
import { NBADataService } from 'src/app/shared/services/nba-data.service';

const PERIOD_IN_DAYS: number = 12;

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.scss'],
})
export class ResultsCardComponent {
  public team$: Observable<Team>;
  public periodResults$: Observable<PeriodResults>;

  constructor(
    private route: ActivatedRoute,
    private nbaDataService: NBADataService
  ) {
    this.team$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        const teamCode = params.get('teamCode');
        return this.nbaDataService.getTeamByCode(teamCode);
      }),
      shareReplay(1),
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
