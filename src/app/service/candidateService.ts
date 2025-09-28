import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CandidateResponseDTO } from '../dto/CandidateResponseDTO';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {
  
  baseurl: string= "http://localhost:8090/candidates/";

  constructor(private httpClient:HttpClient){
  }

  getcandidateById(candidateId : number): Observable<CandidateResponseDTO>{

      return this.httpClient.get<CandidateResponseDTO>(this.baseurl+candidateId);
    
  }
}
