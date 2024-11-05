import CredentialsProvider from 'next-auth/providers/credentials';

type authType = {
  email: string,
  password: string,
  otp: string | null,
  otpId: string | null,
  phone: string | null,
}

type User = {
  id: string,
  username: string,
  email: string,
  token: string,
  role: string,
}

type Error = {
  error: string
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" },
        otp: { label: "OTP", type: "text", placeholder: "OTP" },
        otpId: { label: "OTP ID", type: "text", placeholder: "OTP ID" },
        phone: { label: "Phone", type: "tel", placeholder: "Phone" },
      },

      // @ts-ignore
      authorize: async (credentials, _req): Promise<User | Error> => {
        try {
          const {
            email,
            password,
            otp = null,
            otpId = null,
            phone = null
          }: authType = credentials ?? {} as authType;

          if (otp && otpId && phone) {
            const formData = new FormData();
            formData.append('phone', phone);
            formData.append('otp', otp);
            formData.append('otp_id', otpId);

            const response = await fetch(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/api/v1/login-company-phone-otp-verify`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
              },
              body: formData,
              cache: 'no-cache'
            });

            if (response.status !== 200) {
              return {
                error: 'Invalid OTP',
              } as {
                error: string
              };
            }

            const json = (await response.json()) as any;
            if (response.status == 200) {
              return {
                id: json.data.user.id || '',
                username: json.data.user.first_name,
                email: json.data.user.email,
                token: json.data.token,
                role: json.data.user.role,
              } as User;
            }

          } else {
            const formData = new FormData();
            formData.append('email', email);
            formData.append('password', password);

            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
              },
              body: formData,
              cache: 'no-cache'
            });

            if (response.status === 401) {
              return {
                error: 'Invalid email or password',
              } as {
                error: string
              };
            }

            const json = (await response.json()) as any;

            if (response.status == 200) {
              return {
                id: json.data.user.id || '',
                username: json.data.user.first_name,
                email: json.data.user.email,
                token: json.data.token,
                role: json.data.user.role,
              } as User;
            }

            return {
              error: json.message,
            } as {
              error: string
            };
          }
        } catch (e: any) {
          return {
            error: e.message,
          } as {
            error: string
          }
        }
      },
    }),

  ],
  callbacks: {
    async signIn({ user }: any) {
      if (user?.error) {
        throw new Error(user?.error)
      }
      return true
    },
    async session({ session, token }: any) {
      if (token) {
        session.user = {
          id: token.id,
          name: token.username,
          email: token.email,
          role: token.role,
        }
        session.accessToken = token.token;
        session.user.isLoggedIn = true;
        return session;
      }
      return session;
    },
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
  },
  secret: process.env.NEXTAUTH_SECRET!,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET!,
    encryption: true,
    maxAge: 5 * 60,
  },
  pages: {
    signIn: ['/'],
    error: '/',
  },
  debug: true,
}