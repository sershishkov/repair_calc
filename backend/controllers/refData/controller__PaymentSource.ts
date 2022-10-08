import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__PaymentSource from '../../models/refData/Model__PaymentSource';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __PaymentSource
//@route  POST /api/accounting/paymentsource
//@access Private
export const add__PaymentSource = asyncHandler(
  async (req: Request, res: Response) => {
    const { paymentSourceName } = req.body;

    if (!paymentSourceName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__PaymentSource = await Model__PaymentSource.create({
      paymentSourceName,
    });

    if (!new__PaymentSource) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__PaymentSource,
      });
    }
  }
);

//@desc   Updste a __PaymentSource
//@route  PUT /api/accounting/paymentsource/:id
//@access Private
export const update__PaymentSource = asyncHandler(
  async (req: Request, res: Response) => {
    const { paymentSourceName } = req.body;

    if (!paymentSourceName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__PaymentSource = {
      paymentSourceName,
    };

    const updated__PaymentSource = await Model__PaymentSource.findByIdAndUpdate(
      req.params.id,
      new__PaymentSource,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__PaymentSource,
    });
  }
);

//@desc   Get All __PaymentSources
//@route  GET /api/accounting/paymentsource
//@access Private
export const getAll__PaymentSources = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__PaymentSource.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__PaymentSources = await Model__PaymentSource.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        paymentSourceName: 1,
      });

    if (!all__PaymentSources) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__PaymentSources,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __PaymentSource
//@route  GET /api/accounting/paymentsource/:id
//@access Private
export const getOne__PaymentSource = asyncHandler(
  async (req: Request, res: Response) => {
    const one__PaymentSource = await Model__PaymentSource.findById(
      req.params.id
    );

    if (!one__PaymentSource) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__PaymentSource,
    });
  }
);

//@desc   DELETE one __PaymentSource
//@route  DELETE /api/accounting/paymentsource/:id
//@access Private
export const delete__PaymentSource = asyncHandler(
  async (req: Request, res: Response) => {
    const one__PaymentSource = await Model__PaymentSource.findByIdAndDelete(
      req.params.id
    );

    if (!one__PaymentSource) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__PaymentSource._id,
    });
  }
);
