import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import AddRule from "./AddRule";
import DeleteModal from "../../../helper/modal/DeleteModal";
import {
  ApigetRule,
  ApideleteRule,
  ApistatusChange,
  ApigetCampaign,
  ApiupdateRule,
  ApiRun,
} from "../../../api-wrapper/budgetRule/ApiBudgetRule";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import {
  handleLoader,
  Toast,
  useDispatch,
  Link,
} from "../../../helper/links/Link";
import { budgetRuleCol, conditionOperators, subValueType } from "./column";
import RuleSearch from "../../component/search/RuleSearch";
import List from "../../component/search/List";
import moment from "moment";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { useTranslation } from "react-i18next";
function BudgetRule() {
  const { t } = useTranslation();
  let selectedCampagin = useContext(ProfileContext);
  const dispatch = useDispatch();
  const columns = [
    {
      name: t("Action"),
      cell: (rows) => (
        <div className="action_icon">
          {PermissionCheck("Budget Rules", "Update") && (
            <i className="fa fa-pencil" onClick={() => editHandler(rows)}></i>
          )}
          {PermissionCheck("Budget Rules", "Remove") && (
            <i
              class="fa fa-trash"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteId(rows._id);
              }}
            ></i>
          )}

          <i
            class="fa fa-sign-in"
            onClick={() => {
              setAssignId(rows._id);
              setcampaignIds(rows.campaignIds);
              selectedCampaginHandler(rows.campaignIds);
            }}
          ></i>
          <button className="run_icon" onClick={() => runHandler(rows._id)}>
            Run
          </button>
        </div>
      ),
    },
    {
      name: t("isActive"),
      width: "130px",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div className=" form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            name="isActive"
            onChange={(event) => statusHandler(event, row._id)}
            checked={row.isActive}
            value={row.isActive}
            style={{ width: "50px", height: "20px" }}
          />
        </div>
      ),
    },

    {
      name: t("ruleName"),
      selector: (row) => row.ruleName,
      sortable: true,
    },
    {
      name: t("conditions"),
      width: "230px",

      cell: (e) => {
        return (
          <div className="rule_type">
            {e?.conditions?.map((el, index) => {
              return mainConditionMaker(
                index,
                el?.conditionType,
                el?.conditionOperator,
                el?.conditionValue,
                el?.conditionValueType
              );
            })}
          </div>
        );
      },
    },
    {
      name: t("actionType"),
      width: "230px",
      selector: (row) => row.actionType,
      cell: (e) => {
        let getValueType =
          e?.actionType.actionValueType == "Number" ? "" : "% of budget";
        return e?.actionType?.actionName == "Paused"
          ? "Campaign Paused"
          : e?.actionType?.actionName == "Enabled"
          ? "Campaign Enabled"
          : `${e?.actionType?.actionName} budget by ${e?.actionType?.actionValue}${getValueType}`;
      },
    },
    {
      name: t("rulesTimes"),
      width: "130px",
      selector: (row) => row.times,
      cell: (row) => {
        return row.times?.map((el, index) => {
          return (
            <React.Fragment key={index}>
              {`${moment(el, "HH:mm").format("hh:mm A")}`}
              {index !== row.times.length - 1 && ", "}
            </React.Fragment>
          );
        });
      },
    },
    {
      name: t("assignCampaign"),
      width: "130px",
      selector: (row) => row.assignCampaign,
      cell: (e) => {
        return (
          <>
            {e?.campaignIds?.length == 0 ? (
              0
            ) : (
              <Link
                className="rule_type"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  getSelectedId(e.campaignIds);
                }}
              >
                {e?.campaignIds?.length}
              </Link>
            )}
          </>
        );
      },
    },
    {
      name: t("updatedAt"),
      selector: (row) => row.updatedAt,
      cell: (e) => {
        return moment(e?.updatedAt)
          .tz(selectedCampagin?.timezone && selectedCampagin?.timezone)
          .format("MM/DD/YYYY hh:mm:ss A z");
      },
    },
  ];

  const runHandler = (id) => {
    dispatch(handleLoader(true));
    ApiRun(id)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          dispatch(handleLoader(false));
          getRule();
        } else {
          Toast.error(res.message);
          dispatch(handleLoader(false));
        }
        setDeleteId();
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error("somthing went wrong!!");
      });
  };

  const [tableData, setTableData] = useState([]);
  const [deleteId, setDeleteId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [addModalFlag, setaddModalFlag] = useState(false);
  const [editId, setEditId] = useState();

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);

  const [searchData, setSearchData] = useState([]);
  const [assignId, setAssignId] = useState();
  const [allIds, setAllIds] = useState([]);
  const [campaignIds, setcampaignIds] = useState();
  const [selectAllCheck, setselectAllCheck] = useState();
  const [campaignModal, setCampaignModal] = useState(false);

  const [selectedModal, setSelectedModal] = useState(false);
  const [listId, setListId] = useState();

  const deleteHandler = () => {
    dispatch(handleLoader(true));
    ApideleteRule(deleteId)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          dispatch(handleLoader(false));
          getRule();
        } else {
          Toast.error(res.message);
          dispatch(handleLoader(false));
        }
        setDeleteId();
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error("somthing went wrong!!");
      });
  };

  const statusHandler = (event, id) => {
    let data = {
      isActive: event.target.checked,
    };
    ApistatusChange(data, id)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message || "Success");
          getRule();
        } else {
          Toast.error(res.message || "error");
        }
      })
      .catch((err) => {
        Toast.error(err.message || "Something went wrong");
      });
  };

  const editHandler = (rows) => {
    setaddModalFlag(true);
    setEditId(rows._id);
  };

  const getRule = (page, perPage) => {
    if (selectedCampagin?.profileSendID) {
      dispatch(handleLoader(true));
      let data = {
        pageNo: page || currentPage,
        perPage: perPage || rowsPerPage,
        profileId: selectedCampagin?.profileSendID,
      };
      ApigetRule(data)
        .then((res) => {
          if (res.isSuccess) {
            dispatch(handleLoader(false));
            setTableData(res.data);
            setTotalRecords(res?.totalRecords);
            // setActivePage(res.currentPageNo)
          } else {
            dispatch(handleLoader(false));
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          dispatch(handleLoader(false));
          Toast.error("somthing went wrong!!");
        });
    }
    dispatch(handleLoader(false));
  };
  useEffect(() => {
    getRule();
  }, [selectedCampagin?.profileSendID]);

  const mainConditionMaker = (
    index,
    conditionType,
    conditionOperator,
    conditionValue,
    conditionValueType
  ) => {
    let getOperator = conditionOperators?.find(
      (x) => x.key == conditionOperator
    ).value;
    let getValueType = conditionValueType == "Number" ? "" : "% of budget";

    return (
      <div key={index}>
        {index == 0 ? "" : "And"} {conditionType} {getOperator} {conditionValue}
        {getValueType}
      </div>
    );
  };

  const selectedCampaginHandler = (ids) => {
    let arr = [];
    dispatch(handleLoader(true));
    let data = {
      profileId: selectedCampagin?.profileSendID,
    };
    ApigetCampaign(data)
      .then((res) => {
        if (res.isSuccess) {
          dispatch(handleLoader(false));

          if (res.data.length == ids?.length) {
            setselectAllCheck(true);
          } else {
            setselectAllCheck(false);
          }
          res.data.map((el) => {
            arr.push({
              campaignId: el.campaignId,
              name: el.name,
              type: el.type,
              status: el.status,
            });
          });
        } else {
          dispatch(handleLoader(false));
        }
        setSearchData(arr);
        setCampaignModal(true);
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error(err);
      });
  };

  const campaignHandler = () => {
    dispatch(handleLoader(true));

    let data = {
      campaignIds: allIds,
    };

    ApiupdateRule(assignId, data)
      .then((res) => {
        if (res.isSuccess) {
          dispatch(handleLoader(false));
          Toast.success(res.message);
          getRule();
        } else {
          dispatch(handleLoader(false));
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error(err);
      });

    setCampaignModal(false);
  };
  // selected campaign  id //
  const getSelectedId = (ids) => {
    let arr = [];
    dispatch(handleLoader(true));
    let data = {
      profileId: selectedCampagin?.profileSendID,
    };
    ApigetCampaign(data)
      .then((res) => {
        if (res.isSuccess) {
          dispatch(handleLoader(false));
          res.data.map((el) => {
            ids.map((item) => {
              if (el.campaignId == item) {
                arr.push(el);
              }
            });
          });
          setSelectedModal(true);
        } else {
          dispatch(handleLoader(false));
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error(err);
      });

    setListId(arr);
  };

  return (
    <>
      <Filter
        name={"Budget Rules"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn">
            <h5>{t("budgetRules")}</h5>
            {PermissionCheck("Budget Rules", "Create") && (
              <button
                onClick={() => {
                  setaddModalFlag(true);
                  setEditId();
                }}
              >
                <i class="fa fa-plus"></i>
                {t("addRule")}
              </button>
            )}
          </div>
          {PermissionCheck("Budget Rules", "View Only") && (
            <div className="data_table">
              <DataTable
                className="table_content"
                columns={columns}
                striped={true}
                data={tableData}
                pagination
                paginationServer
                fixedHeader
                onChangeRowsPerPage={(event) => {
                  setRowsPerPage(parseInt(event));
                  getRule(currentPage, event);
                }}
                paginationPerPage={rowsPerPage}
                paginationTotalRows={totalRecords || 0}
                onChangePage={(page) => {
                  getRule(page);
                }}
              />
            </div>
          )}
        </div>
      </div>

      <Modal
        show={addModalFlag}
        onHide={() => setaddModalFlag(false)}
        centered
        size="xl"
        className="add_modal"
      >
        <Modal.Header className="campaign_modal_head">
          <div className="col-11 modal_title_box">
            <p>{t('rules')}</p>
          </div>
          <div className="col-1">
            <i
              className="fa fa-times red modal_close_box"
              aria-hidden="true"
              onClick={() => setaddModalFlag(false)}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <AddRule
            setaddModalFlag={setaddModalFlag}
            getRule={getRule}
            setEditId={setEditId}
            editId={editId}
          />
        </Modal.Body>
      </Modal>

      {/* delete modal */}

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteHandler={deleteHandler}
        name={"Budget Rules"}
      />

      {/* campaign modal */}

      <Modal
        show={campaignModal}
        className="model rules_model"
        size="lg"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            setCampaignModal(false);
          }}
        >
          <Modal.Title>{t('assignCampaign')}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <RuleSearch
            campaignList={searchData}
            allIds={allIds}
            setAllIds={setAllIds}
            campaignIds={campaignIds}
            selectAllCheck={selectAllCheck}
            setselectAllCheck={setselectAllCheck}
          />

          <div className="form_btn mt-3">
            <button
              className="cancel_btn"
              type="button"
              onClick={() => {
                setCampaignModal(false);
                getRule();
              }}
            >
              {" "}
              {t('reset')}{" "}
            </button>
            <button
              className="save_btn"
              type="submit"
              onClick={() => campaignHandler()}
            >
              {t('save')}
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* selected campaign */}
      <Modal
        show={selectedModal}
        className="model rules_model"
        size="lg"
        centered
      >
        <Modal.Header closeButton onClick={() => setSelectedModal(false)}>
          <Modal.Title>
            <h5>Associated Campaigns</h5>{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <List listId={listId} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default BudgetRule;
