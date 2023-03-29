import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Result } from 'src/app/shared/models/Result';
import { Team } from 'src/app/shared/models/Team';
import { NBADataService } from 'src/app/shared/services/nba-data.service';
import { TeamStoreService } from 'src/app/shared/services/team-store.service';

@Component({
  selector: 'app-results-card',
  templateUrl: './results-card.component.html',
  styleUrls: ['./results-card.component.scss'],
})
export class ResultsCardComponent implements OnInit {
  team: Team | undefined;
  periodResults: Result[] | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private teamStoreService: TeamStoreService,
    private nbaDataService: NBADataService
  ) {}

  ngOnInit() {
    this.team = history.state.team;
    this.periodResults = history.state.periodResults;
  }
}
