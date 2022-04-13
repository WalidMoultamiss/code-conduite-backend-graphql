import { Schema, model } from "mongoose";
import { IQuestion } from "./Question";


export interface ICategory {
  name: string;
  description: string;
  questions: [IQuestion];
}

const CategorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],

});

export const Category = model<ICategory>("Category", CategorySchema);
