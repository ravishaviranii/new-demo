import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { Modal } from "react-bootstrap";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment";
import DeleteModal from "../../../helper/modal/DeleteModal";
import {
  handleLoader,
  Toast,
  useDispatch,
  Link,
} from "../../../helper/links/Link";
import AddScheduler from "./AddScheduler";
import Time from "./Time";
import { ApigetCampaign } from "../../../api-wrapper/budgetRule/ApiBudgetRule";
import List from "../../component/search/List";
import {
  APIgetSchedule,
  APIdeleteSchedule,
  ApistatusChange,
  ApiRun,
} from "../../../api-wrapper/scheduler-wrapper/ApiSchedule";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { useTranslation } from "react-i18next";

function CampaignScheduler() {
  const { t } = useTranslation();

  let { timezone, profileId } = useContext(ProfileContext);

  const dispatch = useDispatch();

  const [detailFlag, setDetailFlag] = useState(false);
  const [scheduleId, setScheduleId] = useState(null);
  const [selectedModal, setSelectedModal] = useState(false);
  const [listId, setListId] = useState()
  const [copyallIds, setCopyAllIds] = useState([]);
  const [scheduleData, setScheduleData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState(null);
  const [addFlag, setAddFlag] = useState(false);
  // add schedule modal //
  const [addSchedulerModal, setAddSchedulerModal] = useState(false);
  //delete schedule modal //
  const [deleteId, setDeleteId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  // pagination //
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);



  // ---------------------------- schedule ------------------------//
  const columns = [
    {
      name: t("isActive"),
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
      name: t("scheduleName"),
      selector: (row) => row.scheduleName,
      // cell: (e) => (
      //   <Link
      //     to
      //     onClick={() => {
      //       setDetailFlag(true);
      //       setScheduleId(e._id);
      //       setCopyAllIds(e.campaignIds);
      //     }}
      //   >
      //     {e.scheduleName}
      //   </Link>
      // ),
      sortable: true,
    },
    {
      name: t("ofCampaigns"),
      selector: (row) => row.campagin,
      cell: (e) => (
        <Link
          to
          onClick={() => {
            getSelectedId(e.campaignIds);
          }}
        >
          {" "}
          {e.campaignIds.length}
        </Link>
      ),
      sortable: true,
    },
    {
      name: t("updatedAt"),
      selector: (row) => row.updatedAt,
      cell: (e) => {
        return moment(e?.updatedAt)
          .tz(timezone && timezone)
          .format("MM/DD/YYYY hh:mm:ss A z");
      },
    },
    {
      name: t("Action"),
      selector: (row) => row.isActive,
      width: "250px",
      cell: (e) => (
        <div className="action_icon">
          {PermissionCheck("Campaign Scheduler", "Update") && (
            <i
              className="fa fa-pencil "
              onClick={() => {
                setEditId(e._id);
                setAddSchedulerModal(true);
                setEditData(e);
                setCopyAllIds(e.campaignIds);
              }}
            ></i>
          )}
          {PermissionCheck("Campaign Scheduler", "Remove") && (
            <i
              class="fa fa-trash"
              onClick={() => {
                setShowDeleteModal(true);
                setDeleteId(e._id);
              }}
            ></i>
          )}

          <button className="run_icon" onClick={() => runHandler(e._id)}>
            Run
          </button>
        </div>
      ),
    },
  ];
  const runHandler = (id) => {
    dispatch(handleLoader(true));
    ApiRun(id)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          dispatch(handleLoader(false));
          getSchedule();
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
          getSchedule();
        } else {
          Toast.error(res.message || "error");
        }
      })
      .catch((err) => {
        Toast.error(err.message || "Something went wrong");
      });
  };
  ;
  const getSelectedId = (ids) => {

    let arr = [];
    dispatch(handleLoader(true));
    let data = {
      profileId: profileId?.value,
    };
    ApigetCampaign(data)
      .then((res) => {
        if (res.isSuccess) {

          res.data.map((el) => {
            ids.map((item) => {
              if (el.campaignId == item) {
                arr.push(el);
              }
            });
          });

          setSelectedModal(true);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error(err);
      });
    setListId(arr);
  };
  const deleteHandler = () => {
    APIdeleteSchedule(deleteId)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          getSchedule();
        } else {
          Toast.error(res.message);
        }
        setDeleteId();
      })
      .catch((err) => {
        Toast.error("somthing went wrong!!");
      });
  };


  //get  data //

  const getSchedule = (page, perPage) => {
    if (profileId?.value) {
      let data = {
        pageNo: page || currentPage,
        perPage: perPage || rowsPerPage,
        profileId: profileId?.value,
      };
      APIgetSchedule(data)
        .then((res) => {
          if (res?.isSuccess) {
            setScheduleData(res.data);

            setTotalRecords(res?.totalRecords);
            setcurrentPage(res.currentPageNo);
          }
        })
        .catch((err) => {
          Toast.error("somthing went wrong!!");
        });
    }
  };

  useEffect(() => {
    getSchedule();
  }, [profileId?.value]);
  return (
    <>
      <Filter
        name={"Campaign Scheduler"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        {detailFlag ? (
          <Time
            setDetailFlag={setDetailFlag}
            scheduleId={scheduleId}
            getSchedule={getSchedule}
            copyallIds={copyallIds}
          />
        ) : (
          <div className="data_content data_content_btn">
            <div className="data_model_btn">
              <h5>{t('campaignSchedular')}</h5>
              {PermissionCheck("Campaign Scheduler", "Create") && (
                <button
                  onClick={() => {
                    setAddFlag(true);
                    setEditId("");
                    setAddSchedulerModal(true);
                    setCopyAllIds([]);
                  }}
                >
                  <i class="fa fa-plus"></i>
                  {t('createSchedule')}
                </button>
              )}
            </div>
            {PermissionCheck("Campaign Scheduler", "View Only") && (
              <div className="data_table">
                <DataTable
                  className="table_content"
                  columns={columns}
                  striped={true}
                  data={scheduleData}
                  pagination
                  paginationServer
                  fixedHeader
                  onChangeRowsPerPage={(event) => {
                    setRowsPerPage(parseInt(event));
                    getSchedule(currentPage, event);
                  }}
                  paginationPerPage={rowsPerPage}
                  paginationTotalRows={totalRecords || 0}
                  onChangePage={(page) => {
                    getSchedule(page);
                  }}
                />
              </div>
            )}

            {/* add scheduler modal */}

            <Modal
              show={addSchedulerModal}
              className="model rules_model "
              centered
              size="lg"
            >
              <Modal.Header
                closeButton
                onClick={() => setAddSchedulerModal(false)}
              >
                <Modal.Title>{t('Schedule')}</Modal.Title>
              </Modal.Header>
              <AddScheduler
                addSchedulerModal={addSchedulerModal}
                setAddSchedulerModal={setAddSchedulerModal}
                editId={editId}
                editData={editData}
                getSchedule={getSchedule}
                addFlag={addFlag}
                setAddFlag={setAddFlag}
                copyallIds={copyallIds}
              />
            </Modal>

            {/* selected campaign */}
            <Modal
              show={selectedModal}
              className="model rules_model"
              size="lg"
              centered
            >
              <Modal.Header closeButton onClick={() => setSelectedModal(false)}>
                <Modal.Title>{t('associatedCampaigns')}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <List listId={listId} />
              </Modal.Body>
            </Modal>

            {/* delete modal */}

            <DeleteModal
              showDeleteModal={showDeleteModal}
              setShowDeleteModal={setShowDeleteModal}
              deleteHandler={deleteHandler}
              name={"Campaign Schedules"}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CampaignScheduler;
