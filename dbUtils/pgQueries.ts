export const refreshDBQuery = `
    DROP TABLE IF EXISTS verification_token CASCADE;
    DROP TABLE IF EXISTS accounts CASCADE;
    DROP TABLE IF EXISTS sessions CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    DROP TABLE IF EXISTS courses CASCADE;
    DROP TABLE IF EXISTS course_tas CASCADE;
    DROP TABLE IF EXISTS course_enrollments CASCADE;

    CREATE TABLE verification_token
    (
        identifier TEXT NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        token TEXT NOT NULL,

        PRIMARY KEY (identifier, token)
    );

    CREATE TABLE accounts
    (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        type VARCHAR(255) NOT NULL,
        provider VARCHAR(255) NOT NULL,
        "providerAccountId" VARCHAR(255) NOT NULL,
        refresh_token TEXT,
        access_token TEXT,
        expires_at BIGINT,
        id_token TEXT,
        scope TEXT,
        session_state TEXT,
        token_type TEXT,

        PRIMARY KEY (id)
    );

    CREATE TABLE sessions
    (
        id SERIAL,
        "userId" INTEGER NOT NULL,
        expires TIMESTAMPTZ NOT NULL,
        "sessionToken" VARCHAR(255) NOT NULL,

        PRIMARY KEY (id)
    );

    CREATE TABLE users
    (
        id SERIAL,
        name VARCHAR(255),
        email VARCHAR(255) UNIQUE,
        "emailVerified" TIMESTAMPTZ,
        image TEXT,

        PRIMARY KEY (id)
    );

    CREATE TABLE courses
    (
        courseName VARCHAR(255) UNIQUE NOT NULL,
        creatorEmail VARCHAR(255) NOT NULL,

        PRIMARY KEY (courseName),
        FOREIGN KEY (creatorEmail) REFERENCES users(email)
    );

    CREATE TABLE course_tas
    (
        courseName VARCHAR(255) NOT NULL,
        taEmail VARCHAR(255) NOT NULL,

        PRIMARY KEY (courseName, taEmail),
        FOREIGN KEY (courseName) REFERENCES courses(courseName),
        FOREIGN KEY (taEmail) REFERENCES users(email)
    );

    CREATE TABLE course_enrollments
    (
        courseName VARCHAR(255) NOT NULL,
        studentEmail VARCHAR(255) NOT NULL,

        PRIMARY KEY (courseName, studentEmail),
        FOREIGN KEY (courseName) REFERENCES courses(courseName),
        FOREIGN KEY (studentEmail) REFERENCES users(email)
    );

`;
