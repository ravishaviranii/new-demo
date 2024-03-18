import React from "react";
import Filter from "../../../helper/filter/Filter";
import { DateRangePicker } from "rsuite";
import { useContext } from "react";
import { useState } from "react";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment-timezone";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import DataTable from "react-data-table-component";
import RingPic from "../../../assets/images/ring.webp";
import { ApiOrderList } from "../../../api-wrapper/order/ApiOrder";
import { Toast, useDispatch } from "../../../helper/links/Link";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { useEffect } from "react";
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import { formatDistanceToNow } from "date-fns";
import ViewOrder from "./viewOrder";
import { useTranslation } from "react-i18next";
function OrderList() {
  const { t } = useTranslation();
  let { profileId, today, timezone, pagePermission } =
    useContext(ProfileContext);
  const [date, setDate] = useState([
    new Date(moment().startOf("month")),
    new Date(),
  ]);
  const [tableData, setTableData] = useState([]);
  const [orderdata, setOrderData] = useState();
  const [status, setStatus] = useState();
  const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
  const [perPage, setPerPage] = useState(10);
  const [viewFlag, setViewFlag] = useState(false);
  const [viewId, setViewId] = useState();
  const [viewOrderDetails, setViewOrderDetail] = useState();

  const formatRelativeTime = (date) => {
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const formatDate = (date) => {
    return `${moment(date).format("YYYY-MM-DD HH:mm A")} IST`;
  };

  const formatPurchaseDate = (row) => {
    const purchaseDate = new Date(row.purchaseDate);
    return (
      <div>
        <p>
          <b>{formatRelativeTime(purchaseDate)}</b>
        </p>
        <p className="text-secondary">{formatDate(purchaseDate) || "-"}</p>
      </div>
    );
  };

  const columns = [
    {
      name: t("orderDate"),
      sortable: true,
      selector: (row) => row.purchaseDate,
      cell: (row) => formatPurchaseDate(row),
    },
    {
      name: t("orderDetails"),
      sortable: true,
      selector: (row) => row.detail,
      cell: (row) => (
        <div className="">
          <p
            className="text-primary cusror-pointer fs-6"
            onClick={() => HandleView(row)}
          >
            {row?.amazonOrderId}
          </p>
          {row.buyerInfo?.BuyerEmail && (
            <p className="text-secondary">
              {t("buyerEmail")}:
              <br /> <b>{row.buyerInfo?.BuyerEmail}</b>
            </p>
          )}
          {row?.salesChannel && (
            <p className="text-success">
              {t("salesChannel")}:
              <br /> <b>{row.salesChannel}</b>
            </p>
          )}
          {row.shippingAddress?.City && (
            <p className="text-success">
              {t("address")}:
              <br /> <b>{row.shippingAddress?.City}</b>
            </p>
          )}

          <p className="text-success">
            {t("selerOrderId")}:
            <br /> <b>{row.amazonOrderId}</b>
          </p>
          {row.paymentMethodDetails?.length > 0 && (
            <div>
              {row.paymentMethodDetails?.map((method) => (
                <div className="d-flex flex-wrap gap-2 mt-2">
                  <div>
                    <p className="bg-secondary p-2 rounded-2 text-white payment-method">
                      {method}
                    </p>
                  </div>
                  {row?.isBusinessOrder == true && (
                    <div>
                      <p className="bg-secondary p-2 rounded-2 text-white payment-method">
                        Business Order
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },

    {
      name: "Product Name",
      selector: (row) => row.orderItems,
      cell: (row) => (
        <div className="">
          {row.orderItems?.length > 0 && (
            <>
              {row.orderItems.map((order) => (
                <>
                  <p className="text-secondary">{order?.Title}</p>
                  <p className="text-success">
                    {t("asins")}: {order?.ASIN}
                  </p>
                  <p className="text-success">
                    {t("sku")}: {order?.SellerSKU}
                  </p>
                  <p className="text-success">
                    {t("quantity")}: {order?.QuantityOrdered}
                  </p>
                </>
              ))}
            </>
          )}
        </div>
      ),
    },

    {
      name: t("customerOption"),
      selector: (row) => row.shipServiceLevel,
      cell: (row) => (
        <div>
          <p>
            <b>{row?.shipServiceLevel}</b>
          </p>
        </div>
      ),
    },
    {
      name: t("orderStatus"),
      selector: (row) => row.orderStatus,
      cell: (row) => (
        <>
          <div
            className={`${row.orderStatus == "Canceled"
                ? "cancelled"
                : row.orderStatus == "Pending"
                  ? "pending"
                  : row.orderStatus == "Shipped"
                    ? "completed"
                  : row.orderStatus == "Unshipped"
                      ? "archived"


                      : null
              } status`}
          >
            {row.orderStatus}
          </div>
        </>
      ),
    },
    {
      name: t("Action"),

      cell: () => (
        <>
          <button className="run_icon">{t('print')}</button>
        </>
      ),
    },
  ];

  const HandleView = (row) => {
    setViewId(row.amazonOrderId);
    setViewOrderDetail(row);
    setViewFlag(true);
  };

  const getData = (arg) => {
    if (date.length != 0) {
      const data = {
        status: status,
        fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
        toDate: moment(date?.[1]).format("YYYY-MM-DD"),
        profileId: profileId.value,

        ...arg,
      };
      ApiOrderList(data)
        .then((e) => {
          if (e?.isSuccess) {
            setTableData(e?.data);
            setOrderData(e);
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
    if (profileId.value) {
      getData(arg);
    }
  }, [date, status, profileId?.value]);

  const handlePageChange = (page) => {
    getData({ pageNo: page, perPage: perPage });
  };
  const handlePerRowsChange = async (newPerPage, page) => {
    setPerPage(newPerPage);
    getData({ pageNo: page, perPage: newPerPage });
  };

  return (
    <>
      <Filter
        name={"Orders"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container order_container">
        <div className="data_content data_content_btn">
          {viewFlag ? (
            <ViewOrder
              viewId={viewId}
              viewFlag={viewFlag}
              viewOrderDetails={viewOrderDetails}
              setViewFlag={setViewFlag}
            />
          ) : (
            <>
              <div className="data_model_btn camapgin_btn">
                <div>
                  <h5>{t("Orders")}</h5>
                </div>

                <div className="filTypeBox">
                  <div className="pb-1">
                    <button>
                      <i class="fa fa-print"></i>
                      {t("printAll")}
                    </button>
                  </div>
                  <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2">
                    <select
                      name="portfolio"
                      onChange={(e) => setStatus(e?.target?.value)}
                      value={status}
                    >
                      <option value="">{t("allStatus")}</option>
                      <option value="Pending">{t("pending")}</option>
                      <option value="Unshipped">{t("unshipped")}</option>
                      <option value="PartiallyShipped">
                        {t("partiallyShipped")}
                      </option>
                      <option value="Shipped">{t("shipped")}</option>
                      <option value="Canceled">{t("canceled")}</option>
                      <option value="Unfulfillable">
                        {t("unfulfillable")}
                      </option>
                      <option value="InvoiceUnconfirmed">
                        {t("invoiceUnconfirmed")}
                      </option>
                      <option value="PendingAvailability">
                        {t("pendingAvailability")}
                      </option>
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
                </div>
              </div>
              {PermissionCheck("Orders", "View Only") && (
                <div className="data_table">
                  <DataTable
                    className="table_content_orders"
                    columns={columns}
                    striped={true}
                    data={tableData}
                    pagination
                    paginationServer
                    fixedHeader
                    paginationTotalRows={orderdata && orderdata?.totalRecords}
                    onChangePage={handlePageChange}
                    onChangeRowsPerPage={handlePerRowsChange}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default OrderList;
