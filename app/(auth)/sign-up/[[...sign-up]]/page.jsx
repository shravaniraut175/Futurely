import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignUp
        appearance={{
          elements: {
            card: "p-6",
            formButtonPrimary: "py-2 px-4",
            formFieldInput: "py-2 px-3",
            formFieldLabel: "mb-1",
          },
        }}
      />
    </div>
  );
}
