import { Component } from '@angular/core';
import { VehiculosService } from "../../services/vehiculos.service";
import { IVehiculo,IVehiculos } from '../../interfaces/IVehiculo';

@Component({
  selector: 'app-vehiculo',
  templateUrl: './vehiculo.component.html',
  styleUrls: ['./vehiculo.component.css']
})
export class VehiculoComponent {

    dataVehiculos:IVehiculos = { sum:0, vehiculos:[] };
  
    constructor(private vehiculosServices: VehiculosService,){
  
    }
    ngOnInit() {
      this.vehiculosServices.getAllData()
        .subscribe(data => {
          this.dataVehiculos = data;
        });
    }
    vehiculosData(value: IVehiculo) {
      let body:IVehiculo = {
        descripcion: value.descripcion,
        placa:value.placa,
        color: value.color,
      }
      this.vehiculosServices.postData(body)
        .subscribe(response => {
          console.log(response)
        })
    }
  
}
