import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import AddKeyword from "./AddKeyword";
import { ApiKeywordListing } from "../../../api-wrapper/keyword/ApiKeyword";
import { Toast, handleLoader, useDispatch } from "../../../helper/links/Link";
import moment from "moment";
import CustomFilter from "../../../helper/filter/CustomFilter";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import { ApiCustomFilter } from "../../../api-wrapper/other/ApiSetting";
import { useTranslation } from "react-i18next";
function Keyword() {
  const { t } = useTranslation();
  const [showAdGroup, setShowAdGroup] = useState(false);
  const [addName, setAddName] = useState("Add Campaign");
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [tableData, setTableData] = useState([]);
  const [groupsData, setGroupsData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [date, setDate] = useState([]);
  const [editData, setEditData] = useState();
  let { profileId, today, pagePermission, typeValue } =
    useContext(ProfileContext);
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [type, setType] = useState("");
  const [addFlag, setaddFlag] = useState(false);
  const [search, setSearch] = useState("");
  const [searchName, setSearchName] = useState("");

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
  const [showACOSFilter, setShowACOSFilter] = useState(false);
  const [showROASFilter, setShowROASFilter] = useState(false);
  const [showCPCFilter, setShowCPCFilter] = useState(false);
  const [showImpressionsFilter, setShowImpressionsFilter] = useState(false);
  const [showClicksFilter, setShowClicksFilter] = useState(false);
  const [showBidFilter, setShowBidFilter] = useState(false);
  const [showOrdersFilter, setShowOrdersFilter] = useState(false);
  const [showSpendFilter, setShowSpendFilter] = useState(false);
  const [showSalesFilter, setShowSalesFilter] = useState(false);
  const [customFilterFlag, setCustomFilterFlag] = useState(false);
  const [fieldName, setfieldName] = useState("");

  useEffect(() => {
    ApiCustomFilterHandler();
  }, [customFilterFlag]);

  const ApiCustomFilterHandler = async () => {
    if (customFilterFlag) {
      const data = {
        profileId: profileId.value,
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
      await ApiKeywordListing(data)
        .then((e) => {
          if (e?.isSuccess) {
         
            setTableData(e?.getKeywords);
            setGroupsData(e);
          } else {
       
          }
          // setConditionObj(defaultValue);
          setCustomFilterFlag(false);
        })
        .catch((e) => {
     
          Toast.error("Somthing went wrong");
        });
    }
  };

  const columns = [
    {
      name: t("Action"),
      selector: (row) => row.action,
      // width: "80px",
      cell: (rows) => (
        <div className="action_container">
          {PermissionCheck("Keywords", "Update") ? (
            <i
              className="fa fa-pencil"
              onClick={() => {
                setAddName(t("editKeywords"));
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
      name: t("name"),
      width: "200px",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: t("adGroupName"),
      width: "200px",
      selector: (row) => row.adGroupName,
      sortable: true,
    },
    {
      name:  t("campaignName"),
      width: "200px",
      selector: (row) => row.campaignName,
      sortable: true,
    },
    {
      name:  t("status"),
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
        <div>
          {t('bid')}
          <CustomFilter
            field={"bid"}
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
      selector: (row) => row.bid,
      cell: (e) => <div>{e.bid ? CurrencyCode(e.bid) : "-"}</div>,
    },
    {
      name: (
        <div>
          {t('spend')}
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
          {t('sales')}
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
          {t('acos')}
          <CustomFilter
            field={"acos"}
            showFilter={showACOSFilter}
            setShowFilter={setShowACOSFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
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
          {t('roas')}
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
          {t('Orders')}
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
          {t('impressions')}
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
          {t('cpc')}
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
          {t('clicks')}
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
  ];

  useEffect(() => {
    const firstDate = new Date(moment().startOf("month"));
    const lastDate = new Date();

    setDate([firstDate, lastDate]);
  }, []);

  const ApiListing = (arg, val) => {
    if (profileId.value && date.length != 0) {
      const data = {
        searchName: searchName,
        status: status,
        type: type,
        profileId: profileId.value,
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
      ApiKeywordListing(data)
        .then((e) => {
          if (e?.isSuccess) {
            setTableData(e?.getKeywords);
            setGroupsData(e);
            Toast.success(e?.message);
          } else {
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });
    }
  };
  useEffect(() => {
    ApiListing(arg);
  }, [profileId?.value, date, type, status]);

  const handlePageChange = (page) => {
    ApiListing({ pageNo: page, perPage: perPage });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
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
      <Filter nameShow={false} dateShow={false} profileShow={true} />
      <div className="middle_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("keywords")}</h5>
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
                  <option value="">{t('allType')}</option>
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
                placement="leftStart"
                format="yyyy-MM-dd"
                cleanable={false}
              />
              {PermissionCheck("Keywords", "Create") && (
                <div className="pb-1">
                  <button
                    onClick={() => {
                      setAddName(t("addKeyword"));
                      setEditData({});
                      setShowAdGroup(true);
                      setaddFlag(true);
                    }}
                  >
                    <i class="fa fa-plus"></i>
                    {t('addKeyword')}
                  </button>
                </div>
              )}
            </div>
          </div>
          {PermissionCheck("Keywords", "View Only") && (
            <div className="data_table">
              <DataTable
                className="table_content"
                columns={columns}
                striped={true}
                data={tableData}
                pagination
                paginationTotalRows={groupsData && groupsData?.totalRecords}
                paginationServer
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}
                fixedHeader
              />
            </div>
          )}
        </div>
      </div>
      <AddKeyword
        setShowAdGroup={setShowAdGroup}
        handleClose={handleClose}
        showAdGroup={showAdGroup}
        name={addName}
        submitClose={handleSubmit}
        editData={editData}
        addFlag={addFlag}
        setaddFlag={setaddFlag}
      />
    </>
  );
}

export default Keyword;
