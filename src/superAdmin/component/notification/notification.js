import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Filter from "../../helper/Filter";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { ApiVendorList, ApiCountryList } from "../../api-wrapper/ApiVendor";
import {
  Toast,
  useForm,
  Controller,
  useDispatch,
} from "../../../admin/helper/links/Link";
import { ApiList } from "../../api-wrapper/ApiPackage";
import Select from "react-select";

import { AiOutlineExclamation } from "react-icons/ai";
import { Tooltip } from "react-tippy";
import {
  GetApiNotificationcontent,
  ModifyNotificationcontent,
} from "../../api-wrapper/ApiNotificationcontent";
import {
  CreateDynamicNotificationContentForLocations,
  CreateDynamicNotificationContentForPackages,
  CreateDynamicNotificationcontentForVendors,
} from "../../api-wrapper/ApiNotificationcontent";

const Notification = () => {
  const [vendorList, setVendorList] = useState([]);
  const [demoArr, setDemoArr] = useState([]);
  const [dynamicNotificationcontent, setdynamicNotificationcontent] =
    useState("");

  const [dynamicNotificationContentFor, setDynamicNotificationContentFor] =
    useState("vendor");

  const [options, setOptions] = useState([]);

  const [contentIds, setContentIds] = useState([]);

  const [getApiContents, setGetApiContents] = useState([]);

  const [notificatioContentValue, setNotificationcontentValue] = useState([
    {
      id: "",
      notificationContent: "",
    },
  ]);

  const [finalFormattedData, setFinalFormattedData] = useState([]);

  const handleChangeForDynamicNotificationContent = (event) => {
    setOptions([]);
    setContentIds([]);
    setValue("select_options", []);
    setDynamicNotificationContentFor(event.target.value);
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    
    let oldKey = [];
    e.map((el) => {
      oldKey.push(el.value);
    });
    setContentIds(oldKey);
  };

  const handlechangeForNotificationcontent = (e, id) => {
    const itemIndex = getApiContents.findIndex((item) => item._id === id);

    if (itemIndex !== -1) {
      const updatedNotificatioContentValue = [...getApiContents];
      updatedNotificatioContentValue[itemIndex].notificationContent = e;
      setNotificationcontentValue(updatedNotificatioContentValue);

      const formattedData = getApiContents.map((item) => ({
        id: item._id,
        notificationContent: item.notificationContent,
      }));

      setFinalFormattedData(formattedData);
    }
  };

  const handleNotificationcontentList = () => {
    GetApiNotificationcontent()
      .then((e) => {
        if (e?.isSuccess) {
          setGetApiContents(e?.data);
        } else {
          Toast.error(e?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong!");
      });
  };

  const handleSubmitforDynamicNotificationContent = () => {
    if (dynamicNotificationContentFor === "vendor") {
      let data = {
        customerIds: contentIds,
        message: dynamicNotificationcontent,
      };

      if (contentIds?.length < 1) {
        return Toast.warning("Please Select at least one vendor");
      }

      CreateDynamicNotificationcontentForVendors(data)
        .then((e) => {
          if (e?.isSuccess) {
            setFinalFormattedData([]);
            setContentIds([]);
            setValue("select_options", []);

            setDynamicNotificationContentFor("");
            setdynamicNotificationcontent("");
            Toast.success(e.message);
          } else {
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong!");
        });
    } else if (dynamicNotificationContentFor === "location") {
      let data = {
        countryNames: contentIds,
        message: dynamicNotificationcontent,
      };

      if (contentIds?.length < 1) {
        return Toast.warning("Please Select at least one location");
      }

      CreateDynamicNotificationContentForLocations(data)
        .then((e) => {
          if (e?.isSuccess) {
            setFinalFormattedData([]);
            setContentIds([]);
            setValue("select_options", []);

            setDynamicNotificationContentFor("");
            setdynamicNotificationcontent("");
            Toast.success(e.message);
          } else {
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong!");
        });
    } else if (dynamicNotificationContentFor === "package") {
      let data = {
        packageIds: contentIds,
        message: dynamicNotificationcontent,
      };

      if (contentIds?.length < 1) {
        return Toast.warning("Please Select at least one package");
      }

      CreateDynamicNotificationContentForPackages(data)
        .then((e) => {
          if (e?.isSuccess) {
            setFinalFormattedData([]);
            setContentIds([]);
            setValue("select_options", []);

            setDynamicNotificationContentFor("");
            setdynamicNotificationcontent("");
            Toast.success(e.message);
          } else {
            Toast.error(e?.message);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong!");
        });
    }
  };

  const handleSubmitForNotificationcontent = () => {
    let data = {
      updates: finalFormattedData,
    };

    ModifyNotificationcontent(data)
      .then((e) => {
        if (e?.status == 201) {
          Toast.success(e?.data.message);
          setFinalFormattedData([]);
          setNotificationcontentValue([{ id: "", notificationContent: "" }]);
          handleNotificationcontentList();
        } else {
          Toast.error(e?.data?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong!");
      });
  };

  useEffect(() => {
    handleNotificationcontentList();
  }, []);

  useEffect(() => {
    if (dynamicNotificationContentFor === "vendor") {
      ApiVendorList()
        .then((res) => {
          // let arr = [];

          if (res.isSuccess) {
            setVendorList(res.data);

            // res.data.map((el) => {
            //   arr.push({
            //     name: el.fullName,
            //     email: el.email,
            //     phoneNumber: el.phoneNumber,
            //     role: el.role,
            //     check: false,
            //     id: el._id,
            //   });
            // });

            // // }
            // setDemoArr(arr);

            const data_options = res.data?.map((data) => ({
              value: data._id,
              label: data.fullName,
            }));

            setOptions(data_options);

           
          } else {
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("Somthing went wrong");
        });
    } else if (dynamicNotificationContentFor === "location") {
      ApiVendorList()
        .then((res) => {
          let arr = [];

          if (res.isSuccess) {


            let dataa = res.data?.map((item) => item.country);
            const uniqueIds = new Set();
            const deduplicated = [];

            for (const item of dataa) {
              if (!uniqueIds.has(item._id)) {
                uniqueIds.add(item._id);
                deduplicated.push({
                  label: item.countryName,
                  value: item._id
                });
              }
            }
            setOptions(deduplicated);
          } else {
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("Somthing went wrong");
        });
    } else if (dynamicNotificationContentFor === "package") {
      ApiList()
        .then((res) => {
          let arr = [];

          if (res.isSuccess) {
            // setVendorList(res.data);
            // res.data.map((el) => {
            //   arr.push({
            //     name: el.packageName,
            //     check: false,
            //     id: el._id,
            //   });
            // });
            // // }
            // setDemoArr(arr);
            const data_options = res.data?.map((data) => ({
              value: data._id,
              label: data.packageName,
            }));

            setOptions(data_options);
          } else {
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("Somthing went wrong");
        });
    }
  }, [dynamicNotificationContentFor]);

  return (
    <>
      <Filter
        name={"Notifications"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container  notification_superadmin">
        <div className="row d-flex flex-wrap ">
          <div className="col-6 cust-col-5">
            <div className="data_content data_content_btn  h-maxContent">
              <div className="data_model_btn camapgin_btn">
                <div>
                  <h5 className="text-secondary">
                    Dynamic Notification Content
                  </h5>
                </div>
              </div>
              <div className="p-2">
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={dynamicNotificationContentFor}
                  onChange={handleChangeForDynamicNotificationContent}
                >
                  <FormControlLabel
                    value="vendor"
                    control={<Radio />}
                    label="Vendor"
                  />
                  <FormControlLabel
                    value="location"
                    control={<Radio />}
                    label="Location"
                  />
                  <FormControlLabel
                    value="package"
                    control={<Radio />}
                    label="Package"
                  />
                </RadioGroup>
              </div>
              <div>
                {/* {dynamicNotificationContentFor === "vendor" ? ( */}
                {dynamicNotificationContentFor !== undefined && (
                  <div className="d-flex flex-wrap justify-content-center p-2">
                    <Controller
                      name="select_options"
                      control={control}
                      // rules={{ required: "Keyword Name is required" }}
                      {...register("select_options")}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          classNamePrefix="form_dropdown"
                          className="w-100"
                          placeholder={
                            dynamicNotificationContentFor === "vendor"
                              ? "Select Vendors"
                              : dynamicNotificationContentFor === "location"
                                ? "Select Locations"
                                : "Select Packages"
                          }
                          isMulti
                          options={options}
                          value={
                            options?.find((x) => x.value == value) || value
                          }
                          onChange={(e) => {
                            onChange(e);
                            handleChange(e);
                            // handleKeyword(e);
                          }}
                        />
                      )}
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="p-2">
                  {dynamicNotificationContentFor !== undefined && (
                    <ReactQuill
                      theme="snow"
                      value={dynamicNotificationcontent}
                      onChange={setdynamicNotificationcontent}
                    // className="w-100 h-100"
                    />
                  )}
                </div>
              </div>
              <div>
                {dynamicNotificationContentFor !== undefined && (
                  <div className="d-flex flex-wrap justify-content-center p-3 data_model_btn button">
                    <button
                      className="btn "
                      onClick={handleSubmitforDynamicNotificationContent}
                    >
                      <i class="fa fa-check" aria-hidden="true"></i> Send
                      Notification
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col-6 cust-col-6">
            <div className="data_content data_content_btn    h-maxContent">
              <div className="data_model_btn camapgin_btn">
                <div>
                  <h5 className="text-secondary">Notification Content</h5>
                </div>
              </div>
              <div className="p-1">
                {getApiContents?.map((notificatioContent) => (
                  <div className="row  border-bottom border-secondary-subtle">
                    <div className="col-3">
                      <div className="w-100 h-100 notification_name border-end border-secondary-subtle">
                        <p className="fs-6 text-secondary">
                          {notificatioContent?.notificationContentName}
                        </p>
                      </div>
                    </div>
                    <div className="col-9 py-3">
                      <div className="w-100 ">
                        <ReactQuill
                          theme="snow"
                          value={notificatioContent?.notificationContent}
                          onChange={(e) =>
                            handlechangeForNotificationcontent(
                              e,
                              notificatioContent._id
                            )
                          }
                        // className="w-100 h-75"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex flex-wrap justify-content-center p-3 data_model_btn button">
                <button
                  className="btn btn-primary"
                  onClick={handleSubmitForNotificationcontent}
                >
                  <i class="fa fa-check" aria-hidden="true"></i> Update Content
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notification;
