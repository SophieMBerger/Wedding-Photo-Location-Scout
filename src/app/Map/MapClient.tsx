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
  const [locationSearched, setLocationSearched] =
    useState<google.maps.LatLngLiteral>(vancouverCoordinates);
  const [place, setPlace] = useState<google.maps.places.Place | null>(null);

  async function handlePlaceSearch(query: string) {
    if (!query.trim()) return;

    const places = await getPlaceDetails(query, center);

    console.log("Details of place searched for: ", places[0]);

    const searchedPlace = places[0];

    if (!searchedPlace) return;
    if (!searchedPlace.location) return;

    setPlace(searchedPlace);

    setLocationSearched({
      lat: searchedPlace.location.lat(),
      lng: searchedPlace.location.lng(),
    });
  }

  async function handleSearch() {
    if (!place || !place.location) return;
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

    setPlace(null);
  }

  return (
    <div className="relative w-screen h-screen">
      <MapComponent
        markerLocations={markers}
        onCenterChange={setCenter}
        searchedLocation={locationSearched}
      />

      <div className="absolute inset-0 pointer-events-none">
        <MapOverlay onSearch={handleSearch} onQuerySubmit={handlePlaceSearch} />
      </div>
    </div>
  );
}
