import { AfterViewInit, Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Dashboard } from "./dashboard/dashboard";

declare var feather: any;
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements AfterViewInit{
  protected readonly title = signal('FinalProject');
  
   // --- ADD THIS LOGIC FOR THE LOGOUT MODAL ---
  public showLogoutModal = false;

  ngAfterViewInit(): void {
    // This makes sure your icons are always rendered correctly
    feather.replace();
  }

  openLogoutModal(): void {
    this.showLogoutModal = true;
  }

  cancelLogout(): void {
    this.showLogoutModal = false;
  }

  confirmLogout(): void {
    // Here you would call your real authentication service
    alert('Logging out...');
    this.showLogoutModal = false;
    // Example: this.authService.logout().subscribe(() => this.router.navigate(['/login']));
  }
  // --- END OF LOGOUT MODAL LOGIC ---
}
