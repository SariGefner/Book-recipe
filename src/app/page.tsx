'use client'
import { useEffect } from "react";
// import Page from "./pages/recipes/page";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push('/pages/recipes');
  })
  return (
    <div>

      {/* <Page></Page> */}

    </div>
  );
}
