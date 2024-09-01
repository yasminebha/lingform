import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiFormService {
  private apiUrl = 'http://localhost:5000/api/generate-form';

  constructor(private http: HttpClient) {}

  generateForm(prompt: string,elementQuantities: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, { prompt , elementQuantities});
  }

}
