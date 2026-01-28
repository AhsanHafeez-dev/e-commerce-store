import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !session.user.id) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const { cartItems } = await request.json();

    if (!cartItems || cartItems.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    const totalPrice = cartItems.reduce(
      (sum: number, item: any) => sum + item.price * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId,
          totalPrice,
          orderItems: {
            create: cartItems.map((item: any) => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price,
            })),
          },
        },
      });
      return newOrder;
    });

    return NextResponse.json({ message: "Order placed successfully", order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}