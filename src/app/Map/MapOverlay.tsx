"use client";

import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import type { PutBlobResult } from "@vercel/blob";

export default function MapOverlay({
  onSave,
  onQuerySubmit,
}: {
  onSave: (description: string, query: string, image: File | null) => void;
  onQuerySubmit: (query: string) => void;
}) {
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("Image uploaded: ", file.name, file.type, file.size);

    setImage(file);
  };

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
              <Input
                className=""
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
                  onClick={() => onSave(description, place, image)}
                >
                  Save Location
                </Button>
              )}
            </div>
            {place && (
              <div className="flex flex-row gap-2">
                <Input
                  className="flex mb-2"
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                ></Input>
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
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  );
}
