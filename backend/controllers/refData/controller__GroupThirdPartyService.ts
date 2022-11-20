import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__GroupThirdPartyService from '../../models/refData/Model__GroupThirdPartyService';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __GroupThirdPartyService
//@route  POST /api/accounting/group-thirdparty-service
//@access Private
export const add__GroupThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupThirdPartyServiceName } = req.body;

    if (!groupThirdPartyServiceName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if already exists
    const already__Exists = await Model__GroupThirdPartyService.findOne({
      groupThirdPartyServiceName,
    });
    if (already__Exists) {
      res.status(400);
      throw new Error('groupThirdPartyServiceName already exists');
    }

    const new__GroupThirdPartyService =
      await Model__GroupThirdPartyService.create({
        groupThirdPartyServiceName,
      });

    if (!new__GroupThirdPartyService) {
      res.status(400);
      throw new Error('Invalid  data');
    } else {
      res.status(200).json({
        succes: true,
        my_data: new__GroupThirdPartyService,
      });
    }
  }
);

//@desc   Updste a __GroupThirdPartyService
//@route  PUT /api/accounting/group-thirdparty-service/:id
//@access Private
export const update__GroupThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const { groupThirdPartyServiceName } = req.body;

    if (!groupThirdPartyServiceName) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__GroupThirdPartyService = {
      groupThirdPartyServiceName,
    };

    const updated__GroupThirdPartyService =
      await Model__GroupThirdPartyService.findByIdAndUpdate(
        req.params.id,
        new__GroupThirdPartyService,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json({
      success: true,
      my_data: updated__GroupThirdPartyService,
    });
  }
);

//@desc   Get All __GroupThirdPartyServices
//@route  GET /api/accounting/group-thirdparty-service
//@access Private
export const getAll__GroupThirdPartyServices = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__GroupThirdPartyService.countDocuments(
      {}
    );
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    // console.log(totalPages);
    const all__GroupThirdPartyServices =
      await Model__GroupThirdPartyService.find()
        .limit(pageSize)
        .skip(skip)
        .sort({
          groupThirdPartyServiceName: 1,
        });

    if (!all__GroupThirdPartyServices) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__GroupThirdPartyServices,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __GroupThirdPartyService
//@route  GET /api/accounting/group-thirdparty-service/:id
//@access Private
export const getOne__GroupThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupThirdPartyService =
      await Model__GroupThirdPartyService.findById(req.params.id);

    if (!one__GroupThirdPartyService) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupThirdPartyService,
    });
  }
);

//@desc   DELETE one __GroupThirdPartyService
//@route  DELETE /api/accounting/group-thirdparty-service/:id
//@access Private
export const delete__GroupThirdPartyService = asyncHandler(
  async (req: Request, res: Response) => {
    const one__GroupThirdPartyService =
      await Model__GroupThirdPartyService.findByIdAndDelete(req.params.id);

    if (!one__GroupThirdPartyService) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__GroupThirdPartyService._id,
    });
  }
);
