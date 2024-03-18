import React, { useContext, useState } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import AddTicket from "./AddTicket";
import Chat from "./Chat";
import { ApiList } from "../../../api-wrapper/supportSystem/SupportSystem";
import { useEffect } from "react";
import { Toast } from "../../../helper/links/Link";
import moment from "moment";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { ApiCategoryList } from "../../../api-wrapper/supportSystem/SupportSystem";
import { SelectPicker } from "rsuite";
import { useTranslation } from 'react-i18next';


function SupportSystem() {
  const { t } = useTranslation();

  let { timezone } = useContext(ProfileContext);
  const [addFlag, setAddFlag] = useState(false);
  const [viewFlag, setViewFlag] = useState(false);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [tableData, setTableData] = useState([]);
  const [viewId, setViewId] = useState(0);
  const [status, setStatus] = useState("");
  const [ticketStatus, setTicketStatus] = useState()
  const [ticketnumber, setTicketnumber] = useState("");
  const [getAllCategory, setGetAllCategory] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [getStatus, setGetStatus] = useState([]);

  let columns = [
    {
      name: `${t("category")}`,
      selector: (row) => row.categoryId?.categoryName,
      sortable: true,
    },
    {
      name: `${t("ticketid")}`,
      selector: (row) => row.ticketnumber,
      sortable: true,
    },
    {
      name: `${t("title")}`,
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: `${t("date")}`,
      selector: (row) => (row.createdAt ? row.createdAt : "-"),
      cell: (row) => (
        <div>
          {moment(row?.createdAt)
            .tz(timezone && timezone)
            .format("MM/DD/YYYY HH:mm A")}
        </div>
      ),
    },
    {
      name: `${t("status")}`,
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
      name: `${t("action")}`,
      selector: (row) => row.action,
      cell: (row) => (
        <div className="action_container">
          <i
            className="fa fa-eye"
            style={{ cursor: "pointer" }}
            onClick={() => {
              HandleView(row);
            }}
          ></i>
        </div>
      ),
    },
  ];

  const HandleView = (row) => {
    setTicketStatus(row.status)
    setViewId(row._id);
    setTicketnumber(row?.ticketnumber);
    setViewFlag(true);
  };

  const HandleList = (arg) => {
    const data = {
      categoryId: categoryId,
      ticketnumber: ticketnumber,
      status: status,
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
    handleCategories();
  }, []);

  useEffect(() => {
    HandleList(arg);
  }, [arg, categoryId, status]);

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

  const handleSearch = (e) => {
    setTicketnumber(e.target.value);
    if (e.target.value == "") {
      HandleList({ ticketnumber: e.target.value });
    }
  };

  const handleCategories = () => {
    let data = [{ label: "All Category", value: "" }];
    let data_status = [
      { label: `${t("open")}`, value: "0" },
      { label: `${t("close")}`, value: "1" },
    ];
    setGetStatus(data_status);
    ApiCategoryList()
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

  return (
    <>
      <Filter
        name={t("supportsystem")}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container">
        <div className="data_content data_content_btn">
          {viewFlag ? (
            <Chat
              viewId={viewId}
              viewFlag={viewFlag}
              setViewFlag={setViewFlag}
              status={ticketStatus}
              ticketnumber={ticketnumber}
              setTicketnumber={setTicketnumber}
            />
          ) : (
            <>
              <div className="data_model_btn camapgin_btn">
                <div></div>
                <div className="filTypeBox">
                  <div className="search_option pb-1">
                    <input
                      type="text"
                      placeholder={t("searchHere")}
                      onChange={(e) => handleSearch(e)}
                    />
                    <button
                      onClick={() => HandleList({ ticketnumber: ticketnumber })}
                    >
                      {t("search")}
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
                      <option value="">{t("allType")}</option>
                      {getStatus?.map((el) => (
                        <option value={el.value}>{el.label}</option>
                      ))}
                    </select>
                  </div>
                  <div className="pb-1 mt-0 px-2">
                    <button onClick={() => setAddFlag(true)}>
                      <i class="fa fa-plus"></i>
                      {t("addticket")}
                    </button>
                  </div>
                </div>
              </div>

              {PermissionCheck("Support", "Listing") && (
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
              )}
            </>
          )}
        </div>
      </div>
      <AddTicket
        addFlag={addFlag}
        setAddFlag={setAddFlag}
        HandleList={HandleList}
      />
    </>
  );
}

export default SupportSystem;
