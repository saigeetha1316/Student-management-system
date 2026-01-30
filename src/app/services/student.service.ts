import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
private apiUrl = 'https://student-backend-api-nwqi.onrender.com/students';

  constructor(private http: HttpClient) {}

  getStudents() {
  return this.http.get<any[]>(this.apiUrl);
}

addStudent(student: any) {
  return this.http.post(this.apiUrl, student);
}

deleteStudent(id: number) {
  return this.http.delete(`${this.apiUrl}/${id}`);
}

updateStudent(id: number, student: any) {
  return this.http.put(`${this.apiUrl}/${id}`, student);
}
}
