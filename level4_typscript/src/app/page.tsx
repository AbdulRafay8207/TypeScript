'use client'
import Button from "@/components/Button";
import { useState } from "react";

export default function Home() {
  const [count, setCount] = useState<number>()
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Button data={"Hi from home page"} page="Home page"/>
    </div>
  );
}
