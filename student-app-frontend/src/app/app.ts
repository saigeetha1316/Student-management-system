import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, // REQUIRED for *ngIf, *ngFor, async pipe
    FormsModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  // Students list
  students$!: Observable<any[]>;

  // Modal controls
  showAddForm = false;
  showEditForm = false;

  // Add student model
  newStudent = {
    name: '',
    email: '',
    course: ''
  };

  // Edit student model
  editStudentData: any = {
    id: null,
    name: '',
    email: '',
    course: ''
  };

  constructor(private studentService: StudentService) {
    this.loadStudents();
  }

  // Load students
  loadStudents() {
    this.students$ = this.studentService.getStudents();
  }

  // Open add form
  openAddForm() {
    this.showAddForm = true;
  }

  // Close add form
  closeAddForm() {
    this.showAddForm = false;
    this.newStudent = { name: '', email: '', course: '' };
  }

  // Add student
  addStudent() {
    if (!this.newStudent.name || !this.newStudent.email || !this.newStudent.course) {
      alert('Please fill all fields');
      return;
    }

    this.studentService.addStudent(this.newStudent).subscribe(() => {
      this.loadStudents();
      this.closeAddForm();
    });
  }

  // Delete student
  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();
      });
    }
  }

  // Open edit form
  openEditForm(student: any) {
    this.editStudentData = { ...student };
    this.showEditForm = true;
  }

  // Close edit form
  closeEditForm() {
    this.showEditForm = false;
    this.editStudentData = { id: null, name: '', email: '', course: '' };
  }

  // Update student
  updateStudent() {
    this.studentService
      .updateStudent(this.editStudentData.id, this.editStudentData)
      .subscribe(() => {
        this.loadStudents();
        this.closeEditForm();
      });
  }
}
