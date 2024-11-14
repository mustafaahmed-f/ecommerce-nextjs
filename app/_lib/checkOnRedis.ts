import { client } from "./redisClient";

export async function checkOnRedis(id: string) {
  try {
    //// First check if user exists on the redis or not:
    const checkExistence = await client.get(id);

    if (!checkExistence) {
      //// If doesn't exist , add it:
      await client.set(id, id, {
        EX: 60 * 60 * 24 * 2,
      });
      return false;
    }

    return true;
  } catch (error: any) {
    console.log(error);
    throw new Error("Error occured in redis : ", error);
  }
}
