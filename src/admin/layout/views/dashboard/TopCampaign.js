import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { useContext } from "react";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { useDispatch } from "react-redux";
import { handleLoader } from "../../../../common/redux/action";
import { ApiTopCampaignChart } from "../../../api-wrapper/campaign/ApiCampaign";
import { useState } from "react";
import Toast from "../../../../common/helper/toast/Toast";
import { useTranslation } from 'react-i18next';


const pieColors = {
  "Sponsored Products": "#63CDFF",
  "Sponsored Display": "#DC3545",
  "Sponsored Brands": "#F14BA9",
};

function TopCampaign() {
  const { t } = useTranslation();

  let { profileId, today, fromDate, toDate } = useContext(ProfileContext);
  const dispatch = useDispatch();

  const [date, setDate] = useState([]);

  useEffect(() => {
    if (today) {
      setDate([new Date(today), new Date(today)]);
    }
  }, [today]);

  const [pieChartData, setpieChartData] = useState([]);

  useEffect(() => {
    if (profileId.value && date?.length != 0 && today) {
      dispatch(handleLoader(true));
      const data = {
        profileId: profileId.value,
        fromDate: fromDate,

        toDate: toDate,
      };

      ApiTopCampaignChart(data)
        .then((e) => {
          if (e?.isSuccess) {
            dispatch(handleLoader(false));

            let chartData = [
              { name: `${t("sponseredProducts")}`, totalSales: e.spCount },
              { name: `${t("sponseredDisplay")}`, totalSales: e.sdCount },
              { name: `${t("sponseredBrands")}`, totalSales: e.sbCount },
            ];
            setpieChartData(chartData);
            Toast.success(e?.message);
          } else {
            dispatch(handleLoader(false));
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          dispatch(handleLoader(false));
          Toast.error("Somthing went wrong");
        });
      // return pieChartData
    }
  }, [profileId?.value, date, fromDate, toDate]);

  const chartRef = useRef(null);
  useEffect(() => {
    const chartElement = chartRef.current;
    let chartInstance = null;

    if (chartElement && chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(chartElement, {
      type: "doughnut",
      data: {
        labels: pieChartData.map((item) => item.name),
        datasets: [
          {
            data: pieChartData.map((item) => item.totalSales),
            backgroundColor: Object.values(pieColors),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            position: "right",
          },
        },
      },
    });

    return () => {
      if (!chartElement || !chartInstance) {
        return;
      }

      chartInstance.destroy();
    };
  }, [pieChartData]);

  return (
    <div className="data_content campagin_chart">
      <h5>{t("topCampaign")}</h5>

      <div className="chartPerformanceContainer">
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}

export default TopCampaign;
