import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpParams, HttpEventType } from '@angular/common/http';

import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const key = 'start_time';
    const clonedRequest = req.url.includes('products')
     ? req.clone({ params: new HttpParams().set(key, Date.now().toString())})
     : req;

    return next.handle(clonedRequest).pipe(
      filter((event: HttpEvent<any>) => event.type === HttpEventType.Response),
      map((event: HttpResponse<any>) => {
        if (event.url.includes('products')) {
          console.log(`${event.url} has taken ${Date.now() - parseInt(clonedRequest.params.get(key), 10)} ms.`);
        }
        return event;
      })
    );

  }
}
