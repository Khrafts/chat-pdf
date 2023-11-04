import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-center">
        <SignIn />
      </div>
    </div>
  );
}
