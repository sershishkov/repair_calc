import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__GroupProduct from '../../models/accounting/Model__GroupProduct';

//@desc   Add a __GroupProduct
//@route  POST /api/accounting/groupproduct
//@access Private
export const add__GroupProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupProductName } = req.body;

    if (!groupProductName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__GroupProduct = await Model__GroupProduct.create({
      groupProductName,
    });

    if (!new__GroupProduct) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__GroupProduct,
      });
    }
  }
);

//@desc   Updste a __GroupProduct
//@route  PUT /api/accounting/groupproduct/:id
//@access Private
export const update__GroupProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupProductName } = req.body;

    if (!groupProductName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__GroupProduct = {
      groupProductName,
    };

    const updated__GroupProduct = await Model__GroupProduct.findByIdAndUpdate(
      req.params.id,
      new__GroupProduct,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__GroupProduct,
    });
  }
);

//@desc   Get All __GroupProducts
//@route  GET /api/accounting/groupproduct
//@access Private
export const getAll__GroupProducts = asyncHandler(
  async (req: Request, res: Response) => {
    const all__GroupProducts = await Model__GroupProduct.find().sort({
      groupProductName: 1,
    });

    if (!all__GroupProducts) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__GroupProducts,
    });
  }
);

//@desc   Get one __GroupProduct
//@route  GET /api/accounting/groupproduct/:id
//@access Private
export const getOne__GroupProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupProduct = await Model__GroupProduct.findById(req.params.id);

    if (!one__GroupProduct) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupProduct,
    });
  }
);

//@desc   DELETE one __GroupProduct
//@route  DELETE /api/accounting/groupproduct/:id
//@access Private
export const delete__GroupProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupProduct = await Model__GroupProduct.findByIdAndDelete(
      req.params.id
    );

    if (!one__GroupProduct) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
