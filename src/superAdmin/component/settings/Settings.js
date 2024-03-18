import React, { useEffect, useState } from 'react'
import { SelectPicker } from 'rsuite';
import Filter from '../../helper/Filter';
import moment from "moment-timezone";
import DataTable from 'react-data-table-component';
import {
  Toast,
} from "../../../admin/helper/links/Link";
import { ApiListAllCustomerKeywordLimit, ApiListModuleForEstimate, ApiUpdateCustomerKeywordLimit, ApiUpdateModuleForEstimate } from '../../api-wrapper/ApiSettings';

function Settings() {
  const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
  const [tableData, setTableData] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [records, setRecords] = useState(0);
  const [campaignId, setcampaignId] = useState();
  const [newKeywordLimit, setnewKeywordLimit] = useState();
  const [error, seterror] = useState(false);
  const [search, setsearch] = useState('');
  const [data, setdata] = useState([]);
  const [initialRender, setInitialRender] = useState(true);
  const [moduleData, setmoduleData] = useState([])

  useEffect(() => {
    HandleList()
    ModuleList()
  }, [])


  const HandleList = async (arg) => {
    const data = {
      pageNo: 1,
      perPage: 10,
      customerId: search,
      ...arg
    };
    await ApiListAllCustomerKeywordLimit(data)
      .then((e) => {
        if (e?.isSuccess) {
          setTableData(e.data);
          setRecords(e.totalRecords)
          if (initialRender) {
            setdata(e.data);
            setInitialRender(false);
          }
        } else {
          Toast
            .error(e?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };


  const NewKyewordHandler = async (customerId) => {
    if (newKeywordLimit) {
      const data = {
        customerId: customerId,
        keywordResearchLimit: newKeywordLimit
      };
      await ApiUpdateCustomerKeywordLimit(data)
        .then((e) => {
          if (e?.isSuccess) {
          } else {
            Toast
              .error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });
      setnewKeywordLimit(null)
      setcampaignId(null)
      HandleList()
    }
    else {
      seterror(true)
    }
  }


  const handlePageChange = (page) => {
    HandleList({ pageNo: page, perPage: perPage });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    HandleList({ pageNo: page, perPage: newPerPage });
  };

  const col = [
    {
      name: "Name",
      selector: (row) => row.fullName,
      sortable: true,
    },
    {
      name: "Keyword Research Limit",
      selector: (row) => row.keywordResearchLimit,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "350px",
      cell: (rows, i) => (
        <>
          <div className="action_container ">
            <i
              className="fa fa-pencil px-2"
              onClick={() => {
                setcampaignId(rows._id)
              }}
            ></i>
          </div>
          {campaignId !== null && campaignId === rows._id && (
            <>
              <div className="d-flex set-div ms-1">
                <input type="text" className="w-50" name="newKeywordLimit" value={newKeywordLimit} onChange={(e) => { setnewKeywordLimit(e.target.value); seterror(false) }}></input>
                <button type="button" className="w-50" onClick={() => NewKyewordHandler(campaignId)}>
                  Set
                </button>
              </div>
              {
                error && (
                  <p className='error'> New Keyword Research Limit is required </p>
                )
              }
            </>
          )}
        </>
      ),

    },
  ]

  //for esitamte module data

  const [moduleId, setmoduleId] = useState()
  const [newEstimatedPrice, setnewEstimatedPrice] = useState({
    inr: "",
    usd: ""
  })
  const [moduleError, setmoduleError] = useState(false)



  const ModuleList = async () => {

    await ApiListModuleForEstimate()
      .then((e) => {
        if (e?.isSuccess) {
          setmoduleData(e.data)
        } else {
          Toast.error(e?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };

  const NewEstimatedPriceHandler = async (moduleId) => {
    if (newEstimatedPrice) {
      const data = {
        moduleId: moduleId,
        estimatedPriceINR: newEstimatedPrice.inr,
        estimatedPriceUSD: newEstimatedPrice.usd

      };
      await ApiUpdateModuleForEstimate(data)
        .then((e) => {
          if (e?.isSuccess) {
          } else {
            Toast
              .error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });
      setnewEstimatedPrice(null)
      setmoduleId(null)
      ModuleList()
    }
    else {
      setmoduleError(true)
    }
  }

  const moduleCol = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Estimated Price INR",
      selector: (row) => `${row.estimatedPriceINR}₹`,
      sortable: true,
    },
    {
      name: "Estimated Price USD",
      selector: (row) => `${row.estimatedPriceUSD}$`,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      width: "350px",
      cell: (rows, i) => (
        <>
          <div className="action_container ">
            <i
              className="fa fa-pencil px-2"
              onClick={() => {
                setmoduleId(rows._id)
                setnewEstimatedPrice({
                  inr: "",
                  usd: ""
                })
              }}
            ></i>
          </div>
          {moduleId !== null && moduleId === rows._id && (
            <>
              <div className="d-flex set-div">
                <input type="text" className="w-50" name="INR"

                  placeholder='₹'
                  onChange={(e) => HandleChange(e, rows)}>
                </input>
                <button type="button" className="w-50" onClick={() => NewEstimatedPriceHandler(rows._id)}>
                  Set
                </button>
              </div>

              <div className="d-flex ms-2 set-div">
                <input type="text" className="w-50" name="USD"
                  placeholder='$'

                  onChange={(e) => HandleChange(e, rows)}>
                </input>
                <button type="button" className="w-50" onClick={() => NewEstimatedPriceHandler(rows._id)}>
                  Set
                </button>
              </div>

            </>
          )}
        </>
      ),

    },
  ]

  const HandleChange = (e, row) => {

    if (e.target.name == 'INR') {
      setnewEstimatedPrice({
        inr: e.target.value,
        usd: row.estimatedPriceUSD
      })
    }
    else {
      setnewEstimatedPrice({
        inr: row.estimatedPriceINR,
        usd: e.target.value
      })
    }
  }

  return (
    <>
      <Filter name={"Settings"} nameShow={true} dateShow={false} profileShow={true} />
      <div className="middle_container budget_container settings_superadmin">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>Keyword Search Limit</h5>
            </div>

            <div className="filTypeBox">
              <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2">
                <SelectPicker
                  data={data?.map(x => ({ value: x._id, label: x.fullName }))}
                  style={{ width: 200 }}
                  value={search}
                  onChange={(value) => { setsearch(value); HandleList({ customerId: value }) }}
                  placeholder="All Vendor"
                />
              </div>
            </div>
          </div>

          <div className="data_table">
            <DataTable
              className="table_content text-center"
              columns={col}
              striped={true}
              data={tableData}
              pagination
              paginationServer
              fixedHeader
              paginationTotalRows={records}
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
            />
          </div>
        </div>
        <div className="data_content data_content_btn mt-3">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>Set Approximate Price</h5>
            </div>

            <div className="filTypeBox">

            </div>
          </div>

          <div className="data_table">
            <DataTable
              className="table_content text-center"
              columns={moduleCol}
              striped={true}
              data={moduleData}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings