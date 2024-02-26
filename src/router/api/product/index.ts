import { NextFunction, Request, Response, Router } from 'express';
import { isAuth } from '../../../middleware/auth';
import { validCreateProductRequestParams, validUpdateProductRequestParams } from '../../../middleware/product';
import { NotFoundError } from '../../../utils/error-helper';

const router = Router();

type Product = {
  id: number,
  name: string,
  price: number
};

let products: Product[] = [{
  id: 1,
  name: "Pizza",
  price: 10
}];

router.get('/', (req: Request, res: Response) => {
  res.json(products);
});

router.post('/', isAuth, validCreateProductRequestParams, (req: Request, res: Response) => {
  const {name, price} = req.body;

  const newProduct = {
    id: Date.now(),
    name,
    price,
  };
  products.push(newProduct);

  res.json(newProduct);
});

router.put('/:id', isAuth, validUpdateProductRequestParams, (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const productIndex = products.findIndex((product) => product.id === Number(id));
  if (productIndex === -1) {
    next(new NotFoundError('Product not found'));
    return;
  }

  const updatedProduct = {
    ...products[productIndex],
    ...name && {name},
    ...price && {price},
  };
  products = [
    ...products.slice(0, productIndex),
    updatedProduct,
    ...products.slice(productIndex + 1),
  ];

  res.json(updatedProduct);
});

router.delete('/:id', isAuth, (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const productIndex = products.findIndex((product) => product.id === Number(id));
  if (productIndex === -1) {
    next(new NotFoundError('Product not found'));
    return;
  }

  const removedProduct = products.splice(productIndex, 1);

  res.json(removedProduct);
});

export default router;
