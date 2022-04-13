import { Schema, model } from "mongoose";

export interface IQuestion {
  id: string;
  title: string;
  description: string;
  image: string;
  answer1: string;
  answer2: string;
  answer3: string;
  answer4: string;
  category: string;
  correctAnswer: number;
}



const schema = new Schema<IQuestion>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    answer1: { type: String, required: true },
    answer2: { type: String, required: true },
    answer3: { type: String, required: true },
    answer4: { type: String, required: true },
    category: { type: String, required: true },
    correctAnswer: { type: Number, required: true },
  }
);

export const Question = model<IQuestion>("Super", schema);
