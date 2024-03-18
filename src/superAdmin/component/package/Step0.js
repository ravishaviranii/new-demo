import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { packageInfoHandler } from '../../../common/redux/action';
import { useEffect } from 'react';

function Step0(props) {
    const dispatch = useDispatch()
    const { packageInfo } = useSelector(state => state.superData)

    let { step, onPrevious, onNext } = props;
    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        setValue,
        reset,
        formState: { errors },
    } = useForm();

    const [val, setval] = useState({
        packageName: "",
        type: []
    });
    const [error, seterror] = useState();
    const typeHandler = (e) => {

        const { value, checked } = e.target;
        let arr = val.type || [];
        if (checked) {


            setval({
                ...val,
                type: [...arr, value]
            })
        } else {
            setval({
                ...val,
                type: arr.filter((item) => item !== value)
            })

        }
    };



    const submitHandler = () => {

        let flag = false;

        let errorData = {};
        let subArr = [];
        for (const property in val) {

            if (val[property] == "" || val[property] == undefined) {
                flag = true;
                subArr.push({
                    [property]: `${property} is required`,
                });
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
                step0: val
            }
            dispatch(packageInfoHandler(item));
            onNext()
        }

    }

    useEffect(() => {

        setval({
            packageName: packageInfo?.step0?.packageName,
            type: packageInfo?.step0?.type
        })
    }, [packageInfo]);


    return (

        <form onSubmit={handleSubmit(submitHandler)}>
            <div className="row campaign_form border border-1 p-2">
                <div className="col-12 col-lg-6 field_box">
                    <label>Package Name</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="packageName"
                            {...register("packageName")}
                            render={({ field: { onChange, value } }) => (
                                <input
                                    className="user-box-input"
                                    placeholder="Enter Package Name"
                                    value={val.packageName}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            packageName: e.target.value
                                        });

                                    }}
                                />
                            )}
                        />
                        <p className="error">{error?.find(error => error.packageName)?.packageName}</p>

                    </div>
                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label>Types Of Sponsored Ads</label>
                    <div className="form_field pt-3">
                        <Controller
                            control={control}
                            name="type"
                            render={({ field }) => (
                                <>
                                    <input
                                        className='form-check-input'
                                        type="checkbox"
                                        checked={val?.type?.includes('Sponsored Products')}
                                        value="Sponsored Products"
                                        onChange={(e) => {
                                            typeHandler(e);
                                        }}

                                    />
                                    <label className='form-check-label'>Products</label>
                                    <input
                                        className='form-check-input'
                                        type="checkbox"
                                        value="Sponsored Display"
                                        checked={val?.type?.includes('Sponsored Display')}
                                        onChange={(e) => {
                                            typeHandler(e)
                                        }}
                                    />
                                    <label className='form-check-label'>Display</label>
                                    <input
                                        className='form-check-input'
                                        type="checkbox"
                                        value="Sponsored Brands"
                                        checked={val?.type?.includes('Sponsored Brands')}
                                        onChange={(e) => {
                                            typeHandler(e);
                                        }}
                                    />
                                    <label className='form-check-label'>Brands</label>
                                </>
                            )}
                        />
                        <p className="error">{error?.find(error => error.type)?.type}</p>
                    </div>
                </div>

            </div>
            <hr />
            <div className='package_btn'>
                <button className='previous' onClick={onPrevious} disabled={step === 0}>
                    Previous
                </button>
                <button className='next' disabled={step === 3} type="submit">
                    Next
                </button>
            </div>

        </form>


    )
}

export default Step0