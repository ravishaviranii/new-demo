import React, { useEffect } from 'react'
import Filter from '../../helper/Filter'
import Total from '../dashboard/Total';
import CountryChart from './CountryChart';
import { DateRangePicker } from "rsuite";
import { useState } from 'react';
import { predefinedRanges } from '../../../common/helper/calendarValues/calendarValues';
import PackageChart from './PackageChart';
import Box from './Box';
import moment from "moment";
import { ApiList } from '../../api-wrapper/ApiDashboard';
import { Toast } from "../../../admin/helper/links/Link";
import MultiLineChart from './MultilineChart';
import TopPerformanceCampaign from './TopPerformanceCampaign';
function Dashboard() {
  const [date, setDate] = useState([new Date(moment().startOf('month')), new Date()]);
  const [allData, setallData] = useState({});


  useEffect(() => {
    HandleList()
  }, [date]);

  const HandleList = () => {
    let data = {
      fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
      toDate: moment(date?.[1]).format("YYYY-MM-DD"),
    }

    ApiList(data)
      .then((res) => {
        if (res.isSuccess) {
          setallData(res)
        }
        else {
          setallData({})
        }
      }).catch((err) => {
        Toast.error("Somthing went wrong");
      });
  }


  return (
    <div className='superadmin_Dashboard'>
      <Filter name={"Dashboard"} />
      <div className='middle_container'>
        <div className='dashboard_first'>
          <div className='sub_dashboard_first'>
            <Box data={allData?.totalData} />
          </div>
          <div className='sub_dashboard_first'>
            <MultiLineChart chartdata={allData?.visitorInsight} />
          </div>
        </div>
        <div className='dashboard_date'>
          <DateRangePicker
            className={`rangeDate custom-date-range-picker px-lg-2 pb-1`}
            ranges={predefinedRanges}
            showOneCalendar
            value={date}
            placeholder="Select Date"
            onChange={(e) => setDate(e)}
            placement="bottomEnd"
            format="yyyy-MM-dd"
            cleanable={false}
          />
        </div>

        <Total data={allData?.filterData} />
        <div className='charts'>
          <CountryChart data={allData?.countryWiseVendors} />
          <PackageChart data={allData?.packagesWiseVendors} />

        </div>
        <TopPerformanceCampaign date={date} />
      </div>
    </div>
  )
}

export default Dashboard