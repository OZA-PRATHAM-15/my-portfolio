import { logVisitor } from "@/db/visitor.service";
import type { ConsentStatus } from "@/db/schema";

export const resolvers = {
  Mutation: {
    logVisitor: async (
      _: unknown,
      args: { ip: string; consent: ConsentStatus; user_agent: string }
    ): Promise<boolean> => {
      try {
        const result = await logVisitor(args.ip, args.consent, args.user_agent);
        return !!result;
      } catch (error) {
        console.error("Failed to log visitor:", error);
        return false;
      }
    },
  },
};
