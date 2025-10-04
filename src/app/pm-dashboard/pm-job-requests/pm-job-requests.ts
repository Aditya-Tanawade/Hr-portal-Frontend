import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PmService } from '../../service/pm-service';
import { PmJobRequestResponseDTO } from '../../dto/PmJobRequestResponseDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HrForwardDTO } from '../../dto/HrForwardDTO';

@Component({
  selector: 'app-pm-job-requests',
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './pm-job-requests.html',
  styleUrl: './pm-job-requests.css'
})
export class PmJobRequests implements OnInit {

  countOfAllJobRequests: number = 0;
  countOfPendingJobRequests: number = 0;
  countOfApprovedJobRequests: number = 0;
  CountOfClosedJobRequests: number = 0;
  pmJobResponse: PmJobRequestResponseDTO[] = []; // full list from backend
  filteredJobRequests: PmJobRequestResponseDTO[] = []; // list after applying filters


  selectedFilter: string = 'all';
  hrForwardDTO: HrForwardDTO = new HrForwardDTO(); // Initialize empty DTO
  showHrForm: boolean = false;
  selectedJobRequestId: number | null = null;

  hrIds:string[]=[];
  

  loginPmId: string = "EMP1002";

  constructor(private pmService: PmService, private router: Router) { }

  ngOnInit(): void {
    this.getCountOfAllJObRequests(this.loginPmId);
    this.getCountOfPendingRequest(this.loginPmId);
    this.getCountOfClosedJobRequests(this.loginPmId);
    this.getCountOfApprovedJobRequests(this.loginPmId);
    this.getAllJobrequestsByPmId(this.loginPmId);
    this.applyFilter('all'); // Default to all
    this.fetchHrIds();
  }

  getCountOfAllJObRequests(loginPmId: string) {
    this.pmService.getCountOfAllJObRequests(loginPmId).subscribe({
      next: (data: number) => {
        console.log('Count OF Total JOb Requests From API', data);
        this.countOfAllJobRequests = data;
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
        console.log('Count OF Pending Job Requests From API', data);
        this.countOfPendingJobRequests = data;
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
        console.log('Count OF Forwarded To Hr From API', data);
        this.countOfApprovedJobRequests = data;
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
        console.log('Count OF Assigned to Bench From API', data);
        this.CountOfClosedJobRequests = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  getAllJobrequestsByPmId(loginPmId: string) {
    this.pmService.getAllJobRequests(loginPmId).subscribe({
      next: (data) => {
        console.log('All JOb Request From API ', data);
        this.pmJobResponse = data;
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
      case 'SUBMITTED':
        return 'status-submitted';
      case 'FORWARDED_TO_HR':
        return 'status-forwarded';
      case 'CLOSED':
        return 'status-closed';
      case 'DECLINED':
        return 'status-declined';
      default:
        return '';
    }
  }

  statusLabelMap: { [key: string]: string } = {
    'SUBMITTED': 'Pending',
    'FORWARDED_TO_HR': 'Forwarded To HR',
    'CLOSED': 'Assigned To Bench'
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
      case 'assigned':
        this.filteredJobRequests = this.pmJobResponse.filter(job => job.status === 'CLOSED');
        break;
      case 'forwarded':
        this.filteredJobRequests = this.pmJobResponse.filter(job => job.status === 'FORWARDED_TO_HR');
        break;
      case 'pending':
        this.filteredJobRequests = this.pmJobResponse.filter(job => job.status === 'SUBMITTED');
        break;
      case 'declined':
        this.filteredJobRequests = this.pmJobResponse.filter(job => job.status === 'DECLINED');
        break;
      case 'all':
      default:
        this.filteredJobRequests = [...this.pmJobResponse];
    }
  }

  // NEW METHOD: Navigate to bench employees with jobRequestId
 navigateToBench(jobRequestId: number, projectId: number) {
  this.router.navigate(['/pm-dashboard/bench-employees'], {
    queryParams: { jobRequestId, projectId }
  });
}


 


  fetchHrIds(): void {
    this.pmService.findHrIDs().subscribe({
      next: (ids: string[]) => {
        this.hrIds = ids;
        console.log('Team Lead IDs fetched:', ids);
      },
      error: (error) => {
        console.error('Error fetching team lead IDs:', error);
        alert('Failed to fetch team lead IDs. Please try again.');
      }
    });
  }



  // forwardToHr(hrForwardDTO:HrForwardDTO,jobRequestId:number): void {
  //   this.pmService.ForwardTohr(hrForwardDTO,jobRequestId).subscribe({
  //     next: (data) => {
  //       console.log('Forwarded To Hr Id given By You ');
  //       alert(data);
  //     },
  //     error: (error) => {
  //       console.error('Error Forwarding to Hr ', error);
  //       alert(error.error);
  //     }
  //   });
  // }



  openForwardToHRForm(jobRequestId: number): void {
    this.selectedJobRequestId = jobRequestId;
    this.showHrForm = true;

    // Fetch the job request to populate the form (you can also directly pass the values if needed)
    const selectedJob = this.pmJobResponse.find(job => job.jobRequestId === jobRequestId);
    if (selectedJob) {
      this.hrForwardDTO = {
        hrId: '',  // Will be selected from dropdown
        priority: selectedJob.priority,  // Use the job request's priority
        minCtc: selectedJob.minCtc,  // Use the job request's minCtc
        maxCtc: selectedJob.maxCtc,  // Use the job request's maxCtc
      };
    }
  }

  // Close the form
  closeForwardToHRForm(): void {
    this.showHrForm = false;
  }

  // Handle form submission
  onSubmitForwardToHR(): void {
    if (this.hrForwardDTO.hrId) {
      const jobRequestId = this.selectedJobRequestId;
      if (jobRequestId) {
        this.forwardToHr(this.hrForwardDTO, jobRequestId);
        this.closeForwardToHRForm();  // Close form after submitting
      }
    } else {
      alert('Please select an HR ID.');
    }
  }

  // Forward the form data to HR API
  forwardToHr(hrForwardDTO: HrForwardDTO, jobRequestId: number): void {
    this.pmService.ForwardTohr(hrForwardDTO, jobRequestId).subscribe({
      next: (data) => {
        console.log('Successfully forwarded to HR:', data);
        alert('Job request forwarded to HR.');
      },
      error: (error) => {
        console.error('Error forwarding to HR:', error);
        alert('Error forwarding to HR: ' + error.error);
      }
    });
  }


declineJobRequest(jobRequestId: number): void {
  this.pmService.declineJoBRequest(jobRequestId).subscribe({
    next: (data: string) => {
      console.log('Job Request Declined Successfully with id:', jobRequestId);
      alert(data); // shows "Job request with id successfully declined"
    },
    error: (error) => {
      console.error('Error Declined The Request:', error);
      alert('Error Declined The Request');
    }
  });
}
}


  
