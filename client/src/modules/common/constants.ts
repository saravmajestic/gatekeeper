import { License } from "./types";

export const transformLicenseData = (licenseData: License) => {
  return {
    productID: licenseData.productID,
    productLicenseKey: licenseData.productLicenseKey,
    meta: licenseData.meta,
  };
};

export const getRandomString = () => Math.random().toString(36).slice(0, 16);
