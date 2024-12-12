import { ChangeDetectionStrategy, Component, input, InputSignal, OnChanges, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { AdContent } from '../../models/feed-entry-details.model';
import { JobsService } from '../../services/jobs.service';
import { Dialog } from 'primeng/dialog';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-job-item-dialog',
  imports: [CardModule, Dialog, DatePipe],
  providers: [JobsService],
  templateUrl: './job-item-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobItemDialogComponent implements OnChanges {
  data: InputSignal<AdContent> = input.required<AdContent>();
  isVisible: InputSignal<boolean> = input.required<boolean>();
  
  isDialogVisible: boolean = false;

  ngOnChanges() {
    this.isDialogVisible = this.isVisible();
  }


}
