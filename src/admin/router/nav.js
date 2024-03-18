import Dashboard from "../assets/images/Dashboard.svg";
import Campaign from "../assets/images/Campaign.svg";
import CampaignSchedule from "../assets/images/Campaign Schedule.svg";
import Setting from "../assets/images/Setting.svg";
import ThemeSettng from "../assets/images/Theme settng.svg";
import UserManual from "../assets/images/User Manual.svg";
import BudgetRule from "../assets/images/budgetRule.svg";
import AdGroups from "../assets/images/AdGroups.svg";
import ProductAds from "../assets/images/ProductAds.svg";
import Keyword from "../assets/images/Keyword.svg";
import Orders from "../assets/images/Orders.svg";
import Product_List from "../assets/images/Product_List.svg";
import BudgetRuleHistory from "../assets/images/BudgetRuleHistory.svg";
import CronJobHistory from "../assets/images/CronJobHistory.svg";
import CampaignHistory from "../assets/images/CampaignHistory.svg";
import CronJobSchedule from "../assets/images/CronJobSchedule.svg";
import KeywordReserchTool from "../assets/images/KeywordReserchTool.svg";
import PaymentHistory from "../../admin/assets/images/budegtRuleHistory.svg";
import CampainSchedularHistoryImg from "../../admin/assets/images/Campaign Schedule History.svg"


import Support from "../assets/images/Support.svg";
const nav = [
  {
    name: "Dashboard",
    icon: <img src={Dashboard} />,
    path: "/",
  },
  {
    name: "Campaigns",
    icon: <img src={Campaign} />,
    path: "/campaign",
  },
  {
    name: "Budget Rules",
    icon: <img src={BudgetRule} />,

    children: [
      {
        name: "Budget Rules",
        icon: <img src={BudgetRule} />,
        path: "/budget-rule",
      },
      {
        name: "Budget Rule History",
        icon: <img src={BudgetRuleHistory} className="sidebar_img" />,
        path: "/budget-history",
      },
    ],
  },
  {
    name: "Ad Groups",
    icon: <img src={AdGroups} />,
    path: "/ad-groups",
  },
  {
    name: "Product Ads",
    icon: <img src={ProductAds} />,
    path: "/products",
  },
  {
    name: "Keywords",
    icon: <img src={Keyword} />,
    path: "/keyword",
  },
  {
    name: "Orders",
    icon: <img src={Orders} />,
    path: "/order",
  },
  {
    name: "Product List",
    icon: <img src={Product_List} className="sidebar_img" />,
    path: "/product-list",
  },
  {
    name: "Campaign Scheduler",
    icon: <img src={CampaignSchedule} />,
    children: [
      {
        name: "Campaign Scheduler",
        icon: <img src={CampaignSchedule} />,
        path: "/campaign-scheduler",
      },
      {
        name: "Campaign Scheduler History",
        icon: <img src={CampainSchedularHistoryImg} />,
        path: "/campaign-schedular-history",
      },
    ],
  },
  {
    name: "Campaign History",
    icon: <img src={CampaignHistory} className="sidebar_img" />,
    path: "/campaign-history",
  },

  {
    name: "Cron Job Scheduler",
    icon: <img src={CronJobSchedule} className="sidebar_img" />,

    children: [
      {
        name: "Cron Job Scheduler",
        icon: <img src={CronJobSchedule} className="sidebar_img" />,
        path: "/cron-schedular",
      },
      {
        name: "Cron Job History",
        icon: <img src={CronJobHistory} className="sidebar_img" />,
        path: "/cron-history",
      },
    ],
  },
  {
    name: "Payment History",
    icon: <img src={PaymentHistory} />,
    path: "/payment-history",
  },
  {
    name: "Keyword Research Tool",
    icon: <img src={KeywordReserchTool} />,
    path: "/keyword-research",
  },
  {
    name: "User Manual",
    icon: <img src={UserManual} />,
    path: "/user-manual",
  },
  {
    name: "Support",
    icon: <img src={Support} />,
    path: "/support-system",
  },

  {
    name: "Settings",
    icon: <img src={Setting} />,
    children: [
      {
        name: "Profile Setting",
        icon: <img src={Setting} className="sidebar_img" />,
        path: "/settings",
      },
      // {
      //   name: "My Plans",
      //   icon: <img src={BudgetRuleHistory} className="sidebar_img" />,
      //   path: "/my-plans",
      // },
      {
        name: "Theme Settings",
        icon: <img src={ThemeSettng} className="sidebar_img" />,
        path: "/theme-setting",
      },
      {
        name: "Language Setting",
        icon: <img src={Setting} className="sidebar_img" />,
        path: "/language-setting",
      },
    ],
  },
];

export default nav;
