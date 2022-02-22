import { Component, OnInit } from '@angular/core';
import { AuthService } from '../data/auth.service';


@Component({
  selector: 'app-site-navigation',
  templateUrl: './site-navigation.component.html',
  styleUrls: ['./site-navigation.component.css']
})
export class SiteNavigationComponent implements OnInit {

  constructor(private auth: AuthService) { }

  ngOnInit() {
  }

}
