export async function POST(
    request: Request
) {
    try {
        const formData = await request.formData()

        const res = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/verifyOtpWithoutLogin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
            },
            body: formData,
            cache: 'no-cache'
        });

        const json = await res.json();

        return Response.json({
            message: json?.message,
            data: json?.data ?? null,
        }, {
            status: res.status
        })

    } catch (e: any) {
        return Response.json({ error: e.message });
    }
}