import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];

  formsGroupStudent: FormGroup;

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
  loadStudent(){
    this.service.getStudents().subscribe({
      next: data => this.students =data

    })
  }
  save() {
    this.students.push(this.formsGroupStudent.value);
  }
}
