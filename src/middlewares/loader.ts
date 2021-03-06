import DataLoader from 'dataloader';
import { Model } from 'mongoose';
import { Category, User , 
  IUser, ICategory, IQuestion, Question, Admin, IAdmin} from '@models/index';

// create a dataloader for the given model
export const createLoader = (Model: Model<any>) => {
  // init the dataloader
  const loader = new DataLoader(async (keys) => {
    const data = await Model.find({ _id: { $in: keys } });
    return keys.map((key) => data.find(({ id }) => id == key));
  });

  // return the dataloader loader function
  return {
    load: async (id: unknown) => loader.load(id),
    loadMany: async (ids: ArrayLike<unknown>) => loader.loadMany(ids),
  };
};

export const dataloader = {
  user: createLoader(User),
  category: createLoader(Category),
  question: createLoader(Question),
  admin: createLoader(Admin),
};
