import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__BankIncome from '../../models/accounting/Model__BankIncome';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __BankIncome
//@route  POST /api/accounting/bankincome
//@access Private
export const add__BankIncome = asyncHandler(
  async (req: Request, res: Response) => {
    const { contract, paymentSum, paymentDate } = req.body;

    if (!contract || !paymentSum || !paymentDate) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__BankIncome = await Model__BankIncome.create({
      contract,
      paymentSum,
      paymentDate,
    });

    if (!new__BankIncome) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__BankIncome,
      });
    }
  }
);

//@desc   Updste a __BankIncome
//@route  PUT /api/accounting/bankincome/:id
//@access Private
export const update__BankIncome = asyncHandler(
  async (req: Request, res: Response) => {
    const { contract, paymentSum, paymentDate } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__BankIncome = {
      contract,
      paymentSum,
      paymentDate,
    };

    const updated__BankIncome = await Model__BankIncome.findByIdAndUpdate(
      req.params.id,
      new__BankIncome,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__BankIncome,
    });
  }
);

//@desc   Get All __BankIncomes
//@route  GET /api/accounting/bankincome
//@access Private
export const getAll__BankIncomes = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__BankIncome.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__BankIncomes = await Model__BankIncome.find()
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

    if (!all__BankIncomes) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__BankIncomes,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __BankIncome
//@route  GET /api/accounting/bankincome/:id
//@access Private
export const getOne__BankIncome = asyncHandler(
  async (req: Request, res: Response) => {
    const one__BankIncome = await Model__BankIncome.findById(
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

    if (!one__BankIncome) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__BankIncome,
    });
  }
);

//@desc   DELETE one __BankIncome
//@route  DELETE /api/accounting/bankincome/:id
//@access Private
export const delete__BankIncome = asyncHandler(
  async (req: Request, res: Response) => {
    const one__BankIncome = await Model__BankIncome.findByIdAndDelete(
      req.params.id
    );

    if (!one__BankIncome) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__BankIncome._id,
    });
  }
);
