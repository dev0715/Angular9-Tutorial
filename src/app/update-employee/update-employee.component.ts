import { EmployeeService } from '../service/employee.service';
import { Employee } from '../model/employee';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css'],
})
export class UpdateEmployeeComponent implements OnInit {
  id: number;
  employee: Employee;
  submitted: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employee = new Employee();
    this.id = this.route.snapshot.params['id'];
    this.employeeService.getEmployee(this.id).subscribe(
      (data) => {
        console.log(data);
        this.employee = data;
      },
      (err) => console.log(err)
    );
    this.submitted = false;
  }

  updateEmployoee(): void {
    this.employeeService.updateEmployee(this.id, this.employee).subscribe(
      (data) => {
        console.log(data);
        this.employee = new Employee();
        this.submitted = true;
        this.gotoList();
      },
      (err) => console.log(err)
    );
  }

  onSubmit(): void {
    this.updateEmployoee();
  }

  gotoList(): void {
    this.router.navigate(['/employees']);
  }
}
