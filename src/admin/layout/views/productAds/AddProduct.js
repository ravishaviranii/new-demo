import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import { Toast, useForm, Controller } from "../../../helper/links/Link";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import {
  ApiCreateProduct,
  ApiUpdateProduct,
  ApiProductListGroupName,
} from "../../../api-wrapper/product/ApiProduct";
import {
  ApiListCampaign,
  ApiListGroupName,
} from "../../../api-wrapper/adGroups/ApiAdGroups";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import { ApiProductListingFromDB } from "../../../api-wrapper/product/ApiProduct";

function AddProduct(props) {
  const { t } = useTranslation();
  const {
    setaddFlag,
    addFlag,
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
    getValues,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("Sponsored Products");
  const [campaignList, setCampaignList] = useState([]);
  const [campaignId, setcampaignId] = useState();
  const [groupList, setGroupList] = useState([]);
  const [brandgroupList, setBrandGroupList] = useState([]);
  const [adtype, setAdType] = useState("Product Collection");
  const [chips, setchips] = useState([]);
  const [flag, setflag] = useState(false);
  const [asin, setasinList] = useState([]);
  const [sku, setskuList] = useState([]);

  const listHandler = (addType) => {
    let checkType = addType ? addType : type;
    if (checkType != "Sponsored Brands") {
      if (profileId.value) {
        let arr = [];
        let data = {
          profileId: profileId.value,
          type: addType ? addType : type,
        };

        ApiListCampaign(data)
          .then((res) => {
            if (res.isSuccess) {
              res.data.map((el) => {
                arr.push({
                  label: el.name,
                  value: el.campaignId,
                });
              });
              setCampaignList(arr);
            } else {
              setCampaignList([]);
              Toast.error(res.message);
            }
          })
          .catch((err) => {
            Toast.error("Somthing went wrong");
          });
      }
    }
  };

  const adgrpHandler = (val) => {
    if (val == "Sponsored Brands") {
      let arr = [];
      let data = {
        profileId: profileId.value,
        type: val,
      };
      ApiProductListGroupName(data)
        .then((res) => {
          if (res.isSuccess) {
            res.data.map((el) => {
              arr.push({
                label: el.name,
                value: el.adGroupId,
              });
            });
            setGroupList(arr);
          } else {
            setGroupList([]);
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("Somthing went wrong");
        });
    }
  };
  useEffect(() => {
    if (editData?.type == "Sponsored Brands") {
      adgrpHandler(editData?.type);
    }
  }, [editData?.type]);

  const prodctGrp = (camapignId) => {
    let arr = [];
    let data = {
      profileId: profileId.value,
      campaignId: Number(camapignId),
      type: type,
    };
    ApiListGroupName(data)
      .then((res) => {
        if (res.isSuccess) {
          res.data.map((el) => {
            arr.push({
              label: el.name,
              value: el.adGroupId,
            });
          });
          setGroupList(arr);
          setflag(true);
        } else {
          setGroupList([]);
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  };

  useEffect(() => {
    if (editData?.type != "Sponsored Brands" && editData?.campaignId) {
      prodctGrp(editData?.campaignId);
    }
  }, [editData?.type, editData?.campaignId]);

  useEffect(() => {
    if (editData != undefined && editData?.type != undefined) {
      listHandler(editData?.type);
    }
  }, [editData]);

  useEffect(() => {
    if (addFlag) {
      listHandler();
    }
  }, [addFlag, profileId.value]);

  const submitHandler = (data) => {
    setaddFlag(false);

    let sendData = {
      profileId: profileId.value,
      type: type,
      state: data.status,
      adGroupId: data.adGroupId?.value ? data.adGroupId?.value : data.adGroupId,
    };
    if (type == "Sponsored Products") {
      sendData = {
        ...sendData,
        campaign: data.campaignId?.value
          ? data.campaignId?.value
          : data.campaignId,
        asins: data.asins.value,
        sku: data?.sku?.value ? data?.sku?.value : data.sku,
      };
    } else if (type == "Sponsored Display") {
      sendData = {
        ...sendData,
        campaign: data.campaignId?.value
          ? data.campaignId?.value
          : data.campaignId,
        sku: data?.sku?.value ? data?.sku?.value : data.sku,
      };
    } else if (type == "Sponsored Brands") {
      if (adtype == "Product Collection") {
        if (data.customImageAssetId) {
          sendData = {
            ...sendData,
            adtype: adtype,
            pageType: data.pageType,
            url: data.url,
            name: data.name,
            asins: data.asins.value ? [data.asins.value] : data.asins,
            brandName: data.brandName,
            customImageAssetId: data.customImageAssetId,
            brandLogoAssetID: data.brandLogoAssetID,
            headline: data.headline,
          };
        } else {
          sendData = {
            ...sendData,
            adtype: adtype,
            pageType: data.pageType,
            url: data.url,
            name: data.name,
            asins: data.asins.value ? [data.asins.value] : data.asins,
            brandName: data.brandName,
            brandLogoAssetID: data.brandLogoAssetID,
            headline: data.headline,
          };
        }
      } else {
        sendData = {
          ...sendData,
          adtype: adtype,
          name: data.name,
          asins: data.asins.value ? [data.asins.value] : data.asins,
          videoAssetIds: data.videoAssetIds,
        };
      }
    }

    if (editData.adId) {
      ApiUpdateProduct(editData.adId, sendData)
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
    } else {
      ApiCreateProduct(sendData)
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
    setcampaignId();
  };

  useEffect(() => {
    if (editData?.adId != undefined) {
      setType(editData.type);
      setcampaignId({
        label: editData?.campaignName,
        value: editData?.campaignId,
      });

      setValue("adGroupId", editData?.adGroupName);

      setAdType(editData?.adType);

      reset(editData);
      clearErrors();
    } else {
      setType("Sponsored Products");
      clearErrors();
      setchips([]);
      setValue("campaignId", "");
      setValue("adGroupId", "");
      setValue("status", "");
      setValue("asins", "");
      setValue("sku", "");
      setValue("pageType", "");
      setValue("url", "");
      setValue("name", "");
      setValue("brandName", "");
      setValue("customImageAssetId", "");
      setValue("brandLogoAssetID", "");
      setValue("headline", "");
      setValue("brandAdGroupId", "");
    }
  }, [showAdGroup, editData]);

  useEffect(() => {

    if (profileId.value && addFlag || editData != undefined) {

      produtHandler()
    }
  }, [profileId, addFlag, editData]);

  const produtHandler = () => {
    let asins = [];
    let sku = [];
    ApiProductListingFromDB({ profileId: profileId.value })
      .then((e) => {
        if (e?.isSuccess) {
          let setData = [];
          e.data.map((el) => {
            asins.push({
              label: `${el.asin}`,
              value: el.asin,
            });
            sku.push({
              label: `${el.sku}`,
              value: el.sku,
            });
          });
          setasinList(asins);
          setskuList(sku);
        }
      })
      .catch((e) => {
        Toast.error("Somthing went wrong");
      });
  }

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
            onClick={() => {
              setShowAdGroup(false);
              setaddFlag(false);
            }}
          ></i>
        </div>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="row campaign_form">
            <div className="col-12 col-lg-6 field_box">
              <label>{t("campaignType")}</label>
              <div
                className={`${editData?.adId != undefined ? "disabled_input" : ""
                  } form_field`}
              >
                <select
                  name="type"
                  value={type}
                  disabled={editData?.adId != undefined ? true : false}
                  onChange={(e) => {
                    setType(e.target.value);
                    listHandler(e.target.value);
                    adgrpHandler(e.target.value);
                    setGroupList([]);
                  }}
                >
                  {typeValue?.map((el) => (
                    <option value={el.value}>{el.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {type != "Sponsored Brands" && (
              <div className="col-12 col-lg-6 field_box">
                <label>{t("campaign")}</label>
                <div
                  className={`${editData?.adId != undefined ? "disabled_input" : ""
                    } form_field`}
                >
                  <Controller
                    name="campaignId"
                    control={control}
                    rules={{ required: t("campaignIsRequired") }}
                    {...register("campaignId")}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={editData?.adId != undefined ? true : false}
                        classNamePrefix="form_dropdown"
                        placeholder={t("selectCampaign")}
                        options={campaignList}
                        value={
                          campaignList?.find((x) => x.value == value) || value
                        }
                        onChange={(e) => {
                          onChange(e);
                          setcampaignId(e.value);
                          prodctGrp(e.value);
                        }}
                      />
                    )}
                  />

                  {errors.campaignId && (
                    <p className="error">{errors.campaignId.message}</p>
                  )}
                </div>
              </div>
            )}

            <div className="col-12 col-lg-6 field_box">
              <label>{t("adGroup")}</label>
              <div
                className={`${editData?.adId != undefined ? "disabled_input" : ""
                  } form_field`}
              >
                <Controller
                  control={control}
                  rules={{ required: t("adGroupRequired") }}
                  {...register("adGroupId")}
                  render={({ field: { onChange, value } }) => (
                    <Select
                      isDisabled={editData?.adId != undefined ? true : false}
                      classNamePrefix="form_dropdown"
                      placeholder={t("select")}
                      options={groupList}
                      value={groupList?.find((x) => x.value == value) || value}
                      onChange={(e) => {
                        onChange(e);
                      }}
                    />
                  )}
                />
                {errors.adGroupId && (
                  <p className="error">{errors.adGroupId.message}</p>
                )}
              </div>
            </div>

            <div className="col-12 col-lg-6 field_box">
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
                      <option value="ARCHIVED">{t("archived")}</option>
                    </select>
                  )}
                />
                {errors.status && (
                  <p className="error">{errors.status.message}</p>
                )}
              </div>
            </div>

            {type == "Sponsored Brands" && (
              <div className="col-12 col-lg-6 field_box">
                <label>{t("adType")}</label>
                <div
                  className={`${editData?.adId != undefined ? "disabled_input" : ""
                    } form_field`}
                >
                  <select
                    disabled={editData?.adId != undefined ? true : false}
                    name="status"
                    value={adtype}
                    onChange={(e) => {
                      setAdType(e.target.value);
                    }}
                  >
                    <option value="Product Collection">
                      {t("prductCollection")}
                    </option>
                    <option value="Video">{t("video")}</option>
                  </select>
                </div>
              </div>
            )}

            {type == "Sponsored Products" && (
              <div className="col-12 col-lg-6 field_box">
                <label>{t("asins")}</label>
                <div
                  className={`${editData?.adId != undefined ? "disabled_input" : ""
                    } form_field`}
                >
                  <Controller
                    control={control}

                    {...register("asins")}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={editData?.adId != undefined ? true : false}
                        classNamePrefix="form_dropdown"
                        placeholder={t("select")}
                        options={asin}
                        value={asin?.find((x) => x.value == value) || value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      />
                    )}
                  />

                </div>
              </div>
            )}

            {type != "Sponsored Brands" && (
              <div className="col-12 col-lg-6 field_box">
                <label>{t("sku")}</label>
                <div
                  className={`${editData?.adId != undefined ? "disabled_input" : ""
                    } form_field`}
                >
                  <Controller
                    control={control}

                    {...register("sku")}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={editData?.adId != undefined ? true : false}
                        classNamePrefix="form_dropdown"
                        placeholder={t("select")}
                        options={sku}
                        value={sku?.find((x) => x.value == value) || value}
                        onChange={(e) => {
                          onChange(e);
                        }}
                      />
                    )}
                  />

                </div>
              </div>
            )}

            {/* brands field */}

            {adtype == "Product Collection" && type == "Sponsored Brands" && (
              <>
                <div className="col-12 col-lg-6 field_box">
                  <label>{t("pageType")}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      rules={{ required: t("pageTypeIsRequired") }}
                      {...register("pageType")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterPageType")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.pageType && (
                      <p className="error">{errors.pageType.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-6 field_box">
                  <label>{t("url")}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      rules={{ required: t("urlRequired") }}
                      {...register("url")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterUrl")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.url && (
                      <p className="error">{errors.url.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-4 field_box">
                  <label>{t('brandName')}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      rules={{ required: t("brandNameRequired") }}
                      {...register("brandName")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterBrandName")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.brandName && (
                      <p className="error">{errors.brandName.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-4 field_box">
                  <label>{t('CustomImageAsset')}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      {...register("customImageAssetId")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterCustomImageAsset")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {/* {errors.customImageAssetId && (
                      <p className="error">{errors.customImageAssetId.message}</p>
                    )} */}
                  </div>
                </div>

                <div className="col-12 col-lg-4 field_box">
                  <label>{t('brandLogoAsset')}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      rules={{ required: t("brandLogoAssetRequired") }}
                      {...register("brandLogoAssetID")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterBrandLogoAsset")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.brandLogoAssetID && (
                      <p className="error">{errors.brandLogoAssetID.message}</p>
                    )}
                  </div>
                </div>

                <div className="col-12 col-lg-4 field_box">
                  <label>{t('headline')}</label>
                  <div
                    className={`${editData?.adId != undefined ? "disabled_input" : ""
                      } form_field`}
                  >
                    <Controller
                      control={control}
                      rules={{ required: t("headlineIsRequired") }}
                      {...register("headline")}
                      render={({ field }) => (
                        <input
                          {...field}
                          disabled={editData?.adId != undefined ? true : false}
                          className="user-box-input"
                          placeholder={t("enterHeadline")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.headline && (
                      <p className="error">{errors.headline.message}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            {adtype == "Video" && type == "Sponsored Brands" && (
              <div className="col-12 col-lg-4 field_box">
                <label>{t('videoAsset')}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    rules={{ required: t("videoAssetRequired") }}
                    {...register("videoAssetIds")}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="user-box-input"
                        placeholder={t("enterVideo")}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.videoAssetIds && (
                    <p className="error">{errors.videoAssetIds.message}</p>
                  )}
                </div>
              </div>
            )}

            {type == "Sponsored Brands" && (
              <>
                <div className="col-12 col-lg-4 field_box">
                  <label>{t('name')}</label>
                  <div className="form_field">
                    <Controller
                      control={control}
                      rules={{ required: t('nameRequired') }}
                      {...register("name")}
                      render={({ field }) => (
                        <input
                          {...field}
                          className="user-box-input"
                          placeholder={t("enterName")}
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        />
                      )}
                    />
                    {errors.name && (
                      <p className="error">{errors.name.message}</p>
                    )}
                  </div>
                </div>

                {type == "Sponsored Brands" && (
                  <div className="col-12 col-lg-6 field_box">
                    <label>{t('asins')}</label>
                    <div
                      className={`${editData?.adId != undefined ? "disabled_input" : ""
                        } form_field`}
                    >
                      <Controller
                        control={control}

                        {...register("asins")}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            isDisabled={
                              editData?.adId != undefined ? true : false
                            }
                            classNamePrefix="form_dropdown"
                            placeholder={t("select")}
                            options={asin}
                            value={asin?.find((x) => x.value == value) || value}
                            onChange={(e) => {
                              onChange(e);
                            }}
                          />
                        )}
                      />

                    </div>
                  </div>
                )}
              </>
            )}
            {/* {
                  type == "Sponsored Brands" &&
                  <div className="col-12 col-lg-4 field_box">
                    <label>Asins </label>
                    <div className={editData?.adId == undefined ? 'chip' : 'disabledchip'}>
                      <Controller

                        {...register("chips")}
                        control={control}
                        name="chips"
                        rules={{
                          validate: (value) => {

                            if (chips?.length == 0 || chips == undefined) {
                              return "Please Add one data";
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <Chips

                            style={{ marginTop: '10px', height: '80px' }}
                            value={field.value ? field.value : chips}

                            onChange={(e) => {

                              field.onChange(e);
                              setchips(e)
                            }}

                            placeholder="Enter Asins"
                            fromSuggestionsOnly={false}
                            createChipKeys={[13, 32]}
                          />
                        )}
                      />
                      {chips?.length == 0 ? errors.chips && (
                        <span className="error">{errors.chips.message}</span>
                      ) : ''}
                    </div>

                  </div>
                } 


              </>
            }  */}
          </div>

          <div className="modal_footer">
            <button
              className="cancel_btn"
              type="button"
              onClick={() => {
                setShowAdGroup(false);
                setaddFlag(false);
              }}
            >
              {t('cancel')}
            </button>
            <button
              disabled={editData && editData?.state == "ENDED" ? true : false}
              className="save_btn"
              type="submit"
            >
              {t('submit')}
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddProduct;
