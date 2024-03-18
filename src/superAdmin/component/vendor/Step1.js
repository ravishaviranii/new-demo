import React from 'react'
import { useEffect } from 'react';
import { ApiGetPackage } from '../../api-wrapper/ApiVendor';
import {
    Toast,
} from "../../../admin/helper/links/Link";
import { vendorInfoHandler } from '../../../common/redux/action';
import { useState } from 'react';
import Carousel from "react-multi-carousel";
import { useDispatch, useSelector } from 'react-redux';
import CurrencyCode from '../../../admin/helper/currencyCode/CurrencyCode';


function Step1(props) {
    let dispatch = useDispatch()

    const { vendorInfo } = useSelector(state => state.superData)
    let { step, onPrevious, onNext } = props;
    const [packages, setPackages] = useState([]);
    const [priceId, setPriceId] = useState('');
    const [packageId, setPackageId] = useState('')
    const [error, setError] = useState(false);

    console.log(vendorInfo,"vendorinfo")
    
    useEffect(() => {
        let arr = []
        ApiGetPackage({countryId:vendorInfo.step0.country})
            .then((res) => {
                if (res.isSuccess) {
                    setPackages(res.data)
                }

                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, // Number of items to show at once on a desktop
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2, // Number of items to show at once on a tablet
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1, // Number of items to show at once on mobile
        },
    };

    const changeHandler = (priceId, packageId) => {
        setPriceId(priceId)
        setPackageId(packageId)
        if (priceId) {
            setError(false)
        }
    }

    const submitHandler = () => {
        if (priceId == '' || priceId == undefined) {
            setError(true)
        }
        else {
            let item = {
                ...vendorInfo,
                step1: {
                    priceId,
                    packageId
                }
            }
            dispatch(vendorInfoHandler(item));
            onNext()
        }
    }


    useEffect(() => {
        setPackageId(vendorInfo?.step1?.packageId)
        setPriceId(vendorInfo?.step1?.priceId)
    }, [vendorInfo]);

    return (

        <div className='vendor_history_modal_body'>
            {
                error && <p className='ps-2 error'>Please Select Package</p>
            }

            <Carousel
                responsive={responsive}
                ssr={true} // Server-Side Rendering Support
            >

                {packages.map((x, i) => (

                    <div className=" text-center p-2 mt-0 package_main_container" key={i}>
                        <div className={`${packageId == x._id ? "active_border" : ""} package_container ${(i + 1) % 3 == 1 ? 'silver' : (i + 1) % 3 == 2 ? 'gold' : (i + 1) % 3 == 0 ? 'platinum' : ''}`}
                         onClick={()=>changeHandler(x.price[0]._id,x._id)}>
                            <div className="package_name_container py-2">
                                <h5 className="">{x.packageName}</h5>
                                <p className="pt-1"><span className="profile_number">{x.allowProfiles + ' '}</span>profiles</p>
                                {
                                    x.trialDays && (
                                        <p className='trial_banner'>{x.trialDays} days free!</p>
                                    )
                                    }
                            </div>
                            <div className=" py-2 price_container">
                                <h6 className="pb-1">Plans</h6>
                                {x.price.map((y, j) => (
                                    <div className="d-flex align-items-center justify-content-center" key={j}>
                                        <input type="radio" className="mx-2" checked={y._id == priceId} value={y._id} name="package" onChange={() => changeHandler(y._id, x._id)}></input>
                                        <p>{y.type}: {y.priceINR!=undefined?CurrencyCode(y.priceINR,'INR'):y.priceUSD!=undefined?CurrencyCode(y.priceUSD,'USD'):'-'}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="py-3 package_permission_container">
                                <h6 className=" pb-1">Includes</h6>
                                {x.allowPermission.map((y, j) => (
                                    <div className="d-flex align-items-center" key={j}>
                                        <i className="fa-solid fa-check me-2"></i>
                                        <p className="mt-0 pe-1">{y.name}</p>
                                        <p className="mt-0 ps-1">{"- " + y.totalCount}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className='next' disabled={step === 4} type="button" onClick={() => submitHandler()}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Step1