import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Needed for directives like *ngFor, *ngIf
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { CandidateResponseDTO } from '../dto/CandidateResponseDTO';
import { CandidateService } from '../service/candidateService';
import { FormsModule } from '@angular/forms';
// Assuming path

@Component({
  selector: 'app-candidate-dashboard',
  standalone: true,
  imports: [CommonModule,FormsModule, RouterLink, RouterOutlet,RouterModule], // Import CommonModule for standalone components
  templateUrl: './candidate-dashboard.html',
  styleUrls: ['./candidate-dashboard.css']
})
export class CandidateDashboard implements OnInit {
  candidateProfile: any; // Define a more specific type later if needed
  stringCandidateId: string = "";
  intCandidateId: number = 0;
  recentApplications: any[] = [];
  candidate: CandidateResponseDTO = new CandidateResponseDTO();

  constructor(private router: Router, private candidateService: CandidateService) { }


  ngOnInit(): void {
    const candidateId = sessionStorage.getItem('candidateId');
    if (candidateId != null) {
      this.intCandidateId = parseInt(candidateId);
      console.log("This is Login Candidate Id" + this.candidateProfile);
      this.getCandidateById();
    }

  }


   navigateToHome() {
    this.router.navigate(['myApplication']);
  }
 

  


  getCandidateById() {
    this.candidateService.getcandidateById(this.intCandidateId).subscribe({
      next: (data) => {
        console.log(data);
        this.candidate = data;
        console.log(this.candidate);
        console.log(this.candidate.phoneNumber);
        
      },
      error: (err) => {
        console.log("Exception Occured While Calling API");
      },
      complete: () => {
        console.log("Data completed Successfully");
      }
    });
  }


}




