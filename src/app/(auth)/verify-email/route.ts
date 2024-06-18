import { type NextRequest, NextResponse } from "next/server";
import {
  createUserEmailVerificationConfirmation,
  getUserSession,
} from "@/lib/actions/user.actions";
import { cookies } from "next/headers";

// Creating a handler to a GET request to route /auth/verify-email
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const sessionId = searchParams.get("id");
  const next = "/dashboard";

  const cookieStore = cookies();

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("userId");
  redirectTo.searchParams.delete("secret");
  redirectTo.searchParams.delete("id");
  redirectTo.searchParams.delete("expire");

  if (userId && secret) {
    const response = await createUserEmailVerificationConfirmation({
      userId,
      secret,
    });

    console.log(response, "see response");

    if (response) {
      redirectTo.searchParams.delete("next");

      if (sessionId) {

        // Create a NextResponse object for setting cookies
        const redirectResponse = NextResponse.redirect(redirectTo, {
          status: 302,
        });

        // redirectResponse.cookies.set("chimoney-session", ``, {
        //   path: "/",
        //   httpOnly: true,
        //   sameSite: "lax",
        //   secure: true,
        // });

        console.log(redirectResponse, "see redirect response");
        return redirectResponse;
      }
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
