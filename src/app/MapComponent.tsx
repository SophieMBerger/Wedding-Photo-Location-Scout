"use client";

import {
  APIProvider,
  Map as GoogleMap,
  useMap,
} from "@vis.gl/react-google-maps";
import assert from "assert";
import { useEffect } from "react";
import Markers from "./Markers";
import { vancouverCoordinates } from "./page";

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

function MapPanEffect({
  markerLocations,
}: {
  markerLocations: {
    key: string;
    location: google.maps.LatLngLiteral;
  }[];
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || markerLocations.length === 0) return;

    const newest = markerLocations.at(-1);

    if (!newest?.location) return;

    map.panTo(newest?.location);
  }, [map, markerLocations]);
  return null;
}

export default function MapComponent({
  markerLocations,
  onCenterChange,
}: {
  markerLocations: {
    key: string;
    location: google.maps.LatLngLiteral;
  }[];
  onCenterChange: (center: google.maps.LatLngLiteral) => void;
}) {
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
        <MapCenterChangeListener onCenterChange={onCenterChange} />
        <MapPanEffect markerLocations={markerLocations} />
        <Markers markerLocations={markerLocations} />
      </GoogleMap>
    </APIProvider>
  );
}
