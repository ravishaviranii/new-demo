import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { ApiList, ApiVendorList, ApiActiveCustomer } from '../../api-wrapper/ApiUtility';
import { handleLoader, Toast, useDispatch } from "../../../admin/helper/links/Link";
import Add from './Add';
import TypeShortName from "../../../admin/helper/typeShortName/TypeShortName";
import { DateRangePicker, SelectPicker } from "rsuite";
function Utility() {
    let dispatch = useDispatch()
    const col = [
        {
            name: "Name",
            selector: (row) => row.customerId?.fullName,
            sortable: true,
        },
        {
            name: "Profile",
            selector: (row) => row.profileId,
            sortable: true,
        },
        {
            name: "Profile Name",
            selector: (row) => row.profileName,
            sortable: true,
        },
        {
            name: "Type",
            selector: (row) => row.type,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (e) => (
                <div
                    className={`${e.status == "ENDED"
                        ? "cancelled"
                        : e.status == "PAUSED"
                            ? "pending"
                            : e.status == "COMPLETED"
                                ? "completed"
                                : e.status == "ARCHIVED"
                                    ? "archived"
                                    : e.status == "PENDING"
                                        ? "pending"
                                        : e.status == "IN_PROGRESS"
                                            ? "archived"
                                            : null
                        } status text-center`}
                >
                    {e.status}
                </div>
            ),
        },
        {
            name: "Start Date",
            selector: (row) => row.startDate,
        },
        {
            name: "End Date",
            selector: (row) => row.endDate,
        },
        {
            name: "Updated At",
            selector: (row) => row.updatedAt,
            cell: (e) => {
                return (
                    <div>
                        {moment(e.updatedAt).format("YYYY-MM-DD") + " " + moment(e.updatedAt).format("hh:mm:ss A") || "-"}
                    </div>
                )
            }
        },
        // {
        //     name: "",
        //     selector: (row) => "",
        //     cell: (e) => {
        //         return (

        //             e.status == 'PENDING' ?

        //                 <p className="ms-2 inner_loader superadmin_utility" >
        //                     <div class="spinner-border text-dark" role="status">
        //                         <span class="sr-only"></span>
        //                     </div>
        //                 </p>
        //                 :
        //                 null
        //         )
        //     }
        // },
    ]
    const [tableData, setTableData] = useState([]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [perPage, setPerPage] = useState(10);
    const [records, setRecords] = useState(0);
    const [status, setStatus] = useState("");
    const [show, setShow] = useState(false);
    const [addFlag, setAddFlag] = useState(false);
    const [customer, setCustomer] = useState([]);
    useEffect(() => {

        let arr = []

        ApiActiveCustomer()
            .then((res) => {
                if (res.isSuccess) {

                    res.data.map(el => {
                        arr.push({
                            label: el.fullName,
                            value: el._id
                        })
                    })
                    arr.push({
                        label: 'All Vendors',
                        value: ''
                    })
                    setCustomer(arr)
                }
                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });

    }, []);

    const HandleList = async (arg) => {

        const data = {
            customerId: status,
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
            ...arg
        };
        await ApiList(data)
            .then((e) => {
                if (e?.isSuccess) {
                    setTableData(e.data);
                    setRecords(e.totalRecords)
                } else {
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    };
    useEffect(() => {
        HandleList(arg)
    }, [date, status]);

    const handlePageChange = (page) => {
        HandleList({ pageNo: page, perPage: perPage });
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        HandleList({ pageNo: page, perPage: newPerPage });
    };


    return (
        <>
            <Filter name={"Utility"} nameShow={true} dateShow={false} profileShow={true} />
            <div className="middle_container budget_container">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div>
                        </div>

                        <div className="filTypeBox">
                            <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2 search_option">
                                <SelectPicker
                                    data={customer?.map(x => ({ value: x.value, label: x.label }))}
                                    style={{ width: 200 }}
                                    value={status}
                                    onChange={(value) => setStatus(value)}
                                    placeholder="All Vendors"
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
                            <div className="pb-1">
                                <button
                                    onClick={() => { setShow(true); setAddFlag(true) }}
                                >
                                    <i class="fa fa-plus"></i>
                                    Add Utility
                                </button>
                            </div>
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
                            paginationTotalRows={records}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}

                        />
                    </div>
                </div>
            </div>
            <Add
                show={show}
                setShow={setShow}
                addFlag={addFlag}
                HandleList={HandleList}
            />
        </>
    )
}

export default Utility