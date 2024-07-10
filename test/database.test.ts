import { Client } from "pg";

describe("Database", () => {
  test("connection", async () => {
    const database = new Client({
      host: "127.0.0.1",
      port: 5432,
      database: "cicd_database",
      user: "cicd_user",
      password: "cicd_password",
    });

    const connected = await database
      .connect()
      .then(() => true)
      .catch(() => false)
      .finally(async () => await database.end());
    expect(connected).toBe(true);
  });
});
