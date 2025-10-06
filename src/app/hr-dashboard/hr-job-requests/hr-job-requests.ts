import { Component, OnInit } from '@angular/core';
import { HrService } from '../../service/hr-service';
import { PmJobRequestResponseDTO } from '../../dto/PmJobRequestResponseDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-job-requests',
  imports: [FormsModule, CommonModule],
  templateUrl: './hr-job-requests.html',
  styleUrl: './hr-job-requests.css'
})
export class HrJobRequests implements OnInit {

  countOfjobRequests: number = 0;
  countOfPostedJobs: number = 0;
  countOfPendingJobRequests: number = 0;
  selectedFilter: string = 'all';

  // ✅ IMPORTANT: Initialize as empty arrays, not undefined
  JobResponse: PmJobRequestResponseDTO[] = [];
  filteredJobRequests: PmJobRequestResponseDTO[] = [];

  loginHrId: string = 'EMP1003';
  
  constructor(private hrService: HrService) {}

  ngOnInit(): void {
    console.log('ngOnInit called with loginHrId:', this.loginHrId);
    console.log('Initial filteredJobRequests:', this.filteredJobRequests);
    
    this.getCountOfJobRequests(this.loginHrId);
    this.getCountOfPostedJobs(this.loginHrId);
    this.getCountOfPendingJobRequests(this.loginHrId);
    this.getAllJobrequestsByHrId(this.loginHrId);
  }

  getCountOfJobRequests(loginHrId: string): void {
    this.hrService.getCountOfJobRequests(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Job Requests From API', data);
        this.countOfjobRequests = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      }
    });
  }
  
  getCountOfPostedJobs(loginHrId: string): void {
    this.hrService.getCountOfPostedJobs(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Posted Jobs From API', data);
        this.countOfPostedJobs = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      }
    });
  }

  getCountOfPendingJobRequests(loginHrId: string): void {
    this.hrService.getCountOfPendingJobRequests(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Pending Job Requests From API', data);
        this.countOfPendingJobRequests = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      }
    });
  }

  getAllJobrequestsByHrId(loginHrId: string): void {
    this.hrService.getAllJobRequests(loginHrId).subscribe({
      next: (data: PmJobRequestResponseDTO[]) => {
        console.log('All Job Requests From API', data);
        // ✅ Ensure data is an array
        this.JobResponse = Array.isArray(data) ? data : [];
        this.filteredJobRequests = Array.isArray(data) ? [...data] : [];
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
        // ✅ Set to empty arrays on error
        this.JobResponse = [];
        this.filteredJobRequests = [];
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'POSTED':
        return 'status-posted';
      case 'FORWARDED_TO_HR':
        return 'status-forwarded';
      default:
        return '';
    }
  }

  statusLabelMap: { [key: string]: string } = {
    'POSTED': 'Posted',
    'FORWARDED_TO_HR': 'Pending',
  };

  getStatusLabel(status: string): string {
    return this.statusLabelMap[status] || status;
  }

  getPriorityClass(priority: string): string {
    switch (priority?.toUpperCase()) {
      case 'LOW':
        return 'priority-low';
      case 'MEDIUM':
        return 'priority-medium';
      case 'HIGH':
        return 'priority-high';
      default:
        return '';
    }
  }

  applyFilter(filter: string): void {
    this.selectedFilter = filter;

    switch (filter) {
      case 'pending':
        this.filteredJobRequests = this.JobResponse.filter(job => job.status === 'FORWARDED_TO_HR');
        break;
      case 'posted':
        this.filteredJobRequests = this.JobResponse.filter(job => job.status === 'POSTED');
        break;
      case 'all':
      default:
        this.filteredJobRequests = [...this.JobResponse];
    }
  }

  postJob(jobRequestId: number) {
    this.hrService.postJob(jobRequestId).subscribe({
      next: (data) => {
        console.log(data);
        alert(data);
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      }
    });
  }
}