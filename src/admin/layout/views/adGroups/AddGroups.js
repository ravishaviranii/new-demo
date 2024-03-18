import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import {
    Toast,
    useForm,
    Controller,
} from "../../../helper/links/Link";
import { ProfileContext } from '../../../helper/usecontext/useContext';

import {
    ApiListCampaign,
    ApiCreateGroup,
    ApiUpdateGroup,
    ApiAdGroupsListing,
} from "../../../api-wrapper/adGroups/ApiAdGroups";
import Select from "react-select";
import { useTranslation } from "react-i18next";

function AddGroups(props) {
  const { t } = useTranslation();
  const {
    setShowAdGroup,
    showAdGroup,
    handleClose,
    name,
    submitClose,
    editData,
  } = props;
  let { profileId, typeValue } = useContext(ProfileContext);
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

    const [campaignId, setcampaignId] = useState()

    const [type, setType] = useState("Sponsored Products");
    const [campaignList, setCampaignList] = useState([]);
    useEffect(() => {
        if (showAdGroup && profileId.value && type) {
            let arr = []
            let data = {
                profileId: profileId.value,
                type: type
            }
            ApiListCampaign(data)
                .then((res) => {
                    if (res.isSuccess) {
                        res.data.map(el => {
                            arr.push({
                                label: el.name,
                                value: el.campaignId
                            })
                        })
                        setCampaignList(arr)
                    }

                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }


    }, [editData, showAdGroup, type, profileId.value]);

    const submitHandler = data => {

        let sendData;

        if (type == 'Sponsored Products') {
            sendData = {
                type: type,
                profileId: profileId?.value,
                campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
                defaultBid: data.defaultBid,
                name: data.name,
                state: data.status,


            }

        }
        else if (type == 'Sponsored Brands') {
            sendData = {
                type: type,
                profileId: profileId?.value,
                campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
                name: data.name,
                state: data.status

            }
        }
        else if (type == 'Sponsored Display') {
            sendData = {
                type: type,
                profileId: profileId?.value,
                campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
                defaultBid: data.defaultBid,
                name: data.name,
                state: data.status,
                bidOptimization: data.bidOptimization,
                creativeType: data.creativeType
            }
        }




        if (editData.adGroupId) {
            ApiUpdateGroup(editData.adGroupId, sendData)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res?.message);
                        // ApiAdGroupsListing()
                        handleClose();

                    } else {
                        Toast.error(res.message);
                    }
                })
                .catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }
        else {
            ApiCreateGroup(sendData)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res?.message);
                        handleClose();
                    } else {
                        Toast.error(res.message);
                    }

                })
                .catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }



    }


    useEffect(() => {
        if (editData?.adGroupId != undefined) {
            setType(editData.type)
            setcampaignId({
                label: editData?.campaignName,
                value: editData?.campaignId
            })
            reset(editData)

            clearErrors()
        }
        else {
            clearErrors()

            setValue('campaignId', '')
            setValue('defaultBid', '')
            setValue('name', '')
            setValue('status', '')
            setValue('bidOptimization', '')
            setValue('creativeType', '')

        }
    }, [showAdGroup, editData]);



  return (
    <Modal
      show={showAdGroup}
      onHide={() => setShowAdGroup(false)}
      centered
      size="xl"
    >
      <Modal.Header className="campaign_modal_head">
        <div className="col-11 modal_title_box">
          <p>{name}</p>
        </div>
        <div className="col-1">
          <i
            className="fa fa-times red modal_close_box"
            aria-hidden="true"
            onClick={() => setShowAdGroup(false)}
          ></i>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="row campaign_form">
            <div className="col-12 col-lg-6 field_box">
              <label>{t("adGroupName")}</label>
              <div className="form_field">
                <Controller
                  control={control}
                  rules={{ required: t("adGroupNameRequired") }}
                  {...register("name")}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="user-box-input"
                      placeholder={t("enterAdGroupName")}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />
                {errors.name && <p className="error">{errors.name.message}</p>}
              </div>
            </div>

            <div className="col-12 col-lg-6 field_box">
              <label>{t("campaignType")}</label>
              <div
                className={`${
                  editData?.campaignId != undefined ? "disabled_input" : ""
                } form_field`}
              >
                <select
                  name="type"
                  value={type}
                  disabled={editData?.campaignId != undefined ? true : false}
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  {typeValue?.map((el) => (
                    <option value={el.value}>{el.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="col-12 col-lg-4 field_box">
              <label>{t("campaign")}</label>
              <div className="form_field full-height">
                <Controller
                  name="campaignId"
                  control={control}
                  rules={{ required: t("campaignIsRequired") }}
                  {...register("campaignId")}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      menuPosition={"fixed"}
                      isDisabled={editData?.adId != undefined ? true : false}
                      classNamePrefix="form_dropdown"
                      placeholder={t("selectCampaign")}
                      options={campaignList}
                      value={
                        campaignList?.find((x) => x.value == value) || value
                      }
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  )}
                />

                {errors.campaignId && (
                  <p className="error">{errors.campaignId.message}</p>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-4 field_box">
              <label>{t("status")}</label>
              <div className="form_field">
                <Controller
                  control={control}
                  rules={{ required: t("statusIsRequired") }}
                  {...register("status")}
                  render={({ field }) => (
                    <select
                      name="status"
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                      value={field.value}
                    >
                      <option value="">{t("selectStatus")}</option>
                      <option value="ENABLED">{t("enabled")}</option>
                      <option value="PAUSED">{t("paused")}</option>
                    </select>
                  )}
                />
                {errors.status && (
                  <p className="error">{errors.status.message}</p>
                )}
              </div>
            </div>

            {type == "Sponsored Products" && (
              <div className="col-12 col-lg-4 field_box">
                <label>{t("bid")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    rules={{ required: t("bidIsRequired") }}
                    {...register("defaultBid")}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="user-box-input"
                        placeholder="$240666"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.defaultBid && (
                    <p className="error">{errors.defaultBid.message}</p>
                  )}
                </div>
              </div>
            )}

            {type == "Sponsored Display" && (
              <div className="col-12 col-lg-4 field_box">
                <label>{t("bid")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    {...register("defaultBid")}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="user-box-input"
                        placeholder="$240666"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {type == "Sponsored Display" && (
              <div className="col-12 col-lg-4 field_box">
                <label>{t("bidOptimization")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    {...register("bidOptimization")}
                    render={({ field }) => (
                      <select
                        name="bidOptimization"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        value={field.value}
                      >
                        <option value="">{t("selectBidOptimization")}</option>
                        <option value="clicks">{t("clicks")}</option>
                        <option value="conversions">{t("conversions")}</option>
                        <option value="reach">{t("reach")}</option>
                      </select>
                    )}
                  />
                </div>
              </div>
            )}

            {type == "Sponsored Display" && (
              <div className="col-12 col-lg-4 field_box">
                <label>{t("creativeType")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="creativeType"
                    {...register("creativeType")}
                    render={({ field }) => (
                      <select
                        name="creativeType"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        value={field.value}
                      >
                        <option value="">{t("selectCreativeType")}</option>
                        <option value="IMAGE">{t("image")}</option>
                        <option value="VIDEO">{t("video")}</option>
                      </select>
                    )}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal_footer">
            <button
              className="cancel_btn"
              type="button"
              onClick={() => setShowAdGroup(false)}
            >
              {t("cancel")}
            </button>
            <button
              disabled={editData && editData?.state == "ENDED" ? true : false}
              className="save_btn"
              type="submit"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddGroups;
