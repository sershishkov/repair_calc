import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Product from '../../models/refData/Model__Product';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

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
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
    } = req.body;

    if (!productName || !unit || !productType) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__Product.findOne({ productName });
    if (already__Exists) {
      res.status(400);
      throw new Error('productName already exists');
    }

    const new__Product = await Model__Product.create({
      productName,
      unit,
      groupProduct,
      productType,
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
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
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
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
      normPerOne,
      amountInPackage,
      weight,
      height,
      width,
      length,
      paintingArea,
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
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Product.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__Products = await Model__Product.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        productName: 1,
      })
      .populate({ path: 'unit', select: 'unitName' })
      .populate({ path: 'groupProduct', select: 'groupProductName' })
      .populate({ path: 'productType', select: 'productTypeName' });

    if (!all__Products) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__Products,
        total,
        totalPages,
      },
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
      my_data: one__Product._id,
    });
  }
);
