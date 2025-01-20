import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(
    request: Request
) {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')
    const short_code = searchParams.get('short_code')

    if (!url) {
        return NextResponse.json({ message: 'URL is required' }, { status: 400 })
    }

    try {
        const formData = new FormData();
        formData.append('url', url);
        if (short_code)
            formData.append('short_code', short_code);
        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/user/validate-auth-user-url`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${session?.accessToken}`
            },
            body: formData,
            cache: 'force-cache'
        });

        const json = await res.json();

        return NextResponse.json({
            message: json?.message,
        }, { status: 400 })

    } catch (e: any) {
        return NextResponse.json({
            message: e.message
        }, { status: 500 })
    }
}