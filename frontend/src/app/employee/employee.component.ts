import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../appModels/employee.model';
import { EmployeeService } from '../appServices/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})

export class EmployeeComponent implements OnInit {
  empForm: FormGroup;
  showModal: boolean = false;
  editMode: boolean = false;
  employees: any;

  constructor(
    private fb: FormBuilder,
    private empService: EmployeeService

  ) { }

  ngOnInit(): void {
    this.getEmployees();


    this.empForm = this.fb.group({
      _id: [''],
      name: ['Emp name', Validators.required],
      position: ['Full Stack Developer', Validators.required],
      dept: ['Development']
    })
  }

  getEmployees() {
    this.empService.getEmployeeList().subscribe(res => {
      // console.log(res);
      this.employees = res
    })
  }


  onEmpSubmit() {
    if (this.empForm.valid) {

      if(this.editMode){
        this.empService.updateEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
          },
          (err) => {
            console.log(err);
          },
        )

      }
      else{
        this.empService.addEmployee(this.empForm.value).subscribe(
          (res) => {
            console.log(res);
            this.getEmployees();
          },
          (err) => {
            console.log(err);
          },
  
        )

      }

      // console.log(this.empForm.value);
      

      // this.onReset();
      this.onCloseModal();

    } else {
      let key = Object.keys(this.empForm.controls);
      key.filter(data => {
        let control = this.empForm.controls[data];
        if (control.errors != null) {
          control.markAsTouched();
        }
      })
    }
  }

  onEditEmployee(emp: any) {
    this.editMode = true;
    this.showModal = true;
    this.empForm.patchValue(emp);
  }

  onDeleteEmployee(id: any) {
    if (confirm('Do you want to delete this employee?')) {
      this.empService.deleteEmployee(id).subscribe(
        (res) => {
          console.log('Deleted Successfully');
          this.getEmployees();
        },
        (err) => {
          console.log(err);
        },

      )

    }
  }

  onAddEmployee() {
    this.showModal = true;
  }

  onCloseModal() {
    this.showModal = false;
    // this.onReset();
    this.editMode = false;
  }

  // onReset(){
  //   this.empForm.reset({
  //     name: 'Ex. Alex Johnson',
  //     position: 'Ex. Full Stack Developer',
  //     dept: 'Development'
  //   });
  // }

}
