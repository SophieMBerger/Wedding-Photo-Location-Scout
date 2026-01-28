"use server";

import { prisma } from "@/lib/prisma";

export type LocationForMap = {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  description: string;
  createdAt: Date;
};

export async function getLocations(): Promise<LocationForMap[]> {
  console.log("Fetching locations from DB");
  return prisma.location.findMany({
    select: {
      id: true,
      latitude: true,
      longitude: true,
      name: true,
      description: true,
      createdAt: true,
    },
  });
}
