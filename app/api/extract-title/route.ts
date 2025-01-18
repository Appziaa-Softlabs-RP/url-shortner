import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
        return NextResponse.json({ error: 'URL is required' }, { status: 400 })
    }

    try {
        const response = await fetch(url)
        const html = await response.text()
        const titleMatch = html.match(/<title>(.*?)<\/title>/)
        const title = titleMatch ? titleMatch[1] : ''

        return NextResponse.json({ title })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}

