export type Role = "GUEST" | "VIEWER" | "ADMIN";

export type EventStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type EventTheme =
  | "MINIMALIST"
  | "VINTAGE"
  | "NEWSPAPER"
  | "FUNKY"
  | "FLORAL"
  | "RETRO";

export type PaymentMethod = "FREE" | "CASH" | "QRIS" | "HYBRID";

export type PaymentGateway = "MIDTRANS" | "TRIPAY" | "XENDIT" | "NONE";

export type TransactionStatus = "PENDING" | "SUCCESS" | "FAILED" | "REFUNDED";

export type KioskSessionStatus =
  | "STARTED"
  | "PAYMENT_PENDING"
  | "CAPTURING"
  | "COMPLETED"
  | "EXPIRED";

export type ChromaKeyMode = "CHROMA_KEY" | "AI_REMOVE" | "BACKGROUND_REPLACE";

export type ChromaKeyJobStatus = "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";

export type LayerType = "PHOTO_SLOT" | "TEXT" | "STICKER" | "LOGO" | "QR_CODE";

export type NotificationType =
  | "EVENT_CREATED"
  | "USER_INVITED"
  | "REVENUE_RECEIVED"
  | "STORAGE_WARNING"
  | "TEMPLATE_CREATED";

export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "EVENT_CREATE"
  | "EVENT_UPDATE"
  | "EVENT_DELETE"
  | "TEMPLATE_CREATE"
  | "TEMPLATE_UPDATE"
  | "TEMPLATE_DELETE"
  | "REVENUE_CHANGE"
  | "USER_INVITE"
  | "USER_REMOVE"
  | "SETTINGS_UPDATE";

export interface PaginationParams {
  page?: number;
  limit?: number;
  cursor?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  nextCursor?: string;
  hasMore: boolean;
  total: number;
}

export interface ActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
