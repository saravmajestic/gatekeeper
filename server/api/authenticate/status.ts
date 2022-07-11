import { Request, Response } from "express";
import dbConnect from "../_connect";
import LicenseModel from "../../models/License";
import { allowCors } from "../_constants";

async function handler(request: Request, response: Response) {
  try {
    await dbConnect();
    const { deviceId, productId } = request.query;

    // @ts-ignore
    const existingLicense = await LicenseModel.findOne({ deviceId, productId });

    if (existingLicense) {
      return response.json(existingLicense);
    }

    response.json({ message: "Invalid job status" });
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = allowCors(handler);
