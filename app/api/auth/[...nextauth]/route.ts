import { authOptions } from "@/lib/auth-options";
import NextAuth from 'next-auth';


const handler = NextAuth({
    ...authOptions,
    pages: {
        signIn: '/',
        error: '/login',
    },
    debug: true,
});
export { handler as GET, handler as POST };