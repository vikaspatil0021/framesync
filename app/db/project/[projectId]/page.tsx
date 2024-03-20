'use client'

import { usePathname } from "next/navigation";

import ProjectsContainer from "@/components/ui/db/projectsContainer/projectsContainer";


export default function Page() {

    const pathName = usePathname();
    const projectId = pathName.replace('/db/project/', '');

    return (
        <>
            <ProjectsContainer
                projectId={projectId}
            />
        </>
    )
}
