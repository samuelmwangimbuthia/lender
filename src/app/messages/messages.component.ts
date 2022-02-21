import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit() {
    // let id = this.route.snapshot.paramMap.get('id')
    // console.log(id)
  }

}
