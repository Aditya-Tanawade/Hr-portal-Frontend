import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequestDTO } from '../dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../dto/ProjectResponseDTO';
import { BenchEmployeeDTO } from '../dto/BenchEmployeeDTO';
import { EmployeeResponseDTO } from '../dto/EmployeeResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class PmService {

  baseurl: string = "http://localhost:8081/pm/view/";
  fullNameUrl:string="http://localhost:8081/employee/fullname/"

  constructor(private httpClient: HttpClient) { }


  getFullName(loginPmId: string): Observable<string> {
    return this.httpClient.get<string>(this.fullNameUrl+loginPmId,{responseType: 'text' as 'json'});
  }


  getCountOfActiveProject(loginPmId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/active-projects/"+loginPmId);
  }

  getCountOfPendingRequest(loginPmId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/pending-request/"+loginPmId);
  }

  getCountOfBenchEmployee():Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/bench-employee");
  }
  

  findTeamLeadIDs(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseurl + "get/teamlead");
  }

  assignProject(projectRequestDto: ProjectRequestDTO, loginPmId: string): Observable<ProjectResponseDTO> {
    const params = new HttpParams().set('loginPmId', loginPmId);

    return this.httpClient.post<ProjectResponseDTO>(
      this.baseurl + "add",
      projectRequestDto,
      { params: params }
    );
  }

  getAssignedProjects(loginPmId: string): Observable<ProjectResponseDTO> {
    const params = new HttpParams().set('loginPmId', loginPmId);

    // Changed to GET request as per your backend
    return this.httpClient.get<ProjectResponseDTO>(
      this.baseurl + "assigned-project",
      { params: params }
    );
  }


// job requests
  getCountOfAllJObRequests(loginPmId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/job-request/all/"+loginPmId);
  }

   getCountOfApprovedJobRequests(loginPmId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/job-request/approved/"+loginPmId);
  }

    getCountOfClosedJobRequests(loginPmId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/job-request/declined/"+loginPmId);
  }



  //Bench EMployee
  getAllEmployeesOnBench():Observable<BenchEmployeeDTO[]>{
    return this.httpClient.get<BenchEmployeeDTO[]>(this.baseurl+"bench");
  }


  getAllTeamMembers(projectId:number):Observable<EmployeeResponseDTO[]>{
        return this.httpClient.get<BenchEmployeeDTO[]>(this.baseurl+"get-all-team-members/" +projectId );
  }
}
