import type { Resolvers } from "@generated/types";
import { Question , IQuestion , Category , ICategory} from "@models/index";

export const resolvers: Resolvers = {
  Query: {
    //@ts-ignore
    getAllQuestions: async (): Promise<IQuestion[]> => {
      return await Question.find();
    }
  },
  Mutation: {
    //@ts-ignore
    createQuestion: async (_, { input }): Promise<IQuestion> => {
      const question = new Question(input);
      const myQuestion = await question.save();

      const category = await Category.findById(input.category);
      if(category){
      category.questions.push(myQuestion);
      await category.save();
      }
      return myQuestion;

    }
  }


};
