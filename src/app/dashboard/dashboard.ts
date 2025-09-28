import { Component, OnDestroy, OnInit } from '@angular/core';
import {  NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, FormsModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})

export class Dashboard implements OnInit, OnDestroy {
  showWelcome = true;
  private routerSubscription: Subscription = new Subscription();

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to router events to show/hide welcome section
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showWelcome = event.url === '/dashboard' || event.url === '/';
        console.log('Route changed to:', event.url, 'Show welcome:', this.showWelcome);
      });

    // Check initial route
    const currentUrl = this.router.url;
    this.showWelcome = currentUrl === '/dashboard' || currentUrl === '/';
    console.log('Initial route:', currentUrl, 'Show welcome:', this.showWelcome);
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
