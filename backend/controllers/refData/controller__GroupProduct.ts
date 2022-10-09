import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__GroupProduct from '../../models/refData/Model__GroupProduct';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

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

    //Check if already exists
    const already__Exists = await Model__GroupProduct.findOne({
      groupProductName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('groupProductName already exists');
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
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__GroupProduct.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__GroupProducts = await Model__GroupProduct.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        groupProductName: 1,
      });

    if (!all__GroupProducts) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__GroupProducts,
        total,
        totalPages,
      },
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
      my_data: one__GroupProduct._id,
    });
  }
);
