import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/Service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  ngOnInit(): void {}
  logout() {
    this.auth.logout();
  }
}
