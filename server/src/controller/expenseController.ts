import { Response } from "express";
import Expense from "../models/Expense";
import { AuthRequest } from "../middleware/authMiddleware";

// Get all expenses for the logged-in user
export const getExpenses = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expenses = await Expense.find({ userId: req.userId }).sort({ date: -1 });

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);

    res.status(500).json({
      message: "Failed to fetch expenses",
    });
  }
};

// Get one expense (only if it belongs to the logged-in user)
export const getExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error fetching expense:", error);

    res.status(500).json({
      message: "Failed to fetch expense",
    });
  }
};

// Create an expense, automatically owned by the logged-in user
export const createExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const { title, amount, category, type, date, notes } = req.body;

    if (!title || amount === undefined || !category || !type) {
      res.status(400).json({
        message: "Title, amount, category, and type are required",
      });
      return;
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      type,
      date,
      notes,
      userId: req.userId,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);

    res.status(500).json({
      message: "Failed to create expense",
    });
  }
};

// Update an expense (only if it belongs to the logged-in user)
export const updateExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!expense) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);

    res.status(500).json({
      message: "Failed to update expense",
    });
  }
};

// Delete an expense (only if it belongs to the logged-in user)
export const deleteExpense = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      res.status(404).json({
        message: "Expense not found",
      });
      return;
    }

    res.status(200).json({
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting expense:", error);

    res.status(500).json({
      message: "Failed to delete expense",
    });
  }
};