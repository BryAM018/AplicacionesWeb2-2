import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
//import { Axios } from 'axios';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EspacioComponent } from './components/espacio/espacio.component';
import { VehiculoComponent } from './components/vehiculo/vehiculo.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    EspacioComponent,
    VehiculoComponent,
    ParqueoComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
