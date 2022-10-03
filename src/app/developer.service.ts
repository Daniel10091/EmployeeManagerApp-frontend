import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Developer } from './developer';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {
  private apiServerUrl = environment.appBaseUrl;

  constructor(private http: HttpClient) { }
  
  public getDevelopers(): Observable<Developer[]> {
    return this.http.get<Developer[]>(`${this.apiServerUrl}/developer/all`);
  }

  public addDeveloper(developer: Developer): Observable<Developer> {
    return this.http.post<Developer>(`${this.apiServerUrl}/developer/add`, developer);
  }

  public updateDeveloper(developer: Developer): Observable<Developer> {
    return this.http.put<Developer>(`${this.apiServerUrl}/developer/update`, developer);
  }

  public deleteDeveloper(developerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/developer/delete/${developerId}`);
  }
}
