import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Contract from '../../models/refData/Model__Contract';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __Contract
//@route  POST /api/accounting/contract
//@access Private
export const add__Contract = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      ourFirm,
      client,
      contractNumber,
      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
    } = req.body;

    if (
      !ourFirm ||
      !client ||
      !contractNumber ||
      !contractDescription ||
      !workAddress ||
      !contractType ||
      !paymentSource
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__Contract.findOne({ contractNumber });
    if (already__Exists) {
      res.status(400);
      throw new Error('contractNumber already exists');
    }

    const new__Contract = await Model__Contract.create({
      ourFirm,
      client,
      contractNumber,
      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
    });

    if (!new__Contract) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__Contract,
      });
    }
  }
);

//@desc   Updste a __Contract
//@route  PUT /api/accounting/contract/:id
//@access Private
export const update__Contract = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      ourFirm,
      client,
      contractNumber,
      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__Contract.findOne({ contractNumber });
    if (already__Exists) {
      res.status(400);
      throw new Error('contractNumber already exists');
    }

    const new__Contract = {
      ourFirm,
      client,
      contractNumber,
      contractDate,
      contractDescription,
      workAddress,
      contractType,
      paymentSource,
    };

    const updated__Contract = await Model__Contract.findByIdAndUpdate(
      req.params.id,
      new__Contract,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__Contract,
    });
  }
);

//@desc   Get All __Contracts
//@route  GET /api/accounting/contract
//@access Private
export const getAll__Contracts = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Contract.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__Contracts = await Model__Contract.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        contractDate: 1,
      });

    if (!all__Contracts) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__Contracts,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __Contract
//@route  GET /api/accounting/contract/:id
//@access Private
export const getOne__Contract = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Contract = await Model__Contract.findById(req.params.id)
      .populate({ path: 'ourFirm', select: 'nameClientShort nameTypeShort' })
      .populate({ path: 'client', select: 'nameClientShort nameTypeShort' })
      .populate({
        path: 'contractType',
        select: 'contractTypeName',
      })
      .populate({
        path: 'paymentSource',
        select: 'paymentSourceName',
      });

    if (!one__Contract) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Contract,
    });
  }
);

//@desc   DELETE one __Contract
//@route  DELETE /api/accounting/contract/:id
//@access Private
export const delete__Contract = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Contract = await Model__Contract.findByIdAndDelete(
      req.params.id
    );

    if (!one__Contract) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Contract._id,
    });
  }
);
