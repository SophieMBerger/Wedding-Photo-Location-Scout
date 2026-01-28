import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";

export type Marker = {
  key: string;
  name: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
};

type MarkerProps = { markerLocations: Marker[] };

export default function Markers({ markerLocations }: MarkerProps) {
  const [selectedMarkerKey, setSelectedMarkerKey] = useState<string>("");

  const selectedMarker = markerLocations.find(
    (m) => m.key === selectedMarkerKey,
  );

  return (
    <>
      {markerLocations.map((markerLocation) => (
        <AdvancedMarker
          key={markerLocation.key}
          position={markerLocation.location}
          clickable={true}
          onClick={() => setSelectedMarkerKey(markerLocation.key)}
        >
          <Pin />
        </AdvancedMarker>
      ))}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.location}
          onCloseClick={() => setSelectedMarkerKey("")}
        >
          <div>
            <h3>{selectedMarker.name}</h3>
            <h4>{selectedMarker.description}</h4>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
