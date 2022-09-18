import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ContractType from '../../models/refData/Model__ContractType';

//@desc   Add a __ContractType
//@route  POST /api/accounting/contracttype
//@access Private
export const add__ContractType = asyncHandler(
  async (req: Request, res: Response) => {
    const { contractTypeName } = req.body;

    if (!contractTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ContractType = await Model__ContractType.create({
      contractTypeName,
    });

    if (!new__ContractType) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__ContractType,
      });
    }
  }
);

//@desc   Updste a __ContractType
//@route  PUT /api/accounting/contracttype/:id
//@access Private
export const update__ContractType = asyncHandler(
  async (req: Request, res: Response) => {
    const { contractTypeName } = req.body;

    if (!contractTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ContractType = {
      contractTypeName,
    };

    const updated__ContractType = await Model__ContractType.findByIdAndUpdate(
      req.params.id,
      new__ContractType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__ContractType,
    });
  }
);

//@desc   Get All __ContractTypes
//@route  GET /api/accounting/contracttype
//@access Private
export const getAll__ContractTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const all__ContractTypes = await Model__ContractType.find().sort({
      contractTypeName: 1,
    });

    if (!all__ContractTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__ContractTypes,
    });
  }
);

//@desc   Get one __ContractType
//@route  GET /api/accounting/contracttype/:id
//@access Private
export const getOne__ContractType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ContractType = await Model__ContractType.findById(req.params.id);

    if (!one__ContractType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__ContractType,
    });
  }
);

//@desc   DELETE one __ContractType
//@route  DELETE /api/accounting/contracttype/:id
//@access Private
export const delete__ContractType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ContractType = await Model__ContractType.findByIdAndDelete(
      req.params.id
    );

    if (!one__ContractType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
