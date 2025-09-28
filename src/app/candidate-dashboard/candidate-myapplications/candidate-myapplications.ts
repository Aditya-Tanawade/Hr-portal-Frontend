
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CandidateApplicationDto } from '../../dto/CandidateApplicationDto';
import { Router } from '@angular/router';

// Assume your CandidateService has a method getMyApplications()
// import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-candidate-my-applications',
  imports: [FormsModule,CommonModule],
  templateUrl: './candidate-myapplications.html',
  styleUrl: './candidate-myapplications.css'
})
export class CandidateMyapplications implements OnInit {
  applications = [
    {
      position: 'Senior Software Engineer',
      department: 'Engineering Department',
      jobType: 'Full-time',
      salary: '12-18 LPA',
      location: 'Mumbai Office',
      experience: 5,
      status: 'Interview Scheduled',
      appliedDate: '5 days ago',
      progress: 'Next: Technical interview on March 15th'
    },
    {
      position: 'Product Manager',
      department: 'Product Team',
      jobType: 'Full-time',
      salary: '15-22 LPA',
      location: 'Bangalore Office',
      experience: 3,
      status: 'Selected',
      appliedDate: '2 weeks ago',
      progress: 'Congratulations! Offer letter sent to HR'
    },
    {
      position: 'UX Designer',
      department: 'Design Team',
      jobType: 'Full-time',
      salary: '10-15 LPA',
      location: 'Remote',
      experience: 2,
      status: 'Shortlisted',
      appliedDate: '1 week ago',
      progress: 'Portfolio review completed, awaiting next round'
    },
    // Add more applications as needed
  ];

  constructor() { }

  ngOnInit(): void {
  }

  // getStatusClass(status: string): string {
  //   const statusClassMap = {
  //     'Under Review': 'status-under-review',
  //     'Interview Scheduled': 'status-interview',
  //     'Shortlisted': 'status-shortlisted',
  //     'Selected': 'status-selected',
  //     'Not Selected': 'status-not-selected'
  //   };
  //   return statusClassMap[status] || '';
  // }
}

