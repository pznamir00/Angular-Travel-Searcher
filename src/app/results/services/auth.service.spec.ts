import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        MockProvider(HttpClient, {
          post: jest.fn(() => of({ result: true } as any)),
        }),
      ],
    });
    authService = TestBed.inject(AuthService);
  });

  describe('getToken', () => {
    it('calls http.post', (done) => {
      const http = TestBed.inject(HttpClient);
      authService.getToken().subscribe((res) => {
        expect(http.post).toHaveBeenCalled();
        //@ts-ignore
        expect(res).toEqual({ result: true });
        done();
      });
    });
  });
});
