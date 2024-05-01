"use client"

import MiceWriteEditor from "@/components/MiceWriteEditor";

export default function Home() {
  return (
    <div className="container mx-auto p-3 mt-3 text-myNeutral-charcoalGrey flex flex-col gap-y-3">
      <h1 className="text-center font-display text-6xl">Mice Write</h1>
      <p className="text-center font-body tracking-widest">Your best supportive draft writter.</p>
      <MiceWriteEditor />
    </div>
  );
}
