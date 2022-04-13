import { Role } from '@ts/enums';
import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  token?: string;
  results?: string;
  typePermis?: string;
  createdAt: Date;
}



// 2. Create a Schema corresponding to the document interface.
const schema = new Schema<IUser>(
  {
    firstName: { type: String},
    lastName: { type: String},
    email: { type: String},
    password: { type: String},
    results: { type: String},
    typePermis: { type: String},
    createdAt: { type: Date, default: Date.now },
  },

);

// 3. Create a Model.
export const User = model<IUser>("User", schema);
