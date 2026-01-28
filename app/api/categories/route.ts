import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
    });
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}