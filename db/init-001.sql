--CREATE USER draserver_portal WITH ENCRYPTED PASSWORD 'supersecret';
--CREATE USER draserver_admin WITH ENCRYPTED PASSWORD 'supersecret';

--CREATE DATABASE draserver;

GRANT USAGE ON SCHEMA public TO draserver_portal;
GRANT USAGE ON SCHEMA public TO draserver_admin;

--
-- Categories
--

CREATE TABLE "Categories" (
  category_id             SMALLINT GENERATED ALWAYS AS IDENTITY,
  category_name           TEXT NOT NULL,
  category_redirect_url   TEXT NOT NULL,
  category_domain_count   INTEGER NOT NULL DEFAULT 0,
  category_redirect_type  SMALLINT NOT NULL,

  PRIMARY KEY(category_id),
  UNIQUE(category_name)
);

GRANT SELECT ON "Categories" TO draserver_portal;

GRANT SELECT, INSERT, UPDATE, DELETE ON "Categories" TO draserver_admin;
GRANT USAGE, SELECT ON "Categories_category_id_seq" TO draserver_admin;

--
-- CategoryDomains
--

CREATE TABLE "CategoryDomains" (
  domain_id               INTEGER GENERATED ALWAYS AS IDENTITY,
  category_id             SMALLINT NOT NULL,
  domain_name             TEXT NOT NULL,

  PRIMARY KEY(domain_id),
  FOREIGN KEY(category_id) REFERENCES "Categories" (category_id),
  UNIQUE(domain_name)
);

GRANT SELECT ON "CategoryDomains" TO draserver_portal;

GRANT SELECT, INSERT, UPDATE, DELETE ON "CategoryDomains" TO draserver_admin;
GRANT USAGE, SELECT ON "CategoryDomains_domain_id_seq" TO draserver_admin;

CREATE INDEX "CategoryDomains_category_id_key" ON "CategoryDomains" (category_id);

--
-- Settings
--

CREATE TABLE "Settings" (
  setting_id              INTEGER GENERATED ALWAYS AS IDENTITY,
  setting_name            TEXT NOT NULL,
  setting_value_int       INTEGER,
  setting_value_string    TEXT,

  PRIMARY KEY(setting_id)
);

GRANT SELECT ON "Settings" TO draserver_portal;

GRANT SELECT, INSERT, UPDATE, DELETE ON "Settings" TO draserver_admin;
GRANT USAGE, SELECT ON "Settings_setting_id_seq" TO draserver_admin;

INSERT INTO "Settings" (
  setting_name,
  setting_value_int,
  setting_value_string
)
VALUES
  ('Default redirect URL', NULL, 'https://uslugipoisk.ru'),
  ('Default redirect type', 302, NULL);

--
-- LogData
--

CREATE TABLE "LogData" (
  log_id                  INTEGER GENERATED ALWAYS AS IDENTITY,
  log_date                TIMESTAMPTZ DEFAULT NOW(),
  domain_name             TEXT NOT NULL,
  req_url                 TEXT NOT NULL,
  redir_category_id       SMALLINT,
  redir_url               TEXT NOT NULL,
  redir_type              SMALLINT NOT NULL,

  PRIMARY KEY(log_id),
  FOREIGN KEY(redir_category_id) REFERENCES "Categories" (category_id)
);

GRANT INSERT ON "LogData" TO draserver_portal;
GRANT USAGE, SELECT ON "LogData_log_id_seq" TO draserver_portal;

GRANT SELECT ON "LogData" TO draserver_admin;

CREATE INDEX "LogData_redir_category_id_key" ON "LogData" (redir_category_id);

