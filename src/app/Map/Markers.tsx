import { AdvancedMarker, InfoWindow, Pin } from "@vis.gl/react-google-maps";
import { useState } from "react";
import Image from "next/image";

export type Marker = {
  key: string;
  name: string;
  description: string;
  imageUrl: string | null;
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
            {selectedMarker.imageUrl && (
              <Image
                src={selectedMarker.imageUrl}
                width={80}
                height={80}
                alt="Preview of the location"
              />
            )}

            <h1 className="text-lg">{selectedMarker.name}</h1>
            <h4>{selectedMarker.description}</h4>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
