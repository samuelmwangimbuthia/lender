import { Component, OnInit } from '@angular/core';
import { LenderOrBorrowersService } from '../lendersOrBorrowers.service';
import { LendersOrBorrowers } from "../ILendersOrBorrowers";

//reading the route parameters
import{ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-see-more',
  templateUrl: './see-more.component.html',
  styleUrls: ['./see-more.component.css']
})
export class SeeMoreComponent implements OnInit {
selectedLender:LendersOrBorrowers[] = [];

  constructor(private route: ActivatedRoute, private lender: LenderOrBorrowersService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    this.lender.getUser(id).subscribe(
    // (data)=>{console.log(JSON.stringify(data))},
     (data)=>{this.selectedLender = data}
    )
  }

}
