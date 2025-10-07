import { Component } from '@angular/core';
import { HrService } from '../../service/hr-service';
import { ShortlistedCandidatesDTO } from '../../dto/ShortlistedCandidatesDTO';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface InterviewRequest {
  candidateEmail: string;
  employeeEmail: string;
  startTime: string;
  endTime: string;
  summary: string;
  description: string;
}

@Component({
  selector: 'app-hr-interviews',
  imports: [FormsModule, CommonModule],
  templateUrl: './hr-interviews.html',
  styleUrl: './hr-interviews.css'
})
export class HrInterviews {

  countTotalShortlisted: number = 0;
  countAssiignedInterviews: number = 0;
  countSelectedCandidates: number = 0;
  countRejectedCandidates: number = 0;
  shortlistedCandidates: ShortlistedCandidatesDTO[] = [];
  filterShortlistedCandidates: ShortlistedCandidatesDTO[] = [];

  loginHrId: string = "EMP1003";
  selectedFilter: string = 'all';

  // Modal and Form properties
  showScheduleModal: boolean = false;
  selectedCandidate: ShortlistedCandidatesDTO | null = null;
  interviewRound: string = 'Round 1';
  
  // Form fields
  interviewForm = {
    candidateEmail: '',
    employeeEmail: '',
    interviewDate: '',
    startTime: '',
    endTime: '',
    summary: '',
    description: ''
  };

  // Meeting link and status
  zoomMeetingLink: string = '';
  showMeetingLink: boolean = false;
  scheduleError: string = '';

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

  // Open Schedule Modal
  scheduleInterview(candidate: ShortlistedCandidatesDTO) {
    this.selectedCandidate = candidate;
    this.interviewRound = 'Round 1';
    this.openScheduleModal();
  }

  scheduleRound2(candidate: ShortlistedCandidatesDTO) {
    this.selectedCandidate = candidate;
    this.interviewRound = 'Round 2';
    this.openScheduleModal();
  }

  scheduleHRRound(candidate: ShortlistedCandidatesDTO) {
    this.selectedCandidate = candidate;
    this.interviewRound = 'HR Round';
    this.openScheduleModal();
  }

  openScheduleModal() {
    if (this.selectedCandidate) {
      // Pre-fill form fields
      this.interviewForm.candidateEmail = this.selectedCandidate.email;
      this.interviewForm.employeeEmail = ''; // Should be filled by HR
      this.interviewForm.interviewDate = this.getTomorrowDate();
      this.interviewForm.startTime = '10:00';
      this.interviewForm.endTime = '11:00';
      this.interviewForm.summary = `${this.interviewRound} - ${this.selectedCandidate.title}`;
      this.interviewForm.description = `Interview with ${this.selectedCandidate.fullName} for the position of ${this.selectedCandidate.title}. Experience: ${this.selectedCandidate.totalExperience} years.`;
      
      this.showScheduleModal = true;
      this.showMeetingLink = false;
      this.zoomMeetingLink = '';
      this.scheduleError = '';
    }
  }

  closeScheduleModal() {
    this.showScheduleModal = false;
    this.selectedCandidate = null;
    this.resetForm();
  }

  resetForm() {
    this.interviewForm = {
      candidateEmail: '',
      employeeEmail: '',
      interviewDate: '',
      startTime: '',
      endTime: '',
      summary: '',
      description: ''
    };
    this.showMeetingLink = false;
    this.zoomMeetingLink = '';
    this.scheduleError = '';
  }

  getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  // Convert date and time to ISO 8601 format with IST timezone
  convertToISO8601(date: string, time: string): string {
    // Combine date and time
    const dateTimeString = `${date}T${time}:00+05:30`;
    return dateTimeString;
  }

