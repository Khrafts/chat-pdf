import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
import { LogIn } from "lucide-react";
import FileUpload from "@/components/FileUpload";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;
  return (
    <div className="flex items-center justify-center w-screen min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <h1 className="mr-3 text-5xl font-semibold">Chat with any PDF</h1>
          <UserButton afterSignOutUrl="/" /> {/*only shows when signed in */}
        </div>
        <div className="flex mt-2 justify-center">
          {isAuth && <Button>Go to chats</Button>}
        </div>
        <p className="max-w-xl mt-1 text-lg text-slate-600">
          {" "}
          Join millions of students, researchers and professionals to understand
          research with AI
        </p>
        <div className="w-full mt-4">
          {isAuth ? (
            <FileUpload />
          ) : (
            <Link href="/sign-in">
              <Button>
                Login to get started
                <LogIn className="w-4 h-4 ml-2"> </LogIn>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
