## Setup Test Database

DROP DATABASE IF EXISTS epochapi;

CREATE USER epochadmin WITH PASSWORD 'thepassword';

CREATE DATABASE epochapi;

GRANT ALL PRIVILEGES ON DATABASE epochapi to epochadmin;
