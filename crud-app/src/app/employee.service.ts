import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURL: string = 'http://localhost:1008/v1/employee';

  constructor(private httpClient: HttpClient) { }

  public createEmployee(employee: Employee) {
    return this.httpClient.post(this.apiURL, employee);
  }

  public updateEmployee(employee: Employee) {
    return this.httpClient.put(this.apiURL, employee);
  }

  public deleteEmployee(id: number) {
    return this.httpClient.delete(this.apiURL + '/eid/' + id);
  }

  public getEmployeesByEmail(email: string) {
    return this.httpClient.get(this.apiURL + '/search/email/' + email);
  }

  public getEmployeeByEmail(email: string) {
    return this.httpClient.get(this.apiURL + '/email/' + email);
  }

}
