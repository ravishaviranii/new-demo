import React, { useContext, useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import { handleLoader, Toast, useDispatch } from '../../../helper/links/Link';
import { ApiChart } from '../../../api-wrapper/dashboard/ApiDashboard';
import { ProfileContext } from '../../../helper/usecontext/useContext';
import { useTranslation } from 'react-i18next';


const initialColors = {
  ACOS: "#2D323E",
  TAOCS: "#3B84DF",
};
function AdvertiseTrend() {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  let { profileSendID } = useContext(ProfileContext)

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (profileSendID) {
      let data = {
        profileId: profileSendID,
      }
      ApiChart(data)
        .then((res) => {

          dispatch(handleLoader(true));
          if (res?.isSuccess) {
            setChartData(res?.monthlyData)
            Toast.success(res?.message)
            dispatch(handleLoader(false));
          } else {
            Toast.error(res?.message)
            dispatch(handleLoader(false));
          }
        }).catch((err) => {
          Toast.error("Somthing went wrong")
          dispatch(handleLoader(false));
        });
    }

  }, [profileSendID]);

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartConfig = {
      type: "bar",
      data: {
        labels: chartData?.map((item) => item.month),
        datasets: [
          {
            label: `${t("acos")}`,
            backgroundColor: initialColors.ACOS,
            borderColor: "rgba(54, 162, 235, 1)",
            data: chartData?.map((item) => item.acos),
          },
          {
            label: `${t("roas")}`,
            backgroundColor: initialColors.TAOCS,
            borderColor: "rgba(255, 99, 132, 1)",
            data: chartData?.map((item) => item.roas),
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
        scales: {
          x: {
            stacked: true,

          },
          y: {
            stacked: true,
            maxTicksLimit: 1,

          },
        },
      },
    };

    const chart = new Chart(chartRef.current, chartConfig);
    chartInstanceRef.current = chart;

    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData]);

  return (
    <div>
      <div className='data_content perfromance_chart'>
        <h5>{t("advertiseByChannel")}</h5>
        <div className="chartPerformanceContainer">
          <canvas ref={chartRef} className="charts" />
        </div>
      </div>
    </div>


  );
}

export default AdvertiseTrend;
