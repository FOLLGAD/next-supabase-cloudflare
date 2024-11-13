import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { relations } from "drizzle-orm";
import {
  boolean,
  jsonb,
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

// --- Users & Organizations ---

export const User = pgTable("user", {
  userId: uuid("user_id").notNull().primaryKey().defaultRandom(),
  name: text("name"),
  image: text("image"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type User = InferSelectModel<typeof User>;
export type InsertUser = typeof User.$inferInsert;

export const Organization = pgTable("organization", {
  organizationId: uuid("organization_id")
    .notNull()
    .primaryKey()
    .defaultRandom(),
  name: text("name").notNull(),
  image: text("image"),

  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const orgRoleEnum = pgEnum("org_role", ["owner", "member"]);

export const UserToOrganization = pgTable(
  "user_to_organization",
  {
    userId: uuid("user_id")
      .notNull()
      .references(() => User.userId, { onDelete: "cascade" }),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => Organization.organizationId, { onDelete: "cascade" }),
    role: orgRoleEnum("role").notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.userId, t.organizationId] }),
  }),
);

export const UserRelations = relations(User, ({ many }) => ({
  userToOrganizations: many(UserToOrganization),
}));

export const OrganizationRelations = relations(Organization, ({ many }) => ({
  organizationToUsers: many(UserToOrganization),
}));

export const UserToOrganizationRelations = relations(
  UserToOrganization,
  ({ one }) => ({
    user: one(User, {
      fields: [UserToOrganization.userId],
      references: [User.userId],
    }),
    organization: one(Organization, {
      fields: [UserToOrganization.organizationId],
      references: [Organization.organizationId],
    }),
  }),
);

export type Organization = InferSelectModel<typeof Organization>;
export type InsertOrganization = typeof Organization.$inferInsert;

// --- Chat ---

export const Chat = pgTable("chat", {
  chatId: uuid("chat_id").primaryKey().notNull().defaultRandom(),
  createdAt: timestamp("created_at").notNull(),
  title: text("title").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => User.userId),
});

export type Chat = InferSelectModel<typeof Chat>;
export type InsertChat = InferInsertModel<typeof Chat>;

export const Message = pgTable("message", {
  messageId: uuid("message_id").primaryKey().notNull().defaultRandom(),
  chatId: uuid("chat_id")
    .notNull()
    .references(() => Chat.chatId, { onDelete: "cascade" }),
  role: text("role").notNull(),
  content: jsonb("content").notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export type Message = InferSelectModel<typeof Message>;
export type InsertMessage = InferInsertModel<typeof Message>;

export const Vote = pgTable(
  "vote",
  {
    chatId: uuid("chat_id")
      .notNull()
      .references(() => Chat.chatId, { onDelete: "cascade" }),
    messageId: uuid("message_id")
      .notNull()
      .references(() => Message.messageId, { onDelete: "cascade" }),
    isUpvoted: boolean("is_upvoted").notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.chatId, table.messageId] }),
    };
  },
);

export type Vote = InferSelectModel<typeof Vote>;
export type InsertVote = InferInsertModel<typeof Vote>;

export const Document = pgTable(
  "document",
  {
    documentId: uuid("id").notNull().defaultRandom(),
    createdAt: timestamp("createdAt").notNull(),
    title: text("title").notNull(),
    content: text("content"),
    userId: uuid("userId")
      .notNull()
      .references(() => User.userId, { onDelete: "cascade" }),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.documentId, table.createdAt] }),
    };
  },
);

export type Document = InferSelectModel<typeof Document>;
export type InsertDocument = InferInsertModel<typeof Document>;
