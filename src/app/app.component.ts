import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinner } from 'primeng/progressspinner';
import { AsyncPipe } from '@angular/common';
import { GlobalLoaderService } from './shared/services/global-loader.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastModule, ProgressSpinner, AsyncPipe],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  globalLoaderService = inject(GlobalLoaderService);
  private authService = inject(AuthService);

  constructor() {
    this.authService.setDummyToken(); // TODO: dummy code. remove this line when login Page.
  }
}
