CREATE DATABASE graphbook_dev
    WITH
    OWNER="john@aws.ruralinnovation.us"
    ENCODING ='UTF8';

CREATE USER "devuser"
WITH
    PASSWORD '<SET-PASSWORD-AND-ADD-TO-PGPASS-FILE-[./pg-local-db/pgpass.conf]>';

GRANT CONNECT ON DATABASE graphbook_dev TO "devuser";
GRANT ALL PRIVILEGES ON DATABASE graphbook_dev TO "devuser";
