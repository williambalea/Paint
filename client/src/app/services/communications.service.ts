import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationsService {
  private readonly BASE_URL: string = 'http://localhost:3000';
  private readonly DATABASE_URL: string = '/database';
  private listeners: any = new Subject<any>();

  constructor(private http: HttpClient) { }

  listen(): Observable<any> {
    this.listeners.next('allo');
    return this.listeners.asObservable();
  }

  test(): void {
    console.log('testSave');
  }

  testReturnIndex(): Observable<any> {
    return this.http.get(this.BASE_URL + this.DATABASE_URL + '/svgTable');
  }

}
