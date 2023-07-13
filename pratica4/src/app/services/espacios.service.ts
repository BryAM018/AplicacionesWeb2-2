import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IEspacio, IEspacios } from '../interfaces/IEspacio';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {
  private baseURL = `http://localhost:3000/v1/inventory`

  constructor(private http: HttpClient) { }


  getAllData(): Observable<IEspacios> {
    return this.http.get<IEspacios>(`${this.baseURL}/espacios`)
  }
  postData(data: any): Observable<IEspacio> {
    return this.http.post<IEspacio>(`${this.baseURL}/espacios`, data)
  }
  updateData(data: any, id: string): Observable<IEspacio> {
    return this.http.put<IEspacio>(`${this.baseURL}/espacios/${id}`, data)
  }
  deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/espacios/${id}`)
}


}