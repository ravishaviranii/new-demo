import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import "rsuite/dist/rsuite.min.css";
import {
  ApiViewCampaign,
  ApiAmazonGetKeywordById,
  ApiGetCampaignDataTable,
} from "../../../api-wrapper/campaign/ApiCampaign";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment-timezone";
import Accordion from "react-bootstrap/Accordion";
import { Toast } from "../../../helper/links/Link";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import { useAccordionButton } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { useTranslation } from "react-i18next";
function ViewCampaign(props) {
  const { t } = useTranslation();

  let { profileId, today } = useContext(ProfileContext);

  const { campaignDate, setViewPress, campaignDetails, viewPress } = props;
  const [date, setDate] = useState([]);
  const [status, setStatus] = useState("");
  const [keywordStatus, setKeywordStatus] = useState("");
  const [productAds, setProductAds] = useState([]);
  const [keywordId, setKeywordId] = useState();
  const [campaignData, setCampaignData] = useState();
  const [weekData, setweekData] = useState([]);
  const [type, settype] = useState(0);
  const [activeEventKey, setActiveEventKey] = useState("");

  useEffect(() => {
    if (campaignDate) {
      setDate(campaignDate);
    } else if (today) {
      setDate([new Date(today), new Date(today)]);
    }
  }, [campaignDate, today]);

  const [viewKeyWordData, setViewKeywordData] = useState(false);

  const grpCol = [
    {
      name: t("adGroupName"),
      selector: (row) => row.adGroupName,
      cell: (row) => (
        <div
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
        >
          {row.adGroupName}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("status"),
      selector: (row) => row.status,
      cell: (e) => (
        <div
          style={{ cursor: "pointer" }}
          className={`${
            e.status == "ENABLED"
              ? "enable"
              : e.status == "PAUSED"
              ? "pause"
              : e.status == "ARCHIVED"
              ? "archived"
              : e.status == "USER_DELETED" || "OTHER"
              ? "end"
              : null
          } status`}
          onClick={() => {
            handleAdGroupClick(e);
            setKeywordId(e.adGroupId);
          }}
        >
          {e.status}
        </div>
      ),
    },
    {
      name: t("bid"),
      selector: (row) => row.bid,
      cell: (row) => (
        <div
          onClick={() => handleAdGroupClick(row)}
          style={{ cursor: "pointer" }}
        >
          {row.bid ? CurrencyCode(row.bid) : "-"}
        </div>
      ),
    },
    {
      name: t("spend"),
      selector: (row) => row.totalSpend,
      cell: (row) => (
        <div
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
          style={{ cursor: "pointer" }}
        >
          {row.totalSpend ? CurrencyCode(row.totalSpend) : "-"}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("sales"),
      selector: (row) => row.totalSales,
      cell: (row) => (
        <div
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
          style={{ cursor: "pointer" }}
        >
          {row.totalSales ? CurrencyCode(row.totalSales) : "-"}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("acos"),
      selector: (row) => row.totalAcos,
      cell: (row) => (
        <div
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
          style={{ cursor: "pointer" }}
        >
          {row.totalAcos + "%" || "-"}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("roas"),
      selector: (row) => row.totalRoas,
      cell: (row) => (
        <div
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
          style={{ cursor: "pointer" }}
        >
          {row.totalRoas || "-"}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("Orders"),
      selector: (row) => row.orders,
      cell: (row) => (
        <div
          onClick={() => {
            handleAdGroupClick(row);
            setKeywordId(row.adGroupId);
          }}
          style={{ cursor: "pointer" }}
        >
          {row.orders || "-"}
        </div>
      ),
      sortable: true,
    },
    {
      name: t("impressions"),
      selector: (row) => row.totalImpressions,
      cell: (row) => (
        <div
          onClick={() => handleAdGroupClick(row)}
          style={{ cursor: "pointer" }}
        >
          {row.totalImpressions || "-"}
        </div>
      ),
    },
    {
      name: t("cpc"),
      selector: (row) => row.totalCpc,
      cell: (row) => (
        <div
          onClick={() => handleAdGroupClick(row)}
          style={{ cursor: "pointer" }}
        >
          {row.totalCpc ? CurrencyCode(row.totalCpc) : "-"}
        </div>
      ),
    },
    {
      name: t("clicks"),
      selector: (row) => row.totalClicks,
      cell: (row) => (
        <div
          onClick={() => handleAdGroupClick(row)}
          style={{ cursor: "pointer" }}
        >
          {row.totalClicks || "-"}
        </div>
      ),
    },
  ];

  const handleAdGroupClick = (
    row,
    keyPage,
    keyPerPage,
    productPage,
    productPerPage,
    status,
    proStatus
  ) => {
    const values = {
      id: row.adGroupId != undefined ? row.adGroupId : keywordId,
      details: {
        profileId: profileId.value,
        keywordPageNo: keyPage || keyCurrentPage,
        keywordPerPage: keyPerPage || keyRowsPerPage,
        productAdsPageNo: productPage || productCurrentPage,
        productAdsPerPage: productPerPage || productRowsPerPage,
        status: keywordStatus != undefined ? status : keywordStatus,
        startDate:
          date[0] == undefined ? today : moment(date?.[0]).format("YYYY-MM-DD"),
        endDate:
          date[1] == undefined ? today : moment(date?.[1]).format("YYYY-MM-DD"),
        productStatus: proStatus != undefined ? proStatus : productStatus,
      },
    };

    ApiAmazonGetKeywordById(values)
      .then((res) => {
        if (res?.isSuccess) {
          setViewKeywordData(true);
          setProductFlag(true);
          setkeywordData(res.getKeywordsData);
          setkeyTotalRecords(res.totalKeywordData);
          setkeyCurrentPage(res.keywordCurrentPageNo);
          setProductAds(res.getProductAdsData);
          setproductTotalRecords(res.totalProductAdsData);
        } else {
          Toast.error(res?.message);
        }
      })
      .catch((e) => {
        Toast.error("Something went wrong");
      });
  };

  //placement//
  const [placementData, setplacementData] = useState();

  const placementcol = [
    {
      name: t("placement"),
      selector: (row) => row.placement,
      width: "125px",
    },
    {
      name: t("keywordBid"),
      selector: (row) => row.newKeywordBid ?? "-",
      cell: (e) => {
        return `${
          e.newKeywordBid ? CurrencyCode(e.newKeywordBid) : CurrencyCode(0)
        }`;
      },
    },
    {
      name: t("spend"),
      selector: (row) => row.spend,
      cell: (e) => <>{CurrencyCode(e.spend)}</>,
    },
    {
      name: t("sales"),
      selector: (row) => row.sales,
      cell: (e) => <>{CurrencyCode(e.sales)}</>,
    },
    {
      name: t("acos"),
      selector: (row) => row.acos,
      cell: (e) => `${e.acos}%`,
    },
    {
      name: t("roas"),
      selector: (row) => row.roas,
    },

    {
      name: t("Orders"),
      selector: (row) => row.orders,
    },
    {
      name: t("impressions"),
      selector: (row) => row.impressions,
    },
    {
      name: t("cpc"),
      selector: (row) => row.cpc,
      cell: (e) => <>{CurrencyCode(e.cpc)}</>,
    },
    {
      name: t("clicks"),
      selector: (row) => row.clicks,
    },
    {
      name: t("units"),
      selector: (row) => row.orders,
    },
    {
      name: t("conversion"),
      selector: (row) => row.conversion,
    },
    {
      name: t("cvr"),
      selector: (row) => row.cvr,
      cell: (e) => `${e.cvr}%`,
    },
    {
      name: t("ctr"),
      selector: (row) => row.ctr,
      cell: (e) => `${e.ctr}%`,
    },
    {
      name: t("bidStartegy"),
      selector: (row) => (row.bidStrategy ? row.bidStrategy : "-"),
      width: "200px",
    },
  ];

  // ad group //
  const [grpData, setGrpData] = useState();

  const [grpRowsPerPage, setGrpRowRowsPerPage] = useState(10);
  const [grpTotalRecords, setgrpTotalRecords] = useState(0);
  const [grpCurrentPage, setgrpCurrentPage] = useState(1);

  // keyword //
  const [keywordData, setkeywordData] = useState();

  const [keyRowsPerPage, setkeyRowRowsPerPage] = useState(10);
  const [keyTotalRecords, setkeyTotalRecords] = useState(0);
  const [keyCurrentPage, setkeyCurrentPage] = useState(1);
  const [weekRender, setweekRender] = useState(false);

  const getData = (GrpPage, GrpPerPage, keyPage, keyPerPage) => {
    if (profileId.value && date.length != 0 && today) {
      const data = {
        profileId: profileId.value,
        fromDate:
          date[0] == undefined ? today : moment(date?.[0]).format("YYYY-MM-DD"),
        toDate:
          date[1] == undefined ? today : moment(date?.[1]).format("YYYY-MM-DD"),
        keywordPageNo: keyPage || keyCurrentPage,
        keywordPerPage: keyPerPage || keyRowsPerPage,
        adGroupPageNo: GrpPage || grpCurrentPage,
        adGroupPerPage: GrpPerPage || grpRowsPerPage,
        status: status,
      };
      ApiViewCampaign(campaignDetails?.campaignId, data)
        .then((res) => {
          if (res?.isSuccess) {
            setGrpData(res.getAdGroupsData);

            setCampaignData(res.getCampaignData);
            console.log(res.getCampaignData);
            setgrpTotalRecords(res.totalAdGroupData);
            setkeyTotalRecords(res.totalKeywordData);
            setweekRender(true);
            if (res.getPlacementData[0].placementsData) {
              setplacementData(res.getPlacementData[0].placementsData);
              setActiveEventKey("0");
            }
          } else {
          }
        })
        .catch((e) => {});
    }
  };

    useEffect(() => {
        if (weekRender) {
            getWeekData()
        }
    }, [weekRender])


  useEffect(() => {
    getWeekData();
  }, [viewPress, profileId.value, type, date]);

  useEffect(() => {
    getData();
  }, [viewPress, date, profileId.value, status]);

  //week data

  const getWeekData = () => {
    if (profileId.value && date.length != 0 && today) {
      const data = {
        profileId: profileId.value,
        fromDate:
          date[0] == undefined ? today : moment(date?.[0]).format("YYYY-MM-DD"),
        toDate:
          date[1] == undefined ? today : moment(date?.[1]).format("YYYY-MM-DD"),
        type: type,
      };
      ApiGetCampaignDataTable(campaignDetails?.campaignId, data)
        .then((res) => {
          if (res?.isSuccess) {
            setweekData(res.dataTable);
            if (!placementData) {
              setActiveEventKey("1");
            }
          } else {
            setweekData([]);
          }
        })
        .catch((e) => {});
    }
  };

  const keyCol = [
    {
      name: t("keywordName"),
      selector: (row) => row.keywordName,
      cell: (row) => <>{row.keywordName}</>,
      sortable: true,
    },
    {
      name: t("status"),
      selector: (row) => row.status,
      cell: (e) => (
        <div
          className={`${
            e.status == "ENABLED"
              ? "enable"
              : e.status == "PAUSED"
              ? "pause"
              : e.status == "ARCHIVED"
              ? "archived"
              : e.status == "USER_DELETED" || "OTHER"
              ? "end"
              : null
          } status`}
        >
          {e.status}
        </div>
      ),
    },
    {
      name: t("bid"),
      selector: (row) => row.bid,
      cell: (row) => <>{row.bid || "-"}</>,
    },
    {
      name: t("spend"),
      selector: (row) => row.totalSpend,
      cell: (row) => <>{row.totalSpend || "-"}</>,
      sortable: true,
    },
    {
      name: t("sales"),
      selector: (row) => row.totalSales,
      cell: (row) => <>{row.totalSales || "-"}</>,
      sortable: true,
    },
    {
      name: t("acos"),
      selector: (row) => row.totalAcos,
      cell: (row) => <>{`${row.totalAcos}%` || "-"}</>,
      sortable: true,
    },
    {
      name: t("roas"),
      selector: (row) => row.totalRoas,
      cell: (row) => <>{`${row.totalRoas}` || "-"}</>,
      sortable: true,
    },

    {
      name: t("Orders"),
      selector: (row) => row.orders,
      cell: (row) => <>{row.orders || "-"}</>,
      sortable: true,
    },

    {
      name: t("impressions"),
      selector: (row) => row.totalImpressions,
      cell: (row) => <>{row.totalImpressions || "-"}</>,
    },
    {
      name: t("cpc"),
      selector: (row) => row.totalCpc,
      cell: (row) => <>{row.totalCpc || "-"}</>,
    },
    {
      name: t("clicks"),
      selector: (row) => row.totalClicks,
      cell: (row) => <>{row.totalClicks || "-"}</>,
    },
  ];

  // ----------product ------------//
  const [productFlag, setProductFlag] = useState(false);
  const [productRowsPerPage, setproductRowRowsPerPage] = useState(10);
  const [productTotalRecords, setproductTotalRecords] = useState(0);
  const [productCurrentPage, setproductCurrentPage] = useState(1);
  const [productStatus, setProductStatus] = useState();

  const productCol = [
    {
      name: t("adType"),
      selector: (row) => row.adType,
      cell: (row) => <>{row.adType || "-"}</>,
      sortable: true,
    },
    {
      name: t("status"),
      selector: (row) => row.status,
      cell: (e) => (
        <div
          className={`${
            e.status == "ENABLED"
              ? "enable"
              : e.status == "PAUSED"
              ? "pause"
              : e.status == "ARCHIVED"
              ? "archived"
              : e.status == "USER_DELETED" || "OTHER"
              ? "end"
              : null
          } status`}
        >
          {e.status}
        </div>
      ),
      width: "125px",
    },

    {
      name: t("bid"),
      selector: (row) => row.bid,
      cell: (row) => <>{row.bid ? CurrencyCode(row.bid) : "-"}</>,
    },
    {
      name: t("sku"),
      selector: (row) => row.sku,
      cell: (row) => <>{row.sku || "-"}</>,
      sortable: true,
    },
    {
      name: t("asins"),
      selector: (row) => row.asins,
      cell: (row) => <>{row.asins || "-"}</>,
      sortable: true,
    },
    {
      name: t("sales"),
      selector: (row) => row.totalSales,
      cell: (row) => <>{row.totalSales ? CurrencyCode(row.totalSales) : "-"}</>,
      sortable: true,
    },
    {
      name: t("acos"),
      selector: (row) => row.totalAcos,
      cell: (row) => <>{`${row.totalAcos}%` || "-"}</>,
      sortable: true,
    },
    {
      name: t("roas"),
      selector: (row) => row.totalRoas,
      cell: (row) => <>{`${row.totalRoas}` || "-"}</>,
      sortable: true,
    },
    {
      name: t("Orders"),
      selector: (row) => row.orders,
      cell: (row) => <>{row.orders || "-"}</>,
      sortable: true,
    },
    {
      name: t("impressions"),
      selector: (row) => row.totalImpressions,
      cell: (row) => <>{row.totalImpressions || "-"}</>,
    },
    {
      name: t("cpc"),
      selector: (row) => row.totalCpc,
      cell: (row) => <>{row.totalCpc ? CurrencyCode(row.totalCpc) : "-"}</>,
    },
    {
      name: t("clicks"),
      selector: (row) => row.totalClicks,
      cell: (row) => <>{row.totalClicks || "-"}</>,
    },
  ];

  const handleToggle = (eventKey) => {
    setActiveEventKey(eventKey);
  };

  function CustomToggle({ children, eventKey, activeEventKey, onToggle }) {
    const isActive = eventKey === activeEventKey;
    const decoratedOnClick = useAccordionButton(eventKey);
    const handleClick = (e) => {
      decoratedOnClick();
      onToggle(eventKey);
    };
    return (
      <button
        type="button"
        nane={children}
        className={`data_model_btn_button me-2 ${isActive ? "clicked" : ""}`}
        onClick={() => handleClick(children)}
      >
        {children}
      </button>
    );
  }

  return (
    <div className="middle_container">
      <div className="data_content data_content_btn m-0">
        <div className="data_model_btn camapgin_btn">
          <div>
            <h5
              style={{ cursor: "pointer" }}
              onClick={() => setViewPress(false)}
            >
              {" "}
              <span style={{ color: "blue" }}>{t("Campaigns")}</span> {">>"}{" "}
              {campaignDetails?.name}
            </h5>
          </div>
          <div className="filTypeBox">
            <DateRangePicker
              className={`rangeDate custom-date-range-picker`}
              ranges={predefinedRanges}
              showOneCalendar
              value={date}
              placeholder="Select Date"
              onChange={(e) => setDate(e)}
              placement="bottomEnd"
              cleanable={false}
            />
          </div>
        </div>
        <div className="row countContainer">
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("spend")}</p>
            <p>
              {" "}
              {
                <>
                  {CurrencyCode(
                    campaignData && campaignData[0]?.totalSpend
                      ? campaignData[0]?.totalSpend
                      : 0
                  )}
                </>
              }{" "}
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("sales")}</p>
            <p>
              {" "}
              {
                <>
                  {CurrencyCode(
                    campaignData && campaignData[0]?.totalSales
                      ? campaignData[0]?.totalSales
                      : 0
                  )}
                </>
              }
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("acos")}</p>
            <p>
              {campaignData && campaignData[0]?.totalAcos
                ? campaignData[0]?.totalAcos
                : 0}
              %
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("roas")}</p>
            <p>
              {campaignData && campaignData[0]?.totalRoas
                ? campaignData[0]?.totalRoas
                : 0}
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("Orders")}</p>
            <p>
              {campaignData && campaignData[0]?.totalOrders
                ? campaignData[0]?.totalOrders
                : 0}
            </p>
          </div>
          <div className="col-6 col-md-3 col-lg-2 countBox">
            <p>{t("impressions")}</p>
            <p>
              {campaignData && campaignData[0]?.totalImpressions
                ? campaignData[0]?.totalImpressions
                : 0}
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("cpc")}</p>
            <p>
              {" "}
              {
                <>
                  {CurrencyCode(
                    campaignData && campaignData[0]?.totalCpc
                      ? campaignData[0]?.totalCpc
                      : 0
                  )}
                </>
              }
            </p>
          </div>
          <div className="col-5 col-md-2 col-lg-1 countBox">
            <p>{t("clicks")}</p>
            <p>
              {campaignData && campaignData[0]?.totalClicks
                ? campaignData[0]?.totalClicks
                : 0}
            </p>
          </div>
        </div>
      </div>

      {(placementData || weekData) && (
        <div className="data_content data_content_btn">
          <Accordion
            defaultActiveKey={activeEventKey == 0 ? "0" : activeEventKey}
          >
            <Card>
              <Card.Header className="px-2">
                {placementData && (
                  <CustomToggle
                    eventKey="0"
                    activeEventKey={activeEventKey}
                    onToggle={handleToggle}
                  >
                    Placements
                  </CustomToggle>
                )}
                {weekData && (
                  <CustomToggle
                    eventKey="1"
                    activeEventKey={activeEventKey}
                    onToggle={handleToggle}
                  >
                    {t("weeklyPlacementMetric")}
                  </CustomToggle>
                )}
              </Card.Header>

              {placementData && (
                <Accordion.Collapse eventKey="0">
                  <Card.Body className="p-0">
                    <div className="data_table">
                      <DataTable
                        className="table_content"
                        columns={placementcol}
                        striped={true}
                        data={placementData}
                      />
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              )}

              {weekData && (
                <Accordion.Collapse eventKey="1">
                  <Card.Body className="p-0">
                    <div className="data_table weekData_table mt-1">
                      <div className="week_filter">
                        <button
                          onClick={() => {
                            settype(0);
                          }}
                        >
                          {t("day")}
                        </button>
                        <button
                          onClick={() => {
                            settype(1);
                          }}
                        >
                          {t("week")}
                        </button>
                        <button
                          onClick={() => {
                            settype(2);
                          }}
                        >
                          {t("month")}
                        </button>
                      </div>
                      <div className="weekly_table">
                        <table className="table mb-0" border={1}>
                          <thead>
                            <tr>
                              <th className="date_show_title">
                                {type == 0
                                  ? t("day")
                                  : type == 1
                                  ? t("week")
                                  : type == 2
                                  ? t("month")
                                  : null}
                              </th>
                              <th>{t("spend")}</th>
                              <th>{t("sales")}</th>
                              <th>{t("acos")}</th>
                              <th>{t("roas")}</th>
                              <th>{t("Orders")}</th>
                              <th>{t("impressions")}</th>
                              <th>{t("cpc")}</th>
                              <th>{t("clicks")}</th>
                              <th>{t("units")}</th>
                              <th>{t("conversion")}</th>
                              <th>{t("cvr")}</th>
                              <th>{t("ctr")}</th>
                              <th>{t("costPerOrder")}</th>
                              <th>{t("avgSalesPrice")}</th>
                            </tr>
                          </thead>

                          <tbody
                            style={{
                              width:
                                weekData?.length > 15 ? "auto" : "fit-content",
                            }}
                          >
                            {weekData?.map((el) => {
                              return (
                                <tr>
                                  <td className="date_show">
                                    {type == 1 || type == 2 ? (
                                      <span>
                                        {moment(el.fromDate).format(
                                          "DD-MM-YYYY"
                                        )}
                                        <br />
                                        {moment(el.toDate).format("DD-MM-YYYY")}
                                      </span>
                                    ) : (
                                      moment(el.toDate).format("DD-MM-YYYY")
                                    )}
                                  </td>
                                  <td>{CurrencyCode(el.spend)}</td>
                                  <td>{CurrencyCode(el.sales)}</td>
                                  <td>{el.acos}%</td>
                                  <td>{el.roas}</td>
                                  <td>{el.orders}</td>
                                  <td>{el.impressions}</td>
                                  <td>{CurrencyCode(el.cpc)}</td>
                                  <td>{el.clicks}</td>
                                  <td>{el.orders}</td>
                                  <td>{el.conversion}</td>
                                  <td>{el.cvr}%</td>
                                  <td>{el.ctr}%</td>
                                  <td>{CurrencyCode(el.costPerOrder)}</td>
                                  <td>{CurrencyCode(el.avgSalesPrice)}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </Card.Body>
                </Accordion.Collapse>
              )}
            </Card>
          </Accordion>
        </div>
      )}

      <div className="data_content data_content_btn">
        <div className="data_model_btn camapgin_btn">
          <div>
            <h5>{t("adGroups")}</h5>
          </div>
          <div className="fil pb-1 campaign_first">
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
        </div>

        <div className="data_table">
          <DataTable
            className="table_content"
            columns={grpCol}
            striped={true}
            data={grpData}
            pagination
            paginationServer
            fixedHeader
            onChangeRowsPerPage={(event) => {
              setGrpRowRowsPerPage(parseInt(event));
              getData(grpCurrentPage, event, keyCurrentPage, keyRowsPerPage);
            }}
            paginationPerPage={grpRowsPerPage}
            paginationTotalRows={grpTotalRecords || 0}
            onChangePage={(page) => {
              getData(page, grpRowsPerPage, keyCurrentPage, keyRowsPerPage);
            }}
          />
        </div>
      </div>
      {viewKeyWordData && (
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("keywords")}</h5>
            </div>
            <div className="fil pb-1 campaign_first">
              <select
                name="portfolio"
                onChange={(e) => {
                  handleAdGroupClick(
                    "",
                    "",
                    "",
                    "",
                    "",
                    e?.target?.value,
                    productStatus
                  );
                  setKeywordStatus(e?.target?.value);
                }}
                value={keywordStatus}
              >
                <option value="">{t("allStatus")}</option>
                <option value="ENABLED">{t("enabled")}</option>
                <option value="PAUSED">{t("paused")}</option>
                <option value="ENDED">{t("ended")}</option>
                <option value="ARCHIVED">{t("archived")}</option>
              </select>
            </div>
          </div>
          <div className="data_table">
            <DataTable
              className="table_content"
              columns={keyCol}
              striped={true}
              data={keywordData}
              pagination
              fixedHeader
              paginationServer
              onChangeRowsPerPage={(event) => {
                setkeyRowRowsPerPage(parseInt(event));
                handleAdGroupClick(
                  "",
                  keyCurrentPage,
                  event,
                  productCurrentPage,
                  productRowsPerPage
                );
              }}
              paginationPerPage={keyRowsPerPage}
              paginationTotalRows={keyTotalRecords || 0}
              onChangePage={(page) => {
                handleAdGroupClick(
                  "",
                  page,
                  keyRowsPerPage,
                  productCurrentPage,
                  productRowsPerPage
                );
              }}
            />
          </div>
        </div>
      )}

      {productFlag && (
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("productAds")}</h5>
            </div>
            <div className="fil pb-1 campaign_first">
              <select
                name="portfolio"
                onChange={(e) => {
                  handleAdGroupClick(
                    "",
                    "",
                    "",
                    "",
                    "",
                    keywordStatus,
                    e?.target?.value
                  );
                  setProductStatus(e?.target?.value);
                }}
                value={productStatus}
              >
                <option value="">{t("allStatus")}</option>
                <option value="ENABLED">{t("enabled")}</option>
                <option value="PAUSED">{t("paused")}</option>
                <option value="ENDED">{t("ended")}</option>
                <option value="ARCHIVED">{t("archived")}</option>
              </select>
            </div>
          </div>
          <div className="data_table">
            <DataTable
              className="table_content"
              columns={productCol}
              striped={true}
              data={productAds}
              pagination
              fixedHeader
              paginationServer
              onChangeRowsPerPage={(event) => {
                setkeyRowRowsPerPage(parseInt(event));
                handleAdGroupClick(
                  "",
                  keyCurrentPage,
                  keyRowsPerPage,
                  event,
                  productRowsPerPage
                );
              }}
              paginationPerPage={productRowsPerPage}
              paginationTotalRows={productTotalRecords || 0}
              onChangePage={(page) => {
                handleAdGroupClick(
                  "",
                  keyCurrentPage,
                  keyRowsPerPage,
                  productCurrentPage,
                  page
                );
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewCampaign;
