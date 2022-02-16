import { Component, OnInit } from "@angular/core";
import { OnboardLenderService } from "../onboard-lender.service";
import { StartLendingComponent } from "../start-lending/start-lending.component";

@Component({
  selector: "app-onboard-lender",
  templateUrl: "./onboard-lender.component.html",
  styleUrls: ["./onboard-lender.component.css"],
})
export class OnboardLenderComponent implements OnInit {
  constructor(private onboardLender: OnboardLenderService) {}
  lenders = [];
  ngOnInit() {}
  /*post the data gotten from the form createNewLender method */
  createNewLenderPaypalAc(newLenderData) {
    this.onboardLender
      .onboardLender(newLenderData)
      .subscribe((data) => this.lenders.push(data));
  }
/*
buttonClicked(data){
  console.log(data)
}*/
}
