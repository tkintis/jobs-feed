import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { getDateMinusMonths } from '../../../shared/helpers/date-converter.helper';
import { Feed } from '../models/jobs.model';
import { FeedEntryDetails } from '../models/feed-entry-details.model';

@Injectable()
export class JobsService {
    private feedUrl = '/api/v1/feed';
    private feedEntryUrl = '/api/v1/feedentry/';

    private httpClient = inject(HttpClient);

    getJobsPaginated(nextUrl: string | null = null, isLast: boolean = false, lastModified?: Date): Observable<Feed> {
        const url = nextUrl ?? this.feedUrl;
        const modifiedSince: string = lastModified ? lastModified.toUTCString() : getDateMinusMonths(6).toUTCString();

        let headers = new HttpHeaders();
        headers = headers.set('If-Modified-Since', modifiedSince); // Adds the `modifiedSince` header

        let params = new HttpParams();
        if (isLast) {
          params = params.set('last', 'true'); // Adds the `last=true` query parameter
        }

        return this.httpClient.get<Feed>(url, { headers, params });
    }

    getFeedEntryDetails(id: string): Observable<FeedEntryDetails> {
      return this.httpClient.get<FeedEntryDetails>(`${this.feedEntryUrl}${id}`);
    }
}