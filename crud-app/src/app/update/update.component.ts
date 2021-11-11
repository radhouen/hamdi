import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less']
})
export class UpdateComponent implements OnInit {
  showResult: boolean = false;
  eid: number;
  name: string;
  email: string;
  result: string;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  //Trigger employee search everytime email form field changes
  employeeSearch(event: string) {
    if (event) {
      this.employeeService.getEmployeeByEmail(event).subscribe((res: any) => {
        //If employee is found
        if (res.found) {
          this.eid = res.employee._id;
          this.name = res.employee.name;
          this.email = res.employee.email;
          this.showResult = false;
        } else {
          this.clearForm();
          this.showResult = false;
        }
      });
    } else {
      this.clearForm();
      this.showResult = false;
    }
  }

  onClickSubmit(data) {
    let employee: Employee = {
      _id: data.empId,
      name: data.empName,
      email: data.empEmail
    };

    this.employeeService.updateEmployee(employee).subscribe((res: any) => {
      this.result = res.message;
      this.showResult = true;
    });
  }

  clearForm(){
    this.eid = null;
      this.name = "";
      this.email = "";
  }

}
