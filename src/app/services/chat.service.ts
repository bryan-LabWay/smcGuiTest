import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, timer, of } from 'rxjs';
import { switchMap, takeWhile, last, map, filter } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  sendChat(payload: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    // Record the start time to ensure a minimum delay.
    const startTime = Date.now();

    // First, call the /run endpoint.
    return this.http.post<any>(`${this.apiUrl}/run`, payload, { headers }).pipe(
      switchMap(runResponse => {
        const jobId = runResponse.id;
        // Poll the /status/{job_id} endpoint every 2 seconds.
        return timer(0, 2000).pipe(
          switchMap(() => this.http.get<any>(`${this.apiUrl}/status/${jobId}`, { headers })),
          // Filter out responses that are empty or do not contain the expected output.
          filter(statusResponse => statusResponse && statusResponse.output && statusResponse.output.length > 0),
          // Continue polling until the job status is COMPLETED.
          takeWhile(statusResponse => statusResponse.status !== 'COMPLETED', true),
          // Get the last emission (which should be the one with COMPLETED status).
          last(),
          // Ensure a minimum delay of 2 seconds.
          switchMap(statusResponse => {
            const elapsed = Date.now() - startTime;
            if (elapsed < 2000) {
              return timer(2000 - elapsed).pipe(map(() => statusResponse));
            } else {
              return of(statusResponse);
            }
          })
        );
      })
    );
  }
}
