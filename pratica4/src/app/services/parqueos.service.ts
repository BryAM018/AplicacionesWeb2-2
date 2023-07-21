import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IParqueo, IParqueos } from '../interfaces/IParqueo';

@Injectable({
  providedIn: 'root'
})
export class ParqueosService {
  private baseURL = `http://localhost:2500/v1/inventory`
  
  constructor(private http: HttpClient) {  }
  

  getAllData(): Observable<IParqueos> {
    return this.http.get<IParqueos>(`${this.baseURL}/parqueos`)
  }
  postData(data: any): Observable<IParqueo> {
    return this.http.post<IParqueo>(`${this.baseURL}/parqueos`, data)
  }
  updateData(data: any, id: string): Observable<IParqueo> {
    return this.http.put<IParqueo>(`${this.baseURL}/parqueos/${id}`, data)
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/parqueos/${id}`)
}
 // Método para obtener los parqueos activos (no eliminados)
 getActiveData(): Observable<any> {
  return this.http.get<any>(`${this.baseURL}/parqueos?isActive=true`);
}

// Método para obtener los parqueos inactivos (eliminados)
getInactiveData(): Observable<any> {
  return this.http.get<any>(`${this.baseURL}/parqueos?isActive=false`);
}

}