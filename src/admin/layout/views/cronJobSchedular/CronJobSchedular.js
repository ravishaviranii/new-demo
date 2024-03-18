import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { Toast, handleLoader, useDispatch } from "../../../helper/links/Link";
import success from "../../../assets/images/success.svg";
import { ApiCronJobSchedularList } from "../../../api-wrapper/cronJob/ApiCrobJob";
import { Tooltip } from "react-tippy";
import {
  ApiCronJobActive,
  ApiManualGenerateCampaignReport,
  ApiManualListAdGroupsFromAmazon,
  ApiManualListCampaignsFromAmazon,
  ApiManualListKeywordsFromAmazon,
  ApiManualListProductAdsFromAmazon,
  ApiManualListProductsFromAmazon,
  ApiPlacementReportFromAmazon,
  ApimanualGenerateAdGroupsReport,
  ApimanualGenerateKeywordsReport,
  ApimanualGenerateProductAdsReport,
} from "../../../api-wrapper/liveDataRun/CronJobSchedular";
import { useTranslation } from 'react-i18next';

import { AiOutlineCheck } from "react-icons/ai";
function CronJobSchedular() {
  const { t } = useTranslation();

  let { profileId } = useContext(ProfileContext);

  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [perPage, setPerPage] = useState(10);
  const [totalRecords, settotalRecords] = useState();
  const [data, setData] = useState([]);
  const [lodaingShow, setLoadingState] = useState();
  const [lodaingId, setLoadingId] = useState();
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState([]);
  const [searchName, setSearchName] = useState("");

  const [searchType, setsearchType] = useState([
    { value: "", label: `${t("allType")}` },
    { value: "Campaign", label: `${t("campaign")}` },
    { value: "AdGroup", label: `${t("adGroup")}` },
    { value: "ProductAds", label: `${t("productAds")}` },
    { value: "Keyword", label: `${t("keywords")}` },
    { value: "Product", label: `${t("products")}` },
    { value: "Placement", label: `${t("placements")}` },
  ]);
  const [isActive, setisActive] = useState([
    { value: "", label: `${t("allStatus")}` },
    { value: true, label: `${t("active")}` },
    { value: false, label: `${t("inactive")}` },
  ]);

  useEffect(() => {
    if (profileId.value) {
      getCronJobList(arg);
    }
  }, [profileId.value]);
  const getCronJobList = async (arg) => {
    const data = {
      ...arg,
      profileId: profileId.value,
    };
    await ApiCronJobSchedularList(data)
      .then((e) => {
        if (e?.isSuccess) {
          setTableData(e.data);
          settotalRecords(e.totalRecords);
          setData(e)
          dispatch(handleLoader(false));

        } else {
          // Toast.error(e?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };

  console.log(tableData, "tableData")

  const columns = [
    {
      name: `${t("cronName")}`,
      selector: (row) => row.cronName,
      sortable: true,
      cell: (row) => (
        <Tooltip
          title={
            row.cronName === "Campaign Schedulers"
              ? "Campaign scheduling is functional feature and process of specifying the start and end dates and times for a campaign"
              : row.cronName === "Budget Rule Schedulers"
                ? "It allows you to set budgets in advance for special events, allowing advertisers to set campaign budgets well in advance."
                : row.cronName === "Amazon Token Update"
                  ? "A refresh token allows a website to request a new access token"
                  : row.cronName === "Campaign Listing"
                    ? "Campaign Listing Load the latest data from your profile such as Campaign name,Campaign type,budget,state,etc."
                    : row.cronName === "Campaign Report"
                      ? "Campaign reports display all the key datas(for example, spend,sales,acos,etc.) you did to promote your product or service during a specific timeframe."
                      : row.cronName === "AdGroup Report"
                        ? "AdGroup report includes all statistics aggregated by default such as spend,sales,acos,etc. at the ad group level, one row per ad group"
                        : row.cronName === "Keyword Report"
                          ? "Keyword Report tells you which one of your keywords matched someone's search term and triggered your ad.It provides data like spend,sales,acos,etc"
                          : row.cronName === "ProductAds Report"
                            ? "ProductAds Report provide insights about performance metrics of spend,sales,acos,etc. for your advertised ASINs in all campaigns that received at least one impression."
                            : row.cronName === "AdGroup Listing"
                              ? "It is a collection of ads data(for an example,Adgroup name,Camapign name,status,etc.) that target the same paid keywords set"
                              : row.cronName === "ProductAds Listing"
                                ? "It lists paid advertisements (data includes Adgroup name,Campaign name,SKU,ASINS) that provide product-specific information to web users"
                                : row.cronName === "Products Listing"
                                  ? "Product listing is the detailed information such as the category, brand name, features and specifications, images, and price to list a product on Amazon"
                                  : row.cronName === "Keyword Listing"
                                    ? "It lists words or phrases describing your product or service that you choose to help determine when and where your ad can appear"
                                    : row.cronName === "Placement Report"
                                      ? "It allows you to find out where your ads have served for your Performance Max campaign and how many impressions they've received."
                                      : ""

          }
          arrow
          theme="light"
          style={{
            cursor: "pointer",
          }}
        >
          {row.cronName}
          <i class="ms-1 fa-solid fa-circle-info cron-name-information"></i>
        </Tooltip>
      ),
    },

    {
      name: `${t("status")}`,
      selector: (row) => row.status,
      sortable: true,
      cell: (e) => (
        <div
          className={`${e.status == "PENDING"
            ? "pending"
            : e.status == "SUCCESS"
              ? "completed"
              : e.status == "COMPLETED"
                ? "completed" :
                e.status == "FAILED" ?
                  "pending"
                  : null
            } status`}
        >
          {e.status ? e.status : '-'}
        </div>
      ),
    },
    {
      name: `${t("lastrun")}`,
      selector: (row) => row.lastRun,
      sortable: true,
      cell: (e) => (
        <div>
          {e.lastRun ? (
            <div className="d-flex align-items-center success_img">
              <img src={success} className="me-1" />
              <p>{e.lastRun}</p>
            </div>
          ) : (
            <>-</>
          )}
        </div>
      ),
    },
    {
      name: `${t("nextrun")}`,
      selector: (row) => row.nextRun,
      sortable: true,
      cell: (e) => <div>{e.nextRun ? <p>{e.nextRun}</p> : <>-</>}</div>,
    },
    {
      name: `${t("isactive")}`,
      width: "150px",
      selector: (row) => row.isActive,
      cell: (row) => (
        <div className=" form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            name="isActive"
            onChange={(event) => statusHandler(event, row.cronId, profileId)}
            checked={row.isActive}
            value={row.isActive}
            style={{ width: "50px", height: "20px" }}
          />
        </div>
      ),
    },

    {
      name: `${t("action")}`,
      cell: (rows) => (
        <div className="job_btns action_icon d-flex align-items-center">
          <button
            className="run_icon"
            onClick={async () => {

              setLoadingId(rows._id)
              const data = {
                cronId: rows.cronId,
                profileId: profileId.value,
              };
              setLoadingState("start")
              setTimeout(() => {
                getCronJobList()
              }, 3000);
              if (rows.isActive) {
                if (rows.cronName == "Campaign Listing") {

                  await ApiManualListCampaignsFromAmazon(data)

                    .then((e) => {

                      if (e?.isSuccess) {
                        setLoadingState("stop")
                        getCronJobList()
                      } else {
                        setLoadingState("stop")
                        getCronJobList()
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "Campaign Report") {
                  await ApiManualGenerateCampaignReport(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                        getCronJobList()
                      } else {
                        setLoadingState("stop")
                        getCronJobList()
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "AdGroups Listing") {
                  await ApiManualListAdGroupsFromAmazon(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "AdGroup Report") {
                  await ApimanualGenerateAdGroupsReport(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "Keywords Listing") {
                  await ApiManualListKeywordsFromAmazon(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "Keyword Report") {
                  await ApimanualGenerateKeywordsReport(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "ProductAds Listing") {
                  await ApiManualListProductAdsFromAmazon(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "ProductAds Report") {
                  await ApimanualGenerateProductAdsReport(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                } else if (rows.cronName == "Products Listing") {
                  await ApiManualListProductsFromAmazon(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                }
                else if (rows.cronName == "Placement Report") {
                  await ApiPlacementReportFromAmazon(data)
                    .then((e) => {
                      if (e?.isSuccess) {
                        setLoadingState("stop")
                      } else {
                        setLoadingState("stop")
                      }
                    })
                    .catch((e) => {
                      Toast.error("Somthing went wrong");
                    });
                }
              }
            }}
          >
            {t("livedatarun")}
          </button>

          {lodaingId != undefined ? lodaingId == rows._id && lodaingShow == "start" ?
            <p className="ms-2 inner_loader">
              <div class="spinner-border text-dark" role="status">
                <span class="sr-only"></span>
              </div>
            </p>
            :
            lodaingId == rows._id && lodaingShow == "stop" ?
              <div className="check_img">
                <AiOutlineCheck />
              </div>
              : null
            :
            null

          }

        </div>
      ),
    },


  ];

  const statusHandler = (event, id, profileId) => {
    let data = {
      isActive: event.target.checked,
      cronId: id,
      profileId: profileId.value
    };
    ApiCronJobActive(data)
      .then((res) => {
        if (res.isSuccess) {
          getCronJobList({ search: searchName });
        } else {
        }
      })
      .catch((err) => {
        Toast.error(err.message || "Something went wrong");
      });
  };




  const handlePageChange = (page) => {
    getCronJobList({ pageNo: page, perPage: perPage });
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    getCronJobList({ pageNo: page, perPage: newPerPage });
  };

  const handleSearch = (e) => {
    setSearchName(e.target.value);
    if (e.target.value == "") {
      getCronJobList({ searchName: e.target.value });
    }
  };

  const [type, settype] = useState("");
  const [activeData, setactiveData] = useState(false);

  return (
    <>
      <Filter
        name={"Cron Job Scheduler"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("cronJobScheduler")}</h5>
            </div>

            <div className="filTypeBox">
              <div className="search_option pb-1">
                <input
                  type="text"
                  placeholder={t("searchHere")}
                  onChange={(e) => handleSearch(e)}
                />
                <button
                  onClick={() =>
                    getCronJobList({
                      search: searchName,
                      isActive: activeData,
                      type: type,
                    })
                  }
                >
                  {t("search")}
                </button>
              </div>
              <div className="fil pb-1 ">
                <select
                  name="portfolio"
                  onChange={(e) => {
                    getCronJobList({
                      search: searchName,
                      isActive: activeData,
                      type: e?.target?.value,
                    });
                    settype(e.target.value);
                  }}
                >
                  {searchType.map((el, i) => {
                    return <option value={el.value}>{el.label}</option>;
                  })}
                </select>
              </div>
              <div className="fil pb-1 ms-0 ms-lg-1">
                <select
                  name="portfolio"
                  onChange={(e) => {
                    getCronJobList({
                      search: searchName,
                      isActive: e?.target?.value,
                      type: type,
                    });
                    setactiveData(e.target.value);
                  }}
                >
                  {isActive.map((el, i) => {
                    return <option value={el.value}>{el.label}</option>;
                  })}
                </select>
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
              paginationTotalRows={data && data?.totalRecords}
              paginationServer
              onChangePage={handlePageChange}
              onChangeRowsPerPage={handlePerRowsChange}
              fixedHeader
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default CronJobSchedular;
