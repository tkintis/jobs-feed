import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { finalize, take } from 'rxjs';
import { GoToPageEnum } from '../../../../shared/enums/paginator.enum';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { GlobalLoaderService } from '../../../../shared/services/global-loader.service';
import { PaginatorService } from '../../../../shared/services/paginator.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { AdContent } from '../../models/feed-entry-details.model';
import { FeedItem } from '../../models/jobs.model';
import { JobsService } from '../../services/jobs.service';
import { JobItemDialogComponent } from '../item-dialog/job-item-dialog.component';
import { NgOptimizedImage } from '@angular/common'

@Component({
  selector: 'app-jobs-list',
  imports: [ButtonModule, TableModule, DatePipe, JobItemDialogComponent, InputTextModule, IconFieldModule, InputIconModule, NgOptimizedImage],
  templateUrl: './jobs-list.component.html',
  standalone: true,
  providers: [JobsService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit {
  //#region Signals
  items: WritableSignal<FeedItem[]> = signal([]);
  isTableLoading: WritableSignal<boolean> = signal(false);
  showAdContentDialog: WritableSignal<boolean> = signal(false);
  //#endregion

  //#region Variables
  goToPageEnum: typeof GoToPageEnum = GoToPageEnum;
  goToPage: GoToPageEnum = GoToPageEnum.first;
  adContent!: AdContent;
  //#endregion

  //#region Refs
  private destroyRef = inject(DestroyRef);
  private cd = inject(ChangeDetectorRef);
  //#endregion

  //#region Services
  paginatorService = inject(PaginatorService);
  private jobsService = inject(JobsService);
  private globalLoaderService = inject(GlobalLoaderService);
  private toastService = inject(ToastService);
  //#endregion

  ngOnInit(): void {
    this.loadJobsFeed();
  }

  loadJobsFeed(): void {
    this.isTableLoading.set(true);
    const urlToLoad = this.paginatorService.determineNextUrl(this.goToPage);

    this.jobsService.getJobsPaginated(urlToLoad, this.goToPage === GoToPageEnum.last)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef), finalize(() => {
        this.isTableLoading.set(false);
        this.cd.detectChanges();
      }))
      .subscribe(res => {
        if (this.goToPage !== GoToPageEnum.previous)
          this.paginatorService.setCurrentUrl(res.feed_url);

        this.paginatorService.setNextUrl(res.next_url);

        this.items.set(this.getFilteredActiveUniqueItems(res.items));
      });
  }

  getFilteredActiveUniqueItems(items: FeedItem[]): FeedItem[] {
    const activeItems = items.filter(item => item._feed_entry.status === StatusEnum.ACTIVE);

    // Remove duplicates by ID
    const uniqueItems = activeItems.reduce((acc, current) => {
      if (!acc.some(item => item.id === current.id)) {
        acc.push(current);
      }
      return acc;
    }, [] as FeedItem[]);

    return uniqueItems;
  }

  paginationChanged(getPage: GoToPageEnum) {
    this.goToPage = getPage;
    this.loadJobsFeed();
  }

  rowClicked(item: FeedItem) {
    this.loadFeedEntry(item._feed_entry.uuid);
  }

  loadFeedEntry(feedEntryId: string) {
    this.globalLoaderService.show();

    this.jobsService.getFeedEntryDetails(feedEntryId)
      .pipe(take(1), takeUntilDestroyed(this.destroyRef), finalize(() => this.globalLoaderService.hide()))
      .subscribe({
        next: (res) => {
          if (!res) {
            this.toastService.error('There is no data');
            return;
          }

          if (res.status === StatusEnum.INACTIVE)
            this.toastService.error('This ad is stopped');
          else if (res.ad_content) {
            this.adContent = res.ad_content;
            this.showAdContentDialog.set(true);
          }

          this.cd.markForCheck();
        },
      })
  }

}
