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
  editMode = false; // Variable para controlar el modo de edición
  vehiculoEditando: IVehiculo | null = null;

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

 // Método para cambiar al modo de edición y llenar el formulario con los datos del vehículo seleccionado
 editarVehiculo(vehiculo: IVehiculo) {
  this.editMode = true;
  this.vehiculoEditando = { ...vehiculo }; // Clonamos el objeto para evitar modificar el original directamente
  }


// Método para actualizar los datos del vehículo editado
actualizarVehiculo(vehiculoActualizado: any) {

  if (this.vehiculoEditando && this.vehiculoEditando._id) {
    const index = this.dataVehiculos.vehiculos.findIndex(e => e._id === this.vehiculoEditando!._id);

    if (index !== -1) {
      // Reemplazar el vehículo en el arreglo con el vehículo editado
      this.dataVehiculos.vehiculos[index] = vehiculoActualizado;
      // Llamada al método de actualización en el servicio vehiculosServices
      this.vehiculosServices.updateData(vehiculoActualizado, this.vehiculoEditando!._id).subscribe(response => {
        console.log(response);
      });
    }
  }
}
}
