import React from "react";
import Filter from "../../../helper/filter/Filter";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { ApiGetProductList } from "../../../api-wrapper/productList/ApiProductList";
import { useEffect } from "react";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { handleLoader } from "../../../../common/redux/action";
import Toast from "../../../../common/helper/toast/Toast";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import TypeShortName from "../../../helper/typeShortName/TypeShortName";
import { useTranslation } from "react-i18next";
function ProductList() {
  const { t } = useTranslation();

  let { profileId, today, typeValue } = useContext(ProfileContext);
  const dispatch = useDispatch();

  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [availability, setavailability] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [currentPage, setcurrentPage] = useState(1);

  const columns = [
    {
      name: t("image"),
      width: "100px",
      selector: (row) => row.imageUrl,
      cell: (row) => {
        return <img src={row.imageUrl} />;
      },
    },
    {
      name: t("title"),
      width: "250px",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: t("amount"),
      width: "100px",
      selector: (row) => row.amount,
      cell: (row) => {
        return Intl.NumberFormat("en-US", {
          style: "currency",
          currency: row.currencyCode,
        }).format(row.amount);
      },
    },
    {
      name: t("sku"),
      width: "200px",
      selector: (row) => row.sku,
      sortable: true,
    },
    {
      name: t("asin"),
      selector: (row) => row.asin,
      sortable: true,
    },
    {
      name: t("availability"),
      selector: (row) => row.availability,
      sortable: true,
      cell: (row) => {
        return (
          <div
            className={`${
              row.availability == "IN_STOCK"
                ? "completed"
                : row.availability == "IN_STOCK_SCARCE"
                ? "pending"
                : "cancelled"
            } ps-1 pe-1`}
          >
            {row.availability}
          </div>
        );
      },
    },
    {
      name: t("brand"),
      selector: (row) => row.brand,
      sortable: true,
    },

    {
      name: t("type"),
      selector: (row) => row.type,
      cell: (row) => {
        return <>{TypeShortName(row.type)}</>;
      },
      width: "80px",
      sortable: true,
    },
  ];
  const ApiListing = async (page, perPage) => {
    if (profileId.value) {
      const data = {
        pageNo: page || currentPage,
        perPage: perPage || rowsPerPage,
        profileId: profileId.value,
        type: type,
        search: search,
        availability: availability,
      };
      await ApiGetProductList(data)
        .then((e) => {
          if (e?.isSuccess) {
            setTableData(e?.data);
            setTotalRecords(e?.totalRecords);
          } else {
          }
        })
        .catch((e) => {
          dispatch(handleLoader(false));
          Toast.error("Somthing went wrong");
        });
    }
  };

  useEffect(() => {
    ApiListing();
  }, [profileId?.value, type, availability]);
  return (
    <>
      <Filter
        name={"Product List"}
        nameShow={false}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container budget_container">
        <div className="data_content data_content_btn">
          <div className="data_model_btn camapgin_btn">
            <div>
              <h5>{t("productList")}</h5>
            </div>
            <div className="filTypeBox">
              <div className="search_option pb-1">
                <input
                  type="text"
                  placeholder={t("searchHere")}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={() => ApiListing()}>Go</button>
              </div>
              <div className="fil pb-1">
                <select
                  name="portfolio"
                  onChange={(e) => {
                    setavailability(e.target.value);
                  }}
                >
                  <option value="">{t("allAvailability")}</option>
                  <option value="IN_STOCK_SCARCE">{t("inStockScare")} </option>
                  <option value="IN_STOCK">{t("inStock")}</option>
                  <option value="OUT_OF_STOCK">{t("outOfStock")}</option>
                </select>
              </div>
              <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2">
                <select
                  name="portfolio"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  <option value="">{t("allType")}</option>
                  {typeValue?.map((el) => (
                    <option value={el.value}>{el.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {PermissionCheck("Product List", "View Only") && (
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
                  ApiListing(currentPage, event);
                }}
                paginationPerPage={rowsPerPage}
                paginationTotalRows={totalRecords || 0}
                onChangePage={(page) => {
                  ApiListing(page);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ProductList;
