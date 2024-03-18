import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../helper/Filter";
import { DateRangePicker, SelectPicker } from "rsuite";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
import moment from "moment-timezone";
import { GetLoginHistoryAPI } from "../../api-wrapper/loginHistory";
import { ApiVendorList } from "../../api-wrapper/ApiUtility";
import {
  handleLoader,
  Toast,
  useDispatch,
} from "../../../admin/helper/links/Link";

const LoginHistory = () => {
  const [tableData, setTableData] = useState([]);
  const [date, setDate] = useState([
    new Date(moment().startOf("month")),
    new Date(),
  ]);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [status, setStatus] = useState("");
  const [customer, setCustomer] = useState([]);

  useEffect(() => {
    let arr = [];

    ApiVendorList()
      .then((res) => {
        if (res.isSuccess) {
          res.data.map((el) => {
            arr.push({
              label: el.fullName,
              value: el._id,
            });
          });
          setCustomer(arr);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  }, []);

  const col = [
    {
      name: "Role",
      selector: (row) => row.customerId?.roleName,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.customerId?.email,
      sortable: true,
    },
    {
      name: "IP Address",
      selector: (row) => row.ipAddress,
      cell: (row) => {
        return (
          <>{row.ipAddress ? row.ipAddress : "-"}</>)
      },
      sortable: true,
    },
    {
      name: "Location",
      selector: (row) => row.location,
      cell: (row) => {
        return (
          <div>
            {row.location ? row.location?.city + ' , ' + row.location?.state_name + ' , ' + row.location?.country_name : ' - '}
          </div>
        )
      },
      sortable: true,
    },
    {
      name: "Login At",
      selector: (row) => row.createdAt,
      cell: (e) => {
        const istTime = moment(e.createdAt).tz("Asia/Kolkata");
        return <div>{istTime.format("YYYY-MM-DD hh:mm:ss A") || "-"}</div>;
      },
    },
  ];

  const HandleList = async () => {
    const data = {
      ...arg,
      customerId: status,
      fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
      toDate: moment(date?.[1]).format("YYYY-MM-DD"),
    };
    await GetLoginHistoryAPI(data)
      .then((e) => {
        if (e?.isSuccess) {
          setTableData(e.data);
          setTotalRecords(e.totalRecords);
        } else {
          Toast.error(e?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };
  useEffect(() => {
    HandleList();
  }, [date, status, arg]);

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

  return (
    <>
      <Filter
        name={"Login History"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div></div>
            <div className="filTypeBox">

              <div className="search_option pb-1 me-0">
                <SelectPicker
                  data={customer?.map(x => ({ value: x.value, label: x.label }))}
                  style={{ width: 200 }}
                  value={status}
                  onChange={(value) => { setStatus(value) }}
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
  );
};

export default LoginHistory;
