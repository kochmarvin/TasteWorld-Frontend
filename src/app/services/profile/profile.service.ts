import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {

    private baseURL = 'http://localhost:3000/profile/';

    constructor(private http: HttpClient, private router: Router) { }

    public getProfileData(): Observable<any> {
        return this.http.get(this.baseURL + 'personal-data');
    }

    public updatePersonalInformationData(firstname: any, lastname: any, email: any, file: any): Observable<any> {
        const body = new FormData();
        const data = { firstName: firstname, lastName: lastname, email };
        body.append('data', JSON.stringify(data));
        body.append('userImage', file);
        return this.http.put(this.baseURL + 'update-data', body);
    }


}
