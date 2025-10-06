import { Component, OnInit } from '@angular/core';
import { HrService } from '../../service/hr-service';
import { ShortlistedCandidatesDTO } from '../../dto/ShortlistedCandidatesDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shortlisted-candidates',
  imports: [FormsModule,CommonModule],
  templateUrl: './shortlisted-candidates.html',
  styleUrl: './shortlisted-candidates.css'
})
export class ShortlistedCandidates implements OnInit{

  countTotalShortlisted: number = 0;
  countAssiignedInterviews: number = 0;
  countSelectedCandidates: number = 0;
  countRejectedCandidates: number = 0;
  shortlistedCandidates: ShortlistedCandidatesDTO[] = [];
  filterShortlistedCandidates: ShortlistedCandidatesDTO[] = [];

  loginHrId: string = "EMP1003";
  selectedFilter: string = 'all';

  constructor(private hrService: HrService) { }

  ngOnInit(): void {
    this.getCountOfShortlistedCandidates(this.loginHrId);
    this.getCountOfAssignedInterview(this.loginHrId);
    this.getCountOfSelectedCandidates(this.loginHrId);
    this.getCountOfRejectedCandidates(this.loginHrId);
    this.getAllShortlistedCandidates(this.loginHrId);
  }

  getCountOfShortlistedCandidates(loginHrId: string) {
    this.hrService.getCountOfShortlistedCandidates(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF ShortlistedCandidates From API', data);
        this.countTotalShortlisted = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err.error);
      }
    });
  }

  getCountOfAssignedInterview(loginHrId: string) {
    this.hrService.getCountOfAssignedInterview(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Assigned Interviews From API', data);
        this.countAssiignedInterviews = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err.error);
      }
    });
  }

  getCountOfSelectedCandidates(loginHrId: string) {
    this.hrService.getCountOfSelectedCandidates(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Selected Candidates From API', data);
        this.countSelectedCandidates = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err.error);
      }
    });
  }

  getCountOfRejectedCandidates(loginHrId: string) {
    this.hrService.getCountOfRejectedCandidates(loginHrId).subscribe({
      next: (data: number) => {
        console.log('Count OF Rejected Candidates From API', data);
        this.countRejectedCandidates = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err.error);
      }
    });
  }

  getAllShortlistedCandidates(loginHrId: string) {
    this.hrService.getAllShortlistedCandidates(loginHrId).subscribe({
      next: (data) => {
        console.log('All Candidates From API ', data);
        this.shortlistedCandidates = data;
        this.filterShortlistedCandidates = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  getInitials(fullName: string): string {
    if (!fullName) return '??';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }

  getSkillsArray(skills: string): string[] {
    if (!skills) return [];
    return skills.split(',').map(skill => skill.trim()).slice(0, 4);
  }

  statusLabelMap: { [key: string]: string } = {
    'PENDING': 'Shortlisted',
    'INTERVIEW1_CLEARED': 'Round 1 Cleared',
    'INTERVIEW2_CLEARED': 'Round 2 Cleared',
    'HR_CLEARED': 'HR Round Cleared',
    'INTERVIEW1_REJECTED': 'Round 1 Rejected',
    'INTERVIEW2_REJECTED': 'Round 2 Rejected',
    'HR_REJECTED': 'HR Round Rejected'
  };

  getStatusLabel(interviewStatus: string): string {
    return this.statusLabelMap[interviewStatus] || interviewStatus;
  }

  getStatusBadgeClass(interviewStatus: string): string {
    if (interviewStatus === 'PENDING') return 'status-badge-pending';
    if (interviewStatus.includes('CLEARED') || interviewStatus === 'HR_CLEARED') return 'status-badge-cleared';
    if (interviewStatus.includes('REJECTED')) return 'status-badge-rejected';
    return 'status-badge-pending';
  }

  applyFilter(filter: string) {
    this.selectedFilter = filter;

    switch (filter) {
      case 'assigned':
        this.filterShortlistedCandidates = this.shortlistedCandidates.filter(
          candidate => candidate.interviewStatus !== 'PENDING'
        );
        break;
      case 'selected':
        this.filterShortlistedCandidates = this.shortlistedCandidates.filter(
          candidate => candidate.interviewStatus === 'INTERVIEW1_CLEARED' ||
            candidate.interviewStatus === 'INTERVIEW2_CLEARED' ||
            candidate.interviewStatus === 'HR_CLEARED'
        );
        break;
      case 'rejected':
        this.filterShortlistedCandidates = this.shortlistedCandidates.filter(
          candidate => candidate.interviewStatus === 'INTERVIEW1_REJECTED' ||
            candidate.interviewStatus === 'INTERVIEW2_REJECTED' ||
            candidate.interviewStatus === 'HR_REJECTED'
        );
        break;
      case 'all':
      default:
        this.filterShortlistedCandidates = [...this.shortlistedCandidates];
    }
  }

  isPending(interviewStatus: string): boolean {
    return interviewStatus === 'PENDING';
  }

  isInterview1Cleared(interviewStatus: string): boolean {
    return interviewStatus === 'INTERVIEW1_CLEARED';
  }

  isInterview2Cleared(interviewStatus: string): boolean {
    return interviewStatus === 'INTERVIEW2_CLEARED';
  }

  isHRCleared(interviewStatus: string): boolean {
    return interviewStatus === 'HR_CLEARED';
  }

  isRejected(interviewStatus: string): boolean {
    return interviewStatus.includes('REJECTED');
  }

  scheduleInterview(candidate: ShortlistedCandidatesDTO) {
    console.log('Schedule Interview for:', candidate);
    // Implement your schedule interview logic
    // Navigate to schedule interview page or open modal
  }

  scheduleRound2(candidate: ShortlistedCandidatesDTO) {
    console.log('Schedule Round 2 for:', candidate);
    // Implement your schedule round 2 logic
  }

  scheduleHRRound(candidate: ShortlistedCandidatesDTO) {
    console.log('Schedule HR Round for:', candidate);
    // Implement your schedule HR round logic
  }

  discussSalary(candidate: ShortlistedCandidatesDTO) {
    console.log('Discuss Salary with:', candidate);
    // Implement your salary discussion logic
    // Navigate to salary discussion page
  }

  viewProfile(candidate: ShortlistedCandidatesDTO) {
    console.log('View Profile:', candidate);
    // Implement your view profile logic
    // Navigate to candidate profile page or open modal
  }

  downloadResume(candidate: ShortlistedCandidatesDTO) {
    if (candidate.resumePath) {
      console.log('Download Resume:', candidate.resumePath);
      window.open(candidate.resumePath, '_blank');
    }
  }
}
