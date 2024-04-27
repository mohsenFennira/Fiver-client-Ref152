import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from '../../../login/service/user-auth.service';
import { Publication } from '../../../Models/Publication';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PublicationService {

  constructor(private httpClient:HttpClient,private userAuth:UserAuthService) { }
  url="http://localhost:8085/api/v1/publication/";


  addPublication(publicationAddDTO:Publication): Observable<Publication> {
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.post<any>(this.url+'add',publicationAddDTO,{headers});

  }

  updatePubToAddImage(idPost:number,image:File): Observable<Publication> {
    const formData = new FormData();
    formData.append('image', image);
    return this.httpClient.put<any>(this.url + 'updatePubToAddImage?pubId='+`${idPost}`,formData);
  }


  getPublications(){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.get<Publication[]>(this.url+"getPublications",{headers});

  }
  getPublicationForAdmin(pageNo:number,size:number){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    let url = `${this.url}getPublicationForAdmin?`;
    url += `pageNo=${pageNo}&size=${size}`;
    return this.httpClient.get<any>(url,{headers});
  }

  updateStatusOfPostByAdmin(publication:Publication,idPost:number){
    const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.put<Publication>(this.url+"updateStatusOfPostByAdmin?idPost="+`${idPost}`,publication,{headers});
  }


 deletePost(idPost:Number){
  const token = this.userAuth.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.httpClient.delete<Publication>(this.url+"deletePost?idPost="+`${idPost}`,{headers});
 }

 getMyPublications(){
  const token = this.userAuth.getToken();
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`
  });
  return this.httpClient.get<Publication[]>(this.url+"getMyPublications",{headers});
 }
 ListsOfProductByCategoryHomePage(){
  return this.httpClient.get<Map<string, any>>(this.url+"ListsOfProductByCategoryHomePage");
 }
 retreivePubByCountryAndCityAndCategory(country: String, city: String, category: String, pageNo: number, size: number){
  let url = `${this.url}retreivePubByCountryAndCityAndCategory?`;
  // Append country parameter if provided
  if (country != null) {
    url += `country=${country}&`;
  }

  // Append city parameter if provided
  if (city != null) {
    url += `city=${city}&`;
  }

  // Append category parameter if provided
  if (category != null) {
    url += `category=${category}&`;
  }

  // Append pageNo and size parameters
  url += `pageNo=${pageNo}&size=${size}`;
  // Log the URL
  // Make HTTP GET request with constructed URL
  return this.httpClient.get<any>(url);
 }
 getPublicationWithId(idPub:number){
  return this.httpClient.get<Publication>(this.url+'getPublicationWithId?idPublication='+`${idPub}`)
 }
 country!:any;
 region!:any;
 category!:any;


}
