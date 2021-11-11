import { Component, OnInit } from '@angular/core';
import { Employee } from '../../employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-retrieve',
  templateUrl: './retrieve.component.html',
  styleUrls: ['./retrieve.component.less']
})
export class RetrieveComponent implements OnInit {
  showResult: boolean = false;
  searchResult: boolean = false;
  result:string;
  employees = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  //Trigger employee search everytime email form field changes
  employeeSearch(event: string) {
    if (event) {
      this.employeeService.getEmployeesByEmail(event).subscribe((res: any) => {
        //If employee is found
        if (res.found) {
          //Showcase Table
          this.searchResult = true;
          this.showResult = false;
          this.employees = res.employees;
        } else {
          this.result = "Sorry! No employees found for that search!";
          this.searchResult = false;
          this.showResult = true;
        }
      });
    } else {
      this.searchResult = false;
      this.showResult = false;
    }
  }
}
