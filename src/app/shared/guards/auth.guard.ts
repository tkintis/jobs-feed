import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    private router = inject(Router);
    private authService = inject(AuthService);

    canActivate(): boolean {
        const isAuthenticated = this.authService.isAuthenticated();

        if (isAuthenticated) {
            return true;
        } else {
            // this.router.navigate(['/login']); TODO: add this line when login page
            return false;
        }
    }
}