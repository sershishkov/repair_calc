import React from 'react';
import { Route } from 'react-router-dom';

import AccountanRoutes from './AccountanRoutes';
// import AdminRoutes from './AdminRoutes';
// import BossRoutes from './BossRoutes';
// import ClientRoutes from './ClientRoutes';
// import EngineerRoutes from './EngineerRoutes';
// import ManagerRoutes from './ManagerRoutes';
// import PartnerRoutes from './PartnerRoutes';
// import SellerRoutes from './SellerRoutes';
// import UserRoutes from './UserRoutes';
// import WorkerRoutes from './WorkerRoutes';

const IndexRoutes = () => {
  return (
    <Route>
      {/* <AccountanRoutes /> */}
      <Route element={<AccountanRoutes />} />
      {/* <AdminRoutes />
      <BossRoutes />
      <ClientRoutes />
      <EngineerRoutes />
      <ManagerRoutes />
      <PartnerRoutes />
      <SellerRoutes />
      <UserRoutes />
      <WorkerRoutes /> */}
    </Route>
  );
};

export default IndexRoutes;
