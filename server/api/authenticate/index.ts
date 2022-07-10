import { Request, Response } from "express";
import dbConnect from "../_connect";
import { allowCors, LICENSE_STATUS } from "../_constants";
import LicenseModel from "../../models/License";

async function handler(request: Request, response: Response) {
  try {
    await dbConnect();
    const { jobId, token, accountId, deviceId, productId } = request.body;
    if (!token) {
      return response.json({
        message: "Missing token",
      });
    }
    // @ts-ignore
    const createdLicense = await LicenseModel.findOne({
      _id: jobId,
      accountId,
      deviceId,
      productId,
    });

    if (!createdLicense) {
      return response.json({
        message: "Not able to find your product. Please try again",
      });
    }

    // @ts-ignore
    const updatedLicense = await LicenseModel.updateOne(
      {
        _id: jobId,
        accountId,
        deviceId,
        productId,
      },
      {
        $set: { status: LICENSE_STATUS.APPORVED, token },
      }
    );
    response.json(updatedLicense);
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = allowCors(handler);
