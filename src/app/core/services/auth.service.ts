import { inject, Injectable } from '@angular/core';
import { NavigationService } from '../../shared/services/navigation.service';
import { SessionStorageService } from '../../shared/services/session-storage.service';

// TODO: this is dummy. In real project it should be from backend after login 
export const authToken: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJHZW9yZ2VEQE9ESU4tS29uc3VsdC5ubyIsImtpZCI6IjE3MmU3OWY2LTcxZWUtNDJiNy1hZTc1LTM3OTM0M2JiZWJkZCIsImlzcyI6Im5hdi1ubyIsImF1ZCI6ImZlZWQtYXBpLXYyIiwiaWF0IjoxNzI5MjU1NjMxLCJleHAiOm51bGx9.iWVPjNV0moSrsz4G1N2KEcB24Wiji4hY_HVNEeetdTY';

const accessTokenPath: string = 'access_token';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private navigationService: NavigationService = inject(NavigationService);
    private sessionStorageService: SessionStorageService = inject(SessionStorageService);

    // TODO: Remove when login page
    setDummyToken(): void {
        this.sessionStorageService.set(accessTokenPath, authToken);
    }

    setToken(token: string): void {
        this.sessionStorageService.set(accessTokenPath, token);
    }

    getToken(): string | null {
        return this.sessionStorageService.get(accessTokenPath);
    }

    login(username: string, password: string) {
        // TODO: add logic to login when real backend
    }

    // TODO: when real backend use this function to logout
    logout(): void {
        this.sessionStorageService.remove(accessTokenPath);
        this.navigationService.navigate('/login');
    }

    isAuthenticated(): boolean {
        // TODO: add jwt validity and chech if expired
        return this.getToken() !== null;
    }
}