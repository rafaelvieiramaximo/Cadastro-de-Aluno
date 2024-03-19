import { Component } from '@angular/core';
import { Student } from '../student';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  students: Student[] = [];

  formsGroupStudent: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formsGroupStudent = formBuilder.group({
      id: [''],
      name: [''],
      email: [''],
      course: ['']
    })
  }

  save() {
    this.students.push(this.formsGroupStudent.value);
  }
}
