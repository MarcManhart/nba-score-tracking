import { Component, Input, ViewChild } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
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
  public selectedTeamId: any;

  constructor(
    private teamStoreService: TeamStoreService,
    private nbaDataService: NBADataService
  ) {
    this.teams$ = this.nbaDataService.getAllTeams();
  }

  onTrackTeamBtnClicked() {
    this.teamStoreService.addTeam(this.selectedTeamId);
  }
}
