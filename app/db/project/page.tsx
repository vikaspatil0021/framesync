"use client"

import { redirect, usePathname  } from "next/navigation";

export default function Project() {
  
  const pathName = usePathname()

  if(pathName == '/db/project')  return redirect('/db/recents');

}
