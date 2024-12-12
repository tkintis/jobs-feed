import { Injectable } from '@angular/core';
import { GoToPageEnum } from '../../shared/enums/paginator.enum';

@Injectable({
  providedIn: 'root',
})
export class PaginatorService {
  private previousUrls: string[] = []; // Store the history of URLs
  private nextUrl: string | null = null;
  private currentUrl: string | null = null;

  getNextUrl(): string | null {
    return this.nextUrl;
  }

  setNextUrl(url: string | null): void {
    this.nextUrl = url;
  }

  getCurrentUrl(): string | null {
    return this.currentUrl;
  }

  setCurrentUrl(url: string | null): void {
    if (this.currentUrl) {
      this.previousUrls.push(this.currentUrl);
    }
    this.currentUrl = url;
  }

  getPreviousUrl(): string | null {
    if (this.previousUrls.length > 0) {
      return this.previousUrls[this.previousUrls.length - 1];
    }
    return null;
  }

  removeLastPreviousUrl(): void {
    if (this.previousUrls.length > 0)
      this.previousUrls = [...this.previousUrls.slice(0, -1)];
  }

  isOnFirstPage(): boolean {
    return this.previousUrls.length === 0;
  }

  reset(): void {
    this.previousUrls = [];
    this.nextUrl = null;
    this.currentUrl = null;
  }

  determineNextUrl(goToPage: GoToPageEnum): string | null {
    switch (goToPage) {
      case GoToPageEnum.first:
        this.reset();
        return null;
      case GoToPageEnum.previous:
        const previousUrl = this.getPreviousUrl();
        this.removeLastPreviousUrl();
        return previousUrl;
      case GoToPageEnum.next:
        return this.getNextUrl();
      case GoToPageEnum.last:
        return null;
      default:
        return null;
    }
  }
}
