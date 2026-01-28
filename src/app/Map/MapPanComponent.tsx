"use client";

import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function MapPanComponent({
  location,
}: {
  location: google.maps.LatLngLiteral;
}) {
  const map = useMap();

  useEffect(() => {
    if (!map || !location) return;

    map.panTo(location);
  }, [map, location]);
  return null;
}
