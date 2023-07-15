import { Component } from '@angular/core';
import { ParqueosService } from "../../services/parqueos.service";
import { IParqueo,IParqueos } from '../../interfaces/IParqueo';
import { IEspacio,IEspacios } from "../../interfaces/IEspacio";
import { IVehiculo,IVehiculos } from 'src/app/interfaces/IVehiculo';
import { EspaciosService } from 'src/app/services/espacios.service';


@Component({
  selector: 'app-parqueo',
  templateUrl: './parqueo.component.html',
  styleUrls: ['./parqueo.component.css']
})
export class ParqueoComponent {
  dataParqueo:IParqueos = { sum:0, parqueos:[] };
  dataEspacio:IEspacios[] = [];
  dataVehiculo:IVehiculos[] = [];

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
