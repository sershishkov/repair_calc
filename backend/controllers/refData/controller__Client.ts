import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__Client from '../../models/refData/Model__Client';
import { MyRequestParams } from '../../interfaces/CommonInterfaces';

//@desc   Add a __Client
//@route  POST /api/accounting/clients
//@access Private
export const add__Client = asyncHandler(async (req: Request, res: Response) => {
  const {
    nameClientLong,
    nameClientShort,
    firmType,
    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,
    passport,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,
    certificateNumber,
    representedBy,
    whichActsOnTheBasis,
    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,
    certificate_PDV,
    telNumber,
    email,
    clientType,
  } = req.body;

  if (
    !nameClientLong ||
    !nameClientShort ||
    !firmType ||
    !postIndex ||
    !address ||
    !firstName_imen ||
    !patronymic_imen ||
    !lastName_imen ||
    !firstName_rodit ||
    !patronymic_rodit ||
    !lastName_rodit ||
    !jobTitle ||
    !tax ||
    !taxationType ||
    !telNumber ||
    !email ||
    !clientType
  ) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const new__Client = await Model__Client.create({
    nameClientLong,
    nameClientShort,
    firmType,
    postIndex,
    address,
    edrpou,
    inn,
    iban,
    iban_budget,
    passport,
    firstName_imen,
    patronymic_imen,
    lastName_imen,
    firstName_rodit,
    patronymic_rodit,
    lastName_rodit,
    certificateNumber,
    representedBy,
    whichActsOnTheBasis,
    jobTitle,
    jobTitle_rodit,
    tax,
    taxationType,
    certificate_PDV,
    telNumber,
    email,
    clientType,
  });

  if (!new__Client) {
    res.status(400);
    throw new Error('Invalid  data');
  } else {
    res.status(200).json({
      succes: true,
      my_data: new__Client,
    });
  }
});

//@desc   Updste a __Client
//@route  PUT /api/accounting/clients/:id
//@access Private
export const update__Client = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      nameClientLong,
      nameClientShort,
      firmType,
      postIndex,
      address,
      edrpou,
      inn,
      iban,
      iban_budget,
      passport,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,
      certificateNumber,
      representedBy,
      whichActsOnTheBasis,
      jobTitle,
      jobTitle_rodit,
      tax,
      taxationType,
      certificate_PDV,
      telNumber,
      email,
      clientType,
    } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__Client = {
      nameClientLong,
      nameClientShort,
      firmType,
      postIndex,
      address,
      edrpou,
      inn,
      iban,
      iban_budget,
      passport,
      firstName_imen,
      patronymic_imen,
      lastName_imen,
      firstName_rodit,
      patronymic_rodit,
      lastName_rodit,
      certificateNumber,
      representedBy,
      whichActsOnTheBasis,
      jobTitle,
      jobTitle_rodit,
      tax,
      taxationType,
      certificate_PDV,
      telNumber,
      email,
      clientType,
    };

    const updated__Client = await Model__Client.findByIdAndUpdate(
      req.params.id,
      new__Client,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__Client,
    });
  }
);

//@desc   Get All __Clients
//@route  GET /api/accounting/clients
//@access Private
export const getAll__Clients = asyncHandler(
  async (req: Request<{}, {}, {}, MyRequestParams>, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__Client.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);

    const all__Clients = await Model__Client.find()
      .limit(pageSize)
      .skip(skip)
      .sort({
        nameClientLong: 1,
      });

    if (!all__Clients) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: {
        items: all__Clients,
        total,
        totalPages,
      },
    });
  }
);

//@desc   Get one __Client
//@route  GET /api/accounting/clients/:id
//@access Private
export const getOne__Client = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Client = await Model__Client.findById(req.params.id)
      .populate({ path: 'firmType', select: 'nameTypeLong nameTypeShort' })
      .populate({ path: 'taxationType', select: 'taxationTypeName' })
      .populate({ path: 'clientType', select: 'clientTypeName' });

    if (!one__Client) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Client,
    });
  }
);

//@desc   DELETE one __Client
//@route  DELETE /api/accounting/clients/:id
//@access Private
export const delete__Client = asyncHandler(
  async (req: Request, res: Response) => {
    const one__Client = await Model__Client.findByIdAndDelete(req.params.id);

    if (!one__Client) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__Client._id,
    });
  }
);
