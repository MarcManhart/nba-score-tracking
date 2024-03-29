import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../../models/Team';
import { NBADataService } from '../../services/nba-data.service';
import { TeamStoreService } from '../../services/team-store.service';

@Component({
  selector: 'app-team-chooser',
  templateUrl: './team-chooser.component.html',
  styleUrls: ['./team-chooser.component.scss'],
})
export class TeamChooserComponent {
  public teams$: Observable<Team[]>;
  public selectedTeamId: number | undefined;

  constructor(
    private teamStoreService: TeamStoreService,
    private nbaDataService: NBADataService
  ) {
    this.teams$ = this.nbaDataService.getAllTeams();
  }

  public onTrackTeamBtnClicked() {
    if (this.selectedTeamId) this.teamStoreService.addTeam(this.selectedTeamId);
    else alert('No Team was selected!');
  }
}
