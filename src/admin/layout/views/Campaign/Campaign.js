import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Filter from "../../../helper/filter/Filter";
import AddCampaign from "./AddCampaign";
import { ApiCampainListing } from "../../../api-wrapper/campaign/ApiCampaign";
import ViewCampaign from "./ViewCampaign";
import moment from "moment-timezone";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { Toast, useDispatch } from "../../../helper/links/Link";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import CustomFilter from "../../../helper/filter/CustomFilter";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import TypeShortName from "../../../helper/typeShortName/TypeShortName";
import { useTranslation } from "react-i18next";

function Campaign() {
  const { t } = useTranslation();
  let { profileId, typeValue } = useContext(ProfileContext);


  const dispatch = useDispatch();

  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [addName, setAddName] = useState("Add Campaign");
  const [tableData, setTableData] = useState([]);
  const [campaignData, setCampaignData] = useState();
  const [viewPress, setViewPress] = useState(false);
  const [perPage, setPerPage] = useState(10);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [editData, setEditData] = useState();
  const [campaignDetails, setCampaignDetails] = useState([]);
  const [date, setDate] = useState([]);
  const [type, setType] = useState("");
  const [status, setStatus] = useState("");
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
  const [showBudgetFilter, setShowBudgetFilter] = useState(false);
  const [showSpendFilter, setShowSpendFilter] = useState(false);
  const [showSalesFilter, setShowSalesFilter] = useState(false);
  const [showACOSFilter, setShowACOSFilter] = useState(false);
  const [showROASFilter, setShowROASFilter] = useState(false);
  const [showCPCFilter, setShowCPCFilter] = useState(false);
  const [showImpressionsFilter, setShowImpressionsFilter] = useState(false);
  const [showClicksFilter, setShowClicksFilter] = useState(false);
  const [showOrdersFilter, setShowOrdersFilter] = useState(false);
  const [customFilterFlag, setCustomFilterFlag] = useState(false);
  const [fieldName, setfieldName] = useState("");



  const handleClose = () => {
    setShowAddCampaign(false);
    ApiListing(arg);
  };

  const columns = [
    {
      name: t("Action"),
      selector: (row) => row.action,
      cell: (rows) => (
        <div className="action_container">
          {PermissionCheck("Campaigns", "Update") && (
            <i
              className="fa fa-pencil pencil"
              onClick={() => {
                setAddName(t("editCampaign"));
                setEditData(rows);
                setShowAddCampaign(true);
              }}
            ></i>
          )}

          {PermissionCheck("Campaigns", "Details View Only") && (
            <i
              className="fa fa-eye view ms-2"
              onClick={() => {
                setViewPress(true);
                setCampaignDetails(rows);
              }}
            ></i>
          )}
        </div>
      ),
    },

    {
      name: t("campaignName"),
      width: "250px",
      selector: (row) => row.name,
      cell: (row) => <>{row.name}</>,
      sortable: true,
    },
    {
      name: t("status"),
      width: "125px",
      sortable: true,
      selector: (row) => row.status,
      cell: (e) => (
        <div
          className={`${e.status == " "
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
      name: t("type"),
      selector: (row) => row.type,
      cell: (row) => <>{TypeShortName(row.type)}</>,
      width: "80px",
      sortable: true,
    },
    {
      name: (
        <div className="position-relative">
          {t("Budget")}
          <CustomFilter
            field={"budget"}
            showFilter={showBudgetFilter}
            setShowFilter={setShowBudgetFilter}
            conditionObj={conditionObj}
            setConditionObj={setConditionObj}
            setfieldName={setfieldName}
            setCustomFilterFlag={setCustomFilterFlag}
            defaultValue={defaultValue}
          />
        </div>
      ),
      width: "100px",
      selector: (row) => row.budget,
      cell: (row) => <>{CurrencyCode(row.budget)}</>,
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

    {
      name: t("startDate"),
      width: "120px",
      selector: (row) => row.startDate,
      cell: (e) => <div>{moment(e.startDate).format("YYYY-MM-DD") || "-"}</div>,
    },
    {
      name: t("endDate"),
      width: "120px",
      selector: (row) => row.endDate,
      sortable: true,
      cell: (e) => (
        <div>{e.endDate ? moment(e.endDate).format("YYYY-MM-DD") : "-"}</div>
      ),
    },
    {
      name: t("budgetType"),
      width: "130px",
      selector: (row) => row.budgetType,
      sortable: true,
    },
  ];

  useEffect(() => {
    const firstDate = new Date(moment().startOf("month"));
    const lastDate = new Date();

    setDate([firstDate, lastDate]);
  }, []);

  const ApiListing = async (arg) => {
    if (profileId.value && date?.length != 0) {
      const data = {
        searchName: searchName,
        profileId: profileId.value,
        fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
        toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        status: status,
        type: type,
        fieldName: fieldName,
        fieldOperator: conditionObj?.firstCondition,
        fieldValue: Number(conditionObj.firstValue),
        conditions: conditionObj?.operator,
        extraFieldOperator: conditionObj?.secondCondition,
        extraFieldValue: Number(conditionObj?.secondValue),
        sortType: conditionObj?.sortType,
        ...arg,
      };
      await ApiCampainListing(data)
        .then((e) => {
          if (e?.isSuccess) {
            setTableData(e?.getCampaign);
            setCampaignData(e);
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
    setArg({
      pageNo: page,
      perPage: perPage
    })
    ApiListing({ pageNo: page, perPage: perPage });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    setArg({
      pageNo: page,
      perPage: newPerPage
    })
    ApiListing({ pageNo: page, perPage: newPerPage });
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    if (e.target.value == "") {
      ApiListing({ searchName: e.target.value });
    }
  };

  

  return (
    <>
      <Filter name={"Campaigns"} dateShow={false} profileShow={true} />
      {viewPress ? (
        <ViewCampaign
          viewPress={viewPress}
          setViewPress={setViewPress}
          campaignDetails={campaignDetails}
          campaignDate={date}
        />
      ) : (
        <div className="middle_container">
          <div className="data_content data_content_btn m-0">
            <div className="data_model_btn camapgin_btn">
              <div className="pb-2 pb-lg-0">
                <h5>{t("Campaigns")}</h5>
              </div>
              <div className="filTypeBox">
                <div className="search_option pb-1">
                  <input
                    type="text"
                    placeholder={t("searchHere")}
                    onChange={(e) => handleSearch(e)}
                  />
                  <button
                    onClick={() => ApiListing({ searchName: searchName })}
                  >
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
                {PermissionCheck("Campaigns", "Create") && (
                  <div className="pb-1">
                    <button
                      onClick={() => {
                        setAddName(t("addCampaign"));
                        setShowAddCampaign(true);
                        setEditData({});
                      }}
                    >
                      <i class="fa fa-plus"></i>
                      {t("addCampaign")}
                    </button>
                  </div>
                )}
              </div>
            </div>
            {PermissionCheck("Campaigns", "View Only") && (
              <div className="data_table">
                <DataTable
                  className="table_content"
                  columns={columns}
                  striped={true}
                  data={tableData}
                  pagination
                  paginationDefaultPage={customFilterFlag ? 1 : arg.pageNo}
                  paginationTotalRows={
                    campaignData && campaignData?.totalRecords
                  }
                  paginationServer
                  onChangePage={handlePageChange}
                  onChangeRowsPerPage={handlePerRowsChange}
                  fixedHeader
                />
              </div>
            )}
          </div>
        </div>
      )}
      <AddCampaign
        setShowAddCampaign={setShowAddCampaign}
        showAddCampaign={showAddCampaign}
        handleClose={handleClose}
        name={addName}
        editData={editData}
      />
    </>
  );
}

export default Campaign;
