import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import dashboardimg1 from "../../../assets/images/dashboard-manual/manual1.png";
import dashboardimg2 from "../../../assets/images/dashboard-manual/manual 2.png";
import dashboardimg3 from "../../../assets/images/dashboard-manual/manual 3.png";
import dashboardimg4 from "../../../assets/images/dashboard-manual/manual 4.png"
import campaignMain from "../../../assets/images/campaign-manual/campaign main 1.png";
import addCampaign from "../../../assets/images/campaign-manual/campaign main 2.png";
import addCampaign2 from "../../../assets/images/campaign-manual/campaign main 3.png";
import viewCampaign from "../../../assets/images/campaign-manual/campaign main 4.png";
import editCampaign from "../../../assets/images/campaign-manual/campaign main 5.png";
import campaignFilter from "../../../assets/images/campaign-manual/campaign main 6.png";
import campaignFilter2 from "../../../assets/images/campaign-manual/campaign main 7.png";
import campaignFilter3 from "../../../assets/images/campaign-manual/campaign main 8.png";
import budgetRuleMain from "../../../assets/images/budget-rules-manual/budget rule 1.png";
import addBudgetRule from "../../../assets/images/budget-rules-manual/budget rule 2.png";
import editBudgetRule from "../../../assets/images/budget-rules-manual/budget rule 3.png";
import assignBudgetToCampaign from "../../../assets/images/budget-rules-manual/budget rule 4.png";
import budgetRuleHistoryImg1 from "../../../assets/images/budget-rule-history-manual/budgetrule history 1.png"
import budgetRuleHistoryImg2 from "../../../assets/images/budget-rule-history-manual/budgetrule history 2.png"
import adGroupsMain from "../../../assets/images/ad-group-manual/ad group 1.png";
import adGroupsFilter1 from "../../../assets/images/ad-group-manual/ad group 2.png";
import adGroupsFilter2 from "../../../assets/images/ad-group-manual/ad group 3.png";
import adGroupsFilter3 from "../../../assets/images/ad-group-manual/ad group 4.png";
import addAdGroup from "../../../assets/images/ad-group-manual/ad group 5.png";
import editAdGroup from "../../../assets/images/ad-group-manual/ad group 6.png";
import customFilterAdGroup from "../../../assets/images/ad-group-manual/ad group 7.png"
import productAdsMain from "../../../assets/images/product-ads-manual/product ads 1.png";
import productAdFilter1 from "../../../assets/images/product-ads-manual/product ads 2.png";
import productAdFilter2 from "../../../assets/images/product-ads-manual/product ads 3.png";
import productAdFilter3 from "../../../assets/images/product-ads-manual/product ads 4.png";
import addProductAd from "../../../assets/images/product-ads-manual/product ads 5.png";
import editProductAd from "../../../assets/images/product-ads-manual/product ads 6.png";
import customFilterForProductAds from "../../../assets/images/product-ads-manual/product ads 7.png"
import keywordsMain from "../../../assets/images/keywords-manual/keywords1.png";
import keywordsFilter1 from "../../../assets/images/keywords-manual/keywords2.png";
import keywordsFilter2 from "../../../assets/images/keywords-manual/keywords3.png";
import keywordsFilter3 from "../../../assets/images/keywords-manual/keywords4.png";
import addKeyword from "../../../assets/images/keywords-manual/keywords5.png";
import editKeyword from "../../../assets/images/keywords-manual/keywords6.png";
import customFilterForKeyword from "../../../assets/images/keywords-manual/keywords7.png"
import ordersMain from "../../../assets/images/orders-manual/orders 1.png"
import ordersFilter1 from "../../../assets/images/orders-manual/orders 2.png"
import ordersFilter2 from "../../../assets/images/orders-manual/orders 3.png"
import viewOrderDetail from "../../../assets/images/orders-manual/orders 4.png"
import productListMain from "../../../assets/images/product-list-manual/product list 1.png"
import productListFilter1 from "../../../assets/images/product-list-manual/product list 2.png"
import productListFilter2 from "../../../assets/images/product-list-manual/product list 3.png"

