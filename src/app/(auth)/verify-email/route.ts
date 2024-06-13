import { type NextRequest, NextResponse } from "next/server";
import { createUserEmailVerificationConfirmation } from '@/lib/actions/user.actions';

// Creating a handler to a GET request to route /auth/verify-email
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const secret = searchParams.get("secret");
  const next = "/dashboard";

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone();
  redirectTo.pathname = next;
  redirectTo.searchParams.delete("userId");
  redirectTo.searchParams.delete("secret");

  if (userId && secret) {
    const response = await createUserEmailVerificationConfirmation({ userId, secret });

    console.log(response, 'see response');

    if (response) {
      redirectTo.searchParams.delete("next");
      return NextResponse.redirect(redirectTo);
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = "/error";
  return NextResponse.redirect(redirectTo);
}
