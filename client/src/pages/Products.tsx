import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { getRandomString } from "../modules/common/constants";
import { PRODUCTS } from "../modules/common/products";
import { Product, PurchaseOrder } from "../modules/common/types";

const Products = () => {
  const [purchasedProduct, setPurchasedProduct] =
    useState<PurchaseOrder | null>(null);
  const buy = (product: Product) => {
    setPurchasedProduct({ productId: product.id, orderId: getRandomString() });
  };
  return (
    <Box>
      <Typography variant="h6">Buy a product</Typography>
      <List dense sx={{ width: 320, margin: "0 auto", mt: 2 }}>
        {PRODUCTS.map((product) => {
          return (
            <>
              <ListItem
                secondaryAction={
                  <Button onClick={() => buy(product)}>Buy</Button>
                }
              >
                <ListItemText primary={product.name} />
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
      {purchasedProduct && (
        <Dialog open>
          <DialogContent sx={{ textAlign: "center" }}>
            <Typography variant="h6">
              Congratulations. Your order is confirmed.
            </Typography>
            <Button
              href={`/add-license?orderId=${purchasedProduct.orderId}&product=${purchasedProduct.productId}`}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Add License to your Wallet
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Products;
