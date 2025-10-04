import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { PmService } from '../service/pm-service';
import { HrService } from '../service/hr-service';

@Component({
  selector: 'app-hr-dashboard',
  imports: [RouterOutlet,RouterLink,RouterModule],
  templateUrl: './hr-dashboard.html',
  styleUrl: './hr-dashboard.css'
})
export class HrDashboard {

   userName: string = '';
    firstName: string = '';       // First name for UI
    userInitials: string = '';
    loginHrId: string = "EMP1003";
  
    constructor(private hrService: HrService) {}
  
    ngOnInit(): void {
      this.getFullNameOfEmployee(this.loginHrId);
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
  
    getFullNameOfEmployee(loginHrId: string) {
      this.hrService.getFullName(loginHrId).subscribe({
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
