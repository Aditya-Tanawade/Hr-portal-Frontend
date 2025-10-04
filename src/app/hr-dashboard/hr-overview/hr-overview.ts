import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HrService } from '../../service/hr-service';

@Component({
  selector: 'app-hr-overview',
  imports: [RouterOutlet],
  templateUrl: './hr-overview.html',
  styleUrl: './hr-overview.css'
})
export class HrOverview {

    countOfjobRequests:number=0;
    countOfPostedJobs:number=0;
    countOfAppliedCandidates:number=0;
    countOfShortlistedCandidates:number=0;
    loginHrId:string='EMP1003';
  
    constructor(private hrService:HrService){}
    ngOnInit(): void {
      this.getCountOfJobRequests(this.loginHrId);
      this.getCountOfPostedJobs(this.loginHrId);
      this.getCountOfAppliedCandidates(this.loginHrId);
      this.getCountOfShortlistedCandidates(this.loginHrId)
    }
  
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
  
    getCountOfAppliedCandidates(loginHrId: string) {
      this.hrService.getCountOfAppliedCandidates(loginHrId).subscribe({
        next: (data: number) => {
          console.log('Count OF Applied Candidates From API', data);
          this.countOfAppliedCandidates=data;
        },
        error: (err) => {
          console.error("Exception occurred while calling API", err.errorr);
        }
      });
    }


    getCountOfShortlistedCandidates(loginHrId: string) {
      this.hrService.getCountOfShortlistedCandidates(loginHrId).subscribe({
        next: (data: number) => {
          console.log('Count OF ShortlistedCandidates From API', data);
          this.countOfShortlistedCandidates=data;
        },
        error: (err) => {
          console.error("Exception occurred while calling API", err.error);
        }
      });
    }
}
