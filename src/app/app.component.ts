import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from './services/auth/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'artwork';

  constructor(private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {

  }
}
