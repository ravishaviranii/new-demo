import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { DateRangePicker } from "rsuite";
import Select from 'react-select';
import { ApiBudgetRuleList } from '../../api-wrapper/ApiBudgetRule';
import { ApiActiveCustomer } from '../../api-wrapper/ApiUtility';
import { Toast } from "../../../admin/helper/links/Link";

function BudgetRule() {
    const [customerData, setCustomerData] = useState([])
    const [customer, setCustomer] = useState('')
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [totalRecords, setTotalRecords] = useState(0);
    const [tableData, setTableData] = useState([]);
    const col = [
        {
            name: "Name",
            selector: (row) => row.customerId?.fullName,
            sortable: true,
        },
        {
            name: "ruleName",
            selector: (row) => row.ruleName,
            sortable: true,
        },
        {
            name: "Conditions",
            width: "230px",

            cell: (e) => {
                return (
                    <div className="rule_type">
                        {e?.conditions?.map((el, index) => {
                            return mainConditionMaker(
                                index,
                                el?.conditionType,
                                el?.conditionOperator,
                                el?.conditionValue,
                                el?.conditionValueType
                            );
                        })}
                    </div>
                );
            },
        },
        {
            name: "Action Type",
            width: "230px",
            selector: (row) => row.actionType,
            cell: (e) => {
                let getValueType = e?.actionType.actionValueType == 'Number' ? '' : '% of budget'
                return e?.actionType?.actionName == "Paused"
                    ? "Campaign Paused"
                    : e?.actionType?.actionName == "Enabled"
                        ? "Campaign Enabled"
                        : `${e?.actionType?.actionName} budget by ${e?.actionType?.actionValue}${getValueType}`;
            }
        },
        {
            name: "rule times",

            selector: (row) => row.times,
            cell: (row,) => {
                return (
                    row.times?.map((el, index) => {
                        return (
                            <React.Fragment key={index}>
                                {`${moment(el, "HH:mm").format("hh:mm A")}`}
                                {index !== row.times.length - 1 && ', '}
                            </React.Fragment>
                        );
                    })
                )
            }
        },
        {
            name: "Campaign",

            selector: (row) => row.assignCampaign,
            cell: (e) => {
                return (
                    <>
                        {e?.campaignIds?.length}
                    </>
                );
            },
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
            },
        },
    ]

    const conditionOperators = [
        {
            key: "GREATER_THAN",
            value: ">",
        },
        {
            key: "LESS_THAN_OR_EQUAL_TO",
            value: "<=",
        },
        {
            key: "GREATER_THAN_OR_EQUAL_TO",
            value: ">=",
        },
        {
            key: "LESS_THAN",
            value: "<",
        },
        {
            key: "EQUAL_TO",
            value: "==",
        }
    ]

    const mainConditionMaker = (
        index,
        conditionType,
        conditionOperator,
        conditionValue,
        conditionValueType
    ) => {

        let getOperator = conditionOperators?.find((x) => x.key == conditionOperator).value;
        let getValueType = conditionValueType == 'Number' ? "" : '% of budget'

        return (
            <div key={index}>

                {index == 0 ? "" : 'And'}  {conditionType} {getOperator} {conditionValue}{getValueType}
            </div>
        );
    };
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
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        }
        ApiBudgetRuleList(data)
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
    }, [arg, customer, date]);

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
            <Filter name={"Budget Rules"} nameShow={true} dateShow={false} profileShow={true} />
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

export default BudgetRule