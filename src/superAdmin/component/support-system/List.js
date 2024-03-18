import React, { useState } from "react";
import Filter from "../../helper/Filter";
import DataTable from "react-data-table-component";
import Chat from "./Chat";
import { ApiList } from "../../api-wrapper/ApiSupportSystem";
import { Toast, Controller } from "../../../admin/helper/links/Link";
import moment from "moment";
import { DateRangePicker, SelectPicker } from "rsuite";
import { useEffect } from "react";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import { ApiCatList } from "../../api-wrapper/ApiCategory";
import { ApiVendorList } from "../../api-wrapper/ApiVendor";

function List() {
  const [date, setDate] = useState([
    new Date(moment().startOf("month")),
    new Date(),
  ]);
  const [viewFlag, setViewFlag] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [viewId, setViewId] = useState(0);
  const [status, setStatus] = useState("");
  const [ticketnumber, setTicketnumber] = useState("");
  const [getAllCategory, setGetAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [getStatus, setGetStatus] = useState([]);
  const [idNum, setIdNum] = useState("");


  let columns = [
    {
      name: "vendor",
      selector: (row) => row.customerId?.fullName,
      sortable: true,
    },
    {
      name: "ticket id",
      selector: (row) => row.ticketnumber,
      sortable: true,
    },
    {
      name: "category",
      selector: (row) => row.categoryId?.categoryName,
      sortable: true,
    },
    {
      name: "title",
      selector: (row) => row.title,
      sortable: true,
    },

    {
      name: "date",
      selector: (row) => (row.createdAt ? row.createdAt : "-"),
      cell: (row) => (
        <div>{moment(row?.createdAt).format("MM/DD/YYYY HH:mm A")}</div>
      ),
    },

    {
      name: "ticket status",
      selector: (row) => row.status,
      cell: (e) => (
        <div
          className={`${e.status == "0" ? "completed" : e.status == "1" ? "pending" : null
            } status`}
        >
          {e.status == 0 ? "Open" : "Close"}
        </div>
      ),
    },
    {
      name: "Action",
      selector: (row) => row.action,
      cell: (row) => (
        <div className="action_container">
          <button
            className="run_icon"
            onClick={() => {
              HandleView(row);
            }}
          >
            View
          </button>
        </div>
      ),
    },
  ];
  const HandleList = () => {
    let data = {
      categoryId: categoryId,
      ticketnumber: ticketnumber,
      status: status,
      fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
      toDate: moment(date?.[1]).format("YYYY-MM-DD"),
      ...arg,
    };
    ApiList(data)
      .then((res) => {
        if (res.isSuccess) {
          setTableData(res.data);
          setTotalRecords(res.totalRecords);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  };

  useEffect(() => {
    HandleList();
  }, [arg, date, categoryId, status]);

  useEffect(() => {
    handleCategories();
  }, []);

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

  const HandleView = (row) => {
    setViewId(row._id);
    setViewFlag(true);
    setIdNum(row.ticketnumber)
  };

  const handleSearch = (e) => {
    setTicketnumber(e.target.value);
    if (e.target.value == "") {
      HandleList({ ticketnumber: e.target.value });
    }
  };

  const handleCategories = () => {
    let data = [{ label: "All Category", value: "" }];
    let data_status = [
      { label: "Open", value: "0" },
      { label: "Close", value: "1" },
    ];
    setGetStatus(data_status);
    ApiCatList()
      .then((e) => {
        if (e?.isSuccess) {
          e.data.map((el) => {
            data.push({
              label: el.categoryName,
              value: el._id,
            });
          });
          setGetAllCategory(data);
        } else {
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };

  console.log(ticketnumber, "ticketnumber")

  return (
    <>
      <Filter
        name={"Support System"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container">
        <div className="data_content data_content_btn m-0">
          {viewFlag ? (
            <Chat
              viewFlag={viewFlag}
              setViewFlag={setViewFlag}
              viewId={viewId}
              status={status}
              HandleList={HandleList}
              idNum={idNum}
            />
          ) : (
            <>
              <div className="data_model_btn camapgin_btn">
                <div></div>
                <div className="filTypeBox">
                  <div className="search_option pb-1">
                    <input
                      type="text"
                      placeholder="Search Ticket ID.."
                      onChange={(e) => handleSearch(e)}
                    />
                    <button
                      onClick={() => HandleList({ ticketnumber: ticketnumber })}
                    >
                      Go
                    </button>
                  </div>
                  <div className="search_option pb-1 me-0 pe-1 pe-lg-2">
                    <SelectPicker
                      data={getAllCategory}
                      style={{ width: 180 }}
                      value={categoryId}
                      onChange={(value) => {
                        setCategoryId(value);
                      }}
                      placeholder="All Category"
                    />
                  </div>

                  <div className="fil pb-1">
                    <select
                      name="portfolio"
                      onChange={(e) => setStatus(e?.target?.value)}
                      value={status}
                    >
                      <option value="">All Type</option>
                      {getStatus?.map((el) => (
                        <option value={el.value}>{el.label}</option>
                      ))}
                    </select>
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
                  columns={columns}
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
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default List;
