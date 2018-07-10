import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app-error';
import { AppErrorHandler } from '../common/app-error-handler';
import { NotFoundError } from '../common/not-found-error';
import { CouldNotUpdateError } from '../common/could-not-update-error';

export class DataService {
  constructor(private url: string, private http: Http) {
  }

  getAll() {
    return this.http.get(this.url).pipe(
      map(response => response.json()),
      catchError(this.handleError)
    );
  }

  private handleError(error: Response) {
    if (error.status === 404) {
      return throwError(new NotFoundError());
    } else if (error.status === 400) {
      return throwError(new CouldNotUpdateError());
    } else {
      return throwError(new AppError(error));
    }
  }
}
