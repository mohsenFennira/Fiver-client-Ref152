import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  public setRoles(roles: string[]) {
    if (this.isBrowser()) {
      localStorage.setItem("roles", JSON.stringify(roles));
    }
  }

  public setEmail(email: string) {
    if (this.isBrowser()) {
      localStorage.setItem("email", email);
    }
  }

  public getEmail(): string {
    if (this.isBrowser()) {
      const email = localStorage.getItem("email");
      if (email === null) {
        console.log("email not found in localStorage.");
        return "null";
      }
      return email;
    }
    return "null";
  }

  public getRoles(): string[] {
    if (this.isBrowser()) {
      const rolesJson = localStorage.getItem("roles");

      if (rolesJson === null) {
        console.log("Roles not found in localStorage.");
        return []; // or any other appropriate default value
      }

      return JSON.parse(rolesJson) as string[]; // Type assertion to explicitly cast to string[]
    }
    return [];
  }

  public setToken(jwtToken: string) {
    if (this.isBrowser()) {
      localStorage.setItem("jwtToken", jwtToken);
    }
  }

  public getToken(): string {
    if (this.isBrowser()) {
      const token = localStorage.getItem("jwtToken");
      if (token === null) {
        console.log("token not found in localStorage.");
        return "null";
      }
      return token;
    }
    return "null";
  }

  public clear() {
    if (this.isBrowser()) {
      localStorage.clear();
    }
  }

  public isLoggedIn() {
    return this.isBrowser() && this.getRoles().length > 0 && this.getToken() !== null;
  }
  public isAuthenticated(): boolean {
    // Get the token from local storage or wherever you store it
    const token = localStorage.getItem('token');
    // Check if token exists and is not expired
    if (token) {
      const tokenPayload = this.decodeToken(token);
      if (tokenPayload) {
        // Get the expiration date from the token payload
        const expirationDate = new Date(tokenPayload.exp * 1000); // Convert to milliseconds
        // Check if the current date is before the expiration date
        return expirationDate > new Date();
      }
    }
    return false;
  }
  private decodeToken(token: string): any {
    try {
      // Split the token into its parts and decode the payload
      const tokenParts = token.split('.');
      const tokenPayload = JSON.parse(atob(tokenParts[1]));
      return tokenPayload;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
}
