import { BookModel } from "./Book.js";

export interface UserModel {
  id: number;
  name: string;
  maxLoans: number;
  activeLoans: BookModel[];
}