"use client";

import { useEffect } from "react";
import { useMap } from "@vis.gl/react-google-maps";

export default function MapPanComponent({
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
