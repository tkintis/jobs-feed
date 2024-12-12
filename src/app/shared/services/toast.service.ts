import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private readonly position = 'br';
    private readonly duration = 5000;

    private messageService: MessageService = inject(MessageService);

    success(message: string, title: string = 'Success'): void {
        this.messageService.add({ severity: 'success', summary: title, detail: message, key: this.position, life: this.duration });
    }

    error(message: string, title: string = 'Error'): void {
        this.messageService.add({ severity: 'error', summary: title, detail: message, key: this.position, life: this.duration });
    }

    info(message: string, title: string = 'Info'): void {
        this.messageService.add({ severity: 'info', summary: title, detail: message, key: this.position, life: this.duration });
    }

    warn(message: string, title: string = 'Warning'): void {
        this.messageService.add({ severity: 'warn', summary: title, detail: message, key: this.position, life: this.duration });
    }
}