import { Component, OnInit } from '@angular/core';
import { Aircraft } from 'src/app/models/aircraft';
import { AircraftService } from 'src/app/services/aircraft.service';

@Component({
  selector: 'app-aircrafts-page',
  templateUrl: './aircrafts-page.component.html',
  styleUrls: ['./aircrafts-page.component.scss']
})
export class AircraftsPageComponent implements OnInit {

  aircrafts:Aircraft[] = []
  displayedColumns: {value:string,name:string}[] = [
    {
      value:'aircraftName',
      name: 'Aircraft Name'
    },
    {
      value:'yearBought',
      name: 'Year Bought'
    },
    {
      value:'ownerName',
      name: 'Owner Name'
    },
    {
      value:'modelName',
      name: 'Model Name'
    }
  ];
  isLoading:boolean = true

  constructor(private aircraftService:AircraftService) { }


  ngOnInit(): void {
    this.getAircrafts()
  }

  getAircrafts(){
    this.aircraftService.getAll().subscribe(data=>{  
      this.aircrafts = data
      this.isLoading = false
    })
  }

}
