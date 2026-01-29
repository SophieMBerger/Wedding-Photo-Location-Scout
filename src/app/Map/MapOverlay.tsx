"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

export default function MapOverlay({
  onSave,
  onQuerySubmit,
}: {
  onSave: (description: string, query: string) => void;
  onQuerySubmit: (query: string) => void;
}) {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="absolute top-4 left-4 z-50 pointer-events-auto">
      <Card className="p-4 shadow-lg">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onQuerySubmit(place);
          }}
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <input
                id="place"
                autoComplete="on"
                placeholder="Location name"
                value={place}
                onChange={(e) => setPlace(e.target.value)}
              />
              {place && (
                <Button
                  type="button"
                  disabled={!place}
                  onClick={() => onSave(description, place)}
                >
                  Save Location
                </Button>
              )}
            </div>
            {place && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Add Notes</Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Textarea
                    placeholder="Enter your notes here."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
