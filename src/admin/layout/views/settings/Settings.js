import React, { useEffect, useState } from 'react'
import { Toast, useDispatch, useNavigate, Link, useForm, yupResolver, Controller } from "../../../helper/links/Link";
import { handleLoader } from '../../../../common/redux/action';
import Filter from "../../../helper/filter/Filter";
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { ApiLink, ApiLinkAamazon, ApiAuthenticationAamazon, ApiCheckAmazonConnection, ApiUnlinkAmazonConnection, ApiSelectAccount } from '../../../api-wrapper/other/ApiSetting';
import { useContext } from 'react';
import { ProfileContext } from '../../../helper/usecontext/useContext';
import { PermissionCheck } from '../../../helper/permission/PermissionCheck';
import { useTranslation } from "react-i18next";

function Settings() {
  const { t } = useTranslation();

  const dispatch = useDispatch()
  let navigate = useNavigate()
  let { pagePermission, customerId } = useContext(ProfileContext);
  const queryParameters = new URLSearchParams(window.location.search);
  const code = queryParameters.get("code");

  // ---------------state ----------------//
  const [amazonFlag, setAmazonFlag] = useState(false);
  const [accountList, setAccountList] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState();
  const [profileData, setProfileData] = useState();
  const [secretData, setsecretData] = useState()

  // --------------function -----------------//


  // link handler //
  const authHandler = () => {
    ApiAuthenticationAamazon()
      .then((res) => {
        window.location = `${res?.auth_grant_url}?scope=${res?.scope}&response_type=code&client_id=${res?.client_id}&state=State&redirect_uri=${res?.redirect_uri}`;

      }).catch((err) => {

      });


  }

  // unlink handler //
  const unlinkHandler = () => {
    ApiUnlinkAmazonConnection()
      .then((res) => {
        isAmazonLinkedHandler()
      }).catch((err) => {

      });
  }
  // check link connection //
  const isAmazonLinkedHandler = () => {
    let data = {
      customerId: customerId ? customerId : ""
    }
    dispatch(handleLoader(true))
    ApiCheckAmazonConnection(data)
      .then((res) => {
        if (res.isSuccess) {
          setAmazonFlag(res.connect)
          dispatch(handleLoader(false))
        }
        else {
          setAmazonFlag(res.connect)
          dispatch(handleLoader(false))
          localStorage.removeItem('toolsToken')
        }

      }).catch((err) => {
        dispatch(handleLoader(false))

        setAmazonFlag(false)
      });

  }

  // select acount // 

  const selectAccountHandler = (e, el) => {

    if (e.target.checked) {
      setSelectedAccount(el.profileId)
      localStorage.setItem("selectedAccount", JSON.stringify(el))

      checkAccount()
      // navigate('/amazon-ads/campaign')
    }
    else {
      setSelectedAccount()

      localStorage.setItem("selectedAccount", null)
    }
  }

  const checkAccount = () => {
    let data = JSON.parse(localStorage.getItem('selectedAccount'))
    if (JSON.parse(localStorage.getItem('selectedAccount')) != null) {
      setSelectedAccount(data.profileId)

    }
    else {

      setSelectedAccount()


    }
  }


  // ---------------other ------------------//

  // select account  //

  useEffect(() => {

    if (code) {
      ApiLinkAamazon({ code: code })
        .then((res) => {
          if (res) {
            setAmazonFlag(true)
          }
        }).catch((err) => {
          setAmazonFlag(false)
        });
    }
  }, [code]);


  useEffect(() => {
    isAmazonLinkedHandler()
  }, []);

  useEffect(() => {
    checkAccount()
  }, []);

  useEffect(() => {
    dispatch(handleLoader(true));
    ApiLink()
      .then((res) => {
        if (res.isSuccess) {
          setProfileData(res.profile)
          setsecretData(res.configAdsData)
          dispatch(handleLoader(false));
        }
        else {
          dispatch(handleLoader(false));
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error("somthing went wrong!!");
      });
  }, []);


  //-------------- link with secret -------------//
  const [secretKey, setSecretKey] = useState(false);

  const saveHandler = () => {

  }

  return (
    <>

      <Filter name={t("settings")} nameShow={true} dateShow={false} profileShow={false} />
      <div className='router_container'>
        <div className='link_setting_container  mt-0 mt-md-3 mt-lg-5'>

          <div className="setting_container ">
            <h5 className='mb-2'>{t("profileDetails")}</h5>
            <div className='user_box'>
              <label className="user-box-label">{t('name')}</label>
              <input className="user-box-input" name='name' value={profileData ? profileData?.fullName : ''} />
            </div>

            <div className='user_box'>
              <label className="user-box-label">{t('phone')}</label>
              <input className="user-box-input" name='phone' value={profileData ? profileData?.phoneNumber : ''} />
            </div>

            <div className='user_box'>
              <label className="user-box-label">{t('email')}</label>
              <input className="user-box-input" name="email" value={profileData ? profileData?.email : ''} />
            </div>


            <div className='linked_account'>
              <div>

              </div>

            </div>

            {
              PermissionCheck('Settings', 'Link Your Account') &&
              <>
                <h5 className='mb-2 mt-3'>{t('linkYourAccount')}</h5>
                <Tabs defaultActiveKey="first" className='mt-2'>

                  <Tab eventKey="first" title={t('linkWithSecretKey')}>
                    <div className='secret_login'>
                      <div className='user_box'>
                        <label className="user-box-label">{t('clientId')}</label>
                        <input className="user-box-input" name='client_key' value={secretData ? secretData?.clientId : ''} />
                      </div>

                      <div className='user_box'>
                        <label className="user-box-label">{t('clientSecretKey')}</label>
                        <input className="user-box-input" name='client_id' value={secretData ? secretData?.clientSecret : ''} />
                      </div>

                      <div className='user_box text-wrap'>
                        <label className="user-box-label">{t('refreshToken')}</label>
                        <input className="user-box-input" name="refresh_token" value={secretData ? secretData?.adsRefreshToken : ''} />
                      </div>

                      <div className='linked_account'>

                        {amazonFlag ?
                          <button className='save_btn px-5' style={{ background: "green" }} onClick={() => saveHandler()}>
                            {t('save')}
                          </button>
                          :
                          <></>
                        }
                        {/* <button className='save_btn' onClick={() => authHandler()}>
                           Link Your Account
                           </button> */}
                      </div>
                    </div>
                  </Tab>

                  <Tab eventKey="second" title={t('linkWithAmazon')}>
                    {amazonFlag ?
                      <button className='save_btn' style={{ background: "green" }} onClick={() => unlinkHandler()}>
                        {t('unlinkYourAccount')}
                      </button>
                      :
                      <button className='save_btn' onClick={() => authHandler()}>
                        {t('linkYourAccount')}
                      </button>}
                  </Tab>


                </Tabs>
              </>
            }


          </div>



        </div>



      </div >
    </>
  )
}

export default Settings
