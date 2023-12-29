import Link from "next/link";
import { Button } from "../button";

export default function BuiltByMe() {
    return (
        <div className="text-sm">
            Built by
            <Button variant='link' className="px-1">
                <Link target="_blank" href='https://github.com/vikaspatil0021'>
                    vikaspatil0021
                </Link>
            </Button>
        </div>
    )
}