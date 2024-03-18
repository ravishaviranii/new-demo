import React from 'react'
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux';
import { packageInfoHandler } from '../../../common/redux/action';
import { useEffect } from 'react';
function Step2(props) {
    const dispatch = useDispatch()
    const { packageInfo } = useSelector(state => state.superData)

    let { step, onPrevious, onNext } = props;
    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm();


    const [profileNumbers, setprofileNumbers] = useState([
        { value: '1', label: 1 },
        { value: '2', label: 2 },
        { value: '3', label: 3 },
        { value: '4', label: 4 },
        { value: '5', label: 5 },
        { value: '6', label: 6 },
        { value: '7', label: 7 },
        { value: '8', label: 8 },
        { value: '9', label: 9 },
        { value: '10', label: 10 },
    ])

    const [val, setVal] = useState({
        profileNumber: "",
        monthlyINR: "",
        monthlyUSD: "",
        yearlyINR: "",
        yearlyUSD: "",
        percentage: "",
        trial: false,
        trialDay: 1
    });
    const [total, setTotal] = useState({
        INR: 0,
        USD: 0
    });
    const [error, seterror] = useState();

    const submitHandler = () => {

        let flag = false;

        let errorData = {};
        let subArr = [];
        for (const property in val) {


            if (property != 'percentage' && property != 'trial') {
                if (val[property] == 0 && val.trial == true) {

                }
                else if (val[property] == "" || val[property] == undefined) {
                    flag = true;
                    subArr.push({
                        [property]: `${property} is required`,
                    });
                }
            }

            errorData = {
                ...errorData,
                err: subArr,
            };
            seterror(subArr);
        }


        if (!flag) {
            let item = {
                ...packageInfo,
                step2: val
            }
            dispatch(packageInfoHandler(item));
            onNext()
        }

    }

    useEffect(() => {
        setVal({
            profileNumber: packageInfo?.step2?.profileNumber,
            monthlyINR: packageInfo?.step2?.monthlyINR,
            monthlyUSD: packageInfo?.step2?.monthlyUSD,
            yearlyINR: packageInfo?.step2?.yearlyINR,
            yearlyUSD: packageInfo?.step2?.yearlyUSD,
            percentage: packageInfo?.step2?.percentage,
            trial: packageInfo?.step2?.trial,
            trialDay: packageInfo?.step2?.trialDay || 1
        })

        if (packageInfo?.step1) {
            let INRamount = 0;
            let USDamount = 0;

            packageInfo?.step1.map(el => {
                INRamount += el.INRAmount;
                USDamount += el.USDAmount;
            })
            setTotal({
                INR: INRamount,
                USD: USDamount
            })
        }

    }, [packageInfo]);

    const HandleTrial = (e) => {
        if (e.target.checked) {
            setVal({
                ...val,
                trial: true,
            })
        }
        else {
            setVal({
                ...val,
                trial: false,
            })
        }
    }


    const HandleMontINR = (e) => {

        if (val.percentage) {
            let Rs = Number(e.target.value) * 12;
            let moduleRs = (Number(Rs) * Number(val.percentage)) / 100;
            let yearPackage = Number(Rs) - Number(moduleRs);
            setVal({
                ...val,
                yearlyINR: yearPackage.toFixed(2),
                monthlyINR: e.target.value
            });
        }
        else {
            setVal({
                ...val,
                monthlyINR: e.target.value
            });
        }

    }

    const HandleMontlyUSD = e => {
        if (val.percentage) {
            let Rs = Number(e.target.value) * 12;
            let moduleRs = (Number(Rs) * Number(val.percentage)) / 100;
            let yearPackage = Number(Rs) - Number(moduleRs);
            setVal({
                ...val,
                yearlyUSD: yearPackage?.toFixed(2),
                monthlyUSD: e.target.value
            });
        }
        else {
            setVal({
                ...val,
                monthlyUSD: e.target.value
            });
        }
    }

    const HandleYearINR = e => {
        if (val.percentage) {
            let yearPackage = Number(e.target.value) / 12;
            let moduleRs = (Number(yearPackage) * Number(val.percentage)) / 100
            let monthPackage = Number(yearPackage) + Number(moduleRs);
            setVal({
                ...val,
                yearlyINR: e.target.value,
                monthlyINR: monthPackage?.toFixed(2)
            });
        } else {
            setVal({
                ...val,
                yearlyINR: e.target.value
            });
        }

    }

    const HandleYearUSD = e => {
        if (val.percentage) {
            let yearPackage = Number(e.target.value) / 12;
            let moduleRs = (Number(yearPackage) * Number(val.percentage)) / 100
            let monthPackage = Number(yearPackage) + Number(moduleRs);
            setVal({
                ...val,
                yearlyUSD: e.target.value,
                monthlyUSD: monthPackage?.toFixed(2)
            });
        } else {
            setVal({
                ...val,
                yearlyUSD: e.target.value
            });
        }
    }

    const HandlePer = e => {


        let monthPackage;
        let USDyearPackage;
        let usdmonthPackage;

        if (val.yearlyINR || val.monthlyINR) {
            if (val.yearlyINR == undefined || val.yearlyINR == '') {
                let Rs = Number(val.monthlyINR) * 12;
                let moduleRs = (Number(Rs) * Number(e.target.value)) / 100;
                let yearPackage = Number(Rs) - Number(moduleRs);
                val.yearlyINR = yearPackage
                setVal(val);
            }

            else {
                let yearPackage = Number(val.yearlyINR) / 12;
                let moduleRs = (Number(yearPackage) * Number(e.target.value)) / 100
                monthPackage = Number(yearPackage) + Number(moduleRs);
                val.monthlyINR = monthPackage
                setVal(val);
            }
        }



        if (val.yearlyUSD || val.monthlyUSD) {
            if (val.yearlyUSD == undefined || val.yearlyUSD == '') {
                let Rs = Number(val.monthlyUSD) * 12;
                let moduleRs = (Number(Rs) * Number(e.target.value)) / 100;
                USDyearPackage = Number(Rs) - Number(moduleRs);
                val.yearlyUSD = USDyearPackage
                setVal(val);
            }
            else {
                let yearPackage = Number(val.yearlyUSD) / 12;
                let moduleRs = (Number(yearPackage) * Number(e.target.value)) / 100
                usdmonthPackage = Number(yearPackage) + Number(moduleRs);
                val.monthlyUSD = usdmonthPackage
                setVal(val);
            }

        }
        setVal({
            ...val,
            percentage: e.target.value
        })



    }



    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row campaign_form border border-1 p-2 package_step2">
                <div className="col-12 col-lg-6 field_box">
                    <label>Number of Profile Access</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="profileNumber"
                            {...register("profileNumber")}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    menuPosition={'fixed'}
                                    classNamePrefix="form_dropdown"
                                    placeholder="Select Number of Profiles"
                                    options={profileNumbers}
                                    value={profileNumbers?.find(x => x.value == val.profileNumber)}
                                    onChange={(e) => {
                                        onChange(e);
                                        setVal({
                                            ...val,
                                            profileNumber: e.value
                                        });
                                    }}
                                />
                            )}
                        />
                        <p className="error">{error?.find(error => error.profileNumber)?.profileNumber}</p>
                    </div>
                    <div className='row row-cols-1 row-cols-md-2 pb-2 pt-2'>
                        <p className='p-0 ps-1'>Total INR: <b>{total.INR}</b></p>
                        <p className='p-0 ps-1'>Total USD: <b>{total.USD}</b></p>
                    </div>
                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label className='form-check-label ps-1'>
                        Monthly Package
                    </label>
                    <div className='row row-cols-1 row-cols-md-2'>
                        <div className="form_field col p-1 pt-2">
                            <Controller
                                control={control}
                                name="monthlyINR"
                                {...register("monthlyINR")}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className="user-box-input"
                                        placeholder="INR"
                                        value={val.monthlyINR}
                                        onChange={(e) => {
                                            HandleMontINR(e)
                                        }}
                                    />
                                )}
                            />
                            <p className="error">{error?.find(error => error.monthlyINR)?.monthlyINR}</p>
                        </div>

                        <div className="form_field col pt-2">
                            <label className='form-check-label'> </label>
                            <Controller
                                control={control}
                                name="monthlyUSD"
                                {...register("monthlyUSD")}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className="user-box-input"
                                        placeholder="USD"
                                        value={val.monthlyUSD}
                                        onChange={(e) => {

                                            HandleMontlyUSD(e, 'monthlyUSD')


                                        }}
                                    />
                                )}
                            />
                            <p className="error">{error?.find(error => error.monthlyUSD)?.monthlyUSD}</p>
                        </div>
                    </div>

                    <div className='form_field p-1'>
                        <input type='number' className="user-box-input" placeholder='%' value={val.percentage}
                            onChange={(e) =>
                                HandlePer(e)
                            }
                        />
                    </div>

                    <label className='form-check-label ps-1'>
                        Yearly Package
                    </label>
                    <div className='row row-cols-1 row-cols-md-2'>
                        <div className="form_field col p-1 pt-2">
                            <Controller
                                control={control}
                                name="yearlyINR"
                                {...register("yearlyINR")}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        type='number'
                                        className="user-box-input"
                                        placeholder="INR"
                                        value={val.yearlyINR}
                                        onChange={(e) => {

                                            HandleYearINR(e)
                                        }}
                                    />
                                )}
                            />
                            <p className="error">{error?.find(error => error.yearlyINR)?.yearlyINR}</p>
                        </div>
                        <div className="form_field col pt-2">
                            <Controller
                                control={control}
                                name="yearlyUSD"
                                {...register("yearlyUSD")}
                                render={({ field: { onChange, value } }) => (
                                    <input
                                        className="user-box-input"
                                        placeholder="USD"
                                        value={val.yearlyUSD}
                                        onChange={(e) => {
                                            HandleYearUSD(e)

                                        }}
                                    />
                                )}
                            />
                            <p className="error">{error?.find(error => error.yearlyUSD)?.yearlyUSD}</p>
                        </div>
                    </div>

                    <div className='row row-cols-1 row-cols-md-2'>
                        <div className="form_field col p-1 pt-2">
                            <input type='checkbox' className='ms-1 me-1' checked={val.trial} onChange={(e) => HandleTrial(e)} />
                            <label>Trial</label>
                        </div >
                        {
                            val.trial &&
                            <div className="form_field col pt-2">

                                <Controller
                                    control={control}
                                    name="trialDay"
                                    {...register("trialDay")}
                                    render={({ field: { onChange, value } }) => (
                                        <input
                                            type='number'
                                            className="user-box-input"
                                            placeholder="Trial Days"
                                            value={val.trialDay}
                                            onChange={(e) => {
                                                setVal({
                                                    ...val,
                                                    trialDay: e.target.value
                                                })
                                            }}
                                        />
                                    )}
                                />
                                <p className="error">{error?.find(error => error.trialDay)?.trialDay}</p>
                            </div >
                        }

                    </div >
                </div>
            </div>

            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className='next' type='submit' disabled={step === 3}>
                    Next
                </button>
            </div>
        </form>

    )
}

export default Step2