import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor(
    private messageService: MessageService,
  ) { }


  showToast(type: string, title: string, msg: string,) {
    this.messageService.add({ severity: type, summary: title, detail: msg });
  }
}
