import { createAvatars, getAllAvatars } from "@/db/services/avatar.service";

export const AvatarResolvers = {
  Query: {
    getAllAvatars: async () => {
      try {
        const avatars = await getAllAvatars();
        return avatars || [];
      } catch (error) {
        console.error("Error fetching avatars:", error);
        return [];
      }
    },
  },

  Mutation: {
    createAvatars: async (_: unknown, args: { urls: string[] }) => {
      try {
        const created = await createAvatars(args.urls);
        return created || [];
      } catch (error) {
        console.error("Error creating avatars:", error);
        return [];
      }
    },
  },
};
