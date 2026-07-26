import { NextRequest, NextResponse } from 'next/server';
import Pusher from 'pusher';

export async function POST(req: NextRequest) {
  try {
    const appId = process.env.PUSHER_APP_ID;
    const key = process.env.NEXT_PUBLIC_PUSHER_KEY;
    const secret = process.env.PUSHER_SECRET;
    const cluster = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1';

    if (!appId || !key || !secret) {
      return NextResponse.json(
        { message: 'Pusher environment variables not set; operating in local BroadcastChannel mode.' },
        { status: 200 }
      );
    }

    const pusher = new Pusher({
      appId,
      key,
      secret,
      cluster,
      useTLS: true,
    });

    const body = await req.json();

    await pusher.trigger('patient-channel', 'patient-update', body);

    return NextResponse.json({ success: true, timestamp: new Date().toISOString() });
  } catch (error: any) {
    console.error('Pusher trigger API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
