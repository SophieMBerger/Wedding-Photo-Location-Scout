"use client";

import {
  APIProvider,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import assert from "assert";
import { useEffect, useState } from "react";
import Markers from "./Markers";

export const vancouverCoordinates = { lat: 49.2827, lng: -123.1207 };

export async function getPlaceDetails(
  query: string,
  locationBias: google.maps.LatLngLiteral,
) {
  const request = {
    textQuery: query,
    fields: ["displayName", "location", "businessStatus"],
    includedType: "",
    useStrictTypeFiltering: true,
    locationBias: locationBias,
    isOpenNow: true,
    language: "en-US",
    maxResultCount: 8,
    minRating: 1,
    region: "us",
  };

  const { places } = await google.maps.places.Place.searchByText(request);
  return places;
}

function MapCenterChangeListener({
  onCenterChange,
}: {
  onCenterChange: (center: google.maps.LatLngLiteral) => void;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const updateCenter = () => {
      const center = map.getCenter();
      if (!center) return;

      onCenterChange({
        lat: center.lat(),
        lng: center.lng(),
      });
    };

    updateCenter();
    map.addListener("idle", updateCenter);

    return () => {
      google.maps.event.clearListeners(map, "idle");
    };
  }, [map, onCenterChange]);

  return null;
}

export default function MapComponent() {
  const [center, setCenter] = useState(vancouverCoordinates);
  const [markerLocations, setMarkerLocations] = useState([
    { key: "vancouver", location: vancouverCoordinates },
  ]);

  assert(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "Maps API key must exist",
  );

  return (
    <APIProvider
      apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <GoogleMap
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={vancouverCoordinates}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        <MapCenterChangeListener onCenterChange={setCenter} />
        <Markers markerLocations={markerLocations} />
      </GoogleMap>
    </APIProvider>
  );
}
