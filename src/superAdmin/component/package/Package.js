import React, { useEffect, useState, useContext } from "react";
import {  SelectPicker } from "rsuite";
import DataTable from "react-data-table-component";
import moment from "moment";
import AddPackage from "./AddPackage";
import Filter from "../../helper/Filter";
import {
  ApiList,
  Apidelete,
  ApiUpdatePackageStatus,
} from "../../api-wrapper/ApiPackage";
import { Toast } from "../../../admin/helper/links/Link";
import { packageInfoHandler } from "../../../common/redux/action";
import { useDispatch } from "react-redux";
import DeleteModal from "../../../admin/helper/modal/DeleteModal";
import ViewPackageDesign from "./ViewPackage";
import CurrencyCode from "../../../admin/helper/currencyCode/CurrencyCode";
import { ApiPackageList } from "../../api-wrapper/ApiVendor";
import { ProfileContext } from "../../../admin/helper/usecontext/useContext";

function Package() {
  const dispatch = useDispatch();
  const [step, setStep] = React.useState(0);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [totalRecords, setTotalRecords] = useState(0);
  const [deleteId, setDeleteId] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pacakgeDetails, setPacakgeDetails] = useState();
  const [viewPackage, setviewPackage] = useState(false);
  const [allPackage, setallPackage] = useState([]);
  const [packageId, setpackageId] = useState("");
  const [types, setTypes] = useState([]);
  const [type, setType] = useState("");

  const columns = [
    {
      name: "Action",

      selector: (row) => row.action,
      cell: (e) => (
        <div className="action_container">
          <i
            className="fa fa-pencil green"
            onClick={() => {
              handleEdit(e);
            }}
            style={{ cursor: "pointer" }}
          ></i>
          <i
            className="fa fa-trash ms-2 red"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowDeleteModal(true);
              setDeleteId(e._id);
            }}
          ></i>
          <i
            className="fa fa-eye view ms-2"
            onClick={() => {
              setviewPackage(true);
              setPacakgeDetails(e);
            }}
          ></i>
        </div>
      ),
    },
    {
      name: "package Name",
      selector: (row) => row.packageName,
    },
    {
      name: "Permission",
      selector: (row) => row.allowPermission,
      cell: (e) =>
        e?.allowPermission
          ?.map((x) => {
            return x?.name;
          })
          .join(", "),
    },
    {
      name: "Profiles",
      sortable: true,
      selector: (row) => row.allowProfiles,
    },

    {
      name: "campaign Types",
      selector: (row) => row.campaignTypes,
      cell: (e) =>
        e?.campaignTypes
          ?.map((x) => {
            return x;
          })
          .join(", "),
    },

    {
      name: "price",
      width: "250px",
      selector: (row) => row.price,
      cell: (e) =>
        e?.price?.map((x) => {
          return (
            <div className="p-1 m-1 text-center class_catch">
              <p className="text-center">{x.type}</p>
              <p className="m-0 py-1">
                {x.priceINR != undefined ? CurrencyCode(x.priceINR, "INR") : ""}
              </p>
              <p className="m-0 pb-1">
                {x.priceUSD != undefined ? CurrencyCode(x.priceUSD, "USD") : ""}
              </p>
            </div>
          );
        }),
    },
    {
      name: "isActive",
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
    // {
    //   name: "Created date",
    //   selector: (row) => row.createdAt,
    //   cell: (e) => (
    //     <div>{moment(e.updatedAt).format("YYYY-MM-DD") + " " + moment(e.updatedAt).format("hh:mm:ss A") || "-"}
    //     </div>
    //   ),

    // },
    {
      name: "Updated Date",
      selector: (row) => row.updatedAt,
      cell: (e) => (
        <div>
          {moment(e.updatedAt).format("YYYY-MM-DD") +
            " " +
            moment(e.updatedAt).format("hh:mm:ss A") || "-"}
        </div>
      ),
    },
  ];

  const statusHandler = (event, id) => {
    let data = {
      packageId: id,
      isActive: event.target.checked,
    };
    ApiUpdatePackageStatus(data, id)
      .then((res) => {
        if (res.isSuccess) {
          handleList();
        } else {
          Toast.error(res.message || "error");
        }
      })
      .catch((err) => {
        Toast.error(err.message || "Something went wrong");
      });
  };

  const handleEdit = (data) => {
    let priceData = {
      monthlyINR: "",
      monthlyUSD: "",
      yearlyINR: "",
      yearlyUSD: "",
    };
    data.price.map((el) => {
      if (el.type == "Monthly") {
        priceData.monthlyINR = el.priceINR;
        priceData.monthlyUSD = el.priceUSD;
      }
      if (el.type == "Yearly") {
        priceData.yearlyINR = el.priceINR;
        priceData.yearlyUSD = el.priceUSD;
      }
    });

    let addData = {
      step0: {
        packageName: data.packageName,
        type: data.campaignTypes,
      },
      step1: data.allowPermission,
      step2: {
        profileNumber: data.allowProfiles,
        monthlyINR: priceData.monthlyINR,
        monthlyUSD: priceData.monthlyUSD,
        yearlyINR: priceData.yearlyINR,
        yearlyUSD: priceData.yearlyUSD,
        percentage: 0,
        trial: data.packageType == "Trial" ? true : false,
        trialDay: data.trialDays,
      },
      edit: true,
      id: data._id,
    };
    setShowAddPackage(true);
    dispatch(packageInfoHandler(addData));
  };

  const handleList = () => {
    let data = {
      packageId: packageId,
      campaignType: type,
      ...arg,
    };
    ApiList(data)
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
    handleList();
  }, [arg, packageId, type]);

  useEffect(() => {
    handlePackage();
  }, []);



  const handlePackage = () => {
    let data = [{ label: "All Packages", value: "" }];
    let data_types = [
      { label: "All Types", value: "" },
      { label: "Sponsored Products", value: "Sponsored Products" },
      { label: "Sponsored Brands", value: "Sponsored Brands" },
      { label: "Sponsored Display", value: "Sponsored Display" },
    ];
    setTypes(data_types);
    ApiPackageList()
      .then((e) => {
        if (e?.isSuccess) {
          e.data.map((el) => {
            data.push({
              label: el.packageName,
              value: el._id,
            });
          });
          setallPackage(data);
        } else {
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };

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

  const deleteHandler = () => {
    Apidelete(deleteId)
      .then((res) => {
        if (res.isSuccess) {
          handleList();
        } else {
          Toast.error(res.message);
        }
        setDeleteId();
      })
      .catch((err) => {
        Toast.error("somthing went wrong!!");
      });
  };

  return (
    <>
      <Filter
        name={"Packages"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />

      <div className="middle_container" id="Package">
        <div className="data_content data_content_btn m-0">
          <div className="data_model_btn camapgin_btn">
            <div></div>
            <div className="filTypeBox">
              <div className="search_option pb-1 me-0 pe-0 pe-lg-2">
                <SelectPicker
                  data={types}
                  style={{ width: 180 }}
                  value={type}
                  onChange={(value) => {
                    setType(value);
                  }}
                  placeholder="All Types"
                />
              </div>
              <div className="search_option pb-1 me-0 pe-0 pe-lg-2">
                <SelectPicker
                  data={allPackage}
                  style={{ width: 180 }}
                  value={packageId}
                  onChange={(value) => {
                    setpackageId(value);
                  }}
                  placeholder="All Packages"
                />
              </div>
              <div className="pb-1">
                <button
                  onClick={() => {
                    setShowAddPackage(true);
                    dispatch(packageInfoHandler());
                    setStep(0);
                  }}
                >
                  <i class="fa fa-plus"></i>
                  Add Package
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
      <AddPackage
        setShowAddPackage={setShowAddPackage}
        showAddPackage={showAddPackage}
        handleList={handleList}
        step={step}
        setStep={setStep}
      />

      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteHandler={deleteHandler}
        name={"Package"}
      />
      <ViewPackageDesign
        viewPackage={viewPackage}
        pacakgeDetails={pacakgeDetails}
        setviewPackage={setviewPackage}
        onHide={() => setviewPackage(false)}
      />
    </>
  );
}

export default Package;
