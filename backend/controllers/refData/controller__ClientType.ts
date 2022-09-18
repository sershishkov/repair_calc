import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__ClientType from '../../models/refData/Model__ClientType';

//@desc   Add a __ClientType
//@route  POST /api/accounting/clienttype
//@access Private
export const add__ClientType = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientTypeName } = req.body;

    if (!clientTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ClientType = await Model__ClientType.create({
      clientTypeName,
    });

    if (!new__ClientType) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__ClientType,
      });
    }
  }
);

//@desc   Updste a __ClientType
//@route  PUT /api/accounting/clienttype/:id
//@access Private
export const update__ClientType = asyncHandler(
  async (req: Request, res: Response) => {
    const { clientTypeName } = req.body;

    if (!clientTypeName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__ClientType = {
      clientTypeName,
    };

    const updated__ClientType = await Model__ClientType.findByIdAndUpdate(
      req.params.id,
      new__ClientType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__ClientType,
    });
  }
);

//@desc   Get All __ClientTypes
//@route  GET /api/accounting/clienttype
//@access Private
export const getAll__ClientTypes = asyncHandler(
  async (req: Request, res: Response) => {
    const all__ClientTypes = await Model__ClientType.find().sort({
      clientTypeName: 1,
    });

    if (!all__ClientTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__ClientTypes,
    });
  }
);

//@desc   Get one __ClientType
//@route  GET /api/accounting/clienttype/:id
//@access Private
export const getOne__ClientType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ClientType = await Model__ClientType.findById(req.params.id);

    if (!one__ClientType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__ClientType,
    });
  }
);

//@desc   DELETE one __ClientType
//@route  DELETE /api/accounting/clienttype/:id
//@access Private
export const delete__ClientType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__ClientType = await Model__ClientType.findByIdAndDelete(
      req.params.id
    );

    if (!one__ClientType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
