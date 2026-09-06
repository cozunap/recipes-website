import { pgTable, uuid, text, timestamp, boolean, jsonb, primaryKey, uniqueIndex } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Users (Global)
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Organizations (Tenants)
export const organizations = pgTable('organizations', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// Organization Members
export const organizationMembers = pgTable('organization_members', {
  userId: uuid('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  role: text('role').notNull().default('MEMBER'), // OWNER, ADMIN, EDITOR, MEMBER
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  primaryKey({ columns: [t.userId, t.organizationId] })
]);

// Websites (Projects within Organizations)
export const websites = pgTable('websites', {
  id: uuid('id').primaryKey().defaultRandom(),
  organizationId: uuid('organization_id').notNull().references(() => organizations.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  customDomain: text('custom_domain'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// CMS: Pages
export const pages = pgTable('pages', {
  id: uuid('id').primaryKey().defaultRandom(),
  websiteId: uuid('website_id').notNull().references(() => websites.id, { onDelete: 'cascade' }),
  parentId: uuid('parent_id'),
  title: text('title').notNull(),
  slug: text('slug').notNull(),
  status: text('status').notNull().default('DRAFT'), // DRAFT, PUBLISHED
  seoMetadata: jsonb('seo_metadata'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('website_slug_idx').on(t.websiteId, t.slug)
]);

// CMS: Page Revisions (For Version Control & Publishing)
export const pageRevisions = pgTable('page_revisions', {
  id: uuid('id').primaryKey().defaultRandom(),
  pageId: uuid('page_id').notNull().references(() => pages.id, { onDelete: 'cascade' }),
  nodesJson: jsonb('nodes_json').notNull(), // The visual builder tree
  status: text('status').notNull().default('DRAFT'), // DRAFT, PUBLISHED
  createdBy: uuid('created_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// CMS: Content Collections (Custom Content Types like 'Posts', 'Properties')
export const collections = pgTable('collections', {
  id: uuid('id').primaryKey().defaultRandom(),
  websiteId: uuid('website_id').notNull().references(() => websites.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  slug: text('slug').notNull(),
  schemaJson: jsonb('schema_json').notNull(), // Array of field definitions
  createdAt: timestamp('created_at').defaultNow().notNull(),
}, (t) => [
  uniqueIndex('website_collection_slug_idx').on(t.websiteId, t.slug)
]);

// CMS: Content Entries (Items inside a Collection)
export const contentEntries = pgTable('content_entries', {
  id: uuid('id').primaryKey().defaultRandom(),
  collectionId: uuid('collection_id').notNull().references(() => collections.id, { onDelete: 'cascade' }),
  status: text('status').notNull().default('DRAFT'),
  dataJson: jsonb('data_json').notNull(), // The actual content payload
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Media Library
export const media = pgTable('media', {
  id: uuid('id').primaryKey().defaultRandom(),
  websiteId: uuid('website_id').notNull().references(() => websites.id, { onDelete: 'cascade' }),
  url: text('url').notNull(),
  fileType: text('file_type').notNull(),
  sizeBytes: text('size_bytes'),
  altText: text('alt_text'),
  uploadedBy: uuid('uploaded_by').notNull().references(() => users.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// --- Relations ---
export const usersRelations = relations(users, ({ many }) => ({
  memberships: many(organizationMembers),
}));

export const orgRelations = relations(organizations, ({ many }) => ({
  members: many(organizationMembers),
  websites: many(websites),
}));

export const orgMembersRelations = relations(organizationMembers, ({ one }) => ({
  user: one(users, { fields: [organizationMembers.userId], references: [users.id] }),
  organization: one(organizations, { fields: [organizationMembers.organizationId], references: [organizations.id] }),
}));

export const websitesRelations = relations(websites, ({ one, many }) => ({
  organization: one(organizations, { fields: [websites.organizationId], references: [organizations.id] }),
  pages: many(pages),
  collections: many(collections),
  media: many(media),
}));

export const pagesRelations = relations(pages, ({ one, many }) => ({
  website: one(websites, { fields: [pages.websiteId], references: [websites.id] }),
  revisions: many(pageRevisions),
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  website: one(websites, { fields: [collections.websiteId], references: [websites.id] }),
  entries: many(contentEntries),
}));
