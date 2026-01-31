import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { name, lat, lng, description, imageUrl } = await req.json();

    const location = await prisma.location.create({
      data: {
        name: name,
        latitude: lat,
        longitude: lng,
        description: description,
        imageUrl: imageUrl,
      },
    });

    console.log("Location being saved: ", location);
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("❌ Error saving location:", error);

    return NextResponse.json(
      { ok: false, error: String(error) },
      { status: 500 },
    );
  }
}
