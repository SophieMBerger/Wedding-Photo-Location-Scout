"use client";

import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

export default function MapCenterChangeComponent({
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
