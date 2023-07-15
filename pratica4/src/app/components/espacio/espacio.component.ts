import { Component } from '@angular/core';

import { EspaciosService } from "../../services/espacios.service";
import { IEspacio,IEspacios } from '../../interfaces/IEspacio';

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
  }
  onEdit(espacio: IEspacio) {
    
  }
}
