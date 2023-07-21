import { Component } from '@angular/core';
import { ParqueosService } from "../../services/parqueos.service";
import { IParqueo,IParqueos } from '../../interfaces/IParqueo';
import { IEspacio,IEspacios } from "../../interfaces/IEspacio";
import { IVehiculo,IVehiculos } from 'src/app/interfaces/IVehiculo';
import { EspaciosService } from 'src/app/services/espacios.service';
import { VehiculosService } from "src/app/services/vehiculos.service";


@Component({
  selector: 'app-parqueo',
  templateUrl: './parqueo.component.html',
  styleUrls: ['./parqueo.component.css']
})
export class ParqueoComponent {
  dataParqueo:IParqueos = { sum:0, parqueos:[] };
  dataEspacio:IEspacios= { sum:0, espacios:[] };
  dataVehiculo:IVehiculos= { sum:0, vehiculos:[] };
  editMode = false; // Variable para controlar el modo de edición
  parqueoEditando: IParqueo | null = null;
  constructor(
    
    private parqueosServices: ParqueosService,
    private espaciosServices:EspaciosService,
    private vehiculoServices:VehiculosService,
    
  ) { 
    
  }

  ngOnInit() {
  this.parqueosServices.getAllData()
    .subscribe(data => {
      this.dataParqueo = data;
    });
  this.espaciosServices.getAllData()
    .subscribe(data => {
      this.dataEspacio = data;
    });
    this.vehiculoServices.getAllData()
      .subscribe(data => {
        this.dataVehiculo = data;
      });
  }
   // Método para cargar todos los parqueos
   loadAllData() {
    this.parqueosServices.getAllData().subscribe(data => {
      this.dataParqueo = data;
    });
  }

  // Método para cargar los parqueos activos (no eliminados)
  loadActiveData() {
    this.parqueosServices.getActiveData().subscribe(data => {
      this.dataParqueo = data;
    });
  }

  // Método para cargar los parqueos inactivos (eliminados)
  loadInactiveData() {
    this.parqueosServices.getInactiveData().subscribe(data => {
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

borrarVehiculo(parqueo: any,) {

  const index = this.dataParqueo.parqueos.findIndex(e => e._id === parqueo._id);
  
  if (index !== -1) {
    // El espacio existe en el arreglo, por lo tanto, lo eliminamos
    this.dataParqueo.parqueos.splice(index, 1);
    // Llamada al método de eliminación en el servicio 
    this.parqueosServices.deleteData(parqueo._id).subscribe(response => {
      console.log(response);
    });
    
    // Actualizar la suma total y otros cálculos relacionados si es necesario
    this.ngOnInit();
  }
} 

 // Método para cambiar al modo de edición y llenar el formulario con los datos del vehículo seleccionado
 editarParqueo(parqueo: IParqueo) {
  this.editMode = true;
  this.parqueoEditando = { ...parqueo }; // Clonamos el objeto para evitar modificar el original directamente
  }


actualizarParqueo(parqueoActualizado: any) {

  if (this.parqueoEditando && this.parqueoEditando._id) {
    const index = this.dataParqueo.parqueos.findIndex(e => e._id === this.parqueoEditando!._id);

    if (index !== -1) {
      // Reemplazar el vehículo en el arreglo con el vehículo editado
      this.dataParqueo.parqueos[index] = parqueoActualizado;
      // Llamada al método de actualización en el servicio vehiculosServices
      this.parqueosServices.updateData(parqueoActualizado, this.parqueoEditando!._id).subscribe(response => {
        console.log(response);
      });
    }
  }
}
}
