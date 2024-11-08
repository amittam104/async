import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl mb-4">Keep working, Async</h1>
      <p className="mb-6 text-neutral-600">
        Don&apos;t waste time on calls and meetings, keep your work async
      </p>
      <Link href="/workspace">
        <Button>Start Asyncing</Button>
      </Link>
    </div>
  );
}
