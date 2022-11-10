import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Expense from '../../models/accounting/Model__Expense';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __Expense
//@route  POST /api/accounting/expense
//@access Private
export const add__Expense = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      expenseDescription,
      groupExpense,
      expenseSum,
      expenseDate,
      responsiblePerson,
      contract,
    } = req.body;

    if (
      !expenseDescription ||
      !groupExpense ||
      !expenseSum ||
      !responsiblePerson ||
      !contract
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Expense = await Model__Expense.create({
      expenseDescription,
      groupExpense,
      expenseSum,
      expenseDate,
      responsiblePerson,
      contract,
    });

    if (!new__Expense) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__Expense,
      });
    }
  }
);

//@desc   Updste a __Expense
//@route  PUT /api/accounting/expense/:id
//@access Private
export const update__Expense = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      expenseDescription,
      groupExpense,
      expenseSum,
      expenseDate,
      responsiblePerson,
      contract,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Expense = {
      expenseDescription,
      groupExpense,
      expenseSum,
      expenseDate,
      responsiblePerson,
      contract,
    };

    const updated__Expense = await Model__Expense.findByIdAndUpdate(
      req.params.id,
      new__Expense,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__Expense,
    });
  }
);

//@desc   Get All __Expenses
//@route  GET /api/accounting/expense
//@access Private
export const getAll__Expenses = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Expense.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__Expenses = await Model__Expense.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        expenseDate: -1,
      })
      .populate({ path: 'groupExpense', select: 'groupExpenseName' })
      .populate({ path: 'responsiblePerson', select: 'lastName  firstName ' })
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
    if (!all__Expenses) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__Expenses,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __Expense
//@route  GET /api/accounting/expense/:id
//@access Private
export const getOne__Expense = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Expense = await Model__Expense.findById(req.params.id)
      .populate({ path: 'groupExpense', select: 'groupExpenseName' })
      .populate({ path: 'responsiblePerson', select: 'lastName  firstName ' })
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

    if (!one__Expense) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Expense,
    });
  }
);

//@desc   DELETE one __Expense
//@route  DELETE /api/accounting/expense/:id
//@access Private
export const delete__Expense = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Expense = await Model__Expense.findByIdAndDelete(req.params.id);

    if (!one__Expense) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Expense._id,
    });
  }
);
