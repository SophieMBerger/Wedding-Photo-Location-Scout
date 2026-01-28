import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

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

function showMarkerDetails(key: string) {}

export default function Markers({ markerLocations }: MarkerProps) {
  return (
    <>
      {markerLocations.map((markerLocation) => (
        <AdvancedMarker
          key={markerLocation.key}
          position={markerLocation.location}
          clickable={true}
          title={markerLocation.key}
        >
          <Pin />
        </AdvancedMarker>
      ))}
    </>
  );
}
