export type License = {
  productID: string;
  productLicenseKey: string;
  meta: string;
};

export type Product = {
  id: string;
  name: string;
};

export type PurchaseOrder = {
  productId: Product["id"];
  orderId: string;
};
