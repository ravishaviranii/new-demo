import React, { useContext } from "react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useEffect } from "react";
import AddTime from "./AddTime";
import { handleLoader, Toast, useDispatch } from "../../../helper/links/Link";
import {
  APIgetTime,
  APIdeleteTime,
  APIstatus,
} from "../../../api-wrapper/scheduler-wrapper/ApiTime";
import DeleteModal from '../../../helper/modal/DeleteModal';
import { APIupdateSchedule } from "../../../api-wrapper/scheduler-wrapper/ApiSchedule";
import moment from "moment";
import DataTable from "react-data-table-component";
import RuleSearch from '../../component/search/RuleSearch';
import { ApigetCampaign } from '../../../api-wrapper/budgetRule/ApiBudgetRule';
import { ProfileContext } from '../../../helper/usecontext/useContext';
function Time({
  setDetailFlag,
  scheduleId,
  copyallIds,
  getSchedule,
}) {
  const dispatch = useDispatch();
  let { profileId } = useContext(ProfileContext)

  const [detailData, setDetailData] = useState([]);
  const [formData, setFormData] = useState();
  const [addFlag, setAddFlag] = useState(false);
  const [timeId, settimeId] = useState();
  const [allIds, setAllIds] = useState([]);
  const [scheduleName, setScheduleName] = useState();
  const [selectAllCheck, setselectAllCheck] = useState();
  // pagination //
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);
  const [timeshowDeleteModal, settimeShowDeleteModal] = useState(false);
  const [searchData, setSearchData] = useState([]);
  const [timeModal, setTimeModal] = useState(false);

  const detailDataCol = [
    {
      name: "Active",
      selector: (row) => row.isActive,

      cell: (e) => (
        <div className=" form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            name="isActive"
            style={{ width: "50px", height: "20px" }}
            onChange={(event) => statusHandler(event, e._id)}
            checked={e.isActive}
            value={e.isActive}
          />
        </div>
      ),
    },
    {
      name: "Day Of Week",
      selector: (row) => row.dayName,
    },
    {
      name: "Start Time",
      selector: (row) => moment(row.startTime, "HH:mm").format("hh:mm A"),
    },
    {
      name: "End Time",
      selector: (row) => moment(row.endTime, "HH:mm").format("hh:mm A"),
    },
    {
      name: "Action",
      selector: (row) => row.isActive,
      width: "250px",
      cell: (e) => (


        <div className="action_icon">
          <i className="fa fa-pencil" onClick={() => {
            setTimeModal(true);
            setFormData(e);
            settimeId(e._id);
          }}></i>
          <i class="fa fa-trash" onClick={() => {
            settimeShowDeleteModal(true);
            settimeId(e._id);
          }}></i>


        </div>
      ),
    },
  ];
  //get  data //

  const getTime = (page, perPage) => {

    let data = {
      pageNo: page || currentPage,
      perPage: perPage || rowsPerPage,
    };
    APIgetTime(data, scheduleId)
      .then((res) => {
        if (res?.isSuccess) {
          setScheduleName(res.scheduleName);
          setDetailData(res.data);
          setTotalRecords(res?.totalRecords);
          setcurrentPage(res.currentPageNo);
        }
      })
      .catch((err) => {
        Toast.error("somthing went wrong!!");
      });
  };

  // delete time modal //
  const deleteTimeHandler = () => {
    dispatch(handleLoader(true));
    APIdeleteTime(scheduleId, timeId)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          getTime();

        } else {
          Toast.error(res.message);

        }
        settimeId();
      })
      .catch((err) => {

        Toast.error("somthing went wrong!!");
      });
  };

  // status change //
  const statusHandler = (event, timeId) => {
    dispatch(handleLoader(true));

    let data = {
      isActive: event.target.checked,
    };
    APIstatus(data, scheduleId, timeId)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message || "Success");
          getTime();

        } else {
          Toast.error(res.message || "error");

        }
      })
      .catch((err) => {

        Toast.error(err.message || "Something went wrong");
      });
  };

  const campaignListHandler = () => {
    let data = {
      campaignIds: allIds,
    };
    APIupdateSchedule(scheduleId, data)
      .then((res) => {
        if (res.isSuccess) {

          Toast.success(res.message);
          getSchedule();
        } else {

          Toast.error(res.message);
        }
      })
      .catch((err) => {

        Toast.error("Something went wrong, please try again");
      });
  };

  useEffect(() => {
    if (scheduleId) {
      getTime();
    }
  }, [scheduleId]);


  useEffect(() => {
    if (copyallIds) {
      setAllIds(copyallIds);
    }
  }, [copyallIds]);

  useEffect(() => {

    let arr = [];

    let data = {
      profileId: profileId?.value
    }
    ApigetCampaign(data)
      .then((res) => {
        if (res.isSuccess) {
          if (res.data.length == allIds?.length) {
            setselectAllCheck(true);
          } else {
            setselectAllCheck(false);
          }
          res.data.map((el) => {
            arr.push({
              campaignId: el.campaignId,
              name: el.name,
              type: el.type,
              status: el.status
            });
          });
        } else {

        }
        setSearchData(arr);

      })
      .catch((err) => {

        Toast.error(err);
      });
  }, []);

  return (
    <>
      <div className='data_content data_content_btn'>
        <div className='data_model_btn'>
          <h5>  Campaign Schedules</h5>
          <div className="form_btn col-6 d-flex align-items-center justify-content-end">
            <button
              className="cancel_btn me-2"
              onClick={() => setDetailFlag(false)}
            >
              Back To Schedules
            </button>
            <button onClick={() => {
              setTimeModal(true);
              setAddFlag(true);
              settimeId();
            }}>
              <i class="fa fa-plus"></i>
              Add Time
            </button>
          </div>

        </div>
        <div className='data_table'>
          <DataTable
            className='table_content'
            columns={detailDataCol}
            striped={true}
            data={detailData}
            pagination
            paginationServer
            fixedHeader
            onChangeRowsPerPage={(event) => { setRowsPerPage(parseInt(event)); getTime(currentPage, event); }}
            paginationPerPage={rowsPerPage}
            paginationTotalRows={totalRecords || 0}
            onChangePage={(page) => { getTime(page) }}
          />
        </div>
        {/* campaign detail */}

        <div className="row campaign_section">
          <h5>Associated Campaigns:</h5>
          <RuleSearch
            campaignList={searchData}
            allIds={allIds}
            setAllIds={setAllIds}
            campaignIds={copyallIds}
            selectAllCheck={selectAllCheck}
            setselectAllCheck={setselectAllCheck}
          />

        </div>

        <div className="d-flex justify-content-center">
          <button
            className="btn cancel col-3 m-2 "
            type="button"
            onClick={() => campaignListHandler()}
          >
            Save
          </button>
        </div>

        {/* add time modal */}

        <Modal show={timeModal} className="model rules_model " centered size="lg">
          <Modal.Header closeButton onClick={() => setTimeModal(false)}>
            <Modal.Title>{timeId ? "Edit" : "Add"} Time </Modal.Title>
          </Modal.Header>
          <AddTime
            setTimeModal={setTimeModal}
            scheduleId={scheduleId}
            formData={formData}
            setFormData={setFormData}
            addFlag={addFlag}
            setAddFlag={setAddFlag}
            getTime={getTime}
            timeId={timeId}
          />
        </Modal>

        {/* delete time modal */}

        <DeleteModal
          showDeleteModal={timeshowDeleteModal}
          setShowDeleteModal={settimeShowDeleteModal}
          deleteHandler={deleteTimeHandler}
          name={"Time"}
        />
      </div>
    </>
  );
}

export default Time;
