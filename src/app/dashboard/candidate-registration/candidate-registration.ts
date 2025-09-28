import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CandidateRegistrationDto } from '../../dto/CandidateRegistrationDto';
import { CandidateLoginService } from '../../service/candidateloginservice';

@Component({
  selector: 'app-candidate-registration',
  imports: [FormsModule,RouterLink],
  templateUrl: './candidate-registration.html',
  styleUrl: './candidate-registration.css'
})
export class CandidateRegistration {


  candidateRegistrationDto:CandidateRegistrationDto=new CandidateRegistrationDto();
  output:string="";

  constructor(private candidateLoginService:CandidateLoginService,private router:Router){


  }


  candidateRegistartion(){
      console.log(this.candidateRegistrationDto);
      this.candidateLoginService.candidateRegistartion(this.candidateRegistrationDto).subscribe({
        next: (data) =>{
          this.output=data;
          console.log(this.output);
          this.router.navigate(['/dashboard/candidate-login'])
        },
        error: (err)=>{
          console.log("Exception Occured While Calling API");
          console.log(err.error);
        },
        complete: ()=>{
          console.log("Data completed Successfully");
        }
    });
    }

}
