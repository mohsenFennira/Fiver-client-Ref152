import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { User } from '../../Models/User';
import { Observable } from 'rxjs';
import { RoleType } from '../../Models/enum/RoleType';

@Injectable({
  providedIn: 'root'
})
export class AuthConfigService {

  constructor(private http:HttpClient,private userAuth:UserAuthService) { }
  seller!:Boolean;
  url="http://localhost:8085/api/v1/auth/";
  login(u:User){
    return this.http.post<User>(this.url+'token',u);
  }
  register(u:User):Observable<any> {
    return this.http.post<User>(this.url+'register',u);
  }
  registerAdmin(u:User):Observable<any> {
    return this.http.post<User>(this.url+'admin/register',u);
  }

  validateAccount(verificode:number){
    return this.http.put<User>(this.url+'validateAccount/'+`${verificode}`,verificode);
  }
  forgotPassword(email:String){
    return this.http.post<String>(this.url+'forgotPassword?email='+`${email}`,email);
  }
  changePassword(verifcode:number,user:User){
    return this.http.put<String>(this.url+'resetPassword/'+`${verifcode}`,user);
  }
  getUserByToken(): Observable<User> {
    const authToken =  this.userAuth.getToken();
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${authToken}`});
    return this.http.get<User>(this.url+'getUserBySession',{headers});
  }
  logout(email:String){
    return this.http.put<User>(this.url+'logout?email='+`${email}`,email);
  }
  public roleMatch(allowedRoles:any): any {
    let isMatch = false;
    const userRoles: any = this.userAuth.getRoles();
    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i] === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
  }
}
