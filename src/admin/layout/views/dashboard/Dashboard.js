import React from "react";
import Filter from "../../../helper/filter/Filter";
import Price from "./Price";
import AdvertiseTrend from "./AdvertiseTrend";
import TopCampaign from "./TopCampaign";
import Performance from "./performance/Performance";
import ProductPerformance from './ProductPerformance';
import Keyword from './keyword/Keyword';
import { sidebar, header, button, chart, body } from "../themeSetting/field";
import { useEffect } from "react";
import { PermissionCheck } from '../../../helper/permission/PermissionCheck';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation();

  useEffect(() => {
    if (localStorage.getItem('themeData')) {
      const theme = JSON.parse(localStorage.getItem('themeData'));
      const finalTheme = theme[0];
      const themeCategories = [...sidebar, ...header, ...button, ...chart, ...body];


      const defaultThemeArray = [];

      // Loop through each key in the theme object
      for (const category in finalTheme) {
        const categoryObj = finalTheme[category];

        // Loop through each property in the category object
        for (const property in categoryObj) {
          const colorValue = categoryObj[property];

          // Add an object to the array with property name and color value
          defaultThemeArray.push({ Id: property, color: colorValue });
        }
      }


      defaultThemeArray.forEach((x, i) => {
        const match = themeCategories.find((y, i) =>
          y.Id == x.Id
        )
        document.documentElement.style.setProperty(match?.colorName, x.color);
      })
    }

  }, []);


  return (
    <>
      <Filter name={t("Dashboard_main")} nameShow={true} dateShow={true} profileShow={true} />

      <div className="middle_container">
        {
          PermissionCheck('Dashboard', 'Total') && <Price />
        }

        <div className="trend_graph">
          {
            PermissionCheck('Dashboard', 'View Charts') &&
            (<><AdvertiseTrend />
              <TopCampaign /></>)
          }


        </div>
        {
          PermissionCheck('Dashboard', 'Top Performance Campaigns') &&
          <Performance />
        }

        {
          PermissionCheck('Dashboard', 'Top Performance Keywords') &&
          <Keyword />
        }

        {
          PermissionCheck('Dashboard', 'Top Performance Products') && <ProductPerformance />
        }


        {/* <Advertis /> */}

      </div>
    </>
  );
}

export default Dashboard;
