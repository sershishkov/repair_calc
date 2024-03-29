import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__GroupWork from '../../models/refData/Model__GroupWork';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __GroupWork
//@route  POST /api/accounting/groupwork
//@access Private
export const add__GroupWork = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupWorkName } = req.body;

    if (!groupWorkName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__GroupWork.findOne({ groupWorkName });
    if (already__Exists) {
      res.status(400);
      throw new Error('groupWorkName already exists');
    }

    const new__GroupWork = await Model__GroupWork.create({
      groupWorkName,
    });

    if (!new__GroupWork) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__GroupWork,
      });
    }
  }
);

//@desc   Updste a __GroupWork
//@route  PUT /api/accounting/groupwork/:id
//@access Private
export const update__GroupWork = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupWorkName } = req.body;

    if (!groupWorkName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__GroupWork = {
      groupWorkName,
    };

    const updated__GroupWork = await Model__GroupWork.findByIdAndUpdate(
      req.params.id,
      new__GroupWork,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__GroupWork,
    });
  }
);

//@desc   Get All __GroupWorks
//@route  GET /api/accounting/groupwork
//@access Private
export const getAll__GroupWorks = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__GroupWork.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__GroupWorks = await Model__GroupWork.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        groupWorkName: 1,
      });

    if (!all__GroupWorks) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__GroupWorks,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __GroupWork
//@route  GET /api/accounting/groupwork/:id
//@access Private
export const getOne__GroupWork = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupWork = await Model__GroupWork.findById(req.params.id);

    if (!one__GroupWork) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupWork,
    });
  }
);

//@desc   DELETE one __GroupWork
//@route  DELETE /api/accounting/groupwork/:id
//@access Private
export const delete__GroupWork = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupWork = await Model__GroupWork.findByIdAndDelete(
      req.params.id
    );

    if (!one__GroupWork) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupWork._id,
    });
  }
);
