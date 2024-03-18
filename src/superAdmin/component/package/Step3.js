import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { packageInfoHandler } from '../../../common/redux/action';
import { ApiCreate, ApiUpdate } from '../../api-wrapper/ApiPackage';
import {
    Toast,
} from "../../../admin/helper/links/Link";
function Step3(props) {
    const dispatch = useDispatch()
    const { packageInfo } = useSelector(state => state.superData)
    let { handleList, step, setStep, onPrevious, onNext, setShowAddPackage } = props;


    const handleSubmit = () => {
        let permission = [];
        packageInfo?.step1.map(el => {
            permission.push({
                moduleId: el.moduleId,
                totalCount: el.totalCount,
                name: el.name
            })
        })
        let data = {
            packageName: packageInfo?.step0?.packageName,
            campaignTypes: packageInfo?.step0?.type,
            allowProfiles: packageInfo?.step2?.profileNumber,
            allowPermission: permission,
            price: [
                {
                    type: "Monthly",
                    priceUSD: packageInfo?.step2?.monthlyUSD,
                    priceINR: packageInfo?.step2?.monthlyINR
                },
                {
                    type: "Yearly",
                    priceUSD: packageInfo?.step2?.yearlyUSD,
                    priceINR: packageInfo?.step2?.yearlyINR
                },
            ],
            packageType: packageInfo?.step2.trial ? 'Trial' : '',
            trialDays: packageInfo?.step2?.trialDay
        }
        if (packageInfo?.edit) {
            ApiUpdate(packageInfo.id, data)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res.message);
                        handleList()
                    }
                    else {
                        Toast.error(res.message);
                    }
                    setStep(0)
                    setShowAddPackage(false)
                    dispatch(packageInfoHandler());
                }).catch((err) => {
                    dispatch(packageInfoHandler());
                    setStep(0)
                    setShowAddPackage(false)
                    Toast.error("Somthing went wrong");
                });
        }
        else {
            ApiCreate(data)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res.message);
                        handleList()
                    }
                    else {
                        Toast.error(res.message);
                    }
                    setStep(0)
                    setShowAddPackage(false)
                    dispatch(packageInfoHandler());
                }).catch((err) => {
                    dispatch(packageInfoHandler());
                    setStep(0)
                    setShowAddPackage(false)
                    Toast.error("Somthing went wrong");
                });
        }


    }

    return (
        <div>
            <div className="row campaign_form border border-1 p-2">

                <h6 className='pb-1'>Package Info :</h6>
                <div className="col-12 col-lg-6 field_box">
                    <label>Package Name : <b>{packageInfo?.step0?.packageName}</b></label>
                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label>Types Of Sponsored Ads : <b>
                        {packageInfo?.step0?.type.map((x, index, array) => {
                            return index === array.length - 1 ? x : x + ', ';
                        })}
                    </b></label>

                </div>

                <h6 className='pb-1'>Choose Modal :</h6>

                <div className="col-12  field_box">
                    <label>
                        {packageInfo?.step1?.map((x, index, array) => (
                            <span key={x.name}>
                                {x.name} : <b>{`${x.INRAmount}₹`}&nbsp; &nbsp; {`${x.USDAmount}$`}  </b><br />

                            </span>
                        ))}

                    </label>

                </div>

                <h6 className='pb-3'>Profile Handle :</h6>
                <div className="col-12  pb-2">
                    <label>Number of Profile Access : <b>{packageInfo?.step2?.profileNumber}</b></label>
                </div>

                <div className="col-12 pb-2">
                    <label>Monthly INR: <b>{packageInfo?.step2?.monthlyINR}</b></label>
                </div>

                <div className="col-12 pb-2">
                    <label>Yearly INR : <b>{packageInfo?.step2?.yearlyINR}</b></label>
                </div>

                <div className="col-12 pb-2">
                    <label>Monthly USD: <b>{packageInfo?.step2?.monthlyUSD}</b></label>
                </div>

                <div className="col-12 pb-2">
                    <label>Yearly USD : <b>{packageInfo?.step2?.yearlyUSD}</b></label>
                </div>
            </div>
            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className="save" onClick={() => handleSubmit()} >
                    Save
                </button>
            </div>
        </div>

    )
}

export default Step3