  // Validate form
  validateForm(): boolean {
    if (!this.interviewForm.candidateEmail || !this.interviewForm.employeeEmail) {
      this.scheduleError = 'Please fill in all email fields';
      return false;
    }
    if (!this.interviewForm.interviewDate || !this.interviewForm.startTime || !this.interviewForm.endTime) {
      this.scheduleError = 'Please fill in all date and time fields';
      return false;
    }
    if (!this.interviewForm.summary || !this.interviewForm.description) {
      this.scheduleError = 'Please fill in summary and description';
      return false;
    }

    // Validate that end time is after start time
    const start = new Date(`${this.interviewForm.interviewDate}T${this.interviewForm.startTime}`);
    const end = new Date(`${this.interviewForm.interviewDate}T${this.interviewForm.endTime}`);
    if (end <= start) {
      this.scheduleError = 'End time must be after start time';
      return false;
    }

    this.scheduleError = '';
    return true;
  }

  // Submit schedule request
  submitScheduleInterview() {
    if (!this.validateForm()) {
      return;
    }

    this.scheduleError = '';

    // Prepare request body
    const requestBody: InterviewRequest = {
      candidateEmail: this.interviewForm.candidateEmail,
      employeeEmail: this.interviewForm.employeeEmail,
      startTime: this.convertToISO8601(this.interviewForm.interviewDate, this.interviewForm.startTime),
      endTime: this.convertToISO8601(this.interviewForm.interviewDate, this.interviewForm.endTime),
      summary: this.interviewForm.summary,
      description: this.interviewForm.description
    };

    console.log('Sending interview request:', requestBody);

    // Call your backend service
    // this.hrService.scheduleInterview(requestBody).subscribe({
    //   next: (response: any) => {
    //     console.log('Interview scheduled successfully:', response);
    //     // Assuming backend returns { meetingLink: "zoom_link_here" }
    //     this.zoomMeetingLink = response.meetingLink || response.zoomLink || response.link;
    //     this.showMeetingLink = true;
        
    //     // Refresh the candidates list
    //     this.getAllShortlistedCandidates(this.loginHrId);
    //   },
    //   error: (err) => {
    //     console.error('Error scheduling interview:', err);
    //     this.scheduleError = err.error?.message || 'Failed to schedule interview. Please try again.';
    //   }
    // });
  }

  // Save meeting link to database and notify
  notifyCandidate() {
    if (!this.zoomMeetingLink || !this.selectedCandidate) {
      return;
    }

    // Call backend to save the link and send notification
    const notificationData = {
      candidateEmail: this.selectedCandidate.email,
      meetingLink: this.zoomMeetingLink,
      interviewRound: this.interviewRound,
      candidateId: this.selectedCandidate.candidateId
    };

    // this.hrService.saveMeetingLinkAndNotify(notificationData).subscribe({
    //   next: (response) => {
    //     console.log('Notification sent successfully:', response);
    //     alert('Meeting link saved and candidate notified successfully!');
    //     this.closeScheduleModal();
    //     this.getAllShortlistedCandidates(this.loginHrId);
    //   },
    //   error: (err) => {
    //     console.error('Error sending notification:', err);
    //     alert('Failed to send notification. Please try again.');
    //   }
    // });
  }

  discussSalary(candidate: ShortlistedCandidatesDTO) {
    console.log('Discuss Salary with:', candidate);
    // Implement your salary discussion logic
  }

  viewProfile(candidate: ShortlistedCandidatesDTO) {
    console.log('View Profile:', candidate);
    // Implement your view profile logic
  }

  downloadResume(candidate: ShortlistedCandidatesDTO) {
    if (candidate.resumePath) {
      console.log('Download Resume:', candidate.resumePath);
      window.open(candidate.resumePath, '_blank');
    }
  }

  // Copy meeting link to clipboard
  copyToClipboard(text: string) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        alert('Meeting link copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy text: ', err);
        this.fallbackCopyTextToClipboard(text);
      });
    } else {
      this.fallbackCopyTextToClipboard(text);
    }
  }

  // Fallback method for older browsers
  fallbackCopyTextToClipboard(text: string) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = '0';
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        alert('Meeting link copied to clipboard!');
      } else {
        alert('Failed to copy text');
      }
    } catch (err) {
      console.error('Fallback: Could not copy text: ', err);
      alert('Failed to copy text');
    }
    
    document.body.removeChild(textArea);
  }
}