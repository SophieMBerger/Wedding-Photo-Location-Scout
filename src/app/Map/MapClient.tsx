"use client";

import { useState } from "react";
import MapComponent, { getPlaceDetails } from "./MapComponent";
import MapOverlay from "./MapOverlay";
import type { Marker } from "./Markers";

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

    console.log("Details of place searched for: ", places[0]);

    const place = places[0];
    if (!place.location) return;

    const newMarker = {
      key: place.id,
      name: place.displayName || "",
      description: place.businessStatus || "",
      location: {
        lat: place.location.lat(),
        lng: place.location.lng(),
      },
    };

    setMarkers((prev) => [...prev, newMarker]);

    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newMarker.name,
        description: newMarker.description,
        lat: newMarker.location.lat,
        lng: newMarker.location.lng,
      }),
    });
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
