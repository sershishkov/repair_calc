import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__DocumentAktOfWork from '../../models/accounting/Model__DocumentAktOfWork';
import Model__ServiceWork from '../../models/refData/Model__ServiceWork';
import Model__ThirdPartyService from '../../models/refData/Model__ThirdPartyService';
import {
  I_GetUserAuthInfoToRequest,
  I_GetUserAndParams,
} from '../../interfaces/UserInterface';

//@desc   Add a __DocumentAktOfWork
//@route  POST /api/accounting/documentaktofwork
//@access Private
export const add__DocumentAktOfWork = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const {
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,
      thirdPartyServices,
      serviceWorks,
      active,
      typeNakl,
    } = req.body;

    if (
      !aktOfWorkNumber ||
      !aktOfWorkDate ||
      !contract ||
      !(serviceWorks || thirdPartyServices) ||
      !active ||
      !typeNakl
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__DocumentAktOfWork = await Model__DocumentAktOfWork.create({
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,
      thirdPartyServices,
      serviceWorks,
      active,
      creator: req.user._id,
      typeNakl,
    });

    if (!new__DocumentAktOfWork) {
      res.status(400);
      throw new Error('Invalid  data');
    }
    if (thirdPartyServices.length > 0) {
      updateRecomendPriceIntThirdPartyServices([...thirdPartyServices]);
    }
    if (serviceWorks.length > 0) {
      updateRecomendPriceInServiceWorks([...serviceWorks]);
    }

    res.status(200).json({
      succes: true,
      my_data: new__DocumentAktOfWork,
    });
  }
);

//@desc   Updste a __DocumentAktOfWork
//@route  PUT /api/accounting/documentaktofwork/:id
//@access Private
export const update__DocumentAktOfWork = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,
      thirdPartyServices,
      serviceWorks,
      active,
      typeNakl,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__DocumentAktOfWork = {
      aktOfWorkNumber,
      aktOfWorkDate,
      contract,
      thirdPartyServices,
      serviceWorks,
      active,
      typeNakl,
    };

    const updated__DocumentAktOfWork =
      await Model__DocumentAktOfWork.findByIdAndUpdate(
        req.params.id,
        new__DocumentAktOfWork,
        {
          new: true,
          runValidators: true,
        }
      );
    if (thirdPartyServices.length > 0) {
      updateRecomendPriceIntThirdPartyServices([...thirdPartyServices]);
    }
    if (serviceWorks.length > 0) {
      updateRecomendPriceInServiceWorks([...serviceWorks]);
    }

    res.status(200).json({
      success: true,
      my_data: updated__DocumentAktOfWork,
    });
  }
);

//@desc   Get All __DocumentAktOfWorks
//@route  GET /api/accounting/documentaktofwork
//@access Private
export const getAll__DocumentAktOfWorks = asyncHandler(
  async (req: I_GetUserAndParams, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__DocumentAktOfWork.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);
    const filterObject =
      req.user.role === 'admin'
        ? {}
        : {
            deleted: false,
          };

    const all__DocumentAktOfWorks = await Model__DocumentAktOfWork.find(
      filterObject
    )
      .limit(pageSize)
      .skip(skip)
      .sort({
        aktOfWorkDate: -1,
      })
      .populate({
        path: 'contract',
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'client',
            select: 'nameClientShort',
          },
          {
            path: 'ourFirm',
            select: 'nameClientShort',
          },
        ],
      })
      .populate({
        path: 'thirdPartyServices.thirdPartyService',
        select: 'thirdPartyServiceName priceBuyRecommend',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'thirdPartyServices.enteredContract',
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'client',
            select: 'nameClientShort',
          },
          {
            path: 'ourFirm',
            select: 'nameClientShort',
          },
        ],
      })
      .populate({
        path: 'serviceWorks.serviceWork',
        select: 'serviceWorkName priceWorkerRecommend',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'serviceWorks.worker',
        select: 'lastName firstName',
      });

    if (!all__DocumentAktOfWorks) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__DocumentAktOfWorks,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __DocumentAktOfWork
//@route  GET /api/accounting/documentaktofwork/:id
//@access Private
export const getOne__DocumentAktOfWork = asyncHandler(
  async (req: Request, res: Response) => {
    const one__DocumentAktOfWork = await Model__DocumentAktOfWork.findById(
      req.params.id
    )
      .populate({
        path: 'contract',
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'client',
            select: 'nameClientShort',
          },
          {
            path: 'ourFirm',
            select: 'nameClientShort',
          },
        ],
      })
      .populate({
        path: 'thirdPartyServices.thirdPartyService',
        select: 'thirdPartyServiceName priceBuyRecommend',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'thirdPartyServices.enteredContract',
        select: 'contractNumber contractDescription',
        populate: [
          {
            path: 'client',
            select: 'nameClientShort',
          },
          {
            path: 'ourFirm',
            select: 'nameClientShort',
          },
        ],
      })
      .populate({
        path: 'serviceWorks.serviceWork',
        select: 'serviceWorkName priceWorkerRecommend',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
          },
        ],
      })
      .populate({
        path: 'serviceWorks.worker',
        select: 'lastName firstName',
      });

    if (!one__DocumentAktOfWork) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__DocumentAktOfWork,
    });
  }
);

//@desc   DELETE one __DocumentAktOfWork
//@route  DELETE /api/accounting/documentaktofwork/:id
//@access Private
export const delete__DocumentAktOfWork = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    if (req.user.role === 'admin') {
      const one__DocumentAktOfWork =
        await Model__DocumentAktOfWork.findByIdAndDelete(req.params.id);

      if (!one__DocumentAktOfWork) {
        res.status(400);
        throw new Error('Нет  объекта с данным id');
      }

      res.status(200).json({
        success: true,
        my_data: one__DocumentAktOfWork._id,
      });
    } else {
      const new__DocumentAktOfWork = {
        active: false,
        deleted: true,
        whoDeleted: req.user._id,
      };

      const updated__DocumentAktOfWork =
        await Model__DocumentAktOfWork.findByIdAndUpdate(
          req.params.id,
          new__DocumentAktOfWork,
          {
            new: true,
            runValidators: true,
          }
        );

      res.status(200).json({
        success: true,
        my_data: updated__DocumentAktOfWork?._id,
      });
    }
  }
);
///////////////////////////

const updateRecomendPriceIntThirdPartyServices = async (
  thirdPartyServices: any[]
) => {
  thirdPartyServices.forEach(async (itemNakl) => {
    await Model__ThirdPartyService.findByIdAndUpdate(
      itemNakl.thirdPartyService,
      {
        priceBuyRecommend: itemNakl.priceServiceEntered,
      }
    );
  });
};
const updateRecomendPriceInServiceWorks = async (serviceWorks: any[]) => {
  serviceWorks.forEach(async (itemNakl) => {
    await Model__ServiceWork.findByIdAndUpdate(itemNakl.serviceWork, {
      priceWorkerRecommend: itemNakl.priceWorkWoker,
    });
  });
};
