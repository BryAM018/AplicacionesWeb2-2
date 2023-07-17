import { Component } from '@angular/core';

import { EspaciosService } from "../../services/espacios.service";
import { IEspacio,IEspacios, espacioEditando } from '../../interfaces/IEspacio';
import { __values } from 'tslib';

@Component({
  selector: 'app-espacio',
  templateUrl: './espacio.component.html',
  styleUrls: ['./espacio.component.css']
})
export class EspacioComponent {
  dataEspacio:IEspacios = { sum:0, espacios:[] };
  title:string = 'Espacio';
  editMode = false;
  // Variable para almacenar el espacio en edición

  constructor(

    private espaciosServices:EspaciosService
  ) { 
    
  }
  ngOnInit() {
    this.espaciosServices.getAllData()
      .subscribe(data => {
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
      })
      this.espaciosServices.updateData(value._id,value.descripcion)
      .subscribe(response => {
        console.log(response);
        // Aquí puedes manejar la respuesta del servidor después de la actualización si es necesario
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
    // Por simplicidad, aquí solo imprimiré en la consola el ID del espacio a editar
    console.log('Editar espacio:', espacio._id);
    console.log('Editar espacio:', espacio.descripcion);
  }
  
  guardarEdicion(espacio:IEspacio,espacioEditando:any) {
    // Llamada al servicio para actualizar los datos del espacio parqueadero en el servidor
    this.espaciosServices.updateData(espacio._id,espacioEditando)
      .subscribe(response => {
        console.log(response);
        // Aquí puedes manejar la respuesta del servidor después de la actualización si es necesario
        // Por ejemplo, mostrar un mensaje de éxito o redirigir al usuario a otra página
      });
    
    this.editMode = false;
    // Restablecer el espacio editando a null o a un objeto vacío, según tus necesidades
    espacioEditando = null;
  }
  

}
