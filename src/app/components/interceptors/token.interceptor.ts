import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable, defer } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '@auth0/auth0-angular';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (req.url.includes(environment.personalAssistantApi.personalAssistantApiRoot)) {
      this.auth.appState$.subscribe(
        data => console.log(data)
      )
      return next.handle(req)


      // return defer(async () => {
      //   const token = await this.authService.getCurrentUserToken();
      //   const request = req.clone({
      //     headers: this.getDefaultHeaders(token),
      //     withCredentials: true,
      //   });
      //   return next.handle(request);
      // }).pipe(mergeAll());
    } else {
      return next.handle(req);
    }
  }

  private getDefaultHeaders(accessToken: string): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);
  }
}
