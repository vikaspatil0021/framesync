export const createProject = async (name: string, teamId: string) => {
   return await prisma?.project.create({
      data: {
         name,
         teamId
      }
   })
}
