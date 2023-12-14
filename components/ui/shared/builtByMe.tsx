import Link from "next/link";
import { Button } from "../button";

export default function BuiltByMe(){
    return(
        <div className="text-sm pt-2 mb-20">
                Built by
                <Button variant='link' className="px-1">
                    <Link href='https://github.com/vikaspatil0021'>
                        vikaspatil0021
                    </Link>
                </Button>
            </div>
    )
}