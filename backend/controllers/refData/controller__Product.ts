import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Product from '../../models/refData/Model__Product';

//@desc   Add a __Product
//@route  POST /api/accounting/products
//@access Private
export const add__Product = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      productName,
      unit,
      groupProduct,
      productType,
      priceBuy,
      priceSell,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
    } = req.body;

    if (!productName || !unit || !productType || !priceBuy) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Product = await Model__Product.create({
      productName,
      unit,
      groupProduct,
      productType,
      priceBuy,
      priceSell,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
    });

    if (!new__Product) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__Product,
      });
    }
  }
);

//@desc   Updste a __Product
//@route  PUT /api/accounting/products/:id
//@access Private
export const update__Product = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      productName,
      unit,
      groupProduct,
      productType,
      priceBuy,
      priceSell,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Product = {
      productName,
      unit,
      groupProduct,
      productType,
      priceBuy,
      priceSell,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
    };

    const updated__Product = await Model__Product.findByIdAndUpdate(
      req.params.id,
      new__Product,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__Product,
    });
  }
);

//@desc   Get All __Products
//@route  GET /api/accounting/products
//@access Private
export const getAll__Products = asyncHandler(
  async (req: Request, res: Response) => {
    const myQuery = req.query;
    const all__Products = await Model__Product.find(myQuery).sort({
      productName: 1,
    });

    if (!all__Products) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__Products,
    });
  }
);

//@desc   Get one __Product
//@route  GET /api/accounting/products/:id
//@access Private
export const getOne__Product = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Product = await Model__Product.findById(req.params.id)
      .populate({ path: 'unit', select: 'unitName' })
      .populate({ path: 'groupProduct', select: 'groupProductName' })
      .populate({ path: 'productType', select: 'productTypeName' });

    if (!one__Product) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Product,
    });
  }
);

//@desc   DELETE one __Product
//@route  DELETE /api/accounting/products/:id
//@access Private
export const delete__Product = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Product = await Model__Product.findByIdAndDelete(req.params.id);

    if (!one__Product) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
