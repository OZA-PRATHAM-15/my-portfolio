import {
  createQuizUser,
  getLeaderboard,
  getQuizUserById,
  updateQuizUser,
} from "@/db/services/quiz-users.service";

export const QuizUserResolvers = {
  Query: {
    getLeaderboard: async () => {
      try {
        const leaderboard = await getLeaderboard();
        return leaderboard || [];
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        return [];
      }
    },
    getQuizUserById: async (_: unknown, args: { id: string }) => {
      try {
        const user = await getQuizUserById(args.id);
        return user;
      } catch (error) {
        console.error("Error fetching quiz user by ID:", error);
        return null;
      }
    },
  },

  Mutation: {
    createQuizUser: async (
      _: unknown,
      args: {
        name: string;
        avatar_id?: string;
        category_id?: string;
        questions_attempted?: number;
        correct?: number;
        wrong?: number;
        time_finished?: number;
      }
    ) => {
      try {
        const newUser = await createQuizUser(args);
        return newUser;
      } catch (error) {
        console.error("Error creating quiz user:", error);
        return null;
      }
    },
    updateQuizUser: async (
      _: unknown,
      args: {
        id: string;
        name?: string;
        avatar_id?: string;
        category_id?: string;
        questions_attempted?: number;
        correct?: number;
        wrong?: number;
        time_finished?: number;
      }
    ) => {
      try {
        const updatedUser = await updateQuizUser(args.id, args);
        return updatedUser;
      } catch (error) {
        console.error("Error updating quiz user:", error);
        return null;
      }
    },
  },
};
