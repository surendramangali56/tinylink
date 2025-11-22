CREATE TABLE "Link" (
"id" varchar PRIMARY KEY,
"code" varchar UNIQUE NOT NULL,
"target" text NOT NULL,
"clicks" integer DEFAULT 0,
"createdAt" timestamptz DEFAULT now(),
"lastClicked" timestamptz
);