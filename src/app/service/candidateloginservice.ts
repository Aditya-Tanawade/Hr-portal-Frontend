import { HttpClient } from '@angular/common/http';
import { StringToken } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CandidateLoginRequestDto } from '../dto/CandidateLoginRequestDto';
import { CandidateLoginResponseDto } from '../dto/CandidateLoginResponseDto';
import { CandidateRegistrationDto } from '../dto/CandidateRegistrationDto';

@Injectable({
  providedIn: 'root'
})
export class CandidateLoginService{
  
  baseurl: string= "http://172.16.17.129:8082/api/auth/";
  registrationBaseUrl:string="http://localhost:8090/candidates/candidate-register"

  constructor(private httpClient:HttpClient){
  }

  candidatelogin(candidateLoginRequestdto : CandidateLoginRequestDto): Observable<CandidateLoginResponseDto>{

      return this.httpClient.post<CandidateLoginResponseDto>(this.baseurl + "login/candidate",candidateLoginRequestdto);
    
  }

// getToken(): string | null {
//     return localStorage.getItem('jwt_token');
//   }

//   isLoggedIn(): boolean {
//     return !!this.getToken();
//   }

//   logout(): void {
//     localStorage.removeItem('jwt_token');
//   }


  candidateRegistartion(candidateRegistartionDTO:CandidateRegistrationDto):Observable<string>{
    return this.httpClient.post<string>(this.registrationBaseUrl ,candidateRegistartionDTO , {responseType:'text' as 'json'});
  }
 
}
