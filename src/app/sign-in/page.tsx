import { RedirectToSignIn, SignedOut } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SignInPage() {
  const user = await auth();
  if (!user.isAuthenticated) {
    return (
      <SignedOut>
        <RedirectToSignIn redirectUrl={"/"} />
      </SignedOut>
    );
  } else {
    redirect("/");
  }
}
