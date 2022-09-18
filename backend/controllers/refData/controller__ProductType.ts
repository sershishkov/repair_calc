import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ProductType from '../../models/refData/Model__ProductType';

//@desc   Add a __ProductType
//@route  POST /api/accounting/producttype
//@access Private
export const add__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const { productTypeName } = req.body;

    if (!productTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ProductType = await Model__ProductType.create({
      productTypeName,
    });

    if (!new__ProductType) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__ProductType,
      });
    }
  }
);

//@desc   Updste a __ProductType
//@route  PUT /api/accounting/producttype/:id
//@access Private
export const update__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const { productTypeName } = req.body;

    if (!productTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ProductType = {
      productTypeName,
    };

    const updated__ProductType = await Model__ProductType.findByIdAndUpdate(
      req.params.id,
      new__ProductType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__ProductType,
    });
  }
);

//@desc   Get All __ProductTypes
//@route  GET /api/accounting/producttype
//@access Private
export const getAll__ProductTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const all__ProductTypes = await Model__ProductType.find().sort({
      productTypeName: 1,
    });

    if (!all__ProductTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__ProductTypes,
    });
  }
);

//@desc   Get one __ProductType
//@route  GET /api/accounting/producttype/:id
//@access Private
export const getOne__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductType = await Model__ProductType.findById(req.params.id);

    if (!one__ProductType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__ProductType,
    });
  }
);

//@desc   DELETE one __ProductType
//@route  DELETE /api/accounting/producttype/:id
//@access Private
export const delete__ProductType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ProductType = await Model__ProductType.findByIdAndDelete(
      req.params.id
    );

    if (!one__ProductType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
