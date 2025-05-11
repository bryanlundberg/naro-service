import { SignInButton, SignOutButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <><SignInButton mode={"modal"} withSignUp forceRedirectUrl={"/app/projects"}/><SignOutButton/></>
  );
}
