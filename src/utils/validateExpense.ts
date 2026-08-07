import { ExpenseFormData, ExpenseFormErrors } from "@/types";

export function validateExpense(data: ExpenseFormData): ExpenseFormErrors {
  const errors: ExpenseFormErrors = {};

  const title = data.title.trim();
  if (!title) {
    errors.title = "Title is required.";
  } else if (title.length < 2) {
    errors.title = "Title must be at least 2 characters.";
  } else if (title.length > 60) {
    errors.title = "Title must be under 60 characters.";
  }

  const amountValue = data.amount.trim();
  if (!amountValue) {
    errors.amount = "Amount is required.";
  } else {
    const numericAmount = Number(amountValue);
    if (Number.isNaN(numericAmount)) {
      errors.amount = "Amount must be a valid number.";
    } else if (numericAmount <= 0) {
      errors.amount = "Amount must be greater than 0.";
    } else if (numericAmount > 1_000_000) {
      errors.amount = "Amount seems too large.";
    }
  }

  if (!data.category) {
    errors.category = "Category is required.";
  }

  if (!data.date) {
    errors.date = "Date is required.";
  } else {
    const selectedDate = new Date(data.date);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    if (Number.isNaN(selectedDate.getTime())) {
      errors.date = "Date is invalid.";
    } else if (selectedDate > today) {
      errors.date = "Date cannot be in the future.";
    }
  }

  if (data.notes.trim().length > 200) {
    errors.notes = "Notes must be under 200 characters.";
  }

  return errors;
}

export function hasErrors(errors: ExpenseFormErrors): boolean {
  return Object.keys(errors).length > 0;
}