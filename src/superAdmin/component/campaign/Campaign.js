import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { DateRangePicker } from "rsuite";
import Select from 'react-select';
import { ApiCampaignList } from '../../api-wrapper/ApiCampaign';
import { ApiActiveCustomer } from '../../api-wrapper/ApiUtility';
import { Toast } from "../../../admin/helper/links/Link";
import CurrencyCode from "../../../admin/helper/currencyCode/CurrencyCode";
function Campaign() {
    const [customerData, setCustomerData] = useState([])
    const [campaignTypeData, setCampaignTypeData] = useState([
        { label: "Sponsored Products", value: "Sponsored Products" },
        { label: "Sponsored Brands", value: "Sponsored Brands" },
        { label: "Sponsored Display", value: "Sponsored Display" },
    ])
    const [campaignType, setCampaignType] = useState('')
    const [customer, setCustomer] = useState('')
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [totalRecords, setTotalRecords] = useState(0);
    const [tableData, setTableData] = useState([]);


    const col = [
        {
            name: "Name",
            selector: (row) => row.customerName,
            sortable: true,
        },
        {
            name: "campaign name",
            width: '250px',
            selector: (row) => row.name,
            sortable: true,
        },
        {
            name: "Status",
            sortable: true,
            width: "150px",
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
            name: "type",
            width: "200px",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "spend",
            selector: (row) => row.spend,
            cell: (row) => (row.currencyCode && CurrencyCode(row.spend, row.currencyCode)),
            sortable: true,
        },
        {
            name: "sales",
            selector: (row) => row.sales,
            cell: (row) => (row.currencyCode && CurrencyCode(row.sales, row.currencyCode)),
            sortable: true,
        },
        {
            name: "acos",
            selector: (row) => row.acos,
            sortable: true,
            cell: (e) => <>{`${e.acos}%`}</>,
        },
        {
            name: "roas",
            selector: (row) => row.roas,
            sortable: true,
        },
        {
            name: "orders",
            selector: (row) => row.orders,
            sortable: true,
        },
        {
            name: "impressions",
            selector: (row) => row.impressions,
            sortable: true,
        },
        {
            name: "cpc",
            selector: (row) => row.cpc,
            cell: (row) => (row.currencyCode && CurrencyCode(row.cpc, row.currencyCode)),
            sortable: true,
        },

        {
            name: "clicks",
            selector: (row) => row.clicks,
            sortable: true,
        },
        {
            name: "timezone",
            width: '200px',
            selector: (row) => row.timezone,
            sortable: true,
        },

    ]

    useEffect(() => {
        let data = [
            { label: "All Vendor", value: "" }
        ]
        ApiActiveCustomer()
            .then((res) => {
                if (res?.isSuccess) {
                    res.data.map(el => {
                        data.push({
                            label: el.fullName,
                            value: el._id
                        })
                    })
                    setCustomerData(data)
                } else {
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }, []);

    const HandleList = () => {
        let data = {
            ...arg,
            customerId: customer,
            campaignType: campaignType,
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        }
        ApiCampaignList(data)
            .then((res) => {
                if (res.isSuccess) {
                    setTotalRecords(res.totalRecords)
                    setTableData(res.data)
                } else {
                    Toast.error(res?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }
    useEffect(() => {
        HandleList()
    }, [arg, campaignType, customer, date]);

    const handlePageChange = (page) => {
        setArg({
            ...arg,
            pageNo: page
        })

    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setArg({
            pageNo: page,
            perPage: newPerPage
        })

    };
    return (
        <>
            <Filter name={"Campaigns"} nameShow={true} dateShow={false} profileShow={true} />
            <div className="middle_container budget_container">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div>
                        </div>

                        <div className="filTypeBox">
                            <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2 search_option">
                                <Select
                                    classNamePrefix="superadmin_search_dropdown"
                                    placeholder="Select Vendor"
                                    options={customerData}
                                    onChange={(e) => {
                                        setCustomer(e.value);
                                    }}
                                />
                            </div>
                            <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2 search_option">
                                <Select
                                    classNamePrefix="superadmin_search_dropdown"
                                    placeholder="Select Type"
                                    options={campaignTypeData}
                                    onChange={(e) => {
                                        setCampaignType(e.value);
                                    }}
                                />
                            </div>

                            <DateRangePicker
                                className={`rangeDate  custom-date-range-picker px-lg-2 pb-1`}
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
                    </div>

                    <div className="data_table">
                        <DataTable
                            className="table_content"
                            columns={col}
                            striped={true}
                            data={tableData}
                            pagination
                            paginationServer
                            fixedHeader
                            paginationTotalRows={totalRecords}
                            paginationPerPage={arg?.perPage}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}

                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Campaign