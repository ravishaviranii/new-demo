import React, { useContext, useEffect, useRef, useState } from "react";
import { ApiProductPerformance } from "../../../api-wrapper/campaign/ApiCampaign";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { useDispatch } from "react-redux";
import Toast from "../../../../common/helper/toast/Toast";
import DataTable from "react-data-table-component";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import { useTranslation } from 'react-i18next';

const ProductPerformance = () => {
  const { t } = useTranslation();

  let dispatch = useDispatch()
  let { profileSendID, selectedDate, fromDate, toDate, profileValue } = useContext(ProfileContext)


  const columns = [

    {
      name: `${t("adGroupName")}`,
      selector: (row) => row.adGroupName,
      sortable: true,
    },
    {
      name: `${t("campaignName")}`,
      selector: (row) => row.campaignName,
      sortable: true,
    },
    {
      name: `${t("status")}`,
      width: "125px",
      selector: (row) => row.status,
      cell: (e) => (
        <div
          className={`${e.status == "ENDED"
            ? "cancelled"
            : e.status == "PAUSED"
              ? "pending"
              : e.status == "ENABLED"
                ? "completed"
                : e.status == "ARCHIVED"
                  ? "archived"
                  : null
            } status`}
        >
          {e.status}
        </div>
      ),
    },
    {
      name: `${t("spend")}`,
      selector: (row) => row.spend,
      cell: (e) => (
        <div>
          {CurrencyCode(e.spend)}
        </div>
      ),
      sortable: true,
    },
    {
      name: `${t("sales")}`,
      selector: (row) => row.sales,
      cell: (e) => (
        <div>
          {CurrencyCode(e.sales)}
        </div>
      ),
      sortable: true,
    },
    {
      name: `${t("acos")}`,
      width: "100px",
      selector: (row) => row.acos,
      cell: (e) => {
        return (
          <div className="green">
            {e.acos}%
          </div>
        )
      }
    },
    {
      name: `${t("roas")}`,
      width: "100px",
      selector: (row) => row.roas,
      cell: (e) => {
        return (
          <div className="green">
            {e.roas}
          </div>
        )
      }
    },
    {
      name: `${t("impressions")}`,
      width: "140px",
      selector: (row) => row.impressions,
    },
    {
      name: `${t("cpc")}`,
      width: "100px",
      selector: (row) => row.cpc,
      cell: (e) => {
        return (
          <div>
            {CurrencyCode(e.cpc)}
          </div>
        )
      }
    },
    {
      name: `${t("clicks")}`,
      width: "100px",
      selector: (row) => row.clicks,

    },

  ];
  const [tableData, setTableData] = useState();

  const getData = () => {

    if (profileSendID && fromDate && toDate) {

      let data = {
        profileId: profileSendID,
        fromDate,
        toDate
      };
      ApiProductPerformance(data)
        .then((res) => {
          if (res.isSuccess) {
            setTableData(res.data);
          }
          else {
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("somthing went wrong!!");
        });
    }
  }
  useEffect(() => {
    getData()
  }, [profileSendID, fromDate, toDate]);

  return (
    <>

      <div className='data_content'>
        <h5>{t("topPerfomanceProducts")}</h5>
        <div className='data_table'>
          <DataTable
            className='table_content'
            columns={columns}
            striped={true}
            data={tableData}

            fixedHeader

          />
        </div>
      </div>

    </>

  );
};

export default ProductPerformance;
