import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pm-dashboard',
  imports: [RouterOutlet,RouterLink,RouterModule,CommonModule,FormsModule],
  templateUrl: './pm-dashboard.html',
  styleUrl: './pm-dashboard.css'
})
export class PmDashboard {

}
