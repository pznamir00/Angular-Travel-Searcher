import {
  HTTP_INTERCEPTORS,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { AuthService } from '../results/services/auth.service';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        //@ts-ignore
        MockProvider(AuthService, {
          getToken: jest.fn(() => of({})),
        }),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should add token to request headers except for token request', () => {
    const token = 'test-token';
    localStorage.setItem('ACCESS_TOKEN', token);
    const testUrl = 'https://example.com/api/data';
    httpClient.get(testUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toEqual(true);
    expect(req.request.headers.get('Authorization')).toEqual(`Bearer ${token}`);
    req.flush({});
  });

  it('should remove authorization header for token request', () => {
    const testUrl = 'https://example.com/api/oauth2/token';
    httpClient.get(testUrl).subscribe((response) => {
      expect(response).toBeTruthy();
    });
    const req = httpTestingController.expectOne(testUrl);
    expect(req.request.headers.has('Authorization')).toEqual(false);
    req.flush({});
  });

  it('should propagate other errors', () => {
    const testUrl = 'https://example.com/api/data';
    httpClient.get(testUrl).subscribe(
      () => {},
      (error) => {
        expect(error.status).toEqual(500);
      },
    );
    const req = httpTestingController.expectOne(testUrl);
    //@ts-ignore
    req.error(new HttpErrorResponse({ status: 500 }));
  });
});
