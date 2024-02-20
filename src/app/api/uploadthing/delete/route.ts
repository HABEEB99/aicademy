import { NextResponse } from "next/server";
import { UTApi } from "uploadthing/server";

const uploadThing = new UTApi();

export async function POST(req: Request) {
  const { imageKey } = await req.json();

  try {
    const response = await uploadThing.deleteFiles(imageKey);
    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
