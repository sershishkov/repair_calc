import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Model__DocumentNakladnaya from '../../models/accounting/Model__DocumentNakladnaya';
// import Model__StoreHouse from '../../models/refData/Model__StoreHouse';
import Model__Product from '../../models/refData/Model__Product';
// import { MyRequestParams } from '../../interfaces/CommonInterfaces';
import {
  I_GetUserAuthInfoToRequest,
  I_GetUserAndParams,
} from '../../interfaces/UserInterface';
// import { I_DocumentNakladnaya } from '../../interfaces/AccountingInterfaces';

//@desc   Add a __DocumentNakladnaya
//@route  POST /api/accounting/documentnakladnaya
//@access Private
export const add__DocumentNakladnaya = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    const {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      storeHouse,
      active,
      typeNakl,
    } = req.body;

    if (
      !nakladnayaNumber ||
      !nakladnayaDate ||
      !contract ||
      !products ||
      !storeHouse ||
      !active ||
      !typeNakl
    ) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    const new__DocumentNakladnaya = await Model__DocumentNakladnaya.create({
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      storeHouse,
      active,
      creator: req.user._id,
      typeNakl,
    });

    if (!new__DocumentNakladnaya) {
      res.status(400);
      throw new Error('Invalid  data');
    }
    if (typeNakl === 'outgoing' || typeNakl === 'incoming') {
      updateRecomendPriceInProducts([...products]);
    }
    //TODO:
    // if (active) {
    //   await saveProductsToStore(products, typeNakl, storeHouse, res);
    // }

    res.status(200).json({
      succes: true,
      my_data: new__DocumentNakladnaya,
    });
  }
);

//@desc   Updste a __DocumentNakladnaya
//@route  PUT /api/accounting/documentnakladnaya/:id
//@access Private
export const update__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const {
      nakladnayaNumber,
      nakladnayaDate,
      contract,
      products,
      storeHouse,
      active,
      typeNakl,
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
      storeHouse,
      active,
      typeNakl,
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
    if (typeNakl === 'outgoing' || typeNakl === 'incoming') {
      updateRecomendPriceInProducts([...products]);
    }
    //TODO:
    // await updateProductsInStore(
    //   old__DocumentNakladnaya,
    //   products,
    //   typeNakl,
    //   storeHouse,
    //   res
    // );

    res.status(200).json({
      success: true,
      my_data: updated__DocumentNakladnaya,
    });
  }
);

//@desc   Get All __DocumentNakladnayas
//@route  GET /api/accounting/documentnakladnaya
//@access Private
export const getAll__DocumentNakladnayas = asyncHandler(
  async (req: I_GetUserAndParams, res: Response) => {
    const page: number = parseInt(req.query.page) || 0;
    const pageSize: number = parseInt(req.query.limit) || 0;
    const skip = (page - 1) * pageSize;
    const total: number = await Model__DocumentNakladnaya.countDocuments({});
    const totalPages: number =
      pageSize === 0 ? total : Math.ceil(total / pageSize);
    const filterObject =
      req.user.role === 'admin'
        ? {}
        : {
            deleted: false,
          };
    // console.log(totalPages);
    const all__DocumentNakladnayas = await Model__DocumentNakladnaya.find(
      filterObject
    )
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
          {
            path: 'ourFirm',
            select: 'nameClientShort',
          },
        ],
      })
      .populate({
        path: 'products.product',
        select: 'productName priceBuyRecommend normPerOne amountInPackage',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
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
//@route  GET /api/accounting/documentnakladnaya/:id
//@access Private
export const getOne__DocumentNakladnaya = asyncHandler(
  async (req: Request, res: Response) => {
    const one__DocumentNakladnaya = await Model__DocumentNakladnaya.findById(
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
        path: 'products.product',
        select: 'productName priceBuyRecommend normPerOne amountInPackage',
        populate: [
          {
            path: 'unit',
            select: 'unitName',
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
//@route  DELETE /api/accounting/documentnakladnaya/:id
//@access Private
export const delete__DocumentNakladnaya = asyncHandler(
  async (req: I_GetUserAuthInfoToRequest, res: Response) => {
    if (req.user.role === 'admin') {
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
    } else {
      const new__DocumentNakladnaya = {
        active: false,
        deleted: true,
        whoDeleted: req.user._id,
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
        my_data: updated__DocumentNakladnaya?._id,
      });
    }
  }
);
///////////////////////////

const updateRecomendPriceInProducts = async (products: any[]) => {
  products.forEach(async (itemNakl) => {
    await Model__Product.findByIdAndUpdate(itemNakl.product, {
      priceBuyRecommend: itemNakl.priceBuy,
    });
  });
};

// const saveProductsToStore = async (
//   products: any[],
//   typeNakl: string,
//   storeHouse: string,
//   res: Response
// ) => {
//   const currentStore = await Model__StoreHouse.findById(storeHouse);
//   const currProductsInStore = [...currentStore?.products!];
//   const productsInNakl = [...products];

//   if (typeNakl === 'incoming' || typeNakl === 'returnFromBuyer') {
//     productsInNakl.forEach(async (itemNakl) => {
//       const findIndexProductInStore = currProductsInStore?.findIndex(
//         (item) => item.product === itemNakl.product
//       );

//       if (findIndexProductInStore === -1) {
//         currProductsInStore.push({
//           product: itemNakl.product,
//           amount: itemNakl.amount,
//           priceBuy_inStore: itemNakl.priceBuy,
//         });
//       } else {
//         const oldProduct = currProductsInStore[findIndexProductInStore];
//         const newProduct = {
//           product: itemNakl.product,
//           amount: itemNakl.amount + oldProduct.amount,
//           priceBuy_inStore:
//             (itemNakl.priceBuy * itemNakl.amount +
//               oldProduct.amount * oldProduct.priceBuy_inStore) /
//             (itemNakl.amount + oldProduct.amount),
//         };

//         currProductsInStore.splice(findIndexProductInStore, 1, newProduct);
//       }
//       if (typeNakl === 'incoming') {
//         await Model__Product.findByIdAndUpdate(itemNakl.product, {
//           priceBuy_recommend: itemNakl.priceBuy,
//         });
//       }
//     });
//   } else {
//     productsInNakl.forEach((itemNakl) => {
//       const findIndexProductInStore = currProductsInStore?.findIndex(
//         (item) => item.product === itemNakl.product
//       );

//       if (findIndexProductInStore === -1) {
//         res.status(400);
//         throw new Error('Нет такого товара на складе');
//       } else {
//         const oldProduct = currProductsInStore[findIndexProductInStore];
//         const newProduct = {
//           product: itemNakl.product,
//           amount: oldProduct.amount - itemNakl.amount,
//           priceBuy_inStore: oldProduct.priceBuy_inStore,
//         };

//         currProductsInStore.splice(findIndexProductInStore, 1, newProduct);
//       }
//     });
//   }
//   await Model__StoreHouse.findByIdAndUpdate(storeHouse, {
//     products: currProductsInStore,
//   });
// };

//////////////////////////////////////
// const updateProductsInStore = async (
//   old__DocumentNakladnaya: I_DocumentNakladnaya,
//   products: any[],
//   typeNakl: string,
//   storeHouse: string,
//   res: Response
// ) => {
//   //TODO: Сделать реверс старой накладной а затем вызвать saveProductsToStore с новыми данными
// };
