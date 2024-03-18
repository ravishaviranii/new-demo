import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Toast,
  Controller,
} from "../../../helper/links/Link";
import { Modal } from "react-bootstrap";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import {
  ApiCreateProduct,
  ApiUpdateProduct
} from "../../../api-wrapper/keyword/ApiKeyword";
import {
  ApiListCampaign,
  ApiListGroupName
} from "../../../api-wrapper/adGroups/ApiAdGroups";
import Select from 'react-select'
import { useTranslation } from "react-i18next";

const AddKeyword = (props) => {
  const { t } = useTranslation();
  const { showAdGroup, handleClose, submitClose, editData, name } = props;
  let { profileId, typeValue } = useContext(ProfileContext);

  const [campaignList, setCampaignList] = useState();
  const [groupList, setGroupList] = useState([]);
  const [campaignId, setcampaignId] = useState()

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

  const submitHandler = (data) => {
    let sendData
    if (type == 'Sponsored Products') {
      sendData = {
        profileId: profileId.value,
        campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
        matchType: data.matchType,
        bid: Number(data.bid),
        adGroupId: data.adGroupId?.value ? data.adGroupId?.value : data.adGroupId,
        name: data.name,
        type: type,
        state: data.status,
      };
    }
    else if (type == 'Sponsored Brands') {
      if (editData?.type) {
        sendData = {
          profileId: profileId.value,
          campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
          matchType: data.matchType,
          bid: Number(data.bid),
          adGroupId: data.adGroupId?.value ? data.adGroupId?.value : data.adGroupId,
          name: data.name,
          type: type,
          state: data.status,
        }
      }
      else {
        sendData = {
          profileId: profileId.value,
          campaignId: data.campaignId?.value ? data.campaignId?.value : data.campaignId,
          matchType: data.matchType,
          bid: Number(data.bid),
          adGroupId: data.adGroupId?.value ? data.adGroupId?.value : data.adGroupId,
          name: data.name,
          type: type,
        };
      }

    }



    if (editData.keywordId) {
      ApiUpdateProduct(editData.keywordId, sendData)
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
    else {
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

  }


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
            setCampaignList([])
            Toast.error(res.message);
          }
        }).catch((err) => {
          Toast.error("Somthing went wrong");
        });
    }

  }, [showAdGroup, type, profileId.value]);

  const prodctGrp = (camapignId) => {
    let arr = []
    let data = {
      profileId: profileId.value,
      campaignId: Number(camapignId),
    }
    ApiListGroupName(data)
      .then((res) => {
        if (res.isSuccess) {
          res.data.map(el => {
            arr.push({
              label: el.name,
              value: el.adGroupId
            })
          })
          setGroupList(arr)

        }
        else {
          setGroupList([])
          Toast.error(res.message);
        }
      }).catch((err) => {
        Toast.error("Somthing went wrong");
      });

  }
  useEffect(() => {
    if (editData?.keywordId != undefined) {
      prodctGrp(editData?.campaignId)
    }
  }, [editData?.type, editData?.campaignId]);


  useEffect(() => {
    if (editData?.keywordId != undefined) {
      setType(editData.type)
      setValue('campaignId', editData?.campaignName)
      setcampaignId({
        label: editData?.campaignName,
        value: editData?.campaignId
      })
      setValue('adGroupId', editData?.adGroupName)
      reset(editData)
      clearErrors()
    }
    else {
      setType('Sponsored Products')
      clearErrors()
      setValue('campaignId', '')
      setValue('matchType', '')
      setValue('status', '')
      setValue('bid', '')
      setValue('adGroupId', '')
      setValue('name', '')
      setValue('type', '')


    }
  }, [showAdGroup, editData]);

  return (
    <>
      <Modal show={showAdGroup} onHide={handleClose} centered size="xl">
        <Modal.Header className="campaign_modal_head">
          <div className="col-11 modal_title_box">
            <p>{name}</p>
          </div>
          <div className="col-1">
            <i
              className="fa fa-times red modal_close_box"
              aria-hidden="true"
              onClick={() => submitClose(false)}
            ></i>
          </div>
        </Modal.Header>
        <Modal.Body>

          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row campaign_form">

              <div className="col-12 col-lg-6 field_box">
                <label>{t("keywordName")}</label>
                <div className={`${editData?.keywordId != undefined ? 'disabled_input' : ''} form_field`} >
                  <Controller
                    control={control}
                    name="name"

                    rules={{ required: t("nameRequired") }}
                    {...register("name")}
                    render={({ field }) => (
                      <input
                        type="text"
                        disabled={editData?.keywordId != undefined ? true : false}
                        {...field}
                        placeholder={t('enterKeyWordName')}
                        value={field.value}
                        onChange={(e) => {
                          field.onChange(e.target.value);

                        }}
                      />
                    )}
                  />
                </div>
                {errors.name && (
                  <p className="error">{errors.name.message}</p>
                )}

              </div>
              <div className="col-12 col-lg-6 field_box">
                <label>{t('campaignType')}</label>
                <div className={`${editData?.keywordId != undefined ? 'disabled_input' : ''} form_field`} >

                  <select
                    name="type"
                    value={type}
                    disabled={editData?.keywordId != undefined ? true : false}
                    onChange={(e) => {
                      setType(e.target.value);

                    }}
                  >
                    {
                      typeValue?.map(el => (
                        <option value={el.value}>{el.label}</option>
                      ))
                    }
                  </select>

                </div>
              </div>

              <div className="col-12 col-lg-6 field_box">
                <label>{t('campaign')}</label>
                <div className={`${editData?.keywordId != undefined ? 'disabled_input' : ''} form_field`} >

                  <Controller
                    name="campaignId"
                    control={control}
                    rules={{ required: t("campaignIsRequired") }}
                    {...register('campaignId')}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={editData?.keywordId != undefined ? true : false}
                        classNamePrefix="form_dropdown"
                        placeholder={t('selectCampaign')}
                        options={campaignList}
                        value={campaignList?.find(x => x.value == value) || value}
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

              <div className="col-12 col-lg-6 field_box">
                <label>{t('adGroup')}</label>
                <div className={`${editData?.keywordId != undefined ? 'disabled_input' : ''} form_field`} >
                  <Controller
                    control={control}
                    rules={{ required: t("adGroupRequired") }}
                    {...register("adGroupId")}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        isDisabled={editData?.keywordId != undefined ? true : false}
                        classNamePrefix="form_dropdown"
                        placeholder={t('select')}
                        options={groupList}
                        value={groupList?.find(x => x.value == value) || value}
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


              {
                type == 'Sponsored Products' && editData?.type == undefined ?
                  <div className="col-12 col-lg-4 field_box">
                    <label>{t('status')}</label>
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
                            {
                              type == 'Sponsored Products' ?
                                <>
                                  <option value="">{t('selectStatus')}</option>
                                  <option value="ENABLED">{t('enabled')}</option>
                                  <option value="PAUSED">{t('paused')}</option>
                                </> : <>
                                </>
                            }

                          </select>
                        )}
                      />

                    </div>
                  </div> :
                  <>
                  </>
              }

              {
                editData?.type ?
                  <div className="col-12 col-lg-4 field_box">
                    <label>{t('status')}</label>
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
                            {
                              editData?.type == 'Sponsored Products' ?
                                <>
                                  <option value="">{t('selectStatus')}</option>
                                  <option value="ENABLED">{t('enabled')}</option>
                                  <option value="PAUSED">{t('paused')}</option>
                                </> : <>
                                </>
                            }
                            {
                              editData?.type == 'Sponsored Brands' ?
                                <>
                                  <option value="">{t('selectStatus')}</option>
                                  <option value="ENABLED">{t('enabled')}</option>
                                  <option value="PAUSED">{t('paused')}</option>
                                  <option value="PENDING">{t('pending')}</option>
                                  <option value="ARCHIVED">{t('archived')}</option>
                                  <option value="DRAFT">{t('draft')}</option>

                                </> : <>
                                </>
                            }
                          </select>
                        )}
                      />
                      {errors.status && (
                        <p className="error">{errors.status.message}</p>
                      )}
                    </div>
                  </div> :
                  <></>

              }





              <div className="col-12 col-lg-4 field_box">
                <label>{t('matchType')}</label>
                <div className={`${editData?.keywordId != undefined ? 'disabled_input' : ''} form_field`} >
                  <Controller
                    control={control}
                    name="matchType"
                    rules={{ required: t('matchTypeRequired') }}
                    {...register("matchType")}
                    render={({ field }) => (
                      <select
                        disabled={editData?.keywordId != undefined ? true : false}
                        name="matchType"
                        onChange={(e) => {
                          field.onChange(e.target.value);
                        }}
                        defaultValue={field.value}
                      >
                        <option value="">{t('select')}</option>
                        <option value="EXACT">{t('exact')}</option>
                        <option value="PHRASE">{t('phrase')}</option>
                        <option value="BROAD">{t('broad')}</option>
                      </select>
                    )}
                  />
                </div>
                {errors.matchType && (
                  <p className="error">{errors.matchType.message}</p>
                )}
              </div>
              <div className="col-12 col-lg-4 field_box">

                <label>{t('bid')}</label>
                <div className="form_field">
                  <input
                    type="text"
                    name="bid"
                    placeholder={t('enterBid')}
                    {...register("bid")}
                  />
                </div>
              </div>




            </div>
            <div className="form_btn">
              <button className="cancel_btn" type="button" onClick={() => submitClose(false)}>
                {t('cancel')}
              </button>
              <button className="save_btn" type="submit">
                {t('submit')}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddKeyword;
