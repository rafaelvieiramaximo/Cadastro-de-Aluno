import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Student } from './student';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

    ulr = "http://localhost:3000/students";

  constructor(private http : HttpClient) { }

  getStudents() : Observable<Student[]>{
    
    return this.http.get<Student[]>(this.ulr);
    
  }
}
