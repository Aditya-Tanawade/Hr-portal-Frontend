import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PmJobRequestResponseDTO } from '../dto/PmJobRequestResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class HrService {

  baseurl: string = "http://localhost:8081/api/hr/";
  fullNameUrl:string="http://localhost:8081/employee/fullname/"

  constructor(private httpClient: HttpClient) { }

  getFullName(loginHrId: string): Observable<string> {
      return this.httpClient.get<string>(this.fullNameUrl+loginHrId,{responseType: 'text' as 'json'});
    }


  getCountOfJobRequests(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"dashboard/job-requests/"+loginHrId);
  }

 getCountOfPostedJobs(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"dashboard/posted-jobs/"+loginHrId);
  }

  getCountOfAppliedCandidates(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"dashboard/applied-candidates/"+loginHrId);
  }

  getCountOfShortlistedCandidates(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"dashboard/shortlisted-candidates/"+loginHrId);
  }

  getCountOfPendingJobRequests(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"dashboard/job-requests/"+loginHrId);
  }
  

  getAllJobRequests(loginHrId: string): Observable<PmJobRequestResponseDTO[]> {
      return this.httpClient.get<PmJobRequestResponseDTO[]>(this.baseurl+"job-request-ui/pending-job-requests/"+loginHrId);
    }

    postJob(jobRequestId:number):Observable<string>{
      return this.httpClient.patch<string>(this.baseurl+"post/"+jobRequestId,{responseType: 'text' });
    }

  

}
