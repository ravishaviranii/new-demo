import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import Filter from '../../helper/Filter'
import { DateRangePicker } from 'rsuite'
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { ApiGetPaymentHistory } from '../../api-wrapper/ApiPaymentHistory';
import Toast from '../../../common/helper/toast/Toast';


function PaymentHistory() {
    const [tableData, setTableData] = useState([]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [date, setDate] = useState([
        new Date(moment().startOf("month")),
        new Date(),
    ]);

    const [perPage, setPerPage] = useState(10);
    const [records, setRecords] = useState(0);

    const handleDownloadInvoice = (path) => {
        const dummyPdfUrl = `${process.env.REACT_APP_API_BASE}${path}`
        window.open(dummyPdfUrl, '_blank');
    };

    useEffect(() => {
        HandleList();
    }, [date]);

    const col = [
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Package Name",
            selector: (row) => row.packageName,
            sortable: true,
        },
        {
            name: "invoiceNumber",
            selector: (row) => row.invoiceNumber,
            sortable: true,
        },
        {
            name: "Package Price",
            selector: (row) => row.packageAmount,
            sortable: true,
        },
        {
            name: "Extra Charge",
            selector: (row) => row.totalExtraAmount,
            sortable: true,
        },
        {
            name: "Package From Date",
            selector: (row) => row.fromDate,
            sortable: true,
        },
        {
            name: "Package To Date",
            selector: (row) => row.toDate,
            sortable: true,
        },
        {
            name: "Invoice Date",
            selector: (row) => row.invoiceDate,
            sortable: true,
        },
        {
            name: "Download",
            selector: (row) => row.download,
            cell: (e) => {
                return (
                    <div>
                        <button
                            className="btn btn-primary py-1 px-2"
                            onClick={() => handleDownloadInvoice(e.path)}
                        >
                            Invoice
                        </button>
                    </div>
                )
            },
        },
        // {
        //   name: "Login At",
        //   selector: (row) => row.createdAt,
        //   cell: (e) => {
        //     const istTime = moment(e.createdAt).tz("Asia/Kolkata");
        //     return <div>{istTime.format("YYYY-MM-DD hh:mm:ss A") || "-"}</div>;
        //   },
        // },
    ];

    const HandleList = async (arg) => {
        const data = {
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
            ...arg
        };
        await ApiGetPaymentHistory(data)
            .then((e) => {
                if (e?.isSuccess) {
                    setTableData(e.data);
                    setRecords(e.totalRecords);
                } else {
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    };

    const handlePageChange = (page) => {
        HandleList({ pageNo: page, perPage: perPage });
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage);
        HandleList({ pageNo: page, perPage: newPerPage });
    };
    console.log("records", records);
    return (
        <>
            <Filter name={"Payment History"} nameShow={true} dateShow={false} profileShow={true} />
            <div className="middle_container budget_container settings_superadmin">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div></div>
                        <div className="filTypeBox">
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
                            paginationTotalRows={records}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                        />
                    </div>

                </div>
            </div>
        </>
    )
}

export default PaymentHistory