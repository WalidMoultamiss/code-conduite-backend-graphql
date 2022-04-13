import type { Resolvers } from "@generated/types";
import { ICategory, Category, Question } from "@models/index";

export const resolvers: Resolvers = {
  Query: {
    //@ts-ignore
    getAllCategories: async (): Promise<ICategory[]> => {
      return await Category.find();
    },
    getCategoryById: async (
      _: any,
      {
        id,
      }: {
        id: string;
      }
    ): Promise<ICategory> => {
      const Cat =  await Category.findById(id);
      if(Cat){
        return Cat;
      }
      throw new Error("Category not found");
    },
  },
  Mutation: {
    //@ts-ignore
    createCategory: async (_, { input }): Promise<ICategory> => {
      const category = new Category(input);
      return await category.save();
    },
  },
  Category: {
    //@ts-ignore
    questions: async (que) => {
      const question =  await Question.find({ category: que.id });

      
      if(question){
        //randomize the questions
        let shuffled = question.sort(() => 0.5 - Math.random());
        return shuffled;
      }

      throw new Error("Category not found");
    },
  },
};
