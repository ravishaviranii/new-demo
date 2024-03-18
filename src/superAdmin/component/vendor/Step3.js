
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    useForm,
    Controller,
} from "../../../admin/helper/links/Link";
import { vendorInfoHandler } from '../../../common/redux/action';
function Step3(props) {
    const { vendorInfo } = useSelector(state => state.superData)
    let { step, onPrevious, onNext } = props;
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    let dispatch = useDispatch()

    const [valData, setvalData] = useState({
        companyName: "",
        companyGstNumber: "",
        companyAddress: "",
        companyWebsite: "",
        companyPhoneNumber: "",
    });
    const submitHandler = () => {
        let flag = false;
        if (!flag) {
            let item = {
                ...vendorInfo,
                step3: valData
            }
            dispatch(vendorInfoHandler(item));
            onNext()
        }
    }
    useEffect(() => {
        setvalData({
            companyName: vendorInfo?.step3?.companyName,
            companyGstNumber: vendorInfo?.step3?.companyGstNumber,
            companyAddress: vendorInfo?.step3?.companyAddress,
            companyWebsite: vendorInfo?.step3?.companyWebsite,
            companyPhoneNumber: vendorInfo?.step3?.companyPhoneNumber,
        })
    }, [vendorInfo]);

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <div className="row campaign_form  p-2">
                <div className="col-12 col-lg-6 field_box">
                    <label>Company Name</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="companyName"
                            {...register("companyName")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Company name"
                                    value={valData.companyName}
                                    onChange={(e) => {
                                        setvalData({
                                            ...valData,
                                            companyName: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />

                    </div>
                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label>GST Number</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="companyGstNumber"
                            {...register("companyGstNumber")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter GST Number"
                                    value={valData.companyGstNumber}
                                    onChange={(e) => {
                                        setvalData({
                                            ...valData,
                                            companyGstNumber: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="col-12 col-lg-6 field_box">
                    <label>Company Address</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="companyAddress"
                            {...register("companyAddress")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Company Address"
                                    value={valData.companyAddress}
                                    onChange={(e) => {
                                        setvalData({
                                            ...valData,
                                            companyAddress: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />

                    </div>
                </div>
                <div className="col-12 col-lg-6 field_box">
                    <label>Company Website</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="companyWebsite"
                            {...register("companyWebsite")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Company Website"
                                    value={valData.companyWebsite}
                                    onChange={(e) => {
                                        setvalData({
                                            ...valData,
                                            companyWebsite: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />

                    </div>
                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label>Company Phone Number</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="companyPhoneNumber"
                            {...register("companyPhoneNumber")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Phone Number"
                                    value={valData.companyPhoneNumber}
                                    onChange={(e) => {
                                        setvalData({
                                            ...valData,
                                            companyPhoneNumber: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />
                    </div>
                </div>
            </div>
           
            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className='next' disabled={step === 4} type="submit">
                    Next
                </button>
            </div>
        </form>
    )
}

export default Step3