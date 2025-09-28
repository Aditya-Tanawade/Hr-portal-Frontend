
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { CandidateService } from '../../service/candidateService';
import { CandidateProfileDto } from '../../dto/CandidateProfileDto';




@Component({
  selector: 'app-candidate-edit-profile',
  imports: [FormsModule],
  templateUrl: './candidate-edit-profile.html',
  styleUrls: ['./candidate-edit-profile.css']
})
export class CandidateEditProfile implements OnInit {
//export class CandidateEditProfile  {
public candidate: CandidateProfileDto | null = null;
  public isLoading = true;
  private candidateId = 1; // Hardcoded

  constructor(private candidateService: CandidateService) {}

  ngOnInit(): void {
    this.candidateService.getcandidateById(this.candidateId).subscribe(data => {
      this.candidate = data;
      this.isLoading = false;
    });
    
   // Mock data for UI development
    // this.candidate = {
    //   candidateId: 1, email: 'john.doe@email.com', fullName: 'John Doe',
    //   gender: 'MALE', expectedCtc: 25, resumePath: 'path/to/resume.pdf',
    //   totalExperience: 5, noticePeriod: 30, currentCompany: 'Tech Corp',
    //   skills: 'Angular, TypeScript, Java, Spring Boot', status: 'AVAILABLE',
    //   createdAt: '2024-01-01', updatedAt: '2025-09-23'
    // };
    // this.isLoading = false;

  }

  saveProfile(): void {
    // if (this.candidate) {
    //   alert('Saving profile... (API call would be made here)');
    //   this.candidateService.updateCandidate(this.candidateId, this.candidate)
    //     .subscribe(updatedProfile => {
    //       this.candidate = updatedProfile;
    //       alert('Profile saved successfully!');
    //     });
    // }
  }

}


