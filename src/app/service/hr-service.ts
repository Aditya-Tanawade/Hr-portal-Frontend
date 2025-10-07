import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PmJobRequestResponseDTO } from '../dto/PmJobRequestResponseDTO';
import { AppliedCandidateDTO } from '../dto/AppliedCandidateDTO';
import { CandidateFilterRequestDTO } from '../dto/CandidateFilterRequestDTO';
import { ShortlistedCandidatesDTO } from '../dto/ShortlistedCandidatesDTO';

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
    return this.httpClient.get<number>(this.baseurl+"job-request-ui/pending-job-requests/"+loginHrId);
  }
  

  getAllJobRequests(loginHrId: string): Observable<PmJobRequestResponseDTO[]> {
      return this.httpClient.get<PmJobRequestResponseDTO[]>(this.baseurl+"get-all/job-requests/"+loginHrId);
    }

    postJob(jobRequestId:number):Observable<string>{
      return this.httpClient.patch<string>(this.baseurl+"post/"+jobRequestId,{},{ responseType:'text' as 'json'  });
    }



    getAllCandidates(loginHrId: string): Observable<AppliedCandidateDTO[]> {
      return this.httpClient.get<AppliedCandidateDTO[]>(this.baseurl+"filter-candidates/search/"+loginHrId);
    }

    filterCandidates(loginHrId:string,candidateFilterRequestDTO:CandidateFilterRequestDTO):Observable<AppliedCandidateDTO[]>{
      return this.httpClient.post<AppliedCandidateDTO[]>(this.baseurl+"filter-candidates/search/"+loginHrId,candidateFilterRequestDTO);
    }


   changeStatusOfCandidateToShortListed(applicationId: number, status: string): Observable<string> {
  const params = new HttpParams().set('status', status); 

  return this.httpClient.patch<string>(
    `${this.baseurl}candidates/change-status/${applicationId}`, 
    {},
    { params, responseType: 'text' as 'json' } 
  );
}



  getCountOfAssignedInterview(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/assigned-interview/"+loginHrId);
  }


  getCountOfSelectedCandidates(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/selected/"+loginHrId);
  }


  getCountOfRejectedCandidates(loginHrId:string):Observable<number>{
    return this.httpClient.get<number>(this.baseurl+"count/rejected/"+loginHrId);
  }

     

   getAllShortlistedCandidates(loginHrId: string): Observable<ShortlistedCandidatesDTO[]> {
      return this.httpClient.get<ShortlistedCandidatesDTO[]>(this.baseurl+"getshortlisted/"+loginHrId);
    }


  

}
