import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import moment from "moment";
import { ApiTopPerformanceList } from '../../api-wrapper/ApiDashboard';
import Toast from '../../../common/helper/toast/Toast';
import CurrencyCode from "../../../admin/helper/currencyCode/CurrencyCode";
function TopPerformanceCampaign({ date }) {


    const columns = [
        
         {
            name: "Vendor",
            selector: (row) => row.customerName,
            sortable: true,
        },
        {
            name: "Campaign Name",
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },

        {
            name: "STATUS",
            selector: (row) => row.status,
            width: '150px',
            cell: (e) => (
                <div className={`${e.status == "ENABLED" ? 'enable' : e.status == "PAUSED" ? 'pause' : e.status == "ARCHIVED" ? 'archived' : e.status == "ENDED" ? 'end' : null} status`}>
                    {e.status}
                </div>
            ),

        },
        {
            name: "SPEND",
            selector: (row) => row.spend,
            cell: (e) => (
                <div>
                    {CurrencyCode(e.spend, e.currencyCode)}
                </div>
            ),
            sortable: true,
        },
        {
            name: "SALES",
            selector: (row) => row.sales,
            cell: (e) => (
                <div>
                    {CurrencyCode(e.sales, e.currencyCode)}
                </div>
            ),
            sortable: true,
        },
        {
            name: "ACOS",
            selector: (row) => row.acos,
            cell: (e) => (
                <div className='green'>
                    {`${e.acos}%`}
                </div>
            ),
            sortable: true,
        },

        {
            name: "ROAS",
            selector: (row) => row.roas,
            cell: (e) => (
                <div className='green'>
                    {`${e.roas}`}
                </div>
            ),
            sortable: true,
        },
    ];

    const [tableData, setTableData] = useState();
    const getData = () => {
        let data = {
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        }
        ApiTopPerformanceList(data)
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
    };


    useEffect(() => {
        getData()
    }, date);

    return (
        <div className='data_content'>
            <h5>Top Performance Campaigns</h5>
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

export default TopPerformanceCampaign