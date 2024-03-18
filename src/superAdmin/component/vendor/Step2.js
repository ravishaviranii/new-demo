
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    Toast,
    useForm,
    Controller,
} from "../../../admin/helper/links/Link";
import { vendorInfoHandler } from '../../../common/redux/action';
import { ApiCreate, ApiUpdate } from '../../api-wrapper/ApiVendor';
function Step2(props) {
    const { vendorInfo } = useSelector(state => state.superData)
    let { step, onPrevious, onNext, setStep, setShowAddPackage, handleList } = props;
    let dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const [error, seterror] = useState({ error1: false, error2: false, error3: false });

    const [val, setval] = useState({
        clientId: "",
        clientSecret: "",
        adsRefreshToken: "",
        sellerClientId: '',
        sellerRefreshToken: "",
        sellerClientSecret: "",
        vendorClientId: '',
        vendorClientSecret: '',
        vendorRefreshToken: ""
    });

    const submitHandler = () => {
        let isAmazonAdsValid
        let isSellerCentralValid
        let isVendorCentralValid

        if ((val.clientId && val.clientSecret && val.adsRefreshToken) || (!val.clientId && !val.clientSecret && !val.adsRefreshToken)) {
            isAmazonAdsValid = false
        } else {
            isAmazonAdsValid = true
            seterror({ ...error, error1: true })
        }
        if ((val.sellerClientId && val.sellerRefreshToken && val.sellerClientSecret) || (!val.sellerClientId && !val.sellerRefreshToken && !val.sellerClientSecret)) {
            isSellerCentralValid = false
        } else {
            isSellerCentralValid = true
            seterror({ ...error, error2: true })
        }
        if ((val.vendorClientId && val.vendorClientSecret && val.vendorRefreshToken) || (!val.vendorClientId && !val.vendorClientSecret && !val.vendorRefreshToken)) {
            isVendorCentralValid = false
        } else {
            isVendorCentralValid = true
            seterror({ ...error, error3: true })
        }


        if (!isAmazonAdsValid && !isSellerCentralValid && !isVendorCentralValid) {
            let item = {
                ...vendorInfo,
                step2: val
            }
            dispatch(vendorInfoHandler(item));
            let data = {
                fullName: vendorInfo?.step0?.fullName,
                email: vendorInfo?.step0?.email,
                phoneNumber: vendorInfo?.step0?.phoneNumber.toString(),
                country: vendorInfo?.step0?.country,
                packageId: vendorInfo?.step1?.packageId,
                companyName: vendorInfo?.step3?.companyName,
                companyGstNumber: vendorInfo?.step3?.companyGstNumber,
                companyAddress: vendorInfo?.step3?.companyAddress,
                companyWebsite: vendorInfo?.step3?.companyWebsite,
                companyPhoneNumber: vendorInfo?.step3?.companyPhoneNumber,
                priceId: vendorInfo?.step1?.priceId,
                clientId: val.clientId,
                clientSecret: val.clientSecret,
                adsRefreshToken: val.adsRefreshToken,
                sellerClientId: val.sellerClientId,
                sellerRefreshToken: val.sellerRefreshToken,
                sellerClientSecret: val.sellerClientSecret,
                vendorClientId: val.vendorClientId,
                vendorClientSecret: val.vendorClientSecret,
                vendorRefreshToken: val.vendorRefreshToken
            }
            if (vendorInfo?.edit) {
                ApiUpdate(data, vendorInfo.id)
                    .then((res) => {
                        if (res.isSuccess) {
                            handleList()
                            setStep(0)
                            setShowAddPackage(false)
                            dispatch(vendorInfoHandler());
                            Toast.success(res.message);
                        }
                        else {
                            setStep(0)
                            Toast.error(res.message);
                        }
                    }).catch((err) => {
                        Toast.error("Somthing went wrong");
                    });
            }
            else {
                let sendData = {
                    ...data,
                    password: vendorInfo?.step0?.password,
                }
                ApiCreate(sendData)
                    .then((res) => {
                        if (res.isSuccess) {

                            handleList()
                            setStep(0)
                            setShowAddPackage(false)
                            dispatch(vendorInfoHandler());
                            Toast.success(res.message);
                        }
                        else {
                            setStep(0)
                            Toast.error(res.message);
                        }
                    }).catch((err) => {
                        Toast.error("Somthing went wrong");
                    });
            }

        }
        else {

        }
    }

    useEffect(() => {
        if (vendorInfo?.step2) {
            setval({
                clientId: vendorInfo?.step2.clientId,
                clientSecret: vendorInfo?.step2.clientSecret,
                adsRefreshToken: vendorInfo?.step2.adsRefreshToken,
                sellerClientId: vendorInfo?.step2.sellerClientId,
                sellerRefreshToken: vendorInfo?.step2.sellerRefreshToken,
                sellerClientSecret: vendorInfo?.step2.sellerClientSecret,
                vendorClientId: vendorInfo?.step2.vendorClientId,
                vendorClientSecret: vendorInfo?.step2.vendorClientSecret,
                vendorRefreshToken: vendorInfo?.step2.vendorRefreshToken
            })
        }
    }, [vendorInfo]);



    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <div className=" campaign_form grey_border step2_data mb-3">
                <h5 className='text-center py-2'>Amazon Ads</h5>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Client Id</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="clientId"
                            {...register("clientId")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Client Id"
                                    value={val.clientId}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            clientId: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 d-flex table_view_rows">
                    <label className='col col-3 col-lg-6'>Client Secret</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="clientSecret"
                            {...register("clientSecret")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Client Secret"
                                    value={val.clientSecret}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            clientSecret: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Refresh Token</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="text"
                            {...register("adsRefreshToken")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Refresh Token"
                                    value={val.adsRefreshToken}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            adsRefreshToken: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                {error.error1 && <p className="error text-center">Amazon Ads: All three credentials are required.</p>}
            </div>

            <div className=" campaign_form grey_border step2_data mb-3">
                <h5 className='text-center py-2'>Seller Central</h5>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Seller Id</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="sellerClientId"
                            {...register("sellerClientId")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Seller Id"
                                    value={val.sellerClientId}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            sellerClientId: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Seller Secret</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="sellerClientSecret"
                            {...register("sellerClientSecret")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Seller Secret"
                                    value={val.sellerClientSecret}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            sellerClientSecret: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 d-flex table_view_rows">
                    <label className='col col-3 col-lg-6'> Refresh Token </label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="sellerRefreshToken"
                            {...register("sellerRefreshToken")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Refresh Token"
                                    value={val.sellerRefreshToken}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            sellerRefreshToken: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>

                {error.error2 && <p className="error text-center">Seller Central: All three credentials are required.</p>}
            </div>
            <div className=" campaign_form grey_border step2_data mb-3">
                <h5 className='text-center py-2'>Vendor Central</h5>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Vendor Id</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="vendorClientId"
                            {...register("vendorClientId")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Vendor Id"
                                    value={val.vendorClientId}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            vendorClientId: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 d-flex table_view_rows">
                    <label className='col col-3 col-lg-6'>Vendor Secret</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="vendorClientSecret"
                            {...register("vendorClientSecret")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Vendor Secret"
                                    value={val.vendorClientSecret}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            vendorClientSecret: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row row-cols-md-2 table_view_rows">
                    <label className='col col-3 col-lg-6'>Vendor Token</label>
                    <div className="col col-9 col-lg-6 form_field p-0">
                        <Controller
                            control={control}
                            name="vendorRefreshToken"
                            {...register("vendorRefreshToken")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Vendor Token"
                                    value={val.vendorRefreshToken}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            vendorRefreshToken: e.target.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                {error.error3 && <p className="error text-center">Vendor Central: All three credentials are required.</p>}
            </div>
            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className='save' disabled={step === 4} type="submit">
                    Save
                </button>
            </div>
        </form>
    )
}

export default Step2