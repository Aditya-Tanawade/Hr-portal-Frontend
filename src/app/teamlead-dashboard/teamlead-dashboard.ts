import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-teamlead-dashboard',
  imports: [RouterOutlet,RouterLink,RouterModule,CommonModule,FormsModule],
  templateUrl: './teamlead-dashboard.html',
  styleUrl: './teamlead-dashboard.css'
})
export class TeamleadDashboard {

}
