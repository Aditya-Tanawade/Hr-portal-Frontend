import { Component } from '@angular/core';
import { MatDialogRef, MatDialogContent, MatDialogActions } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  imports: [MatDialogContent, MatDialogActions],
  templateUrl: './confirmation-dialog.html',
  styleUrl: './confirmation-dialog.css'
})
export class ConfirmationDialog {

   constructor(public dialogRef: MatDialogRef<ConfirmationDialog>) {}

  onConfirm(): void {
    this.dialogRef.close(true);  // Close the dialog and return 'true' (confirmed)
  }

  onCancel(): void {
    this.dialogRef.close(false); // Close the dialog and return 'false' (canceled)
  }
}
