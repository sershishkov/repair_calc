import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__FirmType from '../../models/refData/Model__FirmType';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __FirmType
//@route  POST /api/accounting/firmtype
//@access Private
export const add__FirmType = asyncHandler(
  async (req: Request, res: Response) => {
    const { nameTypeLong, nameTypeShort } = req.body;

    if (!nameTypeLong) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__FirmType.findOne({ nameTypeLong });
    if (already__Exists) {
      res.status(400);
      throw new Error('nameTypeLong already exists');
    }

    const new__FirmType = await Model__FirmType.create({
      nameTypeLong,
      nameTypeShort,
    });

    if (!new__FirmType) {
      res.status(400);
      throw new Error('Invalid user data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__FirmType,
      });
    }
  }
);

//@desc   Updste a __FirmType
//@route  PUT /api/accounting/firmtype/:id
//@access Private
export const update__FirmType = asyncHandler(
  async (req: Request, res: Response) => {
    const { nameTypeLong, nameTypeShort } = req.body;

    if (!nameTypeLong && !nameTypeShort) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__FirmType = {
      nameTypeLong,
      nameTypeShort,
    };

    const updated__FirmType = await Model__FirmType.findByIdAndUpdate(
      req.params.id,
      new__FirmType,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__FirmType,
    });
  }
);

//@desc   Get All __FirmTypes
//@route  GET /api/accounting/firmtype
//@access Private
export const getAll__FirmTypes = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__FirmType.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__FirmTypes = await Model__FirmType.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        nameTypeLong: 1,
      });

    if (!all__FirmTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__FirmTypes,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __FirmType
//@route  GET /api/accounting/firmtype/:id
//@access Private
export const getOne__FirmType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__FirmType = await Model__FirmType.findById(req.params.id);

    if (!one__FirmType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__FirmType,
    });
  }
);

//@desc   DELETE one __FirmType
//@route  DELETE /api/accounting/firmtype/:id
//@access Private
export const delete__FirmType = asyncHandler(
  async (req: Request, res: Response) => {
    const one__FirmType = await Model__FirmType.findByIdAndDelete(
      req.params.id
    );

    if (!one__FirmType) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__FirmType._id,
    });
  }
);
