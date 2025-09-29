import { Component } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-hr-dashboard',
  imports: [RouterOutlet,RouterLink,RouterModule],
  templateUrl: './hr-dashboard.html',
  styleUrl: './hr-dashboard.css'
})
export class HrDashboard {

}
