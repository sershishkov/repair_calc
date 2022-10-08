import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Unit from '../../models/refData/Model__Unit';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

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
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Unit.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__Units = await Model__Unit.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        unitName: 1,
      });

    if (!all__Units) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__Units,
        total,
        totalPages,
      },
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
      my_data: one__Unit._id,
    });
  }
);
