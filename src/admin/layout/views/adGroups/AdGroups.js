import React, { useState, useContext, useEffect } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../../helper/filter/Filter";
import AddGroups from "./AddGroups";
import { handleLoader, Toast, useDispatch } from "../../../helper/links/Link";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { ApiAdGroupsListing } from "../../../api-wrapper/adGroups/ApiAdGroups";
import moment from "moment";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import { Modal } from "react-bootstrap";
import CustomFilter from "../../../helper/filter/CustomFilter";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import { useTranslation } from "react-i18next";

function AdGroups() {
  const { t } = useTranslation();
  const [showAdGroup, setShowAdGroup] = useState(false);
  const [addName, setAddName] = useState("Add Campaign");
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [tableData, setTableData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [date, setDate] = useState([]);
  const [editData, setEditData] = useState();
  let { profileSendID, profileId, today, pagePermission, typeValue } =
    useContext(ProfileContext);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [searchName, setSearchName] = useState("");
  const [filterModal, setfilterModal] = useState();

  // custom filter
  const defaultValue = {
    firstCondition: "",
    firstValue: 0,
    operator: "",
    secondCondition: "",
    secondValue: 0,
    sortType: "",
  };

  const [conditionObj, setConditionObj] = useState(defaultValue);
  const [showSpendFilter, setShowSpendFilter] = useState(false);
  const [showACOSFilter, setShowACOSFilter] = useState(false);
  const [showROASFilter, setShowROASFilter] = useState(false);
  const [showCPCFilter, setShowCPCFilter] = useState(false);
  const [showImpressionsFilter, setShowImpressionsFilter] = useState(false);
  const [showClicksFilter, setShowClicksFilter] = useState(false);
  const [showBidFilter, setShowBidFilter] = useState(false);
  const [showOrdersFilter, setShowOrdersFilter] = useState(false);

  const [showSalesFilter, setShowSalesFilter] = useState(false);
  const [customFilterFlag, setCustomFilterFlag] = useState(false);
  const [fieldName, setfieldName] = useState("");
  const [totalRecords, setTotalRecords] = useState(0);
  const [dummy, setdummy] = useState({});

  // useEffect(() => {
  //   ApiCustomFilterHandler();
  // }, [customFilterFlag]);

  // const ApiCustomFilterHandler = async () => {
  //   if (customFilterFlag) {
  //     const data = {
  //       type: "",
  //       profileId: profileId.value,
  //       fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
  //       toDate: moment(date?.[1]).format("YYYY-MM-DD"),
  //       fieldName: fieldName,
  //       fieldOperator: conditionObj?.firstCondition,
  //       fieldValue: Number(conditionObj.firstValue),
  //       conditions: conditionObj?.operator,
  //       extraFieldOperator: conditionObj?.secondCondition,
  //       extraFieldValue: Number(conditionObj?.secondValue),
  //       sortType: conditionObj?.sortType,
  //       ...arg,
  //     };
  //     await ApiAdGroupsListing(data)
  //       .then((e) => {
  //         if (e?.isSuccess) {

  //           setTotalRecords(e?.totalRecords);
  //           setTableData(e?.getAdGroups);
  //         } else {

  //         }

  //         setCustomFilterFlag(false);
  //       })
  //       .catch((e) => {
  //         dispatch(handleLoader(false));
  //         Toast.error("Somthing went wrong");
  //       });
  //   }
  // };

  const columns = [
    {
      name: t("Action"),
      // width: "80px",
      selector: (row) => row.action,
      cell: (rows) => (
        <div className="action_container">
          {PermissionCheck("Ad Groups", "Update") ? (
            <i
              className="fa fa-pencil"
              onClick={() => {
                setAddName(t("editAdGroup"));
                setEditData(rows);
                setShowAdGroup(true);
              }}
            ></i>
          ) : (
            "-"
          )}
        </div>
      ),
    },
    {
      name: t("adGroupName"),
      width: "250px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t("campaignName"),
      width: "250px",
      selector: (row) => row.campaignName,
      sortable: true,
    },
    {
      name: t("status"),
      width: "125px",
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
      name: (
        <div className="position-relative">
          {t("bid")}
          <CustomFilter
            field={"defaultBid"}
            showFilter={showBidFilter}
            setShowFilter={setShowBidFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.defaultBid,
      cell: (row) => <>{CurrencyCode(row.defaultBid)}</>,
    },
    {
      name: (
        <div>
          {t("spend")}
          <CustomFilter
            field={"spend"}
            showFilter={showSpendFilter}
            setShowFilter={setShowSpendFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.spend,
      cell: (row) => <>{CurrencyCode(row.spend)}</>,
    },
    {
      name: (
        <div>
          {t("sales")}
          <CustomFilter
            field={"sales"}
            showFilter={showSalesFilter}
            setShowFilter={setShowSalesFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.sales,
      cell: (row) => <>{CurrencyCode(row.sales)}</>,
    },
    {
      name: (
        <div>
          {t("acos")}
          <CustomFilter
            field={"acos"}
            showFilter={showACOSFilter}
            setShowFilter={setShowACOSFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            defaultValue={defaultValue}
            setCustomFilterFlag={setCustomFilterFlag}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.acos,
      cell: (e) => <>{`${e.acos}%`}</>,
    },
    {
      name: (
        <div>
          {t("roas")}
          <CustomFilter
            field={"roas"}
            showFilter={showROASFilter}
            setShowFilter={setShowROASFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.roas,
    },
    {
      name: (
        <div>
          {t("Orders")}
          <CustomFilter
            field={"orders"}
            showFilter={showOrdersFilter}
            setShowFilter={setShowOrdersFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.orders,
    },
    {
      name: (
        <div>
          {t("impressions")}
          <CustomFilter
            field={"impressions"}
            showFilter={showImpressionsFilter}
            setShowFilter={setShowImpressionsFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "140px",
      selector: (row) => row.impressions,
    },
    {
      name: (
        <div>
          {t("cpc")}
          <CustomFilter
            field={"cpc"}
            showFilter={showCPCFilter}
            setShowFilter={setShowCPCFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.cpc,
      cell: (row) => <>{CurrencyCode(row.cpc)}</>,
    },
    {
      name: (
        <div>
          {t("clicks")}
          <CustomFilter
            field={"clicks"}
            showFilter={showClicksFilter}
            setShowFilter={setShowClicksFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.clicks,
    },
  ]


  useEffect(() => {
    const firstDate = new Date(moment().startOf("month"));
    const lastDate = new Date();
    setDate([firstDate, lastDate]);
  }, []);

  const ApiListing = async (arg) => {
    if (profileSendID && date.length != 0) {


      const data = {
        searchName: searchName,
        status: status,
        type: type,
        profileId: profileSendID,
        fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
        toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        fieldName: fieldName,
        fieldOperator: conditionObj?.firstCondition,
        fieldValue: Number(conditionObj.firstValue),
        conditions: conditionObj?.operator,
        extraFieldOperator: conditionObj?.secondCondition,
        extraFieldValue: Number(conditionObj?.secondValue),
        sortType: conditionObj?.sortType,
        ...arg,
      };
      await ApiAdGroupsListing(data)
        .then((e) => {
          if (e?.isSuccess) {
            // setTotalRecords(e?.totalRecords);
            setTableData(e?.getAdGroups);
            setGroupsData(e);
            Toast.success(e?.message);
          } else {

            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          dispatch(handleLoader(false));
          Toast.error("Somthing went wrong");
        });
    }
  };

  useEffect(() => {
    ApiListing(arg);
  }, [profileSendID, date, type, status]);

  const handlePageChange = (page) => {
    setArg({
      pageNo: page,
      perPage: perPage
    })
    ApiListing({ pageNo: page, perPage: perPage });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setArg({
      pageNo: page,
      perPage: newPerPage
    })
    setPerPage(newPerPage);
    ApiListing({ pageNo: page, perPage: newPerPage });
  };

  const handleClose = () => {
    setShowAdGroup(false);
    ApiListing(arg);
  };

  const handleSubmit = () => {
    setShowAdGroup(false);
    ApiListing(arg);
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    if (e.target.value == "") {
      ApiListing({ searchName: e.target.value });
    }
  };
  return (
    <>
      <Filter name={"Ad Group"} dateShow={false} profileShow={true} />
      <div className="middle_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("adGroup")}</h5>
            </div>
            <div className="filTypeBox">
              <div className="search_option pb-1">
                <input
                  type="text"
                  placeholder={t("searchHere")}
                  onChange={(e) => handleSearch(e)}
                />
                <button onClick={() => ApiListing({ searchName: searchName })}>
                  Go
                </button>
              </div>

              <div className="fil pb-1">
                <select
                  name="portfolio"
                  onChange={(e) => setType(e?.target?.value)}
                  value={type}
                >
                  <option value="">{t("allType")}</option>
                  {typeValue?.map((el) => (
                    <option value={el.value}>{el.label}</option>
                  ))}
                </select>
              </div>
              <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2">
                <select
                  name="portfolio"
                  onChange={(e) => setStatus(e?.target?.value)}
                  value={status}
                >
                  <option value="">{t("allStatus")}</option>
                  <option value="ENABLED">{t("enabled")}</option>
                  <option value="PAUSED">{t("paused")}</option>
                  <option value="ENDED">{t("ended")}</option>
                  <option value="ARCHIVED">{t("archived")}</option>
                </select>
              </div>
              <DateRangePicker
                className={`rangeDate custom-date-range-picker px-lg-2 pb-1`}
                ranges={predefinedRanges}
                showOneCalendar
                value={date}
                placeholder="Select Date"
                onChange={(e) => setDate(e)}
                placement="bottomEnd"
                format="yyyy-MM-dd"
                cleanable={false}
              />
              {PermissionCheck("Ad Groups", "Create") && (
                <div className="pb-1">
                  <button
                    onClick={() => {
                      setAddName(t("addAdGroup"));
                      setEditData({});
                      setShowAdGroup(true);
                    }}
                  >
                    <i class="fa fa-plus"></i>
                    {t("addAdGroup")}
                  </button>
                </div>
              )}
            </div>
          </div>
          {PermissionCheck("Ad Groups", "View Only") && (
            <div className="data_table">
              <DataTable
                className="table_content"
                columns={columns}
                striped={true}
                data={tableData}
                pagination
                // paginationTotalRows={totalRecords}
                paginationServer
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                fixedHeader
                paginationDefaultPage={customFilterFlag ? 1 : arg.pageNo}
                paginationTotalRows={
                  groupsData && groupsData?.totalRecords
                }
              />
            </div>
          )}
        </div>
      </div>
      <AddGroups
        setShowAdGroup={setShowAdGroup}
        handleClose={handleClose}
        showAdGroup={showAdGroup}
        name={addName}
        submitClose={handleSubmit}
        editData={editData}
      />
      <Modal
        show={filterModal}
        onHide={() => setfilterModal(false)}
        centered
        size="xl"
      ></Modal>
    </>
  );
}

export default AdGroups;
