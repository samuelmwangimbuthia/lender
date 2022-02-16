import { Component, OnInit } from "@angular/core";
import { LendersOrBorrowers } from "../ILendersOrBorrowers";
import { LenderOrBorrowersService} from "../lendersOrBorrowers.service";

@Component({
  selector: "app-market-place",
  templateUrl: "./market-place.component.html",
  styleUrls: ["./market-place.component.css"],
})
export class MarketPlaceComponent implements OnInit {
  _lenders: LendersOrBorrowers[] = [];

  errorMessage;
  constructor(private lender: LenderOrBorrowersService) {}

  ngOnInit() {
    this.lender.getLenderOrBorrower().subscribe({
      next: (lenders) => { this._lenders = lenders;
      }
    });
  }
}
