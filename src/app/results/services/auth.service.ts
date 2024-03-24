import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { GetTokenResponse } from '../types/get-token-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  getToken() {
    return this.http.post<GetTokenResponse>(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      'client_id=MtA7nxruf8BwxO2LA0RLsSMQUOuAN4hV&client_secret=vJKp34x8GJbGR5yE&grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
