import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { StudentService } from './services/student.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent implements OnInit {
  // ✅ ASYNC STUDENTS STREAM
  students$!: Observable<any[]>;

  // ✅ SUCCESS MESSAGE
  successMessage = '';

  // ✅ MODAL CONTROLS
  showAddForm = false;
  showEditForm = false;

  // ✅ ADD STUDENT MODEL
  newStudent = {
    name: '',
    email: '',
    course: '',
  };

  // ✅ EDIT STUDENT MODEL
  editStudentData: any = {
    id: null,
    name: '',
    email: '',
    course: '',
  };

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  // LOAD STUDENTS (ASYNC)
  loadStudents() {
    this.students$ = this.studentService.getStudents();
  }

  // OPEN ADD FORM
  openAddForm() {
    this.showAddForm = true;
  }

  // CLOSE ADD FORM
  closeAddForm() {
    this.showAddForm = false;
    this.newStudent = { name: '', email: '', course: '' };
  }

  // ADD STUDENT
  addStudent() {
    if (!this.newStudent.name || !this.newStudent.email || !this.newStudent.course) {
      alert('Please fill all fields');
      return;
    }

  this.studentService.addStudent(this.newStudent).subscribe(() => {
    this.closeAddForm();              // 1️⃣ close modal first
    this.loadStudents();              // 2️⃣ refresh data
    this.showSuccess('Student added successfully ✅'); // 3️⃣ message
  });
 }

  // DELETE STUDENT
  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id).subscribe(() => {
        this.loadStudents();     // 🔁 reload observable
        this.showSuccess('Student deleted successfully 🗑️');
      });
    }
  }

  // OPEN EDIT FORM
  openEditForm(student: any) {
    this.editStudentData = { ...student };
    this.showEditForm = true;
  }

  // CLOSE EDIT FORM
  closeEditForm() {
    this.showEditForm = false;
    this.editStudentData = { id: null, name: '', email: '', course: '' };
  }

  // UPDATE STUDENT
  updateStudent() {
  this.studentService
    .updateStudent(this.editStudentData.id, this.editStudentData)
    .subscribe(() => {
      this.closeEditForm();            // 1️⃣ close modal first
      this.loadStudents();             // 2️⃣ refresh data
      this.showSuccess('Student updated successfully ✅'); // 3️⃣ message
    });
}

  // SUCCESS MESSAGE HANDLER
  showSuccess(message: string) {
    this.successMessage = message;

    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
