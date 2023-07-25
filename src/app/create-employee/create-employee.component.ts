import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css'],
})
export class CreateEmployeeComponent implements OnInit {
  employee: Employee;
  submitted: boolean;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.submitted = false;
    this.employee = new Employee();
  }

  onSubmit(): void {
    this.employeeService.createEmployee(this.employee).subscribe(
      (data) => {
        console.log(data);
        this.employee = new Employee();
        this.gotoList();
      },
      (err) => console.log(err)
    );
  }

  gotoList(): void {
    this.router.navigate(['/employees']);
  }
}
