import { Component } from '@angular/core';

import { ParqueosService } from "../../services/parqueos.service";
import { IParqueo,IParqueos } from '../../interfaces/IParqueo';

@Component({
  selector: 'app-parqueo',
  templateUrl: './parqueo.component.html',
  styleUrls: ['./parqueo.component.css']
})
export class ParqueoComponent {
  dataParqueo:IParqueos = { sum:0, parqueos:[] };

  constructor(
    
    private parqueosServices: ParqueosService,
  ) { 
    
  }

  ngOnInit() {
  
    this.parqueosServices.getAllData()
      .subscribe(data => {
        this.dataParqueo = data;
      });
  }
  
parqueosData(value: IParqueo) {
  let body:IParqueo = {
    entrada: value.entrada,
    salida:value.salida,
    espacio:value.espacio,
    vehiculo:value.vehiculo,
  }
  this.parqueosServices.postData(body)
  .subscribe(response => {
    console.log(response)
  })
}   
}
