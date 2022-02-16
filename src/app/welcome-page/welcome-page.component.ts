import { Component, OnInit } from '@angular/core';
import { LendersOrBorrowers } from "../ILendersOrBorrowers";
import { LenderOrBorrowersService} from "../lendersOrBorrowers.service";

@Component({
  selector: "app-welcome-page",
  templateUrl: "./welcome-page.component.html",
  styleUrls: ["./welcome-page.component.css"],
})
export class WelcomePageComponent implements OnInit {
  _featuredLenders: LendersOrBorrowers[] = [];

  constructor(private lender: LenderOrBorrowersService) {}

  ngOnInit() {
    this.lender.getLenderOrBorrower().subscribe({
      next: (lenders) => { this._featuredLenders = lenders;
      }
    });
  }

}
