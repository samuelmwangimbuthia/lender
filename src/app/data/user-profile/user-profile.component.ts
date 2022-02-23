import { Component, OnInit } from '@angular/core';
import { LenderOrBorrowersService } from 'src/app/lendersOrBorrowers.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
offers
  constructor(private offer: LenderOrBorrowersService) { }

  ngOnInit() {
    this.offer.getOffers().subscribe({
      next: (offers) => {
        this.offers = offers;
      }
    });
  }

}
