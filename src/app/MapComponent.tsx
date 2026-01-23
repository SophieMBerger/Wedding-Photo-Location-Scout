"use client";

import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import assert from "assert";
import { useState } from "react";
import Markers from "./Markers";

export default function MapComponent() {
  const [markerLocations, setMarkerLocations] = useState([
    { key: "vancouver", location: { lat: 49.2827, lng: -123.1207 } },
  ]);

  assert(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "Maps API key must exist",
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 49.2827, lng: -123.1207 }}
        defaultZoom={15}
        gestureHandling="greedy"
        disableDefaultUI
        mapId={process.env.NEXT_PUBLIC_MAP_ID}
      >
        <Markers markerLocations={markerLocations} />
      </GoogleMap>
    </APIProvider>
  );
}
