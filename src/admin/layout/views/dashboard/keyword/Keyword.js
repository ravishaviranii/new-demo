import React, { useContext, useState, useEffect } from 'react'
import { ApiTopformanceKeyword } from '../../../../api-wrapper/dashboard/ApiDashboard';
import { Toast, useDispatch } from "../../../../helper/links/Link";
import { ProfileContext } from '../../../../helper/usecontext/useContext';
import DataTable from "react-data-table-component";
import CurrencyCode from '../../../../helper/currencyCode/CurrencyCode';
import { useTranslation } from 'react-i18next';

function Keyword() {
  const { t } = useTranslation();

  let { profileSendID, fromDate, toDate } = useContext(ProfileContext)
  const dispatch = useDispatch()
  const [tableData, setTableData] = useState();
  const columns = [
    {
      name: `${t("campaignName")}`,
      selector: (row) => row.campaignName,
      sortable: true,
    },
    {
      name: `${t("adGroupName")}`,
      selector: (row) => row.adGroupName,
      sortable: true,
    },
    {
      name: `${t("name")}`,
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: `${t("status")}`,
      selector: (row) => row.status,
      width: '150px',
      cell: (e) => (
        <div className={`${e.status == "ENABLED" ? 'enable' : e.status == "PAUSED" ? 'pause' : e.status == "ARCHIVED" ? 'archived' : e.status == "ENDED" ? 'end' : null} status`}>
          {e.status}
        </div>
      )
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
      selector: (row) => row.acos,
      cell: (e) => (
        <div className='green'>
          {`${e.acos}%`}
        </div>
      ),
      sortable: true,
    },
    {
      name: `${t("roas")}`,
      selector: (row) => row.roas,
      cell: (e) => (
        <div className='green'>
          {e.roas}
        </div>
      ),
      sortable: true,
    },
  ];

  const getData = () => {
    if (profileSendID && fromDate && toDate) {

      let data = {
        profileId: profileSendID,
        fromDate,
        toDate
      };
      ApiTopformanceKeyword(data)
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
    <div className='data_content'>
      <h5>{t("topPerfomanceKeywords")}</h5>
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
  )
}

export default Keyword