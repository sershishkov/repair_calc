// import { Request, Response, NextFunction } from 'express';
// import { Schema, model, Model } from 'mongoose';

// export const advancedResults =
//   (model: any, populate: any) =>
//   async (req: Request, res: Response, next: NextFunction) => {
//     let query;

//     const reqQuery = { ...req.query };

//     //Fields to exlude
//     const removeFields = ['select', 'sort', 'page', 'limit'];

//     //Loop over removeFields and delete them from reqQuery
//     removeFields.forEach((param) => delete reqQuery[param]);

//     let queryStr = JSON.stringify(reqQuery);

//     queryStr = queryStr.replace(
//       /\b(gt|gte|lt|lte|in)\b/g,
//       (match) => `$${match}`
//     );

//     query = model.find(JSON.parse(queryStr));
//     //Select fields
//     if (req.query.select) {
//       const fields = req.query.select.split(',').join(' ');
//       query = query.select(fields);
//     }

//     //Sort
//     if (req.query.sort) {
//       const sortBy = req.query.sort.split(',').join(' ');
//       query = query.sort(sortBy);
//     } else {
//       query = query.sort('-createdAt');
//     }

//     //Pagination
//     const page = parseInt(req.query.page, 10) || 1;
//     const limit = parseInt(req.query.limit, 10) || 25;
//     const startIndex = (page - 1) * limit;
//     const endIndex = page * limit;
//     const total = await model.countDocuments();

//     if (populate) {
//       query = query.populate(populate);
//     }

//     query = query.skip(startIndex).limit(limit);

//     const results = await query;

//     //Pagination result
//     const pagination = {};

//     if (endIndex < total) {
//       pagination.next = {
//         page: page + 1,
//         limit,
//       };
//     }

//     if (startIndex > 0) {
//       pagination.prev = {
//         page: page - 1,
//         limit,
//       };
//     }

//     res.advancedResults = {
//       success: true,
//       count: results.length,
//       pagination,
//       data: results,
//     };

//     next();
//   };
