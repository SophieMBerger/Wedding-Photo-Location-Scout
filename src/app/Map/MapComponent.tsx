"use client";

import assert from "node:assert";
import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import MapCenterChangeComponent from "./MapCenterChangeComponent";
import { vancouverCoordinates } from "./MapClient";
import MapPanComponent from "./MapPanComponent";
import Markers, { type Marker } from "./Markers";

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

export default function MapComponent({
  markerLocations,
  searchedLocation,
  onCenterChange,
}: {
  markerLocations: Marker[];
  searchedLocation: google.maps.LatLngLiteral;
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
        <MapCenterChangeComponent onCenterChange={onCenterChange} />
        <MapPanComponent location={searchedLocation} />
        <Markers markerLocations={markerLocations} />
      </GoogleMap>
    </APIProvider>
  );
}
