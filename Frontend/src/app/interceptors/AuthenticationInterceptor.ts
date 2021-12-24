import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor() { }

    // Parameters : 
    // request : Represents the request object which is on his way to the server
    // next : Used to send the request to the next interceptor (if exists)
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        // Add authorization header with our token if available
        let token: string;
        token = sessionStorage.getItem("token");
        
        if (token) {            
            request = request.clone({
                setHeaders: {
                    Authorization: token
                }
            });
        }

        return next.handle(request);
    }
}
