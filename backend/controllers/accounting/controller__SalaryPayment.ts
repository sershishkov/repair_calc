import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__SalaryPayment from '../../models/accounting/Model__SalaryPayment';

//@desc   Add a __SalaryPayment
//@route  POST /api/accounting/salarypayment
//@access Private
export const add__SalaryPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { worker, paymentSum, paymentDate, contract } = req.body;

    if (!worker || !paymentSum || !contract) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__SalaryPayment = await Model__SalaryPayment.create({
      worker,
      paymentSum,
      paymentDate,
      contract,
    });

    if (!new__SalaryPayment) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__SalaryPayment,
      });
    }
  }
);

//@desc   Updste a __SalaryPayment
//@route  PUT /api/accounting/salarypayment/:id
//@access Private
export const update__SalaryPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const { worker, paymentSum, paymentDate, contract } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__SalaryPayment = {
      worker,
      paymentSum,
      paymentDate,
      contract,
    };

    const updated__SalaryPayment = await Model__SalaryPayment.findByIdAndUpdate(
      req.params.id,
      new__SalaryPayment,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__SalaryPayment,
    });
  }
);

//@desc   Get All __SalaryPayments
//@route  GET /api/accounting/salarypayment
//@access Private
export const getAll__SalaryPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const all__SalaryPayments = await Model__SalaryPayment.find().sort({
      paymentDate: -1,
    });

    if (!all__SalaryPayments) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__SalaryPayments,
    });
  }
);

//@desc   Get one __SalaryPayment
//@route  GET /api/accounting/salarypayment/:id
//@access Private
export const getOne__SalaryPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const one__SalaryPayment = await Model__SalaryPayment.findById(
      req.params.id
    )
      .populate({ path: 'worker', select: 'lastName  firstName ' })
      .populate({
        path: 'contract',
        select: 'contractNumber contractDescription',
      });

    if (!one__SalaryPayment) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__SalaryPayment,
    });
  }
);

//@desc   DELETE one __SalaryPayment
//@route  DELETE /api/accounting/salarypayment/:id
//@access Private
export const delete__SalaryPayment = asyncHandler(
  async (req: Request, res: Response) => {
    const one__SalaryPayment = await Model__SalaryPayment.findByIdAndDelete(
      req.params.id
    );

    if (!one__SalaryPayment) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
