import { Component, OnInit } from '@angular/core';
import { Playlist } from '../playlist';
import { PlaylistService } from '../playlist.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {
  playList:Playlist[]=[];
  errorMessage
  constructor(private playListService:PlaylistService) { }
  ngOnInit() {
    this.playListService.getPlaylist().subscribe({
      next: playList =>{ this.playList= playList;
        console.log(playList)
      },
      error: err => this.errorMessage = err
    });
  }

}
