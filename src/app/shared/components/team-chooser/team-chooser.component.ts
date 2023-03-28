import { Component, Input, ViewChild } from '@angular/core';
import { TeamStoreService } from '../../services/team-store.service';

@Component({
  selector: 'app-team-chooser',
  templateUrl: './team-chooser.component.html',
  styleUrls: ['./team-chooser.component.scss'],
})
export class TeamChooserComponent {
  constructor(private teamStoreService:TeamStoreService) {}

  onTrackTeamBtnClicked(teamName: string) {
    this.teamStoreService.addTeam(teamName);
  }
}
