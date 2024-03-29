import prisma from "../client";

export const createProject = async (name: string, teamId: string) => {
   return await prisma?.project.create({
      data: {
         name,
         teamId
      }
   })
}

export const getProjectsByTeamId = async (teamId: string) => {
   return await prisma?.project.findMany({
      where: {
         teamId
      }
   })
}

export const getProjectById = async (projectId: string) => {
   return await prisma?.project.findUnique({
      where: {
         id: projectId
      }
   })
}
