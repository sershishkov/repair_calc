import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__StoreHouse from '../../models/refData/Model__StoreHouse';

import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __StoreHouse
//@route  POST /api/accounting/storehouse
//@access Private
export const add__StoreHouse = asyncHandler(
  async (req: Request, res: Response) => {
    const { storeHouseName, address } = req.body;

    if (!storeHouseName || !address) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__StoreHouse.findOne({ storeHouseName });
    if (already__Exists) {
      res.status(400);
      throw new Error('storeHouseName already exists');
    }

    const new__StoreHouse = await Model__StoreHouse.create({
      storeHouseName,
      address,
    });

    if (!new__StoreHouse) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__StoreHouse,
      });
    }
  }
);

//@desc   Updste a __StoreHouse
//@route  PUT /api/accounting/storehouse/:id
//@access Private
export const update__StoreHouse = asyncHandler(
  async (req: Request, res: Response) => {
    const { storeHouseName, address } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__StoreHouse = {
      storeHouseName,
      address,
    };

    const updated__StoreHouse = await Model__StoreHouse.findByIdAndUpdate(
      req.params.id,
      new__StoreHouse,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__StoreHouse,
    });
  }
);

//@desc   Get All __StoreHouses
//@route  GET /api/accounting/storehouse
//@access Private
export const getAll__StoreHouses = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__StoreHouse.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__StoreHouses = await Model__StoreHouse.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        storeHouseName: 1,
      });

    if (!all__StoreHouses) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__StoreHouses,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __StoreHouse
//@route  GET /api/accounting/storehouse/:id
//@access Private
export const getOne__StoreHouse = asyncHandler(
  async (req: Request, res: Response) => {
    const one__StoreHouse = await Model__StoreHouse.findById(req.params.id);

    if (!one__StoreHouse) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__StoreHouse,
    });
  }
);

//@desc   DELETE one __StoreHouse
//@route  DELETE /api/accounting/storehouse/:id
//@access Private
export const delete__StoreHouse = asyncHandler(
  async (req: Request, res: Response) => {
    const one__StoreHouse = await Model__StoreHouse.findByIdAndDelete(
      req.params.id
    );

    if (!one__StoreHouse) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__StoreHouse._id,
    });
  }
);
