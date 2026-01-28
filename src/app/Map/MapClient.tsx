"use client";

import MapComponent, { getPlaceDetails } from "./MapComponent";
import MapOverlay from "./MapOverlay";
import { useState } from "react";

type Marker = {
  key: string;
  location: {
    lat: number;
    lng: number;
  };
};

type MapClientProps = {
  initialMarkers: Marker[];
};

export const vancouverCoordinates = { lat: 49.2827, lng: -123.1207 };

export default function MapClient({ initialMarkers }: MapClientProps) {
  const [center, setCenter] = useState(vancouverCoordinates);
  const [markers, setMarkers] = useState(initialMarkers);

  async function handleSearch(query: string) {
    if (!query.trim()) return;

    const places = await getPlaceDetails(query, center);
    if (!places[0].location) return;

    setMarkers(
      markers.concat({
        key: places[0].id,
        location: {
          lat: places[0].location.lat(),
          lng: places[0].location.lng(),
        },
      }),
    );
  }

  return (
    <div className="relative w-screen h-screen">
      <MapComponent markerLocations={markers} onCenterChange={setCenter} />

      <div className="absolute inset-0 pointer-events-none">
        <MapOverlay onSearch={handleSearch} />
      </div>
    </div>
  );
}
