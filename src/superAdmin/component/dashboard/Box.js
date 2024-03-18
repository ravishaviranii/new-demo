import React from "react";
import totalVendor from '../../assets/Images/totalVendor.svg';
import TotalPackages from '../../assets/Images/TotalPackages.svg';
import totalPayement from '../../assets/Images/totalPayement.svg';
import totalTicket from '../../assets/Images/totalTicket.svg';
function Box({ data }) {
  const handleNavigateClick = (route) => {
    window.location.href = route;
  };

  return (
    <div className="superAdminTotal">
      <div className="div_box_first">

        <div className="first_div">
          <div
            className="inner_box purple_box total_box"
            onClick={() => handleNavigateClick("/vendor")}
          >
            <img src={totalVendor} />
            <div>
              <h6>{data?.totalVendors}</h6>
              <p>Total Vendors</p>
            </div>
          </div>
          <div
            className="inner_box orange_box total_box"
            onClick={() => handleNavigateClick("/package")}
          >
            <img src={TotalPackages} />
            <div>
              <h6>{data?.totalPackages}</h6>
              <p>Total Packages</p>
            </div>
          </div>
        </div>
        <div className="first_div">
          <div
            className="inner_box green_box total_box"
            onClick={() => handleNavigateClick("/vendor-purchase-history")}
          >
            <img src={totalPayement} />
            <div>
              <h6>{data?.totalPayments?.INR}₹ / {data?.totalPayments?.USD}$</h6>
              <p>Total Payments</p>
            </div>
          </div>
          <div className="inner_box pink_box total_box"
            onClick={() => handleNavigateClick("/support/support-system")}
          >
            <img src={totalTicket} />
            <div>
              <h6>{data?.totalPendingTicket}</h6>
              <p>Pending Support Ticket</p>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default Box;
