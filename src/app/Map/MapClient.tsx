"use client";

import { useState } from "react";
import MapComponent, { getPlaceDetails } from "./MapComponent";
import MapOverlay from "./MapOverlay";
import type { Marker } from "./Markers";
import { PutBlobResult } from "@vercel/blob";

type MapClientProps = {
  initialMarkers: Marker[];
};

export const vancouverCoordinates = { lat: 49.2827, lng: -123.1207 };

export default function MapClient({ initialMarkers }: MapClientProps) {
  const [center, setCenter] = useState(vancouverCoordinates);
  const [markers, setMarkers] = useState(initialMarkers);
  const [locationSearched, setLocationSearched] =
    useState<google.maps.LatLngLiteral>(vancouverCoordinates);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);

  async function handlePlaceSearch(query: string) {
    if (!query.trim()) return;

    const places = await getPlaceDetails(query, center);

    console.log("Details of place searched for: ", places[0]);

    const searchedPlace = places[0];

    if (!searchedPlace) return;
    if (!searchedPlace.location) return;

    setLocationSearched({
      lat: searchedPlace.location.lat(),
      lng: searchedPlace.location.lng(),
    });

    return searchedPlace;
  }

  async function handleSave(
    description: string,
    query: string,
    image: File | null,
  ) {
    const searchedPlace = await handlePlaceSearch(query);

    let newBlob: PutBlobResult | null = null;

    if (image) {
      const response = await fetch(
        `/api/locations/upload?filename=${image?.name}`,
        {
          method: "POST",
          body: image,
        },
      );

      newBlob = (await response.json()) as PutBlobResult;

      console.log("Blob result: ", newBlob);

      setBlob(newBlob);
    } else {
      console.log("No image provided");
    }
    const imageUrl = newBlob?.url ?? null;

    console.log("Blob url: ", imageUrl);

    if (!searchedPlace || !searchedPlace.location) return;
    const newMarker = {
      key: searchedPlace.id,
      name: searchedPlace.displayName || "",
      description: description,
      imageUrl: imageUrl,
      location: {
        lat: searchedPlace.location.lat(),
        lng: searchedPlace.location.lng(),
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
        imageUrl: imageUrl,
      }),
    });
  }

  return (
    <div className="relative w-screen h-screen">
      <MapComponent
        markerLocations={markers}
        onCenterChange={setCenter}
        searchedLocation={locationSearched}
      />

      <div className="absolute inset-0 pointer-events-none">
        <MapOverlay onSave={handleSave} onQuerySubmit={handlePlaceSearch} />
      </div>
    </div>
  );
}
