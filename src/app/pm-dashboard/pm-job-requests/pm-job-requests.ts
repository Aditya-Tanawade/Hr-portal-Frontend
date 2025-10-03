import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PmService } from '../../service/pm-service';

@Component({
  selector: 'app-pm-job-requests',
  imports: [RouterLink],
  templateUrl: './pm-job-requests.html',
  styleUrl: './pm-job-requests.css'
})
export class PmJobRequests implements OnInit{

  countOfAllJobRequests:number=0;
  countOfPendingJobRequests:number=0;
  countOfApprovedJobRequests:number=0;
  CountOfClosedJobRequests:number=0;
  loginPmId:string="EMP1002";

  ngOnInit(): void {
    this.getCountOfAllJObRequests(this.loginPmId);
    this.getCountOfPendingRequest(this.loginPmId);
    this.getCountOfClosedJobRequests(this.loginPmId);
    this.getCountOfApprovedJobRequests(this.loginPmId);
  }


  constructor(private pmService:PmService){}

    getCountOfAllJObRequests(loginPmId: string) {
    this.pmService.getCountOfAllJObRequests(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF ACTIVE PROJECTS From API', data);
        this.countOfAllJobRequests=data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }



   getCountOfPendingRequest(loginPmId: string) {
    this.pmService.getCountOfPendingRequest(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF ACTIVE PROJECTS From API', data);
        this.countOfPendingJobRequests=data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }



   getCountOfApprovedJobRequests(loginPmId: string) {
    this.pmService.getCountOfApprovedJobRequests(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF ACTIVE PROJECTS From API', data);
        this.countOfApprovedJobRequests=data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }




   getCountOfClosedJobRequests(loginPmId: string) {
    this.pmService.getCountOfClosedJobRequests(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF ACTIVE PROJECTS From API', data);
        this.CountOfClosedJobRequests=data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }


}
