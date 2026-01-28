"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function MapOverlay({
  onSearch,
  onQuerySubmit,
}: {
  onSearch: () => void;
  onQuerySubmit: (query: string) => void;
}) {
  const [place, setPlace] = useState("");

  return (
    <div className="absolute top-4 left-4 z-50 pointer-events-auto">
      <Card className="p-4 shadow-lg">
        <form
          className="flex flex-row gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            onQuerySubmit(place);
          }}
        >
          <input
            id="place"
            autoComplete="on"
            placeholder="Location name"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />
          {place && (
            <Button type="button" disabled={!place} onClick={() => onSearch()}>
              Save Location
            </Button>
          )}
        </form>
      </Card>
    </div>
  );
}
