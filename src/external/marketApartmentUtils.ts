import axios from "axios";

async function getGeocode(locationString: string): Promise<[lat: number, lon: number] | undefined> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(locationString)}&format=geocodejson`;
    const response = await axios.get(url);
    if (response.data.features) {
      // in the API response somewhy lat has index 1, lon has index 0
      const lat = response.data.features[0].geometry.coordinates[1];
      const lon = response.data.features[0].geometry.coordinates[0];
      return [lat, lon];
    } else {
      return undefined;
    }
  } catch (error) {
    console.error('Error fetching geocode data:', error);
    return undefined;
  }
};

function getHaversineDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const r = 6371; // km
  const p = Math.PI / 180;

  const a = 0.5 - Math.cos((lat2 - lat1) * p) / 2
                + Math.cos(lat1 * p) * Math.cos(lat2 * p) *
                  (1 - Math.cos((lon2 - lon1) * p)) / 2;

  return 2 * r * Math.asin(Math.sqrt(a));
}

function priceToAmd(price: number, currency: string) {
  switch (currency) {
    case 'AMD':
      return price;
    case 'USD':
      return price * 401.21;
    case 'EUR':
      return price * 424.3;
    case 'RUB':
      return price * 3.97;
    default:
      return undefined;
  }
}

export { getHaversineDistance, priceToAmd, getGeocode }