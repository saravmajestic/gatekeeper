import { Request, Response } from "express";
import clientPromise from "./_connect";

async function handler(request: Request, response: Response) {
  console.log("connecting...");
  const client = await clientPromise;
  console.log("connected...");
  const collection = client.db("gatekeeper").collection("movies");

  await collection.insertOne({ name: "test " + Date.now() });
  console.log("inserted...");
  const movies = await collection
    .find({})
    .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

  response.json(movies);
}

module.exports = handler;
