import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../../../login/service/user-auth.service';
import { User } from '../../../Models/User';
import { Publication } from '../../../Models/Publication';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }
  url="http://localhost:8085/api/v1/auth/";
  
  getUsers(pageNo:number,size:number){
    let url = `${this.url}getUsers?`;
    url += `pageNo=${pageNo}&size=${size}`;
    return this.httpClient.get<any>(url);
  }
  addUser(user:User){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<User>(this.url+'createUserByAdmin',user,{headers});
  }
  deleteUser(idUser:number){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete<User>(this.url+'delete?idUser='+`${idUser}`,{headers});
  }
  editProfile(user:User,idUser:number){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<User>(this.url+'update?idUser='+`${idUser}`,user,{headers});
  }

  getUserById(idUser:number){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<User>(this.url+'getUserById?idUser='+`${idUser}`,{headers});
  }
  getStatistics(){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(this.url+'getStatistics',{headers});
  }
  getPublicationForAdmin(){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Publication[]>("http://localhost:8085/api/v1/publication/getPublicationForAdmin",{headers});

  }
  getActiveUsers(pageNo:number,size:number){
    let url = `${this.url}getActiveUsers?`;
    url += `pageNo=${pageNo}&size=${size}`;

    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<any>(url,{headers});
  }
}
