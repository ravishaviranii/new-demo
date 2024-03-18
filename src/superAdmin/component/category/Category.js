import React, { useState } from "react";
import Filter from "../../helper/Filter";
import DataTable from "react-data-table-component";
import AddCategory from "./AddCategory";
import DeleteModal from "../../../admin/helper/modal/DeleteModal";
import {
  ApiCatList,
  Apidelete,
  ApistatusChange,
} from "../../api-wrapper/ApiCategory";
import { Toast, Controller } from "../../../admin/helper/links/Link";
import { useEffect } from "react";
function Category() {
  const [editData, setEditData] = useState();
  const [addFlag, setAddFlag] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [tableData, setTableData] = useState([]);

  let columns = [
    {
      name: "categoryName",

      selector: (row) => row.categoryName,
      sortable: true,
    },
    {
      name: "status",

      selector: (row) => row.status,
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
      name: "Action",
      selector: (row) => row.action,

      cell: (rows) => (
        <div className="action_container">
          <i
            className="fa fa-pencil  green"
            style={{ cursor: "pointer" }}
            onClick={() => HandleEdit(rows)}
          ></i>
          <i
            class="fa fa-trash ms-2 red"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteId(rows._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  const HandleEdit = (rows) => {
    setEditData(rows);
    setAddFlag(true);
  };

  const deleteHandler = () => {
    Apidelete(deleteId)
      .then((res) => {
        if (res.isSuccess) {
          HandleList();
        } else {
          Toast.error(res.message);
        }
        setDeleteId();
      })
      .catch((err) => {
        Toast.error("somthing went wrong!!");
      });
  };

  const HandleList = () => {
    ApiCatList(arg)
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
  }, [arg]);
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
  const statusHandler = (event, id) => {
    let data = {
      isActive: event.target.checked,
    };
    ApistatusChange(data, id)
      .then((res) => {
        if (res.isSuccess) {
          Toast.success(res.message);
          HandleList();
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Something went wrong");
      });
  };
  return (
    <>
      <Filter
        name={"Category"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />

      <div className="middle_container">
        <div className="data_content data_content_btn m-0">
          <div className="data_model_btn camapgin_btn">
            <div></div>
            <div className="filTypeBox">
              <div className="pb-1">
                <button onClick={() => setAddFlag(true)}>
                  <i class="fa fa-plus"></i>
                  Add Category
                </button>
              </div>
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
        </div>
      </div>

      <AddCategory
        addFlag={addFlag}
        setAddFlag={setAddFlag}
        setEditData={setEditData}
        editData={editData}
        HandleList={HandleList}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteHandler={deleteHandler}
        name={"Category"}
      />
    </>
  );
}

export default Category;
