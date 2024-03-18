import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment-timezone";
import { Toast, useDispatch } from "../../../helper/links/Link";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import success from "../../../assets/images/success.svg";
import { ApiRuleHistory } from "../../../api-wrapper/budgetRule/ApiBudgetRule";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { useTranslation } from "react-i18next";

function BudgetHistory() {
  const { t } = useTranslation();

  let { profileId } = useContext(ProfileContext);

  const [date, setDate] = useState([
    new Date(moment().startOf("month")),
    new Date(),
  ]);
  const [tableData, setTableData] = useState([]);
  const [searchName, setSearchName] = useState("");

  const dispatch = useDispatch();

  const columns = [
    {
      name: t("ruleDate"),
      selector: (row) => row.ruleDate,
      sortable: true,
    },
    {
      name: t("ruleName"),
      selector: (row) => row.ruleName,
      sortable: true,
    },
    {
      name: t("status"),
      selector: (row) => row.status,
      sortable: true,
      cell: (e) => (
        <div>
          {e.status == "COMPLETED" || e.status == "SUCCESS" ? (
            <div style={{ color: "green" }}>{e.status}</div>
          ) : (
            <div style={{ color: "red" }}>{e.status}</div>
          )}
        </div>
      ),
    },

    {
      name: t("dailyRunCount"),
      selector: (row) => row.dailyCount,
      sortable: true,
    },
    {
      name: t("executedCount"),
      selector: (row) => row.excutedCount,
      sortable: true,
    },
    {
      name: t("lastRun"),
      selector: (row) => row.lastRun,
      sortable: true,
      cell: (e) => (
        <div className="d-flex align-items-center success_img">
          <img src={success} className=" me-1" />
          <p>{e.lastRun}</p>
        </div>
      ),
    },
    {
      name: t("nextRun"),
      selector: (row) => row.nextRun,
      sortable: true,
    },
  ];

  useEffect(() => {
    BudgetRuleHistoryList();
  }, [date]);

  const BudgetRuleHistoryList = async (arg) => {
    if (profileId.value) {
      const data = {
        pageNo: 1,
        perPage: 10,
        fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
        toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        profileId: profileId.value,
        ...arg,
      };
      await ApiRuleHistory(data)
        .then((e) => {
          if (e?.isSuccess) {
            setTableData(e.data);
          } else {
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });
    }
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    if (e.target.value == "") {
      BudgetRuleHistoryList({ search: e.target.value });
    }
  };

  return (
    <>
      <Filter
        name={"Budget Rule History"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div className="pb-2 pb-lg-0">
              <h5>{t("budgetRuleHistory")}</h5>
            </div>

            <div className="filTypeBox">
              <div className="search_option pb-1">
                <input
                  type="text"
                  placeholder={t("searchHere")}
                  onChange={(e) => handleSearch(e)}
                />
                <button
                  onClick={() => BudgetRuleHistoryList({ search: searchName })}
                >
                  Go
                </button>
              </div>

              <DateRangePicker
                className={`rangeDate custom-date-range-picker px-lg-2 pb-1 ps-0`}
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
          {PermissionCheck("Budget Rule History", "View Only") && (
            <div className="data_table">
              <DataTable
                className="table_content"
                columns={columns}
                striped={true}
                data={tableData}
                pagination
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default BudgetHistory;
