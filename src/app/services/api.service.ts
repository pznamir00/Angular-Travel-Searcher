import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export abstract class ApiService {
  constructor(protected http: HttpClient) {}
}
