import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BASE_URL, DATABASE_URL, EMPTY_STRING, POST_TABLE_URL, SVGTABLE_URL } from 'src/constants';
import { SVGJSON } from '../../../../common/communication/SVGJSON';

@Injectable({
  providedIn: 'root',
})
export class CommunicationsService {
  private listeners: any = new Subject<any>();
  HTML: string;
  enableSubmit: boolean;
  isLoading: boolean;

  constructor(private http: HttpClient) {
    this.HTML = EMPTY_STRING;
    this.enableSubmit = true;
    this.isLoading = false;
  }

  listen(): Observable<any> {
    this.listeners.next('allo');
    return this.listeners.asObservable();
  }

  testReturnIndex(): Observable<any> {
    return this.http.get(BASE_URL + DATABASE_URL + SVGTABLE_URL).pipe(
      catchError(this.handleGetError));
  }

  postToServer(data: SVGJSON): Observable<any> {
    return this.http.post<any>(BASE_URL + DATABASE_URL + POST_TABLE_URL, data).pipe(
      catchError(this.handleSendError));

  }

  handleGetError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  handleSendError(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

}
