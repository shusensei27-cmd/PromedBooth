import { z } from "zod";

export const recordCashPaymentSchema = z.object({
  eventId: z.string().uuid(),
  amount: z.number().positive("Amount must be positive"),
  notes: z.string().optional(),
});

export const transactionFilterSchema = z.object({
  eventId: z.string().uuid().optional(),
  method: z.enum(["CASH", "QRIS", "FREE"]).optional(),
  status: z.enum(["PENDING", "SUCCESS", "FAILED", "REFUNDED"]).optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export type RecordCashPaymentInput = z.infer<typeof recordCashPaymentSchema>;
export type TransactionFilterInput = z.infer<typeof transactionFilterSchema>;
