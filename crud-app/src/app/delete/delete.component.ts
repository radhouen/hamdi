import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.less']
})

export class DeleteComponent implements OnInit {
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
    console.log(data.empId);

    this.employeeService.deleteEmployee(data.empId).subscribe((res: any) => {
      this.result = res.message;
      this.showResult = true;
      this.clearForm();
      
    });
  }

  clearForm(){
    this.eid = null;
      this.name = "";
      this.email = "";
  }

}
