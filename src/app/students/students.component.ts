import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';
import { subscribeOn } from 'rxjs';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  formsGroupStudent: FormGroup;

  isEditing: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private service: StudentService) {

    this.formsGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      course: ['']
    })
  }
  ngOnInit(): void {
    this.loadStudent();
  }
  loadStudent() {
    this.service.getStudents().subscribe({
      next: data => this.students = data

    })
  }
  save() {
    if (this.isEditing) {
      this.service.update(this.formsGroupStudent.value).subscribe({
        next: () => {
          this.loadStudent();
          this.isEditing = false;
        }
      }
      )
    }
    else {
      this.service.save(this.formsGroupStudent.value).subscribe({
        next: data => this.students.push(data)
      });
      this.formsGroupStudent.reset();
    }
  }

  delete(student: Student) {
    this.service.delete(student).subscribe({
      next: () => this.loadStudent()
    })
  }

  edit(student: Student) {
    this.formsGroupStudent.setValue(student);
    this.isEditing = true;
  }
}