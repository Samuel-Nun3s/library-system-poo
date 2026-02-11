import { LoanStatus } from "./LoanStatus.js";

export interface LoanModel {
  id: number;
  book: number;
  user: number;
  dateLoan: Date;
  expectedReturnDate: Date;
  returnDate: Date | null;
  status: LoanStatus;
}