import { Component, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Team } from 'src/app/shared/models/Team';
import { NBADataService } from 'src/app/shared/services/nba-data.service';

@Component({
  selector: 'app-team-stats-card',
  templateUrl: './team-stats-card.component.html',
  styleUrls: ['./team-stats-card.component.scss'],
})
export class TeamStatsCardComponent {
  @Input() teamId: number = 0;
  public team$: Observable<Team>;

  constructor(private nbaDataService: NBADataService) {
    const dummy_team_placeholder = {
      id: this.teamId,
      abbreviation: 'XXX',
      city: '-',
      conference: '-',
      full_name: '-',
      division: '-',
    };

    this.team$ = nbaDataService.getAllTeams().pipe(
      map((teams: Team[]) => {
        let foundTeam: Team | undefined = teams.find(
          (team: Team) => team.id == this.teamId
        );
        return foundTeam ?? dummy_team_placeholder;
      })
    );
  }
}
