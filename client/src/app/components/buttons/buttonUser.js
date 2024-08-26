'use client';
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";

export default function ButtonProfile({username, children}){
    const router= useRouter();
    return(
        <Button
            onClick={router.push('/username')}
        >
            {children}
        </Button>
    )
}