import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialog } from '../confirmation-dialog/confirmation-dialog';

@Component({
  selector: 'app-settings',
  imports: [],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
constructor(private dialog: MatDialog) {}

  // This method opens the confirmation dialog
  deleteAccount(): void {
    const dialogRef = this.dialog.open(ConfirmationDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // User confirmed, proceed with account deletion
        this.confirmDeleteAccount();
      }
    });
  }

  // Your logic for deleting the account
  confirmDeleteAccount(): void {
    console.log('Account deleted');
  }

}
