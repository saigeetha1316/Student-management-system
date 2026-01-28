import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
private apiUrl = 'https://student-backend-api-nwqi.onrender.com/students';

  constructor(private http: HttpClient) {}

  // Get all students
  getStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add student
  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  // Delete student
  deleteStudent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // ✅ UPDATE STUDENT (THIS WAS MISSING)
  updateStudent(id: number, student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, student);
  }
}


