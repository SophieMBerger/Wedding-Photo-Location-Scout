import { getLocations } from "@/actions/getLocations";
import MapClient from "./Map/MapClient";

export default async function Home() {
  const locations = await getLocations();

  console.log("Fetched locations: ", locations);

  const markers = locations.map((loc) => ({
    key: String(loc.id),
    name: loc.name,
    description: loc.description,
    location: {
      lat: loc.latitude,
      lng: loc.longitude,
    },
  }));

  return <MapClient initialMarkers={markers} />;
}
