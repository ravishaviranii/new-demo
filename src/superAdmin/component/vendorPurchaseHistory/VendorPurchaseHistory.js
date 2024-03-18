import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { DateRangePicker, SelectPicker } from "rsuite";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { handleLoader, Toast, useDispatch } from "../../../admin/helper/links/Link";
import RenewPackage from "./RenewPackage";
import { ApiGetVendorPackageHistory, ApiList } from "../../api-wrapper/ApiPackage";
import { ApiGetPackage, ApiPackageList } from "../../api-wrapper/ApiVendor";


function VendorPurchaseHistory() {

    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [show, setShow] = useState(false);
    const [newPackageId, setnewPackageId] = useState('');
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [packages, setpackages] = useState([])
    const [allPackage, setallPackage] = useState([])
    const [flag, setflag] = useState(false)
    const [tableData, settableData] = useState([])
    const [initialRun, setinitialRun] = useState(true)
    const [data, setdata] = useState([])
    const [customerId, setcustomerId] = useState('')
    const [packageId, setpackageId] = useState('');
    const [newPriceId, setnewPriceId] = useState('')
    const [search, setSearch] = useState("");
    const [totalRecords, setTotalRecords] = useState(0);
    const [vendorHistory, setvendorHistory] = useState()

    useEffect(() => {
        GetVendorPackageHistory()

    }, [date, packageId, customerId])


    useEffect(() => {

        handlePackage()
    }, []);


    const handlePackage = () => {
        let data = [
            { label: "All Packages", value: "" }
        ]
        ApiPackageList()
            .then((e) => {
                if (e?.isSuccess) {
                    e.data.map(el => {
                        data.push({
                            label: el.packageName,
                            value: el._id
                        })
                    })
                    setallPackage(data)
                } else {
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }

    const handleList = (data) => {

        ApiGetPackage(data)
            .then((e) => {
                if (e?.isSuccess) {
                    setpackages(e.data)
                    setShow(true);
                } else {
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }

    const GetVendorPackageHistory = () => {
        let data = {
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
            customerId: customerId,
            packageId: packageId,
            search,
            ...arg
        }
        ApiGetVendorPackageHistory(data)
            .then((e) => {
                if (e?.isSuccess) {
                    setTotalRecords(e.totalRecords);
                    settableData(e.data)
                    if (initialRun) {
                        setdata(e.data)
                        setinitialRun(false)
                    }
                } else {
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }
    const handlePageChange = (page) => {
        setArg({
            ...arg,
            pageNo: page,
        });
    };

    const handlePerRowsChange = async (newPerPage, page) => {
        setArg({
            pageNo: page,
            perPage: newPerPage,
        });
    };

    useEffect(() => {
        GetVendorPackageHistory()
    }, [arg]);
    const col = [
        {
            name: "Name",
            selector: (row) => row.fullName,
            sortable: true,
        },
        {
            name: "Email",
            selector: (row) => row.email,
            sortable: true,
        },
        {
            name: "Mobile No.",
            selector: (row) => row.phoneNumber,
            sortable: true,
        },
        {
            name: "Package",
            selector: (row) => row.packageId,
            cell: (e) => (
                <div className="text-uppercase">
                    {e.packageId?.packageName}
                </div>
            ),
        },
        {
            name: "Starting Date",
            selector: (row) => row.packageStartDate,
            cell: (e) => {
                return (
                    <div className="">
                        <div className="pt-1">{e.packageStartDate}</div>
                    </div>
                )
            },
        },
        {
            name: "Expiry Date",
            selector: (row) => row.packageEndDate,
            cell: (e) => {
                return (
                    <div className="">
                        <div className="pt-1">{e.packageEndDate}</div>
                    </div>
                )
            },
        },
        {
            name: "Remaining Days",
            selector: (row) => row.date,
            cell: (e) => {
                const currentDate = new Date();
                const targetDate = new Date(e.packageEndDate);
                const timeDifference = targetDate - currentDate;
                const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

                return (
                    <div className="text-center font-weight-normal">
                        <div className="py-1">{daysDifference}</div>
                    </div>
                )
            },
        },
        {
            name: "Action",
            selector: (row) => row.action,
            cell: (e) => {
                return (
                    <div>
                        <button className="btn btn-primary py-1 px-2" onClick={() => { setvendorHistory(e); setnewPackageId(e.packageId._id); setnewPriceId(e.priceId); handleList({ countryId: e.country }) }}>Renew</button>
                    </div>
                )
            },
        },
    ]

    useEffect(() => {
        if (flag) {
        }
    }, [flag, newPackageId])

    return (
        <>
            <Filter name={"Vendor Purchase History"} nameShow={true} dateShow={false} profileShow={true} />
            <div className="middle_container budget_container">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div>
                        </div>

                        <div className="filTypeBox">

                            <div className="search_option pb-1 me-0 pe-0 pe-lg-2">
                                <SelectPicker
                                    data={allPackage}
                                    style={{ width: 180 }}
                                    value={packageId}
                                    onChange={(value) => { setpackageId(value) }}
                                    placeholder="All Packages"
                                />
                            </div>

                            <div className="search_option pb-1">
                                <input type="text" placeholder="Search Here.." value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button onClick={() => GetVendorPackageHistory()}>Go</button>
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
                            paginationTotalRows={totalRecords}
                            paginationPerPage={arg?.perPage}
                            onChangePage={handlePageChange}
                            onChangeRowsPerPage={handlePerRowsChange}
                        />
                    </div>
                </div>
            </div>
            <RenewPackage
                show={show}
                setShow={setShow}
                vendorHistory={vendorHistory}
                setvendorHistory={setvendorHistory}
                newPackageId={newPackageId}
                setnewPackageId={setnewPackageId}
                setflag={setflag}
                tableData={packages}
                setnewPriceId={setnewPriceId}
                newPriceId={newPriceId}
            />
        </>
    )
}

export default VendorPurchaseHistory