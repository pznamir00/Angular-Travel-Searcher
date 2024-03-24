export interface Environment {
  production: boolean;
  clientCredentials: {
    id: string;
    secret: string;
  };
}
