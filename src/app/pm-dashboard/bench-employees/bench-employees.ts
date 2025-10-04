import { Component, OnInit } from '@angular/core';
import { BenchEmployeeDTO } from '../../dto/BenchEmployeeDTO';
import { PmService } from '../../service/pm-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bench-employees',
  imports: [FormsModule, CommonModule],
  templateUrl: './bench-employees.html',
  styleUrl: './bench-employees.css'
})
export class BenchEmployees implements OnInit {

  benchEmployeeDto: BenchEmployeeDTO[] = [];
  filteredEmployees: BenchEmployeeDTO[] = [];

  skillsInput: string = '';
  minExperienceInput: number | null = null;
  roleFilterInput: string = '';


  jobRequestId: number=0;
  projectId: number=0;

  constructor(private pmService: PmService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllEmployeesOnBench();
    this.route.queryParams.subscribe(params => {
      this.jobRequestId = params['jobRequestId'];
      this.projectId = params['projectId'];
    });
  }

  getAllEmployeesOnBench() {
    this.pmService.getAllEmployeesOnBench().subscribe({
      next: (data) => {
        console.log(data);
        this.benchEmployeeDto = data;
        this.filteredEmployees = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling API", err);
      },
      complete: () => {
        console.log("Data retrieval completed successfully");
      }
    });
  }

  applyFilters() {
    const skillsLower = this.skillsInput.toLowerCase().trim();
    const skillFilters = skillsLower ? skillsLower.split(',').map(s => s.trim()) : [];

    this.filteredEmployees = this.benchEmployeeDto.filter(emp => {
      const empSkills = emp.skills.toLowerCase().split(',').map(s => s.trim());
      const empRole = emp.profileRole.toLowerCase().trim();

      // Check skills filter (all skillFilters must be included in empSkills)
      const skillsMatch = skillFilters.length === 0 ||
        skillFilters.every(skill => empSkills.includes(skill));

      // Check experience filter
      const expMatch = this.minExperienceInput === null ||
        emp.experience >= this.minExperienceInput;

      // Check role filter
      const roleMatch = !this.roleFilterInput ||
        empRole === this.roleFilterInput.toLowerCase().trim();

      return skillsMatch && expMatch && roleMatch;
    });
  }

  assignProjectToBenchEmployee(employeeId:string) {
    console.log('Assigning project to employee:', employeeId);
        console.log('Job Request ID:', this.jobRequestId);
    console.log('ProjectId:', this.projectId);

    this.pmService.assignProjectToBenchEmployee(this.jobRequestId,this.projectId,employeeId).subscribe(
      (response: string) => {
        console.log(response); 
        this.showSuccessMessage(response); 
      },
      (error) => {
        // Error - Something went wrong
        console.error('Error assigning project:', error);
        this.showErrorMessage('Failed to assign project.'); 
      }
    );
  }


  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  }



  showSuccessMessage(message: string) {
  // Code to display a success message (e.g., a Toast or Snackbar)
  alert('Success: ' + message); // For simplicity, using alert here
}

showErrorMessage(message: string) {
  // Code to display an error message
  alert('Error: ' + message);
}



  trackByEmployeeId(index: number, employee: BenchEmployeeDTO): string {
    return employee.employeeId;
  }




}