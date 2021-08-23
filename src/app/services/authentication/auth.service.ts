import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isAuthorized = false;

    private baseURL = "http://localhost:3000/auth/";
    private madRequest: Promise<boolean>;
    private madeRequestStatic: boolean;

    constructor(private http: HttpClient, private router: Router) {
        this.madRequest = new Promise((res, rej) => {
            http
                .get(this.baseURL + "is-authenticated")
                .pipe()
                .subscribe((auth) => {
                    // @ts-ignore
                    if (auth.data) {
                        this.isAuthorized = true;
                        this.madeRequestStatic = true;
                        res(true);
                    } else {
                        this.madeRequestStatic = true;
                        res(false);
                    }
                });
        });
    }

    public login(email: string, password: string): Observable<any> {
        return this.http.post(this.baseURL + "login", {
            email: email,
            password: password,
        });
    }

    public logout(): void {
        this.isAuthorized = false;
        localStorage.removeItem("id_token");
        this.router.navigate(['/home']);
    }

    public register(email: string, firstname: string, lastname: string, password: string) {
        return this.http.post(this.baseURL + 'register', {
            email: email,
            lastName: lastname,
            firstName: firstname,
            password: password,
        });
    }

    public checkAuthenticated(): Observable<any> {
        return this.http.get(this.baseURL + 'is-authenticated');
    }

    public isAuthenticated(): Promise<boolean> {
        if (this.madeRequestStatic) {
            return new Promise((res, rej) => {
                res(this.isAuthorized);
            });
        } else {
            return new Promise((res, rej) => {
                this.madRequest.then(data => {
                    res(this.isAuthorized);
                })
            });
        }
    }

}