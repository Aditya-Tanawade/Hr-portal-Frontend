import { Component, OnInit } from '@angular/core';
import { BenchEmployeeDTO } from '../../dto/BenchEmployeeDTO';
import { PmService } from '../../service/pm-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

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

  constructor(private pmService: PmService) {}

  ngOnInit(): void {
    this.getAllEmployeesOnBench();
  }

  getAllEmployeesOnBench() {
    this.pmService.getAllEmployeesOnBench().subscribe({
      next: (data) => {
        console.log(data);
        this.benchEmployeeDto = data;
        this.filteredEmployees = data; // Initialize filtered list
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
  //   const skillsLower = this.skillsInput.toLowerCase().trim();
  //   const skillFilters = skillsLower ? skillsLower.split(',').map(s => s.trim()) : [];
    
  //   this.filteredEmployees = this.benchEmployeeDto.filter(emp => {
  //     const empSkills = emp.skills.toLowerCase().split(',').map(s => s.trim());
  //     const empRole = emp.roleKey.toLowerCase();
      
  //     // Check skills filter (all skillFilters must be included in empSkills)
  //     const skillsMatch = skillFilters.length === 0 || 
  //                        skillFilters.every(skill => empSkills.includes(skill));
      
  //     // Check experience filter
  //     const expMatch = this.minExperienceInput === null || 
  //                     emp.experience >= this.minExperienceInput;
      
  //     // Check role filter
  //     const roleMatch = !this.roleFilterInput || 
  //                      empRole === this.roleFilterInput.toLowerCase();
      
  //     return skillsMatch && expMatch && roleMatch;
  //   });
  }

  assignProject(employeeId: string) {
  //   console.log('Assigning project to employee:', employeeId);
  //   // Implement your project assignment logic here
  }

  getInitials(fullName: string): string {
    return fullName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase();
  }

  trackByEmployeeId(index: number, employee: BenchEmployeeDTO): string {
    return employee.employeeId;
  }
}