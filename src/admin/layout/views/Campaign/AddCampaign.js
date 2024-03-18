import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import {
  Toast,
  useForm,
  Controller,
  handleLoader,
  useDispatch,
} from "../../../helper/links/Link";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import DatePicker from "react-multi-date-picker";
import {
  ApiCreateCampaign,
  ApiUpdateCampaign,
} from "../../../api-wrapper/campaign/ApiCampaign";
import Select from "react-select";
import Chips, { Chip } from "react-chips";
import { ApiListKeywordsNameBySortingAcos } from "../../../api-wrapper/keyword/ApiKeyword";
import { ApiListAdGroupNameBySortingAcos } from "../../../api-wrapper/adGroups/ApiAdGroups";
import { ApiProductListingFromDB } from "../../../api-wrapper/product/ApiProduct";
import { useTranslation } from "react-i18next";
const data = [
  "Eugenia",
  "Bryan",
  "Linda",
  "Nancy",
  "Lloyd",
  "Alice",
  "Julia",
  "Albert",
].map((item) => ({ label: item, value: item }));
function AddCampaign(props) {
  const { t } = useTranslation();
  const { setShowAddCampaign, showAddCampaign, handleClose, name, editData } =
    props;
  let { profileId, typeValue } = useContext(ProfileContext);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [type, setType] = useState("Sponsored Products");
  const [targetingType, settargetingType] = useState("");

  const [chips, setChips] = useState([]);

  const [adGroupList, setadGroupList] = useState([]);
  const [keywordList, setkeywordList] = useState([]);
  const [keywordId, setKeywordId] = useState([]);
  const [productList, setproductList] = useState([]);
  const [productId, setProductId] = useState([]);
  const [negativeType, setnegativeType] = useState("NEGATIVE_EXACT");


  const submitHandler = (data) => {
    let sendData;

    if (type == "Sponsored Products") {
      sendData = {
        type: type,
        profileId: profileId?.value,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        targetingType: data.targetingType,
        budget: data.budget,
        status: data.status
      };
      if (editData.campaignId) {
        sendData.status = data.status;
      }
      if (targetingType == "MANUAL") {
        sendData.adGroupId = data.adGroupId.value;
        sendData.keywordIds = keywordId;
        sendData.negativeKeywords = chips;
        sendData.asins = productId;
      }
    } else if (type == "Sponsored Display") {
      sendData = {
        type: type,
        profileId: profileId?.value,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        costType: data.costType,
        budget: data.budget,
        status: data.status

      };
      if (editData.campaignId) {
        sendData.status = data.status;
      }
    } else if (type == "Sponsored Brands") {
      sendData = {
        type: type,
        profileId: profileId?.value,
        name: data.name,
        startDate: data.startDate,
        endDate: data.endDate,
        budgetType: data.budgetType,
        budget: data.budget,
        status: data.status
      };
      if (editData.campaignId) {
        sendData.status = data.status;
      }
    }

    console.log(sendData, "sendata");

    if (editData.campaignId) {
      ApiUpdateCampaign(editData.campaignId, sendData)
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
      ApiCreateCampaign(sendData)
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
  };

  useEffect(() => {
    if (editData?.campaignId != undefined) {
      setType(editData?.type);
      setValue('adGroupId', editData?.adGroupId)
      let negatives = [];
      if (editData?.negativeKeywords) {
        editData?.negativeKeywords.map((el, i) => {
          negatives.push(el.name);
        });
      }
      setChips(negatives);
      setValue("chips", negatives);
      reset(editData);
      clearErrors();
    } else {
      clearErrors();
      setType("Sponsored Products");
      setValue("name", "");
      setValue("status", "");
      setValue("startDate", "");
      setValue("endDate", "");
      setValue("targetingType", "");
      setValue("budget", "");
      setValue("costType", "");
      setValue("budgetType", "");
      setValue("adGroupId", "");
      setValue("keyword_name", [])
      setValue("chips", [])
      setValue("product_name", [])
      setnegativeType("NEGATIVE_EXACT")
      setKeywordId([]);
      setProductId([]);
      setChips([]);
    }
  }, [showAddCampaign, editData]);

  const [adgroup, setadgroup] = useState([]);

  useEffect(() => {
    if (targetingType == "MANUAL") {
      AdGroupListing();
    }
  }, [targetingType]);

  const AdGroupListing = async () => {
    if (type && targetingType == "MANUAL") {
      dispatch(handleLoader(true));
      const data = {
        type: type,
        profileId: profileId.value,
      };
      await ApiListAdGroupNameBySortingAcos(data)
        .then((e) => {
          if (e?.isSuccess) {
            setadGroupList(e.data);
          } else {
            setadGroupList([]);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });
      await ApiListKeywordsNameBySortingAcos(data)
        .then((e) => {
          if (e?.isSuccess) {
            let setData = [];
            e.data.map((el) => {
              setData.push({
                label: el.name,
                value: el.keywordId,
                subLabel: el.acos,
              });
            });
            setkeywordList(setData);
          } else {
            setkeywordList([]);
          }
        })
        .catch((e) => {
          Toast.error("Somthing went wrong");
        });

      await ApiProductListingFromDB({ profileId: profileId.value })
        .then((e) => {
          if (e?.isSuccess) {
            dispatch(handleLoader(true));
            let setData = [];
            e.data.map((el) => {
              setData.push({
                label: `${el.sku}`,
                value: el._id,
                subLabel: el.asin,
              });
            });
            setproductList(setData);
            dispatch(handleLoader(false));
          }
        })
        .catch((e) => {
          dispatch(handleLoader(false));
          Toast.error("Somthing went wrong");
        });
    }
  };
  const ModalCloseHandler = () => {
    setShowAddCampaign(false);
    settargetingType("");
  };

  const handleKeyword = (e) => {
    let oldKey = [];
    e.map((el) => {
      oldKey.push(el.value);
    });
    setKeywordId(oldKey);
  };

  const handleProduct = (e) => {
    let oldKey = [];
    e.map((el) => {
      oldKey.push(el.subLabel);
    });
    setProductId(oldKey);
  };

  const chipsHandler = (e) => {
    const newChips = {
      type: negativeType,
      name: e[e.length - 1],
    };

    setChips((prevChips) => [...prevChips, newChips]);
  };

  return (
    <>
      <Modal show={showAddCampaign} onHide={handleClose} centered size="xl">
        <Modal.Header className="campaign_modal_head">
          <div className="col-11 modal_title_box">
            <p>{name}</p>
          </div>
          <div className="col-1">
            <i
              className="fa fa-times red modal_close_box"
              aria-hidden="true"
              onClick={ModalCloseHandler}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row campaign_form">
              <div className="col-12 col-lg-6 field_box">
                <label>{t("campaignName")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="name"
                    rules={{ required: t("campaignNameRequired") }}
                    {...register("name")}
                    render={({ field }) => (
                      <input
                        {...field}
                        className="user-box-input"
                        placeholder={t("enterCampaignName")}
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

              <div className="col-12 col-lg-6 field_box">
                <label>{t("campaignType")}</label>
                <div className="form_field">
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
                <label>{t("dailyBudget")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="budget"
                    {...register("budget")}
                    rules={{
                      required: t("dailyBudgetRequired"),
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="number"
                        className="user-box-input"
                        placeholder="$240666"
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                      />
                    )}
                  />
                  {errors.budget && (
                    <p className="error">{errors.budget.message}</p>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-4 field_box">
                <label>{t("startDate")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="startDate"
                    rules={{ required: t("startDateRequired") }}
                    {...register("startDate")}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="user-box-input"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value && value.format("YYYY-MM-DD"));
                        }}
                      />
                    )}
                  />
                  {errors.startDate && (
                    <p className="error">{errors.startDate.message}</p>
                  )}
                </div>
              </div>

              <div className="col-12 col-lg-4 field_box">
                <label>{t("endDate")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="endDate"
                    {...register("endDate")}
                    render={({ field }) => (
                      <DatePicker
                        {...field}
                        className="user-box-input"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        value={field.value}
                        onChange={(value) => {
                          field.onChange(value && value.format("YYYY-MM-DD"));
                        }}
                      />
                    )}
                  />
                  {errors.endDate && (
                    <p className="error">{errors.endDate.message}</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-lg-4 field_box">
                <label>{t("status")}</label>
                <div className="form_field">
                  <Controller
                    control={control}
                    name="status"
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
                        <option value="PAUSED">{t("archived")}</option>
                      </select>
                    )}
                  />
                  {errors.status && (
                    <p className="error">{errors.status.message}</p>
                  )}
                </div>
              </div>

              {type == "Sponsored Products" && (
                <div className="col-12 field_box">
                  <label>{t("targeting")}</label>
                  <Controller
                    control={control}
                    name="targetingType"
                    rules={{ required: t("targetIsRequired") }}
                    {...register("targetingType")}
                    render={({ field }) => (
                      <label className="radio_box">
                        <input
                          {...field}
                          type="radio"
                          value="AUTO"
                          defaultChecked
                          checked={field.value === "AUTO"}
                          onChange={(e) =>
                            field.onChange(
                              e.target.value,
                              settargetingType(e.target.value)
                            )
                          }
                          disabled={editData?.type}
                        />
                        <div className="radio_text">
                          <h5>{t("automaticTargeting")}</h5>
                          <p>{t("automaticTargetingDetail")}</p>
                        </div>
                      </label>
                    )}
                  />

                  <Controller
                    control={control}
                    name="targetingType"
                    rules={{ required: t("targetIsRequired") }}
                    {...register("targetingType")}
                    render={({ field }) => (
                      <label className="radio_box">
                        <input
                          {...field}
                          type="radio"
                          value="MANUAL"
                          checked={field.value === "MANUAL"}
                          onChange={(e) => {
                            field.onChange(
                              e.target.value,
                              settargetingType(e.target.value)
                            );
                          }}
                          disabled={editData?.type}
                        />
                        <div className="radio_text">
                          <h5>{t("manualTargeting")}</h5>
                          <p>{t("manulTargetingDetail")}</p>
                        </div>
                      </label>
                    )}
                  />
                  {errors.targetingType && (
                    <p className="error">{errors.targetingType.message}</p>
                  )}
                </div>
              )}

              {targetingType == "MANUAL" && type == "Sponsored Products" && (
                <>
                  <div className="col-12 col-lg-4 field_box">
                    <label>{t("adGroupName")}</label>
                    <div className="form_field">
                      <Controller
                        name="adGroupId"
                        control={control}
                        rules={{ required: t("adGroupNameRequired") }}
                        {...register("adGroupId")}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            classNamePrefix="form_dropdown"
                            placeholder={t("selectAdGroup")}
                            options={adGroupList.map((x, i) => ({
                              label: x.name,
                              value: x.adGroupId,
                            }))}
                            onChange={(e) => {
                              onChange(e);
                            }}
                            value={
                              adGroupList?.find((x) => x.value === value) ||
                              value
                            }

                          />
                        )}
                      />
                      {errors.adGroupId && (
                        <p className="error">{errors.adGroupId.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 field_box">
                    <label>{t("keywords")}</label>
                    <div className="form_field">
                      <Controller
                        name="keyword_name"
                        control={control}
                        rules={{ required: t("keywordNameRequired") }}
                        {...register("keyword_name")}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            classNamePrefix="form_dropdown"
                            placeholder={t("selectKeyword")}
                            isMulti
                            options={keywordList}
                            value={
                              keywordList?.find((x) => x.value == value) ||
                              value
                            }
                            onChange={(e) => {
                              onChange(e);
                              handleKeyword(e);
                            }}
                            formatOptionLabel={({ label, subLabel }) => (
                              <div className="d-flex justify-content-between">
                                <div style={{ paddingRight: "10px" }}>
                                  {label}
                                </div>
                                <div style={{ fontWeight: "bold" }}>
                                  {subLabel}
                                </div>
                              </div>
                            )}
                          />
                        )}
                      />
                      {errors.keyword_name && (
                        <p className="error">{errors.keyword_name.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 field_box">
                    <label>
                      {t("negativeType")}
                      <input
                        type="radio"
                        value="NEGATIVE_EXACT"
                        checked={negativeType == "NEGATIVE_EXACT"}
                        onChange={(e) => setnegativeType(e.target.value)}
                        className="mx-1  ms-2"
                      ></input>
                      {t("exact")}
                      <input
                        type="radio"
                        value="NEGATIVE_PHRASE"
                        checked={negativeType == "NEGATIVE_PHRASE"}
                        onChange={(e) => setnegativeType(e.target.value)}
                        className="mx-1 ms-2"
                      ></input>
                      {t("phrase")}
                    </label>
                    <div className="form_field">
                      <Controller
                        {...register("chips")}
                        control={control}
                        name="chips"
                        rules={{
                          validate: (value) => {
                            if (chips?.length == 0 || chips == undefined) {
                              return t("pleaseAddOneData");
                            }
                            return true;
                          },
                        }}
                        render={({ field }) => (
                          <Chips
                            style={{ marginTop: "10px", height: "80px" }}
                            value={field.value ? field.value : chips}
                            onChange={(e) => {
                              field.onChange(e);
                              chipsHandler(e);
                            }}
                            placeholder={t("enterNegativeKeyword")}
                            fromSuggestionsOnly={false}
                            createChipKeys={[13, 32]}
                          />
                        )}
                      />
                      {chips?.length == 0
                        ? errors.chips && (
                            <span className="error">
                              {errors.chips.message}
                            </span>
                          )
                        : ""}
                    </div>
                  </div>

                  <div className="col-12 col-lg-4 field_box">
                    <label>{t("productName")}</label>
                    <div className="form_field">
                      <Controller
                        name="product_name"
                        control={control}
                        rules={{ required: t("productNameRequired") }}
                        {...register("product_name")}
                        render={({ field: { onChange, value } }) => (
                          <Select
                            classNamePrefix="form_dropdown"
                            placeholder={t("selectProductWithSkuAndAsin")}
                            isMulti
                            options={productList}
                            value={
                              productList?.find((x) => x.value == value) ||
                              value
                            }
                            onChange={(e) => {
                              onChange(e);
                              handleProduct(e);
                            }}
                            formatOptionLabel={({ label, subLabel }) => (
                              <div className="d-flex">
                                <div
                                  style={{
                                    fontWeight: "bold",
                                    paddingRight: "10px",
                                  }}
                                >{`${label} - `}</div>
                                <div>{subLabel}</div>
                              </div>
                            )}
                          />
                        )}
                      />
                      {errors.product_name && (
                        <p className="error">{errors.product_name.message}</p>
                      )}
                    </div>
                  </div>
                </>
              )}
              {type == "Sponsored Display" && (
                <div className="col-12 col-lg-4 field_box">
                  <label>{t("costType")}</label>
                  <div className="form_field">
                    <Controller
                      control={control}
                      name="costType"
                      rules={{ required:  t("costTypeRequired") }}
                      {...register("costType")}
                      render={({ field }) => (
                        <select
                          name="costType"
                          value={field.value}
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <option value="">{t("selectCostType")}</option>
                          <option value="cpc">{t("cpc")}</option>
                          <option value="vcpm">{t("vcpm")}</option>
                        </select>
                      )}
                    />
                    {errors.costType && (
                      <p className="error">{errors.costType.message}</p>
                    )}
                  </div>
                </div>
              )}
              {type == "Sponsored Brands" && (
                <div className="col-12 col-lg-4 field_box">
                  <label>{"budgetType"}</label>
                  <div className="form_field">
                    <Controller
                      control={control}
                      name="budgetType"
                      rules={{ required: t("budgetTypeRequired") }}
                      {...register("budgetType")}
                      render={({ field }) => (
                        <select
                          value={field.value}
                          name="budgetType"
                          onChange={(e) => {
                            field.onChange(e.target.value);
                          }}
                        >
                          <option value="">{t("selectBudgetType")}</option>
                          <option value="LIFETIME">{t("lifeTime")}</option>
                          <option value="DAILY">{t("daily")}</option>
                        </select>
                      )}
                    />
                    {errors.budgetType && (
                      <p className="error">{errors.budgetType.message}</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="modal_footer">
              <button
                className="cancel_btn"
                type="button"
                onClick={() => setShowAddCampaign(false)}
              >
                {t("cancel")}
              </button>
              <button
                disabled={
                  editData && editData?.status == "ENDED" ? true : false
                }
                className="save_btn"
                type="submit"
              >
                {t("submit")}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCampaign;
