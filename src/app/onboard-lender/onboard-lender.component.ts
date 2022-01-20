import { Component, OnInit } from '@angular/core';
import { OnboardLenderService } from '../onboard-lender.service';

@Component({
  selector: 'app-onboard-lender',
  templateUrl: './onboard-lender.component.html',
  styleUrls: ['./onboard-lender.component.css']
})
export class OnboardLenderComponent implements OnInit {

  constructor(private onboardLender:OnboardLenderService) { }

  ngOnInit() {
  this.onboardLender.onboardLender(newLender)
    .subscribe(newLender => this.lenders.push(lender));

    })
  }

}
