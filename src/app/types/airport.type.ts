export interface AirportsResult {
  meta: Meta;
  data: Airport[];
}

export interface Airport {
  type: string;
  subType: string;
  name: string;
  detailedName: string;
  timeZoneOffset: string;
  iataCode: string;
  geoCode: GeoCode;
  address: Address;
  distance: Distance;
  analytics: Analytics;
  relevance: number;
}

interface Meta {
  count: number;
  links: Links;
}

interface Links {
  self: string;
  next: string;
  last: string;
}

interface GeoCode {
  latitude: number;
  longitude: number;
}

interface Address {
  cityName: string;
  cityCode: string;
  countryName: string;
  countryCode: string;
  regionCode: string;
}

interface Distance {
  value: number;
  unit: string;
}

interface Analytics {
  flights: Flights;
  travelers: Travelers;
}

interface Flights {
  score: number;
}

interface Travelers {
  score: number;
}
