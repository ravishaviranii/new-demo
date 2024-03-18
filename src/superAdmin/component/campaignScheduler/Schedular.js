import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { DateRangePicker } from "rsuite";
import Select from 'react-select';
import { ApiSchedulerList } from '../../api-wrapper/ApiSchedular';
import { ApiActiveCustomer } from '../../api-wrapper/ApiUtility';
import { Toast } from "../../../admin/helper/links/Link";

function Schedular() {
    const [customerData, setCustomerData] = useState([])
    const [customer, setCustomer] = useState('')
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [totalRecords, setTotalRecords] = useState(0);
    const [tableData, setTableData] = useState([]);
    const [day, setDay] = useState('');

    const mainLabel = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
    ];


    const col = [
        {
            name: "Name",
            selector: (row) => row.customerName,
            sortable: true,
        },
        {
            name: "schedule Name",
            selector: (row) => row.scheduleName,
            sortable: true,
        },
        {
            name: "day Name",
            selector: (row) => row.dayName,
            sortable: true,
        },
        {
            name: "campaign",
            selector: (row) => row.campaignIds,
            sortable: true,
        },
        {
            name: "start Time",
            selector: (row) => row.startTime,
            sortable: true,
        },
        {
            name: "end Time",
            selector: (row) => row.endTime,
            sortable: true,
        },
        {
            name: "timezone",
            selector: (row) => row.timezone,
            sortable: true,
        },
        {
            name: "updated At",
            selector: (row) => row.updatedAt,
            cell: (e) => {
                return moment(e?.updatedAt)
                    .tz(e.timezone && e.timezone)
                    .format("MM/DD/YYYY hh:mm:ss A z");
            }
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
            dayName: day,
            customerId: customer,
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        }
        ApiSchedulerList(data)
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
    }, [arg, customer, date, day]);

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
            <Filter name={"Campaign Schedulers"} nameShow={true} dateShow={false} profileShow={true} />
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
                                    placeholder="Select Day"
                                    options={mainLabel}
                                    onChange={(e) => {
                                        setDay(e.value);
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

export default Schedular