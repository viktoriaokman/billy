import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
})
export class MainPageComponent implements OnInit {
  public user: User = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };
  constructor(private shareDataService: ShareDataService) {}

  ngOnInit(): void {
    this.shareDataService.currentMessage.subscribe((msg) => (this.user = msg));
  }
}
