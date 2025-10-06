import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppliedCandidateDTO } from '../../dto/AppliedCandidateDTO';
import { HrService } from '../../service/hr-service';
import { CandidateFilterRequestDTO } from '../../dto/CandidateFilterRequestDTO';

@Component({
  selector: 'app-applied-candidates',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applied-candidates.html',
  styleUrl: './applied-candidates.css'
})
export class AppliedCandidates implements OnInit {
  
  allCandidates: AppliedCandidateDTO[] = [];
  displayedCandidates: AppliedCandidateDTO[] = [];
  loginHrId: string = 'EMP1003';
  
  // Filter properties
  selectedExperience: string = '';
  minSalary: number | null = null;
  maxSalary: number | null = null;
  selectedNoticePeriod: number | null = null;
  selectedSkills: string = '';

  shortlistedStatus:string="SHORTLISTED";
  notShortlistedStatus:string="NOT_SHORTLISTED";

  ngOnInit(): void {
    this.getAllCandidates(this.loginHrId);
  }

  constructor(private hrService: HrService) {}

  getAllCandidates(loginHrId: string) {
    this.hrService.getAllCandidates(loginHrId).subscribe({
      next: (data) => {
        console.log('All Candidates From API ', data);
        this.allCandidates = data;
        this.displayedCandidates = data;
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
    const filterRequest = new CandidateFilterRequestDTO();
    
    // Set experience range based on selection
    if (this.selectedExperience === 'entry') {
      filterRequest.minExperience = 0;
      filterRequest.maxExperience = 2;
    } else if (this.selectedExperience === 'mid') {
      filterRequest.minExperience = 2;
      filterRequest.maxExperience = 5;
    } else if (this.selectedExperience === 'senior') {
      filterRequest.minExperience = 5;
      filterRequest.maxExperience = 8;
    } else if (this.selectedExperience === 'lead') {
      filterRequest.minExperience = 8;
      filterRequest.maxExperience = 100;
    } else {
      filterRequest.minExperience = null;
      filterRequest.maxExperience = null;
    }
    
    // Set salary range
    filterRequest.minExpectedCtc = this.minSalary;
    filterRequest.maxExpectedCtc = this.maxSalary;

    // Set notice period
    filterRequest.noticePeriod = this.selectedNoticePeriod;

    // Set skills
    if (this.selectedSkills && this.selectedSkills.trim().length > 0) {
      filterRequest.skills = this.selectedSkills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    } else {
      filterRequest.skills = [];
    }

    console.log('Filter Request Being Sent:', filterRequest);
    this.filterCandidates(this.loginHrId, filterRequest);
  }

  filterCandidates(loginHrId: string, candidateFilterRequestDTO: CandidateFilterRequestDTO) {
    this.hrService.filterCandidates(loginHrId, candidateFilterRequestDTO).subscribe({
      next: (data) => {
        console.log('Filtered Candidates Response:', data);
        this.displayedCandidates = data;
      },
      error: (err) => {
        console.error("Exception occurred while calling filter API", err);
        alert('Error filtering candidates. Check console for details.');
      },
      complete: () => {
        console.log("Filter completed successfully");
      }
    });
  }

  clearFilters() {
    this.selectedExperience = '';
    this.minSalary = null;
    this.maxSalary = null;
    this.selectedNoticePeriod = null;
    this.selectedSkills = '';
    this.displayedCandidates = this.allCandidates;
  }

  getInitials(fullName: string): string {
    if (!fullName) return '??';
    const names = fullName.split(' ');
    if (names.length >= 2) {
      return (names[0][0] + names[1][0]).toUpperCase();
    }
    return fullName.substring(0, 2).toUpperCase();
  }

  getSkillsArray(skills: string): string[] {
    if (!skills) return [];
    return skills.split(',').map(skill => skill.trim()).slice(0, 4);
  }



  formatDate(dateString: string): string {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }


  changeStatusOfCandidateToShortListed(applicationId:number){
    this.hrService.changeStatusOfCandidateToShortListed(applicationId, this.shortlistedStatus).subscribe({
      next: (data) => {
        console.log( data);
        alert(data);
      },
      error: (err) => {
        console.error("Exception occurred while calling filter API", err);
        alert('Error filtering candidates. Check console for details.');
      }
    });
  }


   changeStatusOfCandidateToNotShortListed(applicationId:number){
    this.hrService.changeStatusOfCandidateToShortListed(applicationId, this.notShortlistedStatus).subscribe({
      next: (data) => {
        console.log( data);
        alert(data);
      },
      error: (err) => {
        console.error("Exception occurred while calling filter API", err);
        alert('Error filtering candidates. Check console for details.');
      }
    });
  }
}