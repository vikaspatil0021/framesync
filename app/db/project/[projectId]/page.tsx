'use client'

import { lazy } from "react";
const ProjectsContainer = lazy(() => import("@/components/ui/db/projectsContainer/projectsContainer"));

export default function Page({ params }: { params: { projectId: string } }) {

    return (
        <>
            <ProjectsContainer
                projectId={params.projectId}
            />
        </>
    )
}
