"use client"

import { redirect, usePathname  } from "next/navigation";

export default function DB() {

  const pathName = usePathname()
  
  if(pathName == '/db')  return redirect('/db/recents');
   
}
