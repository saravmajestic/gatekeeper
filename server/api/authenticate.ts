import { Request, Response } from "express";

const allowCors =
  (fn: (req: Request, res: Response) => void) =>
  async (req: Request, res: Response) => {
    // res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }
    return await fn(req, res);
  };

function handler(request: Request, response: Response) {
  response.status(200).json({
    body: request.body,
    query: request.query,
  });
}

module.exports = allowCors(handler);
