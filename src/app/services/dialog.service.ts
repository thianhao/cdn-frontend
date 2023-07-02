import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MessageDialogComponent } from "../pages/message-dialog/message-dialog.component";

@Injectable({
    providedIn: 'root'
  })
export class DialogService {
    constructor(
        private dialog: MatDialog
    ) {
    }

    public OpenMessageDialog(title: string, message: string,) {
        this.dialog.open(MessageDialogComponent, {
            data: {
                title,
                message
            }
          });
    }
}