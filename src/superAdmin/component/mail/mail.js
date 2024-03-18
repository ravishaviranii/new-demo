import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import Filter from "../../helper/Filter";
import {
  Toast,
  useForm,
  Controller,
  useDispatch,
} from "../../../admin/helper/links/Link";

import { AiOutlineExclamation } from "react-icons/ai";
import { Tooltip } from "react-tippy";
import {
  GetApiMailContent,
  ModifyMailContent,
} from "../../api-wrapper/ApiMailContent";

const Mail = () => {
  const [registrationMailValue, setRegistrationMailValue] = useState("");
  const [packagePurchaseValue, setPackagePurchaseValue] = useState("");
  const [packageExpiredValue, setPackageExpireValue] = useState("");

  const [getApiContents, setGetApiContents] = useState([]);

  const [notificatioContentValue, setNotificationcontentValue] = useState([
    {
      id: "",
      mailContent: "",
    },
  ]);

  const [finalFormattedData, setFinalFormattedData] = useState([]);

  const handleMailContentList = () => {
    GetApiMailContent()
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

  const handlechangeForMailContent = (e, id) => {
    const itemIndex = getApiContents.findIndex((item) => item._id === id);

    if (itemIndex !== -1) {
      const updatedMailContentValue = [...getApiContents];
      updatedMailContentValue[itemIndex].mailContent = e;
      setNotificationcontentValue(updatedMailContentValue);

      const formattedData = getApiContents.map((item) => ({
        id: item._id,
        mailContent: item.mailContent,
      }));

      setFinalFormattedData(formattedData);
    }
  };

  const handleSubmitForMailContent = () => {
    let data = {
      updates: finalFormattedData,
    };

    ModifyMailContent(data)
      .then((e) => {
        if (e?.status == 201) {
          Toast.success(e?.data.message);
          setFinalFormattedData([]);
          setNotificationcontentValue([{ id: "", mailContent: "" }]);
          handleMailContentList();
        } else {
          Toast.error(e?.data?.message);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong!");
      });
  };

  useEffect(() => {
    handleMailContentList();
  }, []);

  return (
    <>
      <Filter
        name={"Mail Content"}
        nameShow={true}
        dateShow={false}
        profileShow={true}
      />
      <div className="middle_container  notification_superadmin">
        <div className="data_content data_content_btn    h-maxContent">
          {/* <div className="data_model_btn camapgin_btn">
            <div>
              <h5 className="text-secondary">Mail Content</h5>
            </div>
          </div> */}
          <div className="p-1">
            {getApiContents?.map((mailContent) => (
              <div className="row  border-bottom border-secondary-subtle">
                <div className="col-3">
                  <div className="w-100 h-100 notification_name border-end border-secondary-subtle">
                    <p className="fs-6 text-secondary">
                      {mailContent?.mailContentName}
                    </p>
                  </div>
                </div>
                <div className="col-9 py-3">
                  <div className="w-100 ">
                    <ReactQuill
                      theme="snow"
                      value={mailContent?.mailContent}
                      onChange={(e) =>
                        handlechangeForMailContent(e, mailContent._id)
                      }
                      //   onChange={setRegistrationMailValue}
                      // className="w-100 h-75"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* <div className="row h-500px border-bottom border-secondary-subtle">
              <div className="col-3">
                <div className="w-100 h-100 notification_name border-end border-secondary-subtle">
                  <p className="fs-6 text-secondary">Package Purchase</p>
                </div>
              </div>
              <div className="col-9 py-3">
                <div className="w-100 h-100">
                  <ReactQuill
                    theme="snow"
                    value={packagePurchaseValue}
                    onChange={setPackagePurchaseValue}
                    // className="w-100 h-75"
                  />
                </div>
              </div>
            </div>
            <div className="row h-500px border-bottom border-secondary-subtle">
              <div className="col-3">
                <div className="w-100 h-100 notification_name border-end border-secondary-subtle">
                  <p className="fs-6 text-secondary">Package Expired</p>
                </div>
              </div>
              <div className="col-9 py-3">
                <div className="w-100 h-100">
                  <ReactQuill
                    theme="snow"
                    value={packageExpiredValue}
                    onChange={setPackageExpireValue}
                    // className="w-100 h-75"
                  />
                </div>
              </div>
            </div> */}
          </div>
          <div className="d-flex flex-wrap justify-content-center p-3 data_model_btn button">
            <button
              className="btn btn-primary"
              onClick={handleSubmitForMailContent}
            >
              <i class="fa fa-check" aria-hidden="true"></i> Update Content
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mail;