import campaignSchedularMain from "../../../assets/images/campaign-schedular-manual/campaign sch 1.png";
import addCampaignSchedular from "../../../assets/images/campaign-schedular-manual/campaign sch 2.png";
import campaignSchedulerHistoryMain from "../../../assets/images/campaign-schedular-history-manual/campaign schedular history 1.png"
import campaignschedulerHistoryFilter1 from "../../../assets/images/campaign-schedular-history-manual/campaign schedular history 2.png"
import editCampaignSchedular from "../../../assets/images/campaign-schedular-manual/campaign sch 3.png";
import viewCampaignScheduler from "../../../assets/images/campaign-schedular-manual/campaign sch 4.png";
import viewCampaignScheduler2 from "../../../assets/images/campaign-schedular-manual/campaign sch 5.png";
import keywordResearchToolMain from "../../../assets/images/keyword-research-tool-manual/keyword research tool 1.png"
import campaignFilterType1 from "../../../assets/images/campaign-schedular-manual/campaign sch 5.png";
import campaignFilterType2 from "../../../assets/images/campaign-schedular-manual/campaign sch 6.png";
import campaignFilterType3 from "../../../assets/images/campaign-schedular-manual/campaign sch 7.png";
import campaignFilterType4 from "../../../assets/images/campaign-schedular-manual/campaign sch 8.png";
import addTime from "../../../assets/images/campaign-schedular-manual/campaign sch 9.png";
import editTime from "../../../assets/images/campaign-schedular-manual/campaign sch 10.png";
import budgetRuleHistoryMain from "../../../assets/images/budget-rule-history-manual/budgetrule history 1.png";
import budgetRuleHistoryFilter from "../../../assets/images/budget-rule-history-manual/budgetrule history 2.png";
import cronjobHistoryMain from "../../../assets/images/cron-job-history-manual/cronjobhistory1.png";
import cronjobHistoryFilter1 from "../../../assets/images/cron-job-history-manual/cronjobhistory2.png";
import cronjobHistoryFilter2 from "../../../assets/images/cron-job-history-manual/cronjobhistory3.png";
import campaignHistoryMain from "../../../assets/images/campaign-history-manual/campaignhistory1.png";
import campainHistoryFilter from "../../../assets/images/campaign-history-manual/campaignhistory2.png";
import cronjobschedularMain from "../../../assets/images/cron-job-schedular-manual/cronjobschedular1.png";
import cronjobschedularFilter1 from "../../../assets/images/cron-job-schedular-manual/cronjobschedular2.png";
import cronjobschedularFilter2 from "../../../assets/images/cron-job-schedular-manual/cronjobschedular3.png";
import settings1 from "../../../assets/images/settings-manual/settings1.png";
import settings2 from "../../../assets/images/settings-manual/settings2.png";
import themeSettings1 from "../../../assets/images/theme-settings-manual/themes1.png";
import themeSettings2 from "../../../assets/images/theme-settings-manual/themes2.png";
import themeColor from "../../../assets/images/theme-settings-manual/themes3.png";
import supportSystemMain from "../../../assets/images/support-system-manual/support system 1.png"
import supportSystemFilter1 from "../../../assets/images/support-system-manual/support system 2.png"
import supportSystemFilter2 from "../../../assets/images/support-system-manual/support system 3.png"
import addSupportSystemTickets from "../../../assets/images/support-system-manual/support system 4.png"
import viewChats from "../../../assets/images/support-system-manual/support system 5.png"
import paymentHistoryMain from "../../../assets/images/payment-history-manual/payment history 1.png"
import paymentHistoryFilter1 from "../../../assets/images/payment-history-manual/payment history 2.png"
import languageSettingsMain from "../../../assets/images/language-settings-manual/language settings 1.png"
import languageSettingsMain2 from "../../../assets/images/language-settings-manual/language settings 2.png"
import Filter from "../../../helper/filter/Filter";
import { useTranslation } from "react-i18next";

