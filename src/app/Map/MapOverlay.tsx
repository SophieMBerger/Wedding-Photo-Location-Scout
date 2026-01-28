"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

export default function MapOverlay({
  onSearch,
}: {
  onSearch: (query: string) => void;
}) {
  const [place, setPlace] = useState("");

  return (
    <div className="absolute top-4 left-4 z-50 pointer-events-auto">
      <Card className="w-80 p-4 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSearch(place);
          }}
        >
          <input
            id="place"
            autoComplete="on"
            placeholder="Location name"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
        </form>
      </Card>
    </div>
  );
}
