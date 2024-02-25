import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Facebook from "next-auth/providers/facebook";

import type { NextAuthConfig } from "next-auth";

import { getUserByEmail } from "./src/data/user";
import { LoginSchema } from "@/schemas/login-schema";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const isMatchedPassword = await bcrypt.compare(
            password,
            user.password
          );

          if (isMatchedPassword) return user;
        }

        return null;
      },
    }),
    Google,
    Facebook,
  ],
} satisfies NextAuthConfig;
