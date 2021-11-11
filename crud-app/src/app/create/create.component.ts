import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.less']
})
export class CreateComponent implements OnInit {
  showResult: boolean = false;
  result:string;
  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  onClickSubmit(data) {
    let employee: Employee = {
      _id: data.empId,
      name: data.empName,
      email: data.empEmail
    };

    this.employeeService.createEmployee(employee).subscribe((res:any) => {
      this.result = res.message;
      this.showResult = true;
      console.log(res);
    });
  }

}
