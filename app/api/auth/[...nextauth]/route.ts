import NextAuth from "next-auth/next";
// import { NextAuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google"
// import FacebookProvider from "next-auth/providers/facebook";
// // import type { Adapter } from "next-auth/adapters";

// import { PrismaAdapter } from "@auth/prisma-adapter";
// // import { PrismaAdapter } from "@next-auth/prisma-adapter";
// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

// const authOptions: NextAuthOptions = {
//     session: { strategy: "jwt" },
//     secret: process.env.NEXTAUTH_SECRET,
//     providers: [
//         GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID || "",
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
//         }),
//         FacebookProvider({
//             clientId: process.env.FACEBOOK_CLIENT_ID || "",
//             clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
//         })
//     ],
//     adapter: PrismaAdapter(prisma) as any,
//     pages: {
//         signIn: "/signin",
//     },
//     callbacks: {
//         session: async ({ session, token }) => {
//             if (token) {
//                 session.user.id = `${token.id}`;
//                 session.user.name = token.name;
//                 session.user.email = token.email;
//                 session.user.image = token.picture;
//                 session.user.role = token.role //as Role;
//                 session.user.phone1 = token.phone1 as string;
//                 session.user.phone2 = token.phone2 as string;
//             }
//             // await prisma.$disconnect()
//             return session
//         },
//         jwt: async ({ token, user }) => {
//             const dbuser = await prisma.user.findFirst({
//                 where: {
//                     email: token.email
//                 }
//             })
//             if (!dbuser) {
//                 token.id = user!.id
//                 return token;
//             }
//             await prisma.$disconnect()
//             return {
//                 id: dbuser.id,
//                 name: dbuser.name,
//                 email: dbuser.email,
//                 picture: dbuser.image,
//                 role: dbuser.role,
//                 phone1: dbuser.phone1,
//                 phone2: dbuser.phone2
//             }
//         }
//     }
// }
import { authOptions } from "@/utils/authOptions";

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }