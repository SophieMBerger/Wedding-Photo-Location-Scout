import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

export type MarkerLocation = {
  key: string;
  location: google.maps.LatLngLiteral;
};

type MarkerProps = { markerLocations: MarkerLocation[] };

export default function Markers({ markerLocations }: MarkerProps) {
  return (
    <>
      {markerLocations.map((markerLocation) => (
        <AdvancedMarker
          key={markerLocation.key}
          position={markerLocation.location}
        >
          <Pin />
        </AdvancedMarker>
      ))}
    </>
  );
}
