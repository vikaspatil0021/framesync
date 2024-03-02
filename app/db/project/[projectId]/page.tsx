'use client'
import { usePathname } from "next/navigation";

export default function Page(){
    const pathName = usePathname();

   const activePage = pathName.replace('/db/', '');
    return (
        <>
        hi {activePage}
        </>
    )
}
