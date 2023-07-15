import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IVehiculo, IVehiculos } from '../interfaces/IVehiculo';


@Injectable({
  providedIn: 'root'
})
export class VehiculosService {
  private baseURL = `http://localhost:2500/v1/inventory/api`

  constructor(private http: HttpClient) { }


  getAllData(): Observable<IVehiculos> {
    return this.http.get<IVehiculos>(`${this.baseURL}/vehiculos`)
  }
  postData(data: any): Observable<IVehiculo> {
    return this.http.post<IVehiculo>(`${this.baseURL}/vehiculos`, data)
  }
  updateData(data: any, id: string): Observable<IVehiculo> {
    return this.http.put<IVehiculo>(`${this.baseURL}/vehiculos/${id}`, data)
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/vehiculos/${id}`)
}


}