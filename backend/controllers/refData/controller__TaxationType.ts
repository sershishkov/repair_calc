import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__TaxationType from '../../models/refData/Model__TaxationType';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

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

    //Check if already exists
    const already__Exists = await Model__TaxationType.findOne({
      taxationTypeName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('taxationTypeName already exists');
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

    //Check if already exists
    const already__Exists = await Model__TaxationType.findOne({
      taxationTypeName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('taxationTypeName already exists');
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
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__TaxationType.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__TaxationTypes = await Model__TaxationType.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        taxationTypeName: 1,
      });

    if (!all__TaxationTypes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__TaxationTypes,
        total,
        totalPages,
      },
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
      my_data: one__TaxationType._id,
    });
  }
);
