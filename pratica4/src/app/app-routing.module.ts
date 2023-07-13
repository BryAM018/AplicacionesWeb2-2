import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspacioComponent } from './components/espacio/espacio.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';

const routes: Routes = [
 {path:'espacio',
component:EspacioComponent},{
  path:'vehiculo',
  component:VehiculoComponent
},
{path:'parqueo',
component:ParqueoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
