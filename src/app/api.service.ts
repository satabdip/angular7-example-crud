import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { Item } from './item';
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
const apiUrl = '/api/v1/items';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
/* Error handling */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
/* Get All Items */
  getItems (): Observable<Item[]> {
  return this.http.get<Item[]>(apiUrl)
    .pipe(
      tap(items => console.log('fetched items')),
      catchError(this.handleError('getItems', []))
    );
}
/* Get Individual Item */
getItem(id: number): Observable<Item> {
  const url = `${apiUrl}/${id}`;
  return this.http.get<Item>(url).pipe(
    tap(_ => console.log(`fetched item id=${id}`)),
    catchError(this.handleError<Item>(`getItem id=${id}`))
  );
}
/* Add Individual Item */
addItem (item): Observable<Item> {
  return this.http.post<Item>(apiUrl, item, httpOptions).pipe(
    tap(_ =>  console.log(`added item w/ id=${item.id}`)),
    catchError(this.handleError<Item>('addItem'))
  );
}

/* Update Individual Item */
updateItem (id, item): Observable<any> {
  const url = `${apiUrl}/${id}`;
  return this.http.put(url, item, httpOptions).pipe(
    tap(_ => console.log(`updated item id=${id}`)),
    catchError(this.handleError<any>('updateItem'))
  );
}

/* Delete Individual Item */
deleteItem (id): Observable<Item> {
  const url = `${apiUrl}/${id}`;
  return this.http.delete<Item>(url, httpOptions).pipe(
    tap(_ => console.log(`deleted item id=${id}`)),
    catchError(this.handleError<Item>('deleteItem'))
  );
}
}
