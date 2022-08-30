import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__TaxationType from '../../models/accounting/Model__TaxationType';

//@desc   Add a __TaxationType
//@route  POST /api/accounting/taxationtype
//@access Private
export const add__TaxationType = asyncHandler(
  async (req: Request, res: Response) => {
    const { taxationTypeName } = req.body;

    if (!taxationTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__TaxationType = await Model__TaxationType.create({
      taxationTypeName,
    });

    if (!new__TaxationType) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__TaxationType,
      });
    }
  }
);

//@desc   Updste a __TaxationType
//@route  PUT /api/accounting/taxationtype/:id
//@access Private
export const update__TaxationType = asyncHandler(
  async (req: Request, res: Response) => {
    const { taxationTypeName } = req.body;

    if (!taxationTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__TaxationType = {
      taxationTypeName,
    };

    const updated__TaxationType = await Model__TaxationType.findByIdAndUpdate(
      req.params.id,
      new__TaxationType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__TaxationType,
    });
  }
);

//@desc   Get All __TaxationTypes
//@route  GET /api/accounting/taxationtype
//@access Private
export const getAll__TaxationTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const all__TaxationTypes = await Model__TaxationType.find().sort({
      taxationTypeName: 1,
    });

    if (!all__TaxationTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__TaxationTypes,
    });
  }
);

//@desc   Get one __TaxationType
//@route  GET /api/accounting/taxationtype/:id
//@access Private
export const getOne__TaxationType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__TaxationType = await Model__TaxationType.findById(req.params.id);

    if (!one__TaxationType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__TaxationType,
    });
  }
);

//@desc   DELETE one __TaxationType
//@route  DELETE /api/accounting/taxationtype/:id
//@access Private
export const delete__TaxationType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__TaxationType = await Model__TaxationType.findByIdAndDelete(
      req.params.id
    );

    if (!one__TaxationType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
