import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__WorkerRole from '../../models/refData/Model__WorkerRole';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __WorkerRole
//@route  POST /api/accounting/workerrole
//@access Private
export const add__WorkerRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { workerRoleName } = req.body;

    if (!workerRoleName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__WorkerRole.findOne({ workerRoleName });
    if (already__Exists) {
      res.status(400);
      throw new Error('workerRoleName already exists');
    }

    const new__WorkerRole = await Model__WorkerRole.create({
      workerRoleName,
    });

    if (!new__WorkerRole) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__WorkerRole,
      });
    }
  }
);

//@desc   Updste a __WorkerRole
//@route  PUT /api/accounting/workerrole/:id
//@access Private
export const update__WorkerRole = asyncHandler(
  async (req: Request, res: Response) => {
    const { workerRoleName } = req.body;

    if (!workerRoleName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    //Check if already exists
    const already__Exists = await Model__WorkerRole.findOne({ workerRoleName });
    if (already__Exists) {
      res.status(400);
      throw new Error('workerRoleName already exists');
    }

    const new__WorkerRole = {
      workerRoleName,
    };

    const updated__WorkerRole = await Model__WorkerRole.findByIdAndUpdate(
      req.params.id,
      new__WorkerRole,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__WorkerRole,
    });
  }
);

//@desc   Get All __WorkerRoles
//@route  GET /api/accounting/workerrole
//@access Private
export const getAll__WorkerRoles = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__WorkerRole.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__WorkerRoles = await Model__WorkerRole.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        workerRoleName: 1,
      });

    if (!all__WorkerRoles) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__WorkerRoles,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __WorkerRole
//@route  GET /api/accounting/workerrole/:id
//@access Private
export const getOne__WorkerRole = asyncHandler(
  async (req: Request, res: Response) => {
    const one__WorkerRole = await Model__WorkerRole.findById(req.params.id);

    if (!one__WorkerRole) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__WorkerRole,
    });
  }
);

//@desc   DELETE one __WorkerRole
//@route  DELETE /api/accounting/workerrole/:id
//@access Private
export const delete__WorkerRole = asyncHandler(
  async (req: Request, res: Response) => {
    const one__WorkerRole = await Model__WorkerRole.findByIdAndDelete(
      req.params.id
    );

    if (!one__WorkerRole) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__WorkerRole._id,
    });
  }
);
