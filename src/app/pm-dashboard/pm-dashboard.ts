import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PmService } from '../service/pm-service';

@Component({
  selector: 'app-pm-dashboard',
  standalone: true, // Required if using `imports` directly
  imports: [RouterOutlet, RouterLink, RouterModule, CommonModule, FormsModule],
  templateUrl: './pm-dashboard.html',
  styleUrls: ['./pm-dashboard.css'] // ✅ should be plural (styleUrls) and array
})
export class PmDashboard implements OnInit {

  userName: string = '';
  firstName: string = '';       // First name for UI
  userInitials: string = '';
  loginPmId: string = "EMP1002";

  constructor(private pmService: PmService) {}

  ngOnInit(): void {
    this.getFullNameOfEmployee(this.loginPmId);
  }

  getFirstName(fullName: string): string {
  const names = fullName.trim().split(' ');
  return names[0]; 
}

  getInitials(name: string): string {
    const names = name.trim().split(' ');
    if (names.length === 1) {
      return names[0][0].toUpperCase();
    }
    return (names[0][0] + names[names.length - 1][0]).toUpperCase();
  }

  getFullNameOfEmployee(loginPmId: string) {
    this.pmService.getFullName(loginPmId).subscribe({
      next: (data: string) => {
        console.log('Full Name from API:', data);
        this.userName = data;
        this.firstName=this.getFirstName(data);
        this.userInitials = this.getInitials(data);
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
