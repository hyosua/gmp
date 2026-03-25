import { NextResponse } from "next/server";
import { Resend } from 'resend';

export async function POST(req: Request) {
  const body = await req.json();
  const resend = new Resend('re_Qwu9kQQ7_9CUHf1tQamTdRBsiW8kjRGyH');

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${resend}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "yahayac753@gmail.com",
      to: body.to,
      subject: "Hello",
      html: "<p>Test</p>",
    }),
  });

  const data = await res.json();

  return NextResponse.json(data);
}