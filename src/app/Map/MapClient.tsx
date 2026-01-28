"use client";

import MapComponent, { getPlaceDetails } from "./MapComponent";
import MapOverlay from "./MapOverlay";
import { useState } from "react";
import { getLocations } from "@/actions/getLocations";

export type Marker = {
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

    console.log("Details of place searched for: ", places[0]);

    const newMarker = {
      key: places[0].id,
      location: {
        lat: places[0].location.lat(),
        lng: places[0].location.lng(),
      },
    };

    setMarkers((prev) => [...prev, newMarker]);

    await fetch("/api/locations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: newMarker.key,
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
