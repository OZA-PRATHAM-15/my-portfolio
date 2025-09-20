import {
  createCategories,
  getAllCategories,
} from "@/db/services/category.service";

export const CategoryResolvers = {
  Query: {
    getAllCategories: async () => {
      try {
        const categories = await getAllCategories();
        return categories || [];
      } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
      }
    },
  },

  Mutation: {
    createCategories: async (_: unknown, args: { names: string[] }) => {
      try {
        const created = await createCategories(args.names);
        return created || [];
      } catch (error) {
        console.error("Error creating categories:", error);
        return [];
      }
    },
  },
};
