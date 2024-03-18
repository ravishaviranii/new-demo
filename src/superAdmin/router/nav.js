import Dashboard from "../../admin/assets/images/Dashboard.svg";
import Product from "../../admin/assets/images/Product.svg";
import Budget from "../../admin/assets/images/Budget.svg";
import Setting from "../../admin/assets/images/Setting.svg";
import PaymentHistory from "../../admin/assets/images/budegtRuleHistory.svg";
import Utility from '../assets/Images/utility.svg';
import Vendor from '../assets/Images/vendor.svg';
import PurchaseHistory from '../assets/Images/purchaseHistory.svg';
import LoginHistory from '../assets/Images/loginHistory.svg';
import SupportSystem from '../assets/Images/SupportSystem.svg';
import Notification from '../assets/Images/notification.svg';
import MailContent from '../assets/Images/MailContent.svg';
import Campaign from '../assets/Images/Campaign.svg';
import BudgetRules from '../assets/Images/budgetRules.svg';
import CampaignSchedule from '../assets/Images/CampaignSchedule.svg';
import Support from '../../admin/assets/images/Support.svg';

const nav = [
  {
    name: "Dashboard",
    icon: <img src={Dashboard} />,
    path: "/",
  },
  {
    name: "Utility",
    icon: <img src={Utility} />,
    path: "/utility",
  },
  {
    name: "Packages",
    icon: <img src={Product} />,
    path: "/package",
  },
  {
    name: "Vendors",
    icon: <img src={Vendor} />,
    path: "/vendor",
  },
  {
    name: "Vendor Purchase History",
    icon: <img src={PurchaseHistory} />,
    path: "/vendor-purchase-history",
  },
  // {
  //   name: "Direct Access",
  //   icon: <img src={CronSchedular} />,
  //   path: "/direct-access",
  // },
  {
    name: "Login History",
    icon: <img src={LoginHistory} />,
    path: "/login-history",
  },

  {
    name: "Support System",
    icon: <img src={SupportSystem} />,
    subicon: <img src={Budget} />,
    children: [
      {
        name: "Category",
        path: "/support/category",
        icon: <img src={Budget} />,
      },
      {
        name: "Support",
        path: "/support/support-system",
        icon: <img src={Support} />,
      },
    ],
  },
  {
    name: "Payment History",
    icon: <img src={PaymentHistory} />,
    path: "/payment-history",
  },
  {
    name: "Settings",
    icon: <img src={Setting} />,
    path: "/settings",
  },
  {
    name: "Notifications",
    icon: <img src={Notification} />,
    path: "/notification",
  },
  {
    name: "Mail Content",
    icon: <img src={MailContent} />,
    path: "/mail-content",
  },
  {
    name: "Campaigns",
    icon: <img src={Campaign} />,
    path: "/campaign",
  },
  {
    name: "Budget Rules",
    icon: <img src={BudgetRules} />,
    path: "/budget-rule",
  },
  {
    name: "Campaign Schedulers",
    icon: <img src={CampaignSchedule} />,
    path: "/schedular",
  },
];

export default nav;
