import { License } from "./types";

export const transformLicenseData = (licenseData: {
  token: string;
  licenseAttributes: License;
}): License => {
  return {
    productID: licenseData.licenseAttributes.productID,
    productLicenseKey: licenseData.licenseAttributes.productLicenseKey,
    meta: licenseData.licenseAttributes.meta,
    token: licenseData.token,
  };
};

export const getRandomString = () => Math.random().toString(36).slice(0, 16);
