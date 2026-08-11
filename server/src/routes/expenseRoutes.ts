import { Router } from "express";
import {
  getExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controller/expenseController";
import { validateObjectId } from "../middleware/validateObjectId";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect);

router.get("/", getExpenses);
router.get("/:id", validateObjectId, getExpense);
router.post("/", createExpense);
router.put("/:id", validateObjectId, updateExpense);
router.delete("/:id", validateObjectId, deleteExpense);

export default router;