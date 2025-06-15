import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const query = url.searchParams.toString();
  const res = await fetch(`https://testing-api.ru-rating.ru/cars?${query}`);
  const data = await res.json();
  return NextResponse.json(data);
}
