import { Component, OnInit } from '@angular/core';
import { PmService } from '../../service/pm-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectResponseDTO } from '../../dto/ProjectResponseDTO';
import { ProjectRequestDTO } from '../../dto/ProjectRequestDTO';

@Component({
  selector: 'app-assign-project',
  imports: [FormsModule, CommonModule],
  templateUrl: './assign-project.html',
  styleUrl: './assign-project.css'
})
export class AssignProject implements OnInit {

  showModal = false;
  teamleadIds: string[] = [];
  assignedProject: ProjectResponseDTO | null = null;
  loginPmId: string = "EMP1002";
  isLoading: boolean = true;
  
  projectRequest: ProjectRequestDTO = new ProjectRequestDTO();

  constructor(private pmService: PmService) {}

  ngOnInit(): void {
    this.checkAssignedProject();
  }

  checkAssignedProject(): void {
    this.isLoading = true;
    this.pmService.getAssignedProjects(this.loginPmId).subscribe({
      next: (data) => {
        console.log('Assigned project:', data);
        if (data && data.projectId) {
          this.assignedProject = data;
        } else {
          this.assignedProject = null;
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching assigned project:', error);
        this.assignedProject = null;
        this.isLoading = false;
      }
    });
  }

  fetchTeamLeadIds(): void {
    this.pmService.findTeamLeadIDs().subscribe({
      next: (ids: string[]) => {
        this.teamleadIds = ids;
        console.log('Team Lead IDs fetched:', ids);
      },
      error: (error) => {
        console.error('Error fetching team lead IDs:', error);
        alert('Failed to fetch team lead IDs. Please try again.');
      }
    });
  }

  openModal(): void {
    this.fetchTeamLeadIds();
    this.showModal = true;
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  resetForm(): void {
    this.projectRequest = new ProjectRequestDTO();
    this.projectRequest.status = 'READY_FOR_ASSIGNMENT';
    this.projectRequest.budgetBandMin = 20;
    this.projectRequest.budgetBandMax = 100;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    
    if (!this.validateForm()) {
      return;
    }

    // Confirmation dialog
    const confirmMessage = `Are you sure you want to assign this project?\n\n` +
      `Project: ${this.projectRequest.name}\n` +
      `Team Lead: ${this.projectRequest.teamLeadId}\n` +
      `Budget: ₹${this.projectRequest.budgetBandMin}L - ₹${this.projectRequest.budgetBandMax}L\n` +
      `Duration: ${this.formatDate(this.projectRequest.startDate)} to ${this.formatDate(this.projectRequest.endDate)}`;

    if (!confirm(confirmMessage)) {
      return;
    }

    this.pmService.assignProject(this.projectRequest, this.loginPmId).subscribe({
      next: (response: ProjectResponseDTO) => {
        console.log('Project assigned successfully:', response);
        this.assignedProject = response;
        this.closeModal();
        alert(`✓ Project "${response.name}" assigned successfully to ${response.teamLeadName}!`);
      },
      error: (error) => {
        console.error('Error assigning project:', error);
        
        if (error.error && error.error.message) {
          alert(`Error: ${error.error.message}`);
        } else if (error.status === 400) {
          alert('Invalid project data. Please check all fields and try again.');
        } else if (error.status === 404) {
          alert('Team Lead not found. Please select a valid Team Lead.');
        } else {
          alert('Failed to assign project. Please try again later.');
        }
      }
    });
  }

  validateForm(): boolean {
    if (!this.projectRequest.name || this.projectRequest.name.trim() === '') {
      alert('Please enter a Project Name');
      return false;
    }

    if (this.projectRequest.budgetBandMin > this.projectRequest.budgetBandMax) {
      alert('Budget Min cannot be greater than Budget Max');
      return false;
    }

    if (this.projectRequest.budgetBandMin < 20 || this.projectRequest.budgetBandMin > 100) {
      alert('Budget Min should be between 20 and 100 Lakhs');
      return false;
    }

    if (this.projectRequest.budgetBandMax < 20 || this.projectRequest.budgetBandMax > 100) {
      alert('Budget Max should be between 20 and 100 Lakhs');
      return false;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const startDate = new Date(this.projectRequest.startDate);
    
    if (startDate < today) {
      alert('Start Date should be today or a future date');
      return false;
    }

    const endDate = new Date(this.projectRequest.endDate);
    if (endDate <= startDate) {
      alert('End Date must be after Start Date');
      return false;
    }

    if (!this.projectRequest.teamLeadId || this.projectRequest.teamLeadId === '') {
      alert('Please select a Team Lead');
      return false;
    }
    
    return true;
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'ACTIVE':
        return 'badge-ready';
      case 'PENDING':
        return 'badge-progress';
      case 'CLOSED':
        return 'badge-closed';
      default:
        return 'badge-progress';
    }
  }

  formatStatus(status: string): string {
    return status.replace(/_/g, ' ');
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}