import {
  createQuestions,
  getAllQuestions,
  getQuestionsByCategory,
  QuestionInsert,
} from "@/db/services/question.service";

export const QuestionResolvers = {
  Query: {
    getAllQuestions: async () => {
      try {
        const questions = await getAllQuestions();
        return questions || [];
      } catch (error) {
        console.error("Error fetching questions:", error);
        return [];
      }
    },
    getQuestionsByCategory: async (
      _: unknown,
      args: { categoryId: string }
    ) => {
      try {
        const questions = await getQuestionsByCategory(args.categoryId);
        return questions || [];
      } catch (error) {
        console.error("Error fetching questions by category:", error);
        return [];
      }
    },
  },

  Mutation: {
    createQuestions: async (
      _: unknown,
      args: { questions: QuestionInsert[] }
    ) => {
      try {
        const created = await createQuestions(args.questions);
        return created || [];
      } catch (error) {
        console.error("Error creating questions:", error);
        return [];
      }
    },
  },
};
