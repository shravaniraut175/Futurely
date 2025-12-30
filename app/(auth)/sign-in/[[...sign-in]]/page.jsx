import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn
        appearance={{
          elements: {
            card: "p-6",
            formButtonPrimary: "py-2 px-4",
            formFieldInput: "py-2 px-3",
            formFieldLabel: "mb-1",
            footer: "mt-4",
          },
        }}
      />
    </div>
  );
}
