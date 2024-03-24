import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';
import { GetTokenResponse } from '../types/get-token-response.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends ApiService {
  getToken() {
    const { id, secret } = environment.clientCredentials;
    return this.http.post<GetTokenResponse>(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
      `client_id=${id}&client_secret=${secret}&grant_type=client_credentials`,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );
  }
}
