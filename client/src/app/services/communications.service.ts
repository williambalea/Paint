import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EMPTY_STRING } from 'src/constants';
import { SVGJSON } from '../../../../common/communication/SVGJSON';

@Injectable({
  providedIn: 'root',
})
export class CommunicationsService {
  private readonly BASE_URL: string = 'http://localhost:3000';
  private readonly DATABASE_URL: string = '/database';
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
    return this.http.get(this.BASE_URL + this.DATABASE_URL + '/svgTable').pipe(
      catchError(this.handleGetError));
  }

  postToServer(data: SVGJSON): Observable<any> {
    return this.http.post<any>(this.BASE_URL + this.DATABASE_URL + '/postToTable', data).pipe(
      catchError(this.handleSendError));

  }

  handleGetError(error: HttpErrorResponse) {
    return throwError(error);
  }

  handleSendError(error: HttpErrorResponse) {
    return throwError(error);
  }

}
