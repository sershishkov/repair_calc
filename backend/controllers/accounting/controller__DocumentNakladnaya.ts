import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__DocumentNakladnaya from '../../models/accounting/Model__DocumentNakladnaya';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __DocumentNakladnaya
//@route  POST /api/accounting/bankincome
//@access Private
export const add__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      active,
      creator,
      incomingOrOutgoingDoc,
    } = req.body;

    if (
      !nakladnayaNumber ||
      !nakladnayaDate ||
      !contract ||
      !products ||
      !active ||
      !creator ||
      !incomingOrOutgoingDoc
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__DocumentNakladnaya = await Model__DocumentNakladnaya.create({
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      active,
      creator,
      incomingOrOutgoingDoc,
    });

    if (!new__DocumentNakladnaya) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__DocumentNakladnaya,
      });
    }
  }
);

//@desc   Updste a __DocumentNakladnaya
//@route  PUT /api/accounting/bankincome/:id
//@access Private
export const update__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      active,
      creator,
      incomingOrOutgoingDoc,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__DocumentNakladnaya = {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      active,
      creator,
      incomingOrOutgoingDoc,
    };

    const updated__DocumentNakladnaya =
      await Model__DocumentNakladnaya.findByIdAndUpdate(
        req.params.id,
        new__DocumentNakladnaya,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      my_data: updated__DocumentNakladnaya,
    });
  }
);

//@desc   Get All __DocumentNakladnayas
//@route  GET /api/accounting/bankincome
//@access Private
export const getAll__DocumentNakladnayas = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__DocumentNakladnaya.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__DocumentNakladnayas = await Model__DocumentNakladnaya.find()
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

    if (!all__DocumentNakladnayas) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__DocumentNakladnayas,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __DocumentNakladnaya
//@route  GET /api/accounting/bankincome/:id
//@access Private
export const getOne__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const one__DocumentNakladnaya = await Model__DocumentNakladnaya.findById(
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

    if (!one__DocumentNakladnaya) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__DocumentNakladnaya,
    });
  }
);

//@desc   DELETE one __DocumentNakladnaya
//@route  DELETE /api/accounting/bankincome/:id
//@access Private
export const delete__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const one__DocumentNakladnaya =
      await Model__DocumentNakladnaya.findByIdAndDelete(req.params.id);

    if (!one__DocumentNakladnaya) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__DocumentNakladnaya._id,
    });
  }
);
