import React, { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PackagePurchase from "../../../assets/images/package-purchase.png";
import PackageExpire from "../../../assets/images/package-expire.png";
import PackageLimitExceed from "../../../assets/images/package-limit-exceed.png";
import CommonImg from "../../../assets/images/common-notification.png";
// import { handleLoader } from "../../../../common/redux/action";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";

const Notification = (props) => {
  let {
    unSeenNotifications,
    readAllNotifications,
    notifications,
    readNotification,
  } = props;
  const [alignment, setAlignment] = useState("false");

  const handleChange = (event, newAlignment) => {
    event.stopPropagation();
    setAlignment(newAlignment);
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  }

  return (
    <>

      <div className="border border-secondary-subtle rounded-1">
        <div className="row p-2 notification-header">
          <div className="col-3 cust-col-3-notification">
            <div className="w-100 text-wrap">
              <p className="fs-6 pt-2 text-wrap w-100 fw-semibold notification-text">Notifications</p>
            </div>
          </div>
          <div className="col-5 cust-col-5-notification">
            <div className="d-flex flex-wrap justify-content-center">
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
                size="small"
              >
                <ToggleButton value="false">Active</ToggleButton>
                <ToggleButton value="true">Archive</ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
          <div className="col-4 cust-col-4-notification ">
            {unSeenNotifications?.length > 0 && (
              <div className="d-flex flex-wrap justify-content-end cust-justify-content-end">
                <button
                  type="button"
                  className="btn btn-outline-primary read-all-btn"
                  onClick={readAllNotifications}
                >
                  Read All
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="row notification-content">
          {alignment === "false" && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                // maxHeight: 350,
                // minHeight: 50,
                // minWidth: 290,
              }}
            >
              {notifications?.map((data) => (
                <>
                  {data?.seen == false && (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        className="cursor-pointer"
                        onClick={() => readNotification(data?._id)}
                      >
                        <ListItemAvatar className="py-3">
                          <Avatar
                            alt="Remy Sharp"
                            src={
                              data?.statusNotificationFor ===
                                "Package Purchase"
                                ? PackagePurchase
                                : data?.statusNotificationFor ===
                                  "Plan Expire"
                                  ? PackageExpire
                                  : data?.statusNotificationFor ===
                                    "Package Limit Exceed"
                                    ? PackageLimitExceed
                                    : data?.statusNotificationFor ===
                                      "dynamic-content"
                                      ? CommonImg
                                      : CommonImg
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={data?.heading}
                          // onClick={readNotification(data?._id)}
                          secondary={
                            <>
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="div"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {data?.message}
                                </Typography>
                              </React.Fragment>
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "block" }}
                                  component="div"
                                  variant="body2"
                                  color="text.primary"
                                  className="mt-2"
                                  style={{ fontSize: "13px" }}
                                >
                                  {formatDate(data?.createdAt)}
                                </Typography>
                              </React.Fragment>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </>
                  )}
                </>
              ))}
              {unSeenNotifications?.length < 1 && (
                <div className="d-flex flex-wrap justify-content-center p-1">
                  <p className="fs-5 p-1 text-dark">No New Notifications</p>
                </div>
              )}
            </List>
          )}

          {alignment === "true" && (
            <List
              sx={{
                width: "100%",
                maxWidth: 360,
                bgcolor: "background.paper",
                position: "relative",
                overflow: "auto",
                maxHeight: 350,
                // minHeight: 50,
                // minWidth: 290,
              }}
            >
              {notifications?.map((data) => (
                <>
                  {data?.seen == true && (
                    <>
                      <ListItem
                        alignItems="flex-start"
                        className="cursor-pointer"
                      >
                        <ListItemAvatar className="py-3">
                          <Avatar
                            alt="Remy Sharp"
                            src={
                              data?.statusNotificationFor ===
                                "Package Purchase"
                                ? PackagePurchase
                                : data?.statusNotificationFor ===
                                  "Plan Expire"
                                  ? PackageExpire
                                  : data?.statusNotificationFor ===
                                    "Package Limit Exceed"
                                    ? PackageLimitExceed
                                    : data?.statusNotificationFor ===
                                      "dynamic-content"
                                      ? CommonImg
                                      : CommonImg
                            }
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={data?.heading}
                          secondary={
                            <>
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "inline" }}
                                  component="div"
                                  variant="body2"
                                  color="text.primary"
                                >
                                  {data?.message}
                                </Typography>
                              </React.Fragment>
                              <React.Fragment>
                                <Typography
                                  sx={{ display: "block" }}
                                  component="div"
                                  variant="body2"
                                  color="text.primary"
                                  className="mt-2"
                                  style={{ fontSize: "13px" }}
                                >
                                  {formatDate(data?.createdAt)}
                                </Typography>
                              </React.Fragment>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider variant="fullWidth" component="li" />
                    </>
                  )}
                </>
              ))}
              {notifications?.length < 1 && (
                <div className="d-flex flex-wrap justify-content-center p-1">
                  <p className="fs-5 p-1 text-dark">No New Notifications</p>
                </div>
              )}
            </List>
          )}
        </div>
      </div>
    </>
  );
};

export default Notification;
