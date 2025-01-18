import { getUrls } from '@/api';
import ShowLinks from '@/components/forms/dashboard/links/show-links';
import { authOptions } from '@/lib/auth-options';
import { getServerSession } from 'next-auth';

const getUrlsData = async ({ token, search, page, limit }: any) => {
    try {
        return await getUrls({
            token: token,
            search: search,
            page: page,
            limit: limit
        });
    } catch (e) {
        return null
    }
}

export default async function LinksPage() {

    const session = await getServerSession({
        ...authOptions,
        pages: {
            signIn: "/login",
        },
    });

    const data = await getUrlsData({
        token: session?.accessToken,
        search: '',
        page: 1,
        limit: 10
    });

    return (
        <>
            <ShowLinks
                links={data}
                token={session?.accessToken}
            />
        </>
    )
}

