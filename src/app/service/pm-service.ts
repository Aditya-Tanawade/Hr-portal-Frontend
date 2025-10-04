import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequestDTO } from '../dto/ProjectRequestDTO';
import { ProjectResponseDTO } from '../dto/ProjectResponseDTO';
import { BenchEmployeeDTO } from '../dto/BenchEmployeeDTO';
import { EmployeeResponseDTO } from '../dto/EmployeeResponseDTO';
import { PmJobRequestResponseDTO } from '../dto/PmJobRequestResponseDTO';
import { HrForwardDTO } from '../dto/HrForwardDTO';

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


  getAllJobRequests(loginPmId: string): Observable<PmJobRequestResponseDTO[]> {
    return this.httpClient.get<PmJobRequestResponseDTO[]>(this.baseurl+"job-requests/"+loginPmId);
  }

  //Bench EMployee
  getAllEmployeesOnBench():Observable<BenchEmployeeDTO[]>{
    return this.httpClient.get<BenchEmployeeDTO[]>(this.baseurl+"bench");
  }



  assignProjectToBenchEmployee(jobRequestId: number, projectId: number, employeeId: string): Observable<string> {
  const url = `${this.baseurl}${jobRequestId}/assign-project`;

  const params = new HttpParams()
    .set('projectId', projectId)
    .set('employeeId', employeeId);
  return this.httpClient.patch<string>(url, null, { params, responseType: 'text' as 'json' });
}



  getAllTeamMembers(projectId:number):Observable<EmployeeResponseDTO[]>{
        return this.httpClient.get<BenchEmployeeDTO[]>(this.baseurl+"get-all-team-members/" +projectId );
  }


  findHrIDs(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.baseurl + "get/hr");
  }


  ForwardTohr(hrForwardDto:HrForwardDTO,jobRequestId:number):Observable<string>{
    return this.httpClient.patch<string>(this.baseurl+"forward-hr/"+jobRequestId,hrForwardDto,{responseType: 'text' as 'json'});
  }



  // declineJoBRequest(jobRequestId:number):Observable<string>{
  //   return this.httpClient.patch<string>(this.baseurl+"decline/job-request/"+jobRequestId,{responseType: 'text' as 'json'});
  // }


  declineJoBRequest(jobRequestId: number): Observable<string> {
  return this.httpClient.patch(
    this.baseurl + "decline/job-request/" + jobRequestId,
    {}, // required body
    { responseType: 'text' } // ✅ plain text response
  );
}


}
