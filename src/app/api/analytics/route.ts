import { getMonthlyUsers } from "@/src/lib/analytics";
import { NextResponse } from "next/server";

export async function GET() {
  const monthlyUsers = await getMonthlyUsers();
  return NextResponse.json({ users: monthlyUsers });
}
