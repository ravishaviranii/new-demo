import Dashboard from "../layout/views/dashboard/Dashboard";
import ThemeSetting from "../layout/views/themeSetting/Setting";
import Campaign from "../layout/views/Campaign/Campaign";
import AdGroups from "../layout/views/adGroups/AdGroups";
import Settings from "../layout/views/settings/Settings";
import BudgetRule from "../layout/views/budgetRule/BudgetRule";
import Keyword from "../layout/views/keyword/Keyword";
import CampaignScheduler from "../layout/views/campaignScheduler/CampaignScheduler";
import Product from "../layout/views/productAds/Product";
import BudgetHistory from "../layout/views/budgetHistory/BudgetHistory";
import CronJob from "../layout/views/cronJob/CronJob";
import CronJobSchedular from "../layout/views/cronJobSchedular/CronJobSchedular";
import ProductList from "../layout/views/productList/ProductList";
import CampaignHistory from "../layout/views/campaignHistory/CampaignHistory";
import OrderList from "../layout/views/order/OrderList";
import UserManual from "../layout/views/userManual/UserManual";
import KeywordResearch from "../layout/views/keywordResearch/keywordResearch";
import SupportSystem from '../layout/views/supportSystem/SupportSystem';
import CampaignSchedularHistory from "../layout/views/campaignSchedularHistory/campaignSchedularHistory";
import PaymentHistory from "../layout/views/paymentHistory/PaymentHistory";
import LanguageSetting from "../layout/views/languageSettings/languageSettings";


const PagesRoutes = [
  {
    path: "/",
    component: <Dashboard />,
    exact: true,
  },
  {
    path: "/theme-setting",
    component: <ThemeSetting />,
    exact: true,
  },
  {
    path: "/campaign",
    component: <Campaign />,
    exact: true,
  },
  {
    path: "/campaign-scheduler",
    component: <CampaignScheduler />,
    exact: true,
  },
  {
    path: "/budget-rule",
    component: <BudgetRule />,
    exact: true,
  },
  {
    path: "/ad-groups",
    component: <AdGroups />,
    exact: true,
  },
  {
    path: "/settings",
    component: <Settings />,
    exact: true,
  },
  {
    path: "/keyword",
    component: <Keyword />,
    exact: true,
  },
  {
    path: "/product-list",
    component: <ProductList />,
    exact: true,
  },
  {
    path: "/products",
    component: <Product />,
    exact: true,
  },
  {
    path: "/budget-history",
    component: <BudgetHistory />,
    exact: true,
  },
  {
    path: "/cron-history",
    component: <CronJob />,
    exact: true,
  },
  {
    path: "/cron-schedular",
    component: <CronJobSchedular />,
    exact: true,
  },
  {
    path: "/campaign-history",
    component: <CampaignHistory />,
    exact: true,
  },
  {
    path: "/order",
    component: <OrderList />,
    exact: true,
  },
  {
    path: "/user-manual",
    component: <UserManual />,
    exact: true,
  },
  {
    path: "/keyword-research",
    component: <KeywordResearch />,
    exact: true,
  },
  {
    path: "/support-system",
    component: <SupportSystem />,
    exact: true,
  },
  {
    path: "/campaign-schedular-history",
    component: <CampaignSchedularHistory />,
    exact: true,
  },
  {
    path: "/payment-history",
    component: <PaymentHistory />,
    exact: true,
  },
  {
    path: "/language-setting",
    component: <LanguageSetting />,
    exact: true,
  },

];
export default PagesRoutes;
