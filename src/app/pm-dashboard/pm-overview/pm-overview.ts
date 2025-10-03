import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PmService } from '../../service/pm-service';

@Component({
  selector: 'app-pm-overview',
  imports: [RouterOutlet],
  templateUrl: './pm-overview.html',
  styleUrl: './pm-overview.css'
})
export class PmOverview implements OnInit{
  countActiveprojects:number=0;
  countPendingRequests:number=0;
  countBenchEmployee:number=0;
  loginPmId:string='EMP1002';

  constructor(private pmService:PmService){}
  ngOnInit(): void {
    this.getCountOfActiveProject(this.loginPmId);
    this.getCountOfPendingRequest(this.loginPmId);
    this.getCountOfBenchEmployee();
  }

  getCountOfActiveProject(loginPmId: string) {
    this.pmService.getCountOfActiveProject(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF ACTIVE PROJECTS From API', data);
        this.countActiveprojects=data;
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
        console.log('Count OF Pending Request  From API', data);
        this.countPendingRequests=data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  getCountOfBenchEmployee() {
    this.pmService.getCountOfBenchEmployee().subscribe({
      next: (data: number) => {
        console.log('Count OF Bench EMployee From API', data);
        this.countBenchEmployee=data;
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
