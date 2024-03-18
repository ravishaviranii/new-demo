import React from "react";
import {  Modal } from "react-bootstrap";

function ViewPackageDesign({ viewPackage, pacakgeDetails, setviewPackage }) {
  const handleClose = () => {
    setviewPackage(false);
  };

  return (
    <Modal
      show={viewPackage}
      centered
      size="md"
      className="view_package_design"
      onHide={handleClose}
    >
      <Modal.Header className="d-block view_package_design_header" closeButton>
        <div className="text-center title">
          <p className="package_name">{pacakgeDetails?.packageName}</p>
          {pacakgeDetails?.trialDays ? (
            <>
              <p className="package">
                {pacakgeDetails?.trialDays} Days Free Trial
              </p>
            </>
          ) : (
            <>
              <p className="package">Package</p>
            </>
          )}
        </div>
        <p className="profiles">
          <span>{pacakgeDetails?.allowProfiles}</span> Profiles
        </p>
      </Modal.Header>
      <Modal.Body>
        <div className="price_div py-2">
          {pacakgeDetails?.price?.map((x, i) => {
            return (
              <div className="text-center">
                {x.type == "Monthly" ? (
                  <p className="mt-0 amount">
                    {" "}
                    {x.priceINR + "₹"}, {x.priceUSD + "$"}
                    <span>/ {x.type}</span>
                  </p>
                ) : (
                  <p className="mt-0 amount">
                    {" "}
                    {x.priceINR + "₹"}, {x.priceUSD + "$"}
                    <span>/ {x.type}</span>
                  </p>
                )}
              </div>
            );
          })}
        </div>
        <div className="permission_div py-2">
          {pacakgeDetails?.allowPermission?.map((x, i) => {
            return (
              <p>
                {x.name} - {x.totalCount}
              </p>
            );
          })}
        </div>
        <div className="type_div py-2">
          <h6 className="type_width">Types</h6>
          <div>
            {pacakgeDetails?.campaignTypes?.map((x, i) => {
              return <p>{x}</p>;
            })}
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default ViewPackageDesign;
