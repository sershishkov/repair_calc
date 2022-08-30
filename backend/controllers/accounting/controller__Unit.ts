import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Unit from '../../models/accounting/Model__Unit';

//@desc   Add a __Unit
//@route  POST /api/accounting/unit
//@access Private
export const add__Unit = asyncHandler(async (req: Request, res: Response) => {
  const { unitName } = req.body;

  if (!unitName) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const new__Unit = await Model__Unit.create({
    unitName,
  });

  if (!new__Unit) {
    res.status(400);
    throw new Error('Invalid  data');
  } else {
    res.status(200).json({
      succes: true,
      my_data: new__Unit,
    });
  }
});

//@desc   Updste a __Unit
//@route  PUT /api/accounting/unit/:id
//@access Private
export const update__Unit = asyncHandler(
  async (req: Request, res: Response) => {
    const { unitName } = req.body;

    if (!unitName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Unit = {
      unitName,
    };

    const updated__Unit = await Model__Unit.findByIdAndUpdate(
      req.params.id,
      new__Unit,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__Unit,
    });
  }
);

//@desc   Get All __Units
//@route  GET /api/accounting/unit
//@access Private
export const getAll__Units = asyncHandler(
  async (req: Request, res: Response) => {
    const all__Units = await Model__Unit.find().sort({
      unitName: 1,
    });

    if (!all__Units) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__Units,
    });
  }
);

//@desc   Get one __Unit
//@route  GET /api/accounting/unit/:id
//@access Private
export const getOne__Unit = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Unit = await Model__Unit.findById(req.params.id);

    if (!one__Unit) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Unit,
    });
  }
);

//@desc   DELETE one __Unit
//@route  DELETE /api/accounting/unit/:id
//@access Private
export const delete__Unit = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Unit = await Model__Unit.findByIdAndDelete(req.params.id);

    if (!one__Unit) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
