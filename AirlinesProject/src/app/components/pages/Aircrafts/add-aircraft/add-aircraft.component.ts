import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aircraft } from 'src/app/models/aircraft';
import { Company } from 'src/app/models/company';
import { AircraftService } from 'src/app/services/aircraft.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add-aircraft',
  templateUrl: './add-aircraft.component.html',
  styleUrls: ['./add-aircraft.component.scss']
})
export class AddAircraftComponent implements OnInit {

  @Input() aircraft?:Aircraft

  @Output() updatedAircraft = new EventEmitter<Aircraft>();


  ownerList:Company[] = []
  modelList:any = []

  constructor(private router:Router,private companyService:CompanyService,private aircraftService:AircraftService,private toastr:ToastrService) { }

  addAircraftForm = new FormGroup({
    ownerId: new FormControl(undefined as any, [Validators.required]),
    modelId: new FormControl(undefined as any, [Validators.required]),
    aircraftName: new FormControl('', [Validators.required]),
    yearBought: new FormControl(undefined as any,[Validators.required,Validators.pattern("^[0-9 ()+]+$"),Validators.max(2022)]),
  })

  get ownerId() { return this.addAircraftForm.get('ownerId') }
  get modelId() { return this.addAircraftForm.get('modelId') }
  get aircraftName() { return this.addAircraftForm.get('aircraftName') }
  get yearBought() { return this.addAircraftForm.get('yearBought') }
  


  ngOnInit(): void {
    this.companyService.getAll("PlaneOwners").subscribe(data=>{
      this.ownerList = data
    })
    this.getModels()
    if(this.aircraft){
      this.addAircraftForm.reset({...this.aircraft})
    }
  }

  getModels(){
    this.aircraftService.getModels().subscribe(data=>{
      this.modelList = data
    })
  }

  navigate(url:string){
    this.router.navigate([url])
  }

  add(){
    let aircraft:any = this.addAircraftForm.value
    this.aircraftService.add(aircraft).subscribe({
      next : (data)=>{
        this.toastr.success("Aircraft added successfully","Successfull")
        this.discard()
      },
      error:(e)=>{
        this.toastr.error(e.error.message,"Error")
      }
    })
  }

  update(){
    let airport:any = this.addAircraftForm.value
    this.aircraftService.update(airport,this.aircraft?.id!).subscribe({
      next : (data)=>{
        this.updatedAircraft.emit(data.updatedAircraft)
        this.toastr.success("Aircraft updated successfully","Successfull")
        this.addAircraftForm.reset({...data.updatedAircraft})
      },
      error:(e)=>{
        this.toastr.error(e.error.message,"Error")
      }
    })
  }

  discard(){
    this.addAircraftForm.reset()
  }

}
