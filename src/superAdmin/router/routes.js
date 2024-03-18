import Dashboard from "../component/dashboard/Dashboard";
import Utility from "../component/utility/Utility";
import Package from "../component/package/Package";
import Vendor from "../component/vendor/Vendor";
import VendorPurchaseHistory from "../component/vendorPurchaseHistory/VendorPurchaseHistory";
import LoginHistory from "../component/loginHistory/loginHistory";
import Settings from "../component/settings/Settings";
import List from "../component/support-system/List";
import Category from "../component/category/Category";
import PaymentHistory from "../component/paymentHistory/PaymentHistory";
import Notification from "../component/notification/notification";
import Campaign from "../component/campaign/Campaign";
import BudgetRule from "../component/budgetRule/BudgetRule";
import Schedular from "../component/campaignScheduler/Schedular";
import Mail from "../component/mail/mail";

const SuperAdminRoutes = [
  {
    path: "/",
    component: <Dashboard />,
    exact: true,
  },
  {
    path: "/utility",
    component: <Utility />,
    exact: true,
  },
  {
    path: "/package",
    component: <Package />,
    exact: true,
  },
  {
    path: "/vendor",
    component: <Vendor />,
    exact: true,
  },
  {
    path: "/vendor-purchase-history",
    component: <VendorPurchaseHistory />,
    exact: true,
  },
  {
    path: "/login-history",
    component: <LoginHistory />,
    exact: true,
  },
  {
    path: "/payment-history",
    component: <PaymentHistory />,
    exact: true,
  },
  {
    path: "/settings",
    component: <Settings />,
    exact: true,
  },
  {
    path: "/support/support-system",
    component: <List />,
    exact: true,
  },
  {
    path: "/support/category",
    component: <Category />,
    exact: true,
  },
  {
    path: "/notification",
    component: <Notification />,
    exact: true,
  },
  {
    path: "/campaign",
    component: <Campaign />,
    exact: true,
  },
  {
    path: "/budget-rule",
    component: <BudgetRule />,
    exact: true,
  },
  {
    path: "/schedular",
    component: <Schedular />,
    exact: true,
  },
  {
    path: "/mail-content",
    component: <Mail />,
    exact: true,
  },
];
export default SuperAdminRoutes;
