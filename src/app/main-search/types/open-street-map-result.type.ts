export interface OpenStreetMapResult {
  display_name: string;
  address: {
    house_number: string;
    road: string;
    residential: string;
    suburb: string;
    city: string;
    state: string;
    'ISO3166-2-lvl4': string;
    postcode: string;
    country: string;
    country_code: string;
  };
}
