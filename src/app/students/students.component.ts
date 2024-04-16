import { Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  isError :boolean = false;

  constructor(private formBuilder: FormBuilder,
    private service: StudentService) {

    this.formsGroupStudent = formBuilder.group({
      id: [''],
      name: ['', [Validators.minLength(3), Validators.required]],
      email: [''],
      course: ['', [Validators.required,]]
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
    if (this.formsGroupStudent.valid) {
      if (this.isEditing) {
        this.service.update(this.formsGroupStudent.value).subscribe({
          next: () => {
            this.loadStudent();
            this.isEditing = false;
            this.formsGroupStudent.reset();
          }
        })
      }
      else {
        this.service.save(this.formsGroupStudent.value).subscribe({
          next: data => this.students.push(data)
        });
        this.formsGroupStudent.reset();
      }
    }else{
      this.isError= true
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

  get name(): any {
    return this.formsGroupStudent.get("name");
  }
  get course(): any {
    return this.formsGroupStudent.get("course");
  }

  }
