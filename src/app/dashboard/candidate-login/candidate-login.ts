// import { Component } from '@angular/core';
// import {  FormsModule} from '@angular/forms';
// import { Router, RouterLink, RouterOutlet } from '@angular/router';
// import { CandidateLoginRequestDto } from '../dto/CandidateLoginRequestDto';
// import { CandidateLoginService } from '../service/candidateloginservice';
// import { CandidateLoginResponseDto } from '../dto/CandidateLoginResponseDto';


// @Component({
//   selector: 'app-candidate-login',
//   standalone: true,
//   imports: [FormsModule, RouterLink,RouterOutlet], 
//   templateUrl: './candidate-login.html',
//   styleUrl: './candidate-login.css'
// })
// export class CandidateLogin {
  

//   // navigateToCandidatePage(){
//   //   this.router.navigate(['candidateDashboard'])
//   // }
   
//   loginDto:CandidateLoginRequestDto=new CandidateLoginRequestDto();
//   candidateResponseDto:CandidateLoginResponseDto=new CandidateLoginResponseDto();

//   constructor(private candidateLoginService:CandidateLoginService,private router:Router){

//   }


//   loginCandidates(){
//       console.log(this.loginDto);
//       this.candidateLoginService.candidatelogin(this.loginDto).subscribe({
//         next: (data) =>{
//           console.log(data);
//           this.candidateResponseDto=data;
//           sessionStorage.setItem("candidateId",this.candidateResponseDto.userId);
//           this.router.navigate(['candidateDashboard'])
//         },
//         error: (err)=>{
//           console.log("Exception Occured While Calling API");
//         },
//         complete: ()=>{
//           console.log("Data completed Successfully");
//         }
//     });
//     }

 
// }



// candidate-login.component.ts
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CandidateLoginRequestDto } from '../../dto/CandidateLoginRequestDto';
import { CandidateLoginService } from '../../service/candidateloginservice';
import { CandidateLoginResponseDto } from '../../dto/CandidateLoginResponseDto';

@Component({
  selector: 'app-candidate-login',
  standalone: true,
  imports: [FormsModule, RouterLink, RouterOutlet], 
  templateUrl: './candidate-login.html',
  styleUrl: './candidate-login.css'
})
export class CandidateLogin {
  
  loginDto: CandidateLoginRequestDto = new CandidateLoginRequestDto();
  candidateResponseDto: CandidateLoginResponseDto = new CandidateLoginResponseDto();
  isLoading: boolean = false; // Added loading state

  constructor(
    private candidateLoginService: CandidateLoginService, 
    private router: Router
  ) {}

  loginCandidates() {
    console.log(this.loginDto);
    this.isLoading = true; // Start loading

    this.candidateLoginService.candidatelogin(this.loginDto).subscribe({
      next: (data) => {
        console.log(data);
        this.candidateResponseDto = data;
        sessionStorage.setItem("candidateId", this.candidateResponseDto.userId);
        this.router.navigate(['candidateDashboard']);
      },
      error: (err) => {
        console.log("Exception Occurred While Calling API");
        this.isLoading = false; // Stop loading on error
      },
      complete: () => {
        console.log("Data completed Successfully");
        this.isLoading = false; // Stop loading on completion
      }
    });
  }
}


