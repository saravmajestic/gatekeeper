export type License = {
  productID: string;
  productLicenseKey: string;
  meta: string;
  token: string;
};

export type LicenseJob = {
  _id: string;
  productID: string;
  deviceId: string;
  accountId: string;
  status: string;
};

export type Product = {
  id: string;
  name: string;
};

export type PurchaseOrder = {
  productId: Product["id"];
  orderId: string;
};
