export function generateValidUser() {
  const randomSuffix = Math.floor(Math.random() * 1000000);
  return {
    name: `UserTest${randomSuffix}`,
    email: `usertest${randomSuffix}@gmail.com`,
    password: "Password123!",
  };
}
