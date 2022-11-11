import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__PaymentToSupplier from '../../models/accounting/Model__PaymentToSupplier';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __PaymentToSupplier
//@route  POST /api/accounting/paymenttosupplier
//@access Private
export const add__PaymentToSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const { contract, paymentSum, paymentDate } = req.body;

    if (!contract || !paymentSum || !paymentDate) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__PaymentToSupplier = await Model__PaymentToSupplier.create({
      contract,
      paymentSum,
      paymentDate,
    });

    if (!new__PaymentToSupplier) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__PaymentToSupplier,
      });
    }
  }
);

//@desc   Updste a __PaymentToSupplier
//@route  PUT /api/accounting/paymenttosupplier/:id
//@access Private
export const update__PaymentToSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const { contract, paymentSum, paymentDate } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__PaymentToSupplier = {
      contract,
      paymentSum,
      paymentDate,
    };

    const updated__PaymentToSupplier =
      await Model__PaymentToSupplier.findByIdAndUpdate(
        req.params.id,
        new__PaymentToSupplier,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      my_data: updated__PaymentToSupplier,
    });
  }
);

//@desc   Get All __PaymentToSuppliers
//@route  GET /api/accounting/paymenttosupplier
//@access Private
export const getAll__PaymentToSuppliers = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__PaymentToSupplier.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__PaymentToSuppliers = await Model__PaymentToSupplier.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        paymentDate: -1,
      })
      .populate({
        path: 'contract',
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'client',
            select: 'nameClientShort',
          },
        ],
      });

    if (!all__PaymentToSuppliers) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__PaymentToSuppliers,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __PaymentToSupplier
//@route  GET /api/accounting/paymenttosupplier/:id
//@access Private
export const getOne__PaymentToSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const one__PaymentToSupplier = await Model__PaymentToSupplier.findById(
      req.params.id
    ).populate({
      path: 'contract',
      select: 'contractNumber contractDescription',
      populate: [
        {
          path: 'client',
          select: 'nameClientShort',
        },
      ],
    });

    if (!one__PaymentToSupplier) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__PaymentToSupplier,
    });
  }
);

//@desc   DELETE one __PaymentToSupplier
//@route  DELETE /api/accounting/paymenttosupplier/:id
//@access Private
export const delete__PaymentToSupplier = asyncHandler(
  async (req: Request, res: Response) => {
    const one__PaymentToSupplier =
      await Model__PaymentToSupplier.findByIdAndDelete(req.params.id);

    if (!one__PaymentToSupplier) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__PaymentToSupplier._id,
    });
  }
);
