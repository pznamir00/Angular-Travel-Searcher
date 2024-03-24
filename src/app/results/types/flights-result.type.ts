export interface FlightsResult {
  meta: Meta;
  data: Flight[];
  dictionaries: Dictionaries;
}

export interface Meta {
  count: number;
}

export interface Flight {
  type: string;
  id: string;
  source: string;
  instantTicketingRequired: boolean;
  nonHomogeneous: boolean;
  oneWay: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime: string;
  numberOfBookableSeats: number;
  itineraries: Itinerary[];
  price: Price;
  pricingOptions: PricingOptions;
  validatingAirlineCodes: string[];
  travelerPricings: TravelerPricing[];
}

export interface Itinerary {
  duration: string;
  segments: Segment[];
}

export interface Segment {
  departure: Departure;
  arrival: Arrival;
  carrierCode: string;
  number: string;
  aircraft: Aircraft;
  operating: Operating;
  duration: string;
  id: string;
  numberOfStops: number;
  blacklistedInEU: boolean;
}

export interface Departure {
  iataCode: string;
  at: string;
  terminal?: string;
}

export interface Arrival {
  iataCode: string;
  at: string;
  terminal?: string;
}

export interface Aircraft {
  code: string;
}

export interface Operating {
  carrierCode: string;
}

export interface Price {
  currency: string;
  total: string;
  base: string;
  fees: Fee[];
  grandTotal: string;
}

export interface Fee {
  amount: string;
  type: string;
}

export interface PricingOptions {
  fareType: string[];
  includedCheckedBagsOnly: boolean;
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: string;
  price: Price2;
  fareDetailsBySegment: FareDetailsBySegment[];
}

export interface Price2 {
  currency: string;
  total: string;
  base: string;
}

export interface FareDetailsBySegment {
  segmentId: string;
  cabin: string;
  fareBasis: string;
  class: string;
  includedCheckedBags: IncludedCheckedBags;
}

export interface IncludedCheckedBags {
  quantity: number;
}

export interface Dictionaries {
  locations: Locations;
  aircraft: Aircraft2;
  currencies: Currencies;
  carriers: Carriers;
}

export interface Locations {
  MAD: Mad;
  LHR: Lhr;
  JFK: Jfk;
}

export interface Mad {
  cityCode: string;
  countryCode: string;
}

export interface Lhr {
  cityCode: string;
  countryCode: string;
}

export interface Jfk {
  cityCode: string;
  countryCode: string;
}

export interface Aircraft2 {
  '320': string;
  '343': string;
  '733': string;
}

export interface Currencies {
  USD: string;
}

export interface Carriers {
  '6X': string;
  '7S': string;
}
