import React, { useContext, useEffect, useMemo, useState } from "react";
import DataTable from "react-data-table-component";
import { ApiGetOrderDetails } from "../../../api-wrapper/order/ApiOrder";
import { Toast, Controller } from "../../../helper/links/Link";
import moment from "moment-timezone";
import { to } from "@react-spring/web";
import { useTranslation } from "react-i18next";

const ViewOrder = ({ viewId, viewFlag, viewOrderDetails, setViewFlag }) => {
  const { t } = useTranslation();
  const [orderDetails, setOrderDetails] = useState();
  const [totalOrderItems, setTotalOrderItems] = useState();

  const columns = [
    {
      name: t("status"),
      selector: (row) => row.orderStatus,
      cell: (row) => row.orderStatus,
    },

    {
      name: t("productName"),
      selector: (row) => row.productName,
      cell: (row) => row.productName,
    },
    {
      name: t('moreInformation'),
      selector: (row) => row.moreInfo,
      cell: (row) => row.moreInfo,
    },
    {
      name: t("quantity"),
      selector: (row) => row.quantity,
      cell: (row) => row.quantity,
    },
    {
      name: t("unitPrice"),
      selector: (row) => row.unitPrice,
      cell: (row) => row.unitPrice,
    },
    {
      name: t('Proceeds'),
      selector: (row) => row.proceeds,
      cell: (row) => row.proceeds,
    },
  ];

  const data = [
    {
      orderStatus: (
        <>
          <div
            className={`${
              orderDetails?.orderStatus == "Canceled"
                ? "cancelled"
                : orderDetails?.orderStatus == "Pending"
                ? "pending"
                : orderDetails?.orderStatus == "Shipped"
                ? "completed"
                : null
            } status`}
          >
            {orderDetails?.orderStatus}
          </div>
        </>
      ),
      productName: (
        <div className="">
          {orderDetails?.orderItems?.length > 0 && (
            <>
              {orderDetails?.orderItems?.map((order) => (
                <>
                  <p className="text-secondary fs-6">{order?.Title}</p>
                  <p className="text-success fs-6">
                    {t("asins")}: {order?.ASIN}
                  </p>
                  <p className="text-success fs-6">
                    {t("sku")}: {order?.SellerSKU}
                  </p>
                </>
              ))}
            </>
          )}
        </div>
      ),
      moreInfo: (
        <div>
          {orderDetails?.orderItems?.length > 0 && (
            <>
              {orderDetails?.orderItems?.map((order) => (
                <>
                  <p className="text-secondary fs-6">
                    Order Item ID: {order?.OrderItemId}
                  </p>
                </>
              ))}
            </>
          )}
        </div>
      ),
      quantity: (
        <>
          {orderDetails?.orderItems?.length > 0 && (
            <>
              {orderDetails?.orderItems?.map((order) => (
                <>
                  <p className="text-secondary fs-6">
                    {order?.QuantityOrdered}
                  </p>
                </>
              ))}
            </>
          )}
        </>
      ),
      unitPrice: (
        <>
          <p className="text-secondary fs-6">
            ₹
            {orderDetails?.orderTotal?.Amount
              ? orderDetails?.orderTotal?.Amount
              : 0}
          </p>
        </>
      ),
      proceeds: (
        <div className="d-block">
          <p className="text-secondary fs-6">
            Item Total: ₹
            {orderDetails?.orderTotal?.Amount
              ? orderDetails?.orderTotal?.Amount
              : 0}
          </p>
        </div>
      ),
    },
  ];

  const HandleView = () => {
    ApiGetOrderDetails(viewId)
      .then((res) => {
        if (res.isSuccess) {
          setTotalOrderItems(res?.totalOrderItems);
          setOrderDetails(res?.data);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  };
  useEffect(() => {
    HandleView();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-12">
          <div className="p-3">
            <div>
              <button
                className="btn bg-black text-white rounded-4"
                onClick={() => setViewFlag(false)}
              >
                {t("goBackToOrderList")}
              </button>
            </div>
            <div className="mt-3">
              <div className="d-flex flex-wrap gap-3">
                <p className="text-black fs-3">{t("orderDetails")}</p>
                <p className="text-dark d-flex flex-wrap align-items-end fs-6">
                  {t("orderID")}: # <b>{viewId}</b>
                </p>
                <p className="text-dark d-flex flex-wrap align-items-end fs-6">
                  {t("selerOrderId")}: # <b>{viewId}</b>
                </p>
              </div>
            </div>
            <div className="mt-3">
              <div className="row">
                <div className="col-6 p-0 cust-col-6-view-order">
                  <div>
                    <div className="bg-light-subtle border rounded-2">
                      <div className="mt-2">
                        <p className="fs-4 text-black py-2 px-3">
                          {t("orderSummary")}
                        </p>
                      </div>
                      <div className="py-2 px-2">
                        <div className="row p-2">
                          <div className="col-8 cust-col-8-order-summary">
                            <div>
                              <p className="fs-6 text-black">
                                {t("amazonShipBy")}:{" "}
                                <b className="red-text">
                                  {moment(orderDetails?.latestShipDate).format(
                                    "dddd,DD-MM-YYYY"
                                  )}
                                </b>
                              </p>
                              <p className="fs-6 text-black">
                                {t("purchaseDate")}:{" "}
                                <b className="red-text">
                                  {moment(orderDetails?.purchaseDate).format(
                                    "dddd,DD-MM-YYYY HH:mm A"
                                  )}{" "}
                                  IST
                                </b>
                              </p>
                            </div>
                          </div>
                          <div className="col-4 cust-col-4-order-summary">
                            <div>
                              <p className="fs-6 text-black">
                                {t("shippingService")}:{" "}
                                <b className="red-text">
                                  {orderDetails?.shipServiceLevel}
                                </b>{" "}
                              </p>
                              <p className="fs-6 text-black">
                                {t("fulfilment")}:Amazon
                              </p>
                              <p className="fs-6 text-black">
                                {t("salesChannel")}:{" "}
                                {orderDetails?.salesChannel}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6 cust-col-6-view-order ">
                  {orderDetails?.shippingAddress?.City && (
                    <div>
                      <div className="bg-light-subtle border rounded-2">
                        <>
                          <div className="mt-2">
                            <p className="fs-4 text-black py-2 px-3">
                              {t("shipTo")}
                            </p>
                          </div>
                          <div className="py-2 px-2">
                            <div className="row">
                              <div className="col-5 cust-col-5-view-order">
                                <div>
                                  <p className="fs-6 text-black text-break">
                                    {orderDetails?.shippingAddress?.City},{" "}
                                    {
                                      orderDetails?.shippingAddress
                                        ?.StateOrRegion
                                    }
                                    ,{" "}
                                    {orderDetails?.shippingAddress?.PostalCode}
                                  </p>
                                </div>
                              </div>
                              <div className="col-7 cust-col-7-view-order">
                                {orderDetails?.buyerInfo?.BuyerEmail && (
                                  <div className="text-wrap ">
                                    <p className="fs-6 text-black text-wrap text-break">
                                      {t('contactBuyer')}:{" "}
                                      <b className="text-primary text-wrap">
                                        {orderDetails?.buyerInfo?.BuyerEmail}
                                      </b>{" "}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div>
                <p className="text-black fs-3">{t("orderContents")}</p>
              </div>
              <div className="data_table">
                <DataTable
                  className="table_content_orders_view"
                  columns={columns}
                  data={data}
                  pagination
                  paginationServer
                  fixedHeader
                  paginationTotalRows={data && totalOrderItems}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="col-4"></div>
      </div>
    </>
  );
};

export default ViewOrder;
