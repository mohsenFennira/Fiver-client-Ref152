import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { UserAuthService } from "../login/service/user-auth.service";
import { Router } from "@angular/router";
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from "@angular/core";
@Injectable()
export class AuthInterceptor implements HttpInterceptor{
  constructor(private userAuth:UserAuthService,private router:Router){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     // Check if the request is for the home page
    /* if (req.url.includes('/home')) {
      // If it is, skip adding the token and proceed with the request
      return next.handle(req);
    }
if(req.headers.get('No-Auth')==='true'){
    return next.handle(req.clone());
}
const token =this.userAuth.getToken();
req = this.addToken(req,token);
// Inside your interceptor code
return next.handle(req).pipe(
  catchError((err: HttpErrorResponse) => {
    console.log(err.status);
    if (err.status === 401) {
      this.router.navigate(['/login']);
    } else if (err.status === 403) {
      this.router.navigate(['/forbidden']);
    }
    return throwError("Something is wrong");
  })
);
}


private addToken(request:HttpRequest<any>,token:string){
   return request.clone({
    setHeaders: {
      Authorization : `Bearer ${token}`
    }
   });
   */
   return next.handle(req);
  }

}
