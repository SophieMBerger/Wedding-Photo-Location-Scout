"use client";

import { APIProvider, Map as GoogleMap } from "@vis.gl/react-google-maps";
import assert from "assert";

export default function MapComponent() {
  assert(
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    "Maps API key must exist",
  );

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
      />
    </APIProvider>
  );
}
