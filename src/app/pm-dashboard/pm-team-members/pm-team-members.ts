import { Component, OnInit } from '@angular/core';
import { EmployeeResponseDTO } from '../../dto/EmployeeResponseDTO';
import { PmService } from '../../service/pm-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pm-team-members',
  imports: [FormsModule, CommonModule],
  templateUrl: './pm-team-members.html',
  styleUrl: './pm-team-members.css'
})
export class PmTeamMembers implements OnInit {

  teamMembers: EmployeeResponseDTO[] = [];
  projectId: number = 2;

  constructor(private pmService: PmService) { }

  ngOnInit(): void {
    this.getAllTeamMembers(this.projectId);
  }

  getAllTeamMembers(projectId: number) {
    this.pmService.getAllTeamMembers(projectId).subscribe({
      next: (data) => {
        console.log('Team members fetched:', data);
        this.teamMembers = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  openAddMemberModal() {
    console.log("Open add member modal here...");
    // Implement your modal logic here
  }

  assignTask(member: EmployeeResponseDTO) {
    console.log("Assigning task to:", member.fullName);
    // Implement your task assignment logic here
    // You can navigate to a task assignment page or open a modal
  }
}

