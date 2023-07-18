import { Component } from '@angular/core';

import { EspaciosService } from "../../services/espacios.service";
import { IEspacio,IEspacios} from '../../interfaces/IEspacio';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.css']
})
export class EspacioComponent {
  dataEspacio:IEspacios = { sum:0, espacios:[] };
  editMode = false; // Variable para controlar el modo de edición
  espacioEditando: IEspacio | null = null;

  constructor(    private espaciosServices:EspaciosService, ) { 
  }
  ngOnInit() {
    this.espaciosServices.getAllData().
    subscribe(data => {
        this.dataEspacio = data;
      });
  }
  espaciosData(value: IEspacio) {
    let body:IEspacio = {
      descripcion: value.descripcion,
    }
    this.espaciosServices.postData(body)
      .subscribe(response => {
        console.log(response)
    });
  }

borrarEspacio(espacio: any,) {

    const index = this.dataEspacio.espacios.findIndex(e => e._id === espacio._id);
    
    if (index !== -1) {
      // El espacio existe en el arreglo, por lo tanto, lo eliminamos
      this.dataEspacio.espacios.splice(index, 1);
      // Llamada al método de eliminación en el servicio espaciosServices
      this.espaciosServices.deleteData(espacio._id).subscribe(response => {
        console.log(response);
      });
      
      // Actualizar la suma total y otros cálculos relacionados si es necesario
      this.ngOnInit();
    }
  }
  editarEspacio(espacio: IEspacio) {
    this.editMode = true;
    this.espacioEditando = { ...espacio }; // Clonamos el objeto para evitar modificar el original directamente
    }
  // Método para actualizar los datos del vehículo editado
actualizarEspacio(espacioActualizado: any) {

  if (this.espacioEditando && this.espacioEditando._id) {
    const index = this.dataEspacio.espacios.findIndex(e => e._id === this.espacioEditando!._id);

    if (index !== -1) {
      // Reemplazar el vehículo en el arreglo con el vehículo editado
      this.dataEspacio.espacios[index] = espacioActualizado;
      // Llamada al método de actualización en el servicio vehiculosServices
      this.espaciosServices.updateData(espacioActualizado, this.espacioEditando!._id).subscribe(response => {
        console.log(response);
      });
    }
  }
}
}