const UserManual = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <>
      <Filter name={"User Manual"} nameShow={true} dateShow={false} profileShow={false} />
      {/* <select onChange={(e) => i18n.changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="hi">Hindi</option>
        <option value="gu">Gujarati</option>
      </select> */}
      <div className="middle_container">
        <h5 className="text-dark p-2">
          {t('welcome')}
    


        </h5>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content-1"
            id="panel1a-header-1"
          >
            <Typography className="fw-semibold">{t("dashboard")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objective_dashboard_1")}</li>
                <li className="fs-6 p-1">{t("objective_dashboard_2")}</li>
                <li className="fs-6 p-1">{t("objective_dashboard_3")}</li>
              </ul>
            </div>
            <div className="mt-3">
              <h6>{t("section_dashboard_1")}</h6>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={dashboardimg1}
                  className="w-100 h-75"
                />
              </div>
            </div>
            <div className="mt-3">
              <h6>{t("section_dashboard_2")}</h6>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={dashboardimg2}
                  className="w-100 h-75"
                />
              </div>
            </div>
            <div className="mt-3">
              <h6>{t("section_dashboard_3")}</h6>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={dashboardimg3}
                  className="w-100 h-75"
                />
                <img
                  alt="dashboard-section-1"
                  src={dashboardimg4}
                  className="w-100 h-75"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("campaigns")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("campaigns_intro")}</h5>
              <p className="mt-3 fs-5">{t("campaign_intro_includes_1")}</p>
              <p className="fs-5">{t("campaign_intro_includes_2")}</p>
              <p className="fs-5">{t("campaign_intro_includes_3")}</p>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objective_campaigns_1")}</li>
                <li className="fs-6 p-1">{t("objective_campaigns_2")}</li>
                <li className="fs-6 p-1">{t("objective_campaigns_3")}</li>
              </ul>
              <div className="mt-2">
                {t("objective_campaigns_3")}
                <h6>{t("section_campaigns_1")}</h6>
              </div>
              <div className="w-100 h-75 p-1">
                <img
                  alt="dashboard-section-1"
                  src={campaignMain}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-2">
                <h6>{t("section_campaigns_2")}</h6>
              </div>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={campaignFilter}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-2">
                <h6>{t("section_campaigns_3")}</h6>
              </div>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={campaignFilter2}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-2">
                <h6>{t("section_campaigns_4")}</h6>
              </div>
              <div className="w-100 h-75 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={campaignFilter3}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-3">
                <h6>{t("section_campaigns_5")}</h6>
              </div>
              <div className="w-100 h-50 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={addCampaign}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-3">
                <h6>{t("section_campaigns_6")}</h6>
              </div>
              <div className="w-100 h-50 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={addCampaign2}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-3">
                <h6>{t("section_campaigns_7")}</h6>
              </div>
              <div className="w-100 h-50 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={editCampaign}
                  className="w-100 h-75"
                />
              </div>
              <div className="mt-3">
                <h6>{t("section_campaigns_8")}</h6>
              </div>
              <div className="w-100 h-50 p-1 mt-2">
                <img
                  alt="dashboard-section-1"
                  src={viewCampaign}
                  className="w-100 h-75"
                />
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("budgetRules")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("budget_rules_intro")}</h5>
              <li className=" mt-2 fs-6 p-1">
                {t("budget_rules_intro_follows_1")}
              </li>
              <li className="fs-6 p-1">{t("budget_rules_intro_follows_2")}</li>
              <li className="fs-6 p-1">{t("budget_rules_intro_follows_3")}</li>
              <h5 className="mb-3 mt-3">{t("budget_rules_types")}</h5>
              <p className="mt-2 mb-2 fs-6 p-1">{t("budget_rules_types_1")}</p>
              <p className="fs-6 p-1">{t("budget_rules_types_2")}</p>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objective_budget_rule_1")}</li>
                <li className="fs-6 p-1">{t("objective_budget_rule_2")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_budget_rule_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={budgetRuleMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_budget_rule_2")}</h6>
            </div>
            <div className="w-100 align-items-center h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={addBudgetRule}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_budget_rule_3")}</h6>
            </div>
            <div className="w-100 align-items-center h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={editBudgetRule}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_budget_rule_4")}</h6>
            </div>
            <div className="w-100 align-items-center h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={assignBudgetToCampaign}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel4"}
          onChange={handleChange("panel4")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("budgetRuleHistory")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">
                  {t("objective_budget_rule_history_1")}
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_budget_rule_history_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={budgetRuleHistoryImg1}
                className="w-100 h-75"
              />
              <img
                alt="dashboard-section-1"
                src={budgetRuleHistoryImg2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel5"}
          onChange={handleChange("panel5")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("adGroups")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("ad_groups_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objective_ad_groups_1")}</li>
                <li className="fs-6 p-1">{t("objective_ad_groups_2")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={adGroupsMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={adGroupsFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_3")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={adGroupsFilter2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_4")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={adGroupsFilter3}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_5")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={addAdGroup}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_6")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={editAdGroup}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_ad_groups_7")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={customFilterAdGroup}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel6"}
          onChange={handleChange("panel6")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("productAds")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("product_ads_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")} </h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_product_ads_1")}</li>
                <li className="fs-6 p-1">{t("objectiv_product_ads_2")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_product_ads_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={productAdsMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_product_ads_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={productAdFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_product_ads_3")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={productAdFilter2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_product_ads_4")}</h6>
            </div>
            <div className="w-100 mt-2 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={productAdFilter3}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_product_ads_5")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-3">
              <img
                alt="dashboard-section-1"
                src={addProductAd}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_product_ads_6")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={editProductAd}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_product_ads_7")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={customFilterForProductAds}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel7"}
          onChange={handleChange("panel7")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("keywords")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("keywords_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_keywords_1")}</li>
                <li className="fs-6 p-1">{t("objectiv_keywords_2")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_keywords_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={keywordsMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_keywords_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={keywordsFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_keywords_3")}</h6>
            </div>
            <div className="w-100 h-75 p-1 ">
              <img
                alt="dashboard-section-1"
                src={keywordsFilter2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_keywords_4")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={keywordsFilter3}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_keywords_5")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-3">
              <img
                alt="dashboard-section-1"
                src={addKeyword}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_keywords_6")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={editKeyword}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_keywords_7")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={customFilterForKeyword}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane25"}
          onChange={handleChange("pane25")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("Orders")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("orders_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_orders_1")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_orders_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={ordersMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_orders_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1 ">
              <img
                alt="dashboard-section-1"
                src={ordersFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_orders_3")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={ordersFilter2}
                className="w-100 h-75"
              />
            </div>

            <div className="mt-3">
              <h6>{t("section_orders_4")}</h6>
            </div>
            <div className="w-100 h-75 p-1 mt-2">
              <img
                alt="dashboard-section-1"
                src={viewOrderDetail}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane26"}
          onChange={handleChange("pane26")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("productList")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("product_list_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_product_list_1")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_product_list_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={productListMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_product_list_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1 ">
              <img
                alt="dashboard-section-1"
                src={productListFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_product_list_3")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={productListFilter2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel8"}
          onChange={handleChange("panel8")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("campaignSchedular")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("campaign_scheduler_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_1")}
                </li>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_2")}
                </li>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_3")}
                </li>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_4")}
                </li>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_5")}
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={campaignSchedularMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_2")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={addCampaignSchedular}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_3")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={editCampaignSchedular}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_4")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={viewCampaignScheduler}
                className="w-100 h-75"
              />
            </div>
            {/* <div className="w-100 h-75 p-3 mt-1">
            <img
              alt="dashboard-section-1"
              src={viewCampaignScheduler2}
              className="w-100 h-75"
            />
          </div> */}
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_5")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={viewCampaignScheduler2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_6")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={campaignFilterType4}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_7")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={addTime}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_8")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={editTime}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_9")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={campaignFilterType2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_10")}</h6>
            </div>
            <div className="w-100 h-75 p-3 mt-1">
              <img
                alt="dashboard-section-1"
                src={campaignFilterType3}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane27"}
          onChange={handleChange("pane27")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("campaignSchedularHistory")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("campaign_scheduler_history_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">
                  {t("objectiv_campaign_scheduler_history_1")}
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_history_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={campaignSchedulerHistoryMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_scheduler_history_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1 ">
              <img
                alt="dashboard-section-1"
                src={campaignschedulerHistoryFilter1}
                className="w-100 h-75"
              />
            </div>


          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane21"}
          onChange={handleChange("pane21")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("campaignHistory")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("campaign_history_intro")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_campaign_history_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={campaignHistoryMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_campaign_history_2")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={campainHistoryFilter}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane22"}
          onChange={handleChange("pane22")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("cronJobScheduler")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-4">
              <h5>{t("cron_job_schedulers_intro")}</h5>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">
                  {t("objectiv_cron_job_schedulers_1")}
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_cron_job_schedulers_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={cronjobschedularMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_cron_job_schedulers_2")}</h6>
            </div>
            <div className="w-100 h-75 p-2 mt-1">
              <img
                alt="dashboard-section-1"
                src={cronjobschedularFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_cron_job_schedulers_3")}</h6>
            </div>
            <div className="w-100 h-75 p-2 mt-1">
              <img
                alt="dashboard-section-1"
                src={cronjobschedularFilter2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "pane20"}
          onChange={handleChange("pane20")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("cronjobhistory")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-2">
              <h5 className="mb-2">{t("what_is_cron_job_history")}</h5>
              <p className="mb-3 fs-6">{t("cron_job_history_intro")}</p>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_cron_job_history_1")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_cron_job_history_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={cronjobHistoryMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_cron_job_history_2")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={cronjobHistoryFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-3">
              <h6>{t("section_cron_job_history_3")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={cronjobHistoryFilter2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "pane29"}
          onChange={handleChange("pane29")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("paymentHistory")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-2"></div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_payment_history_1")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_payment_history_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={paymentHistoryMain}
                className="w-100 h-75"
              />
            </div>

            <div className="mt-3">
              <h6>{t("section_payment_history_2")}</h6>
            </div>
            <div className="w-100  h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={paymentHistoryFilter1}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "pane27"}
          onChange={handleChange("pane27")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("keywordResearchTool")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-2">
              <h5 className="mb-2">{t("what_is_keyword_research_tool")}</h5>
              <p className="mb-3 fs-6">{t("keyword_research_tool_intro")}</p>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">
                  {t("objectiv_keyword_research_tool_1")}
                </li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_keyword_research_tool_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={keywordResearchToolMain}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "pane28"}
          onChange={handleChange("pane28")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("supportsystem")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="mb-2">
              <h5 className="mb-2">{t("what_is_support_system")}</h5>
              <p className="mb-3 fs-6">{t("support_system_intro")}</p>
            </div>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_support_system")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_support_system_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={supportSystemMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_support_system_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={supportSystemFilter1}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_support_system_3")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={supportSystemFilter2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_support_system_4")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={addSupportSystemTickets}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_support_system_5")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={viewChats}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "pane23"}
          onChange={handleChange("pane23")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("settings")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul>
                <li className="fs-6 p-1">{t("objectiv_setting_1")}</li>
              </ul>
            </div>

            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={settings1}
                className="w-100 h-75"
              />
            </div>
            <div className="w-100 mt-2 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={settings2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane24"}
          onChange={handleChange("pane24")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">{t("themeSetting")}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul className="mt-2">
                <li className="fs-6 p-1">{t("objectiv_theme_setting_1")}</li>
                <li className="fs-6 p-1">{t("objectiv_theme_setting_2")}</li>
                <li className="fs-6 p-1">{t("objectiv_theme_setting_3")}</li>
              </ul>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={themeSettings1}
                className="w-100 h-75"
              />
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={themeSettings2}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <li className="fs-4 p-1">{t("colorDialogBox")}</li>
            </div>
            <div className="w-100 mt-1 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={themeColor}
                className="w-100 h-75 p-2"
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "pane30"}
          onChange={handleChange("pane30")}
        >
          <AccordionSummary
            expandIcon={<i class="fa-solid fa-chevron-down"></i>}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className="fw-semibold">
              {t("languageSetting")}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <h5>{t("objective")}</h5>
              <ul className="mt-2">
                <li className="fs-6 p-1">{t("objectiv_language_setting_1")}</li>
                <li className="fs-6 p-1">{t("objectiv_language_setting_2")}</li>
              </ul>
            </div>
            <div className="mt-2">
              <h6>{t("section_language_setting_1")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={languageSettingsMain}
                className="w-100 h-75"
              />
            </div>
            <div className="mt-2">
              <h6>{t("section_language_setting_2")}</h6>
            </div>
            <div className="w-100 h-75 p-1">
              <img
                alt="dashboard-section-1"
                src={languageSettingsMain2}
                className="w-100 h-75"
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
};

export default UserManual;
