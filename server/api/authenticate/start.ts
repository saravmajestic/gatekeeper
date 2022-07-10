import { Request, Response } from "express";
import dbConnect from "../_connect";
import LicenseModel from "../../models/License";
import { allowCors, LICENSE_STATUS } from "../_constants";

async function handler(request: Request, response: Response) {
  try {
    await dbConnect();
    const { accountId, deviceId, productId } = request.body;

    // @ts-ignore
    const existingLicense = await LicenseModel.findOne({
      deviceId,
      accountId,
      productId,
      status: LICENSE_STATUS.STARTED,
    });

    if (existingLicense) {
      return response.json(existingLicense);
    }
    // @ts-ignore
    const createdLicense = await LicenseModel.create({
      deviceId,
      accountId,
      productId,
      status: LICENSE_STATUS.STARTED,
    });
    response.json(createdLicense);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = allowCors(handler);
