import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class SessionStorageService {
    set(path: string, item: string): void {
        sessionStorage.setItem(path, item);
    }

    get(path: string): string | null {
        return sessionStorage.getItem(path);
    }

    remove(path: string): void {
        sessionStorage.removeItem(path);
    }
}