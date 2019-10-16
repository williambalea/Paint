import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
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

  constructor(private http: HttpClient) {
    this.HTML = EMPTY_STRING;

  }

  listen(): Observable<any> {
    this.listeners.next('allo');
    return this.listeners.asObservable();
  }

  testReturnIndex(): Observable<any> {
    return this.http.get(this.BASE_URL + this.DATABASE_URL + '/svgTable');
  }

  postToServer(data: SVGJSON): Observable<any> {
   return  this.http.post<string>(this.BASE_URL + this.DATABASE_URL + '/postToTable', data);

  }

}
