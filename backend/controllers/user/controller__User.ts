import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__User from '../../models/user/Model__User';

//@desc   Add a __User
//@route  POST /api/user-admin
//@access Private
export const add__User = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  const new__User = await Model__User.create({
    name,
    email,
    password,
    role: role === 'admin' ? 'user' : role,
  });

  if (!new__User) {
    res.status(400);
    throw new Error('Invalid  data');
  } else {
    res.status(200).json({
      succes: true,
      my_data: new__User,
    });
  }
});

//@desc   Updste a __User
//@route  PUT /api/user-admin/:id
//@access Private
export const update__User = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, password, role } = req.body;

    if (!req.body) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__User = {
      name,
      email,
      password,
      role: role === 'admin' ? 'user' : role,
    };

    const updated__User = await Model__User.findByIdAndUpdate(
      req.params.id,
      new__User,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      my_data: updated__User,
    });
  }
);

//@desc   Get All __Users
//@route  GET /api/user-admin
//@access Private
export const getAll__Users = asyncHandler(
  async (req: Request, res: Response) => {
    const all__Users = await Model__User.find().sort({
      name: 1,
    });

    if (!all__Users) {
      res.status(400);
      throw new Error('На данный момент ничего в базе нет');
    }

    res.status(200).json({
      success: true,
      my_data: all__Users,
    });
  }
);

//@desc   Get one __User
//@route  GET /api/user-admin/:id
//@access Private
export const getOne__User = asyncHandler(
  async (req: Request, res: Response) => {
    const one__User = await Model__User.findById(req.params.id);

    if (!one__User) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: one__User,
    });
  }
);

//@desc   DELETE one __User
//@route  DELETE /api/user-admin/:id
//@access Private
export const delete__User = asyncHandler(
  async (req: Request, res: Response) => {
    const one__User = await Model__User.findByIdAndDelete(req.params.id);

    if (!one__User) {
      res.status(400);
      throw new Error('Нет  объекта с данным id');
    }

    res.status(200).json({
      success: true,
      my_data: {},
    });
  }
);
