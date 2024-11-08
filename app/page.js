import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center max-w-4xl mx-auto text-center">
      <h1 className="text-6xl mb-4">
        Don&apos;t waste time on meetings, keep your work async
      </h1>
      <p className="mb-8 text-neutral-600">
        Async is a easy to use and nice to look at project, task management
        tool.
      </p>
      <Link href="/workspace">
        <Button>Start Asyncing</Button>
      </Link>
    </div>
  );
}
