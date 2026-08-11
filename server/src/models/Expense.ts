import mongoose, { Document, Schema, Types } from "mongoose";

export interface IExpense extends Document {
  title: string;
  amount: number;
  category: string;
  type: "income" | "expense";
  date: Date;
  notes?: string;
  userId: Types.ObjectId;
}

const expenseSchema = new Schema<IExpense>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: [2, "Title must be at least 2 characters"],
      maxlength: [100, "Title must be under 100 characters"],
    },

    amount: {
      type: Number,
      required: [true, "Amount is required"],
      min: [0.01, "Amount must be greater than 0"],
    },

    category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    type: {
      type: String,
      required: [true, "Type is required"],
      enum: {
        values: ["income", "expense"],
        message: "Type must be either 'income' or 'expense'",
      },
    },

    date: {
      type: Date,
      required: [true, "Date is required"],
      default: Date.now,
    },

    notes: {
      type: String,
      trim: true,
      maxlength: [200, "Notes must be under 200 characters"],
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Expense = mongoose.model<IExpense>("Expense", expenseSchema);

export default Expense;