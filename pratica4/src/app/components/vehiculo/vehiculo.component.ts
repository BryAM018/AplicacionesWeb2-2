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
    borrarVehiculo(vehiculo: any,) {

      const index = this.dataVehiculos.vehiculos.findIndex(e => e._id === vehiculo._id);
      
      if (index !== -1) {
        // El espacio existe en el arreglo, por lo tanto, lo eliminamos
        this.dataVehiculos.vehiculos.splice(index, 1);
        // Llamada al método de eliminación en el servicio espaciosServices
        this.vehiculosServices.deleteData(vehiculo._id).subscribe(response => {
          console.log(response);
        });
        
        // Actualizar la suma total y otros cálculos relacionados si es necesario
        this.ngOnInit();
      }
    }
}
