import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__GroupExpense from '../../models/refData/Model__GroupExpense';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __GroupExpense
//@route  POST /api/accounting/groupexpense
//@access Private
export const add__GroupExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupExpenseName } = req.body;

    if (!groupExpenseName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__GroupExpense.findOne({
      groupExpenseName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('groupExpenseName already exists');
    }

    const new__GroupExpense = await Model__GroupExpense.create({
      groupExpenseName,
    });

    if (!new__GroupExpense) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__GroupExpense,
      });
    }
  }
);

//@desc   Updste a __GroupExpense
//@route  PUT /api/accounting/groupexpense/:id
//@access Private
export const update__GroupExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupExpenseName } = req.body;

    if (!groupExpenseName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__GroupExpense = {
      groupExpenseName,
    };

    const updated__GroupExpense = await Model__GroupExpense.findByIdAndUpdate(
      req.params.id,
      new__GroupExpense,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__GroupExpense,
    });
  }
);

//@desc   Get All __GroupExpenses
//@route  GET /api/accounting/groupexpense
//@access Private
export const getAll__GroupExpenses = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__GroupExpense.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__GroupExpenses = await Model__GroupExpense.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        groupExpenseName: 1,
      });

    if (!all__GroupExpenses) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__GroupExpenses,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __GroupExpense
//@route  GET /api/accounting/groupexpense/:id
//@access Private
export const getOne__GroupExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupExpense = await Model__GroupExpense.findById(req.params.id);

    if (!one__GroupExpense) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupExpense,
    });
  }
);

//@desc   DELETE one __GroupExpense
//@route  DELETE /api/accounting/groupexpense/:id
//@access Private
export const delete__GroupExpense = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupExpense = await Model__GroupExpense.findByIdAndDelete(
      req.params.id
    );

    if (!one__GroupExpense) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupExpense._id,
    });
  }
);
