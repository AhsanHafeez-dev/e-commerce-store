import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        category: true,
      },
    });
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}