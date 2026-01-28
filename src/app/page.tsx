import MapClient from "./Map/MapClient";
import { getLocations } from "@/actions/getLocations";

export default async function Home() {
  const locations = await getLocations();

  const markers = locations.map((loc) => ({
    key: String(loc.id),
    location: {
      lat: loc.latitude,
      lng: loc.longitude,
    },
  }));

  return <MapClient initialMarkers={markers} />;
}
