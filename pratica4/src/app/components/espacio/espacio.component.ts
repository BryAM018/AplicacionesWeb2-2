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
  title:string = 'Espacio';


  constructor(

    private espaciosServices:EspaciosService
  ) { 
    
  }
  ngOnInit() {
    this.espaciosServices.getAllData().subscribe(data => {
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

  
}
