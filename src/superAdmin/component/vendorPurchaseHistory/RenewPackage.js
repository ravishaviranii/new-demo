import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { ProfileContext } from "../../../admin/helper/usecontext/useContext";
import moment from "moment";
import DataTable from "react-data-table-component";
import Carousel from "react-multi-carousel";
import CurrencyCode from "../../../admin/helper/currencyCode/CurrencyCode";
import { ApiPackageRenewHandler } from "../../api-wrapper/ApiPackage";
import Toast from "../../../common/helper/toast/Toast";

function RenewPackage(props) {
  const {
    show,
    setShow,
    newPackageId,
    vendorHistory,
    setnewPriceId,
    newPriceId,
    setnewPackageId,
    setflag,
    tableData,
  } = props;
  const [error, seterror] = useState(false);

  const SubmitHandler = () => {
    // setflag(true)
    // setShow(false)
    let data = {
      customerId: vendorHistory?._id,
      packageId: newPackageId,
      priceId: newPriceId,
    };
    ApiPackageRenewHandler(data)
      .then((e) => {
        if (e?.isSuccess) {
          Toast.success(e?.message);
          window.location.reload();
          setShow(false);
        } else {
          Toast.error(e?.message || "error");
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3, // Number of items to show at once on a desktop
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2, // Number of items to show at once on a tablet
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1, // Number of items to show at once on mobile
    },
  };

  return (
    <>
      <Modal
        show={show}
        onHide={() => setShow(false)}
        centered
        size="lg"
        className="add_utility"
      >
        <Modal.Header className="campaign_modal_head">
          <div className="col-11 modal_title_box">
            <p>Renew Package</p>
          </div>
          <div className="col-1">
            <i
              className="fa fa-times red modal_close_box"
              aria-hidden="true"
              onClick={() => setShow(false)}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body className="vendor_history_modal_body p-0 pb-3">
          <div className="g-2 px-2 my-2">
            <Carousel
              responsive={responsive}
              ssr={true} // Server-Side Rendering Support
            >
              {tableData?.map((x, i) => (
                <div
                  className=" text-center p-2 mt-0 package_main_container"
                  key={i}
                >
                  <div
                    className={`${
                      newPackageId == x._id ? "active_border" : ""
                    } package_container ${
                      (i + 1) % 3 == 1
                        ? "silver"
                        : (i + 1) % 3 == 2
                        ? "gold"
                        : (i + 1) % 3 == 0
                        ? "platinum"
                        : ""
                    }`}
                    onClick={() => {
                      setnewPriceId(x.price[0]._id);
                      setnewPackageId(x._id);
                    }}
                  >
                    <div className="package_name_container py-2">
                      <h5 className="">{x.packageName}</h5>
                      <p className="pt-1">
                        <span className="profile_number">
                          {x.allowProfiles + " "}
                        </span>
                        profiles
                      </p>
                      {x.trialDays && (
                        <p className="trial_banner">{x.trialDays} days free!</p>
                      )}
                    </div>
                    <div className=" py-1 pt-2 price_container">
                      <h6 className="pb-1">Plans</h6>
                      {x?.price.map((y, j) => (
                        <div
                          className="d-flex align-items-center justify-content-center pb-1"
                          key={j}
                        >
                          <input
                            type="radio"
                            className="mx-2"
                            value={y._id}
                            checked={y._id == newPriceId}
                            onChange={(e) => {
                              setnewPriceId(e.target.value);
                              setnewPackageId(x._id);
                            }}
                          ></input>
                          <p>
                            {y.type}:{" "}
                            {y.priceINR != undefined
                              ? CurrencyCode(y.priceINR, "INR")
                              : y.priceUSD != undefined
                              ? CurrencyCode(y.priceUSD, "USD")
                              : "-"}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="py-3 package_permission_container">
                      <h6 className=" pb-1">Includes</h6>
                      {x.allowPermission.map((y, j) => (
                        <div className="d-flex align-items-center" key={j}>
                          <i className="fa-solid fa-check me-2"></i>
                          <p className="mt-0 pe-1">{y.name}</p>
                          <p className="mt-0 ps-1">{"- " + y.totalCount}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </Carousel>
          </div>
          {error && !newPackageId && (
            <div className="text-center">
              <p className="error">Please select Package</p>
            </div>
          )}

          <div className="modal_footer mt-0">
            <button
              className="cancel_btn"
              type="button"
              onClick={() => {
                setShow(false);
              }}
            >
              Cancel
            </button>
            <button
              className="save_btn"
              type="submit"
              onClick={() => SubmitHandler()}
            >
              Renew
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RenewPackage;
