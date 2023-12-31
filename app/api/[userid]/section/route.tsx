import { serverAuth } from "@/lib/serverAuth";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  req: Request,
  { params }: { params: { userid: string } }
) {
  const { currentUser } = await serverAuth();
  if (!currentUser) {
    return new NextResponse("Unauthenticated", { status: 400 });
  }
  if (currentUser.id !== params.userid) {
    return new NextResponse("Unauthenticated", { status: 400 });
  }

  try {
    const body = await req.json();
    const {
      name,
      about,
      isActive,
      template,
      backgroundColor,
      textColor,
      itemsBackgroundColor,
      itemsTextColor,
    } = body;

    if (!name) {
      return new NextResponse("Name is required", { status: 404 });
    }
    if (!about) {
      return new NextResponse("About is required", { status: 404 });
    }
    if (!template) {
      return new NextResponse("Template is required", { status: 404 });
    }
    const isSectionExist = await prisma.section.findFirst({
      where: {
        userid: currentUser.id,
        name,
      },
    });
    if (isSectionExist) {
      return new NextResponse(
        "Name is already used to create another section",
        { status: 404 }
      );
    }
    const section = await prisma.section.create({
      data: {
        userid: currentUser.id,
        name,
        about,
        isActive,
        template,
        backgroundColor,
        textColor,
        itemsBackgroundColor,
        itemsTextColor,
      },
    });
    return NextResponse.json(section);
  } catch (error) {
    console.log("Section_post", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
