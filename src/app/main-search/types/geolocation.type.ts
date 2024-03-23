export type GeoCoords = Omit<
  GeolocationCoordinates,
  'accuracy' | 'altitudeAccuracy' | 'heading' | 'speed'
>;

export type LatLon = Omit<GeoCoords, 'altitude'>;
