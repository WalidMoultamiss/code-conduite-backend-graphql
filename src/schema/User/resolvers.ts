import { pubsub } from "@config/pubsub";
import type { Resolvers } from "@generated/types";
import { User, IUser } from "@models/index";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";

export const resolvers: Resolvers = {
  Query: {
    getAllUsers: (): any => User.find(),
  },
  Mutation: {
    //@ts-ignore
    register: async (_: any, { input }: { input: IUser }): Promise<IUser> => {
      const { firstName, lastName, email, password, typePermis } = input;
      const hashedPassword = await hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        email,
        typePermis,
        password: hashedPassword,
      });
      const token = sign({ userId: user.id }, "secret", {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      user.token = token;

      let AyoCheck = await user.save();
      return user;
    },
    //@ts-ignore
    login: async (_: any, { input }: { input: IUser }): Promise<IUser> => {
      const { email, password } = input;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }

      const isValid = await compare(password!, user.password);
      if (!isValid) {
        throw new Error("Invalid password");
      }

      const token = sign({ userId: user.id }, "secret", {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      user.token = token;
      return user;
    },
    setResults: async (_: any, { input }: { input: any }): Promise<any> => {
      const { userId, results } = input;
      const user = await User.findById(userId);
      if (!user) {
        throw new Error("User not found");
      }
      user.results = results;
      await user.save();
      return user;
    },
  },
};
