import pool from "./dbPool";

// This function verifies that the user has access to the course and returns true if so.
export async function verifyUser(containerName: string, email: string) {
  const taCheck = `SELECT courseName FROM course_tas WHERE courseName = $1 AND taEmail = $2;`;
  let result = await pool.query(taCheck, [containerName, email]);
  if (result.rows.length !== 0) {
    return true;
  }

  const creatorCheck = `SELECT courseName FROM courses WHERE courseName = $1 AND creatorEmail = $2;`;
  result = await pool.query(creatorCheck, [containerName, email]);
  if (result.rows.length !== 0) {
    return true;
  }

  return false;
}
