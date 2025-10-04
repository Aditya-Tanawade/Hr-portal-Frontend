import { Component, OnInit } from '@angular/core';
import { HrService } from '../../service/hr-service';
import { PmJobRequestResponseDTO } from '../../dto/PmJobRequestResponseDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hr-job-requests',
  imports: [FormsModule,CommonModule],
  templateUrl: './hr-job-requests.html',
  styleUrl: './hr-job-requests.css'
})
export class HrJobRequests implements OnInit {

  countOfjobRequests:number=0;
  countOfPostedJobs:number=0;
  countOfPendingJobRequests:number=0;
    selectedFilter: string = 'all';

    JobResponse: PmJobRequestResponseDTO[] = []; // full list from backend
    filteredJobRequests: PmJobRequestResponseDTO[] = []; // list after applying filters

  loginHrId:string='EMP1003';
  ngOnInit(): void {
    this.getCountOfJobRequests(this.loginHrId);
    this.getCountOfPostedJobs(this.loginHrId);
    this.getAllJobrequestsByHrId(this.loginHrId);

  }

  constructor(private hrService:HrService){}

  getCountOfJobRequests(loginHrId: string) {
      this.hrService.getCountOfJobRequests(loginHrId).subscribe({
        next: (data: number) => {
          console.log('Count OF JOb Requests From API', data);
          this.countOfjobRequests=data;
        },
        error: (err) => {
          console.error("Exception occurred while calling API", err.error);
        }
      });
    }
  
  
    getCountOfPostedJobs(loginHrId: string) {
      this.hrService.getCountOfPostedJobs(loginHrId).subscribe({
        next: (data: number) => {
          console.log('Count OF Posted JObs  From API', data);
          this.countOfPostedJobs=data;
        },
        error: (err) => {
          console.error("Exception occurred while calling API", err.error);
        }
      });
    }


    getCountOfPendingJobRequests(loginHrId: string) {
      this.hrService.getCountOfPendingJobRequests(loginHrId).subscribe({
        next: (data: number) => {
          console.log('Count OF Posted JObs  From API', data);
          this.countOfPostedJobs=data;
        },
        error: (err) => {
          console.error("Exception occurred while calling API");
        }
      });
    }


    getAllJobrequestsByHrId(loginHrId: string) {
    this.hrService.getAllJobRequests(loginHrId).subscribe({
      next: (data) => {
        console.log('All JOb Request From API ', data);
        this.JobResponse = data;
        this.filteredJobRequests = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
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

  applyFilter(filter: string) {
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




  // postJob(jobRequestId: number) {
  //   this.hrService.postJob(jobRequestId).subscribe({
  //     next: (data) => {
  //       console.log(data);
  //       alert(data);
  //     },
  //     error: (err) => {
  //       console.error("Exception occurred while calling API", err);
  //     },
  //     complete: () => {
  //       console.log("Data retrieval completed successfully");
  //     }
  //   });
  // }
}
