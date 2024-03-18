
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select'
import { ApiCountryList } from '../../api-wrapper/ApiVendor';
import {
    Toast,
    useForm,
    Controller,
} from "../../../admin/helper/links/Link";
import { vendorInfoHandler } from '../../../common/redux/action';
function Step0(props) {
    const { vendorInfo } = useSelector(state => state.superData)
    let { step, onPrevious, onNext } = props;
    const {
        register,
        handleSubmit,
        control,
        setValue,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm();

    let dispatch = useDispatch()

    const [val, setval] = useState({
        fullName: "",
        phoneNumber: "",
        country: "",
        email: "",
        password: "",

    });
    const [error, seterror] = useState();
    const [countryList, setCountryList] = useState([]);
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
                ...vendorInfo,
                step0: val
            }
            dispatch(vendorInfoHandler(item));
            onNext()
        }
    }


    useEffect(() => {
        let arr = []
        ApiCountryList()
            .then((res) => {
                if (res.isSuccess) {
                    res.data.map(el => {
                        arr.push({
                            label: el.countryName,
                            value: el._id
                        })
                    })
                    setCountryList(arr)
                }

                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }, []);


    useEffect(() => {

        setval({
            fullName: vendorInfo?.step0?.fullName,
            phoneNumber: vendorInfo?.step0?.phoneNumber,
            country: vendorInfo?.step0?.country,
            email: vendorInfo?.step0?.email,
            password: vendorInfo?.step0?.password,
        })
    }, [vendorInfo]);

    return (
        <form onSubmit={handleSubmit(submitHandler)} >
            <div className="row campaign_form  p-2">
                <div className="col-12 col-lg-6 field_box">
                    <label> Name</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="fullName"
                            {...register("fullName")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter name"
                                    value={val.fullName}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            fullName: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />

                    </div>
                    <p className="error">{error?.find(error => error.fullName)?.fullName}</p>

                </div>

                <div className="col-12 col-lg-6 field_box">
                    <label>Email</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="email"
                            {...register("email")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Email"
                                    value={val.email}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            email: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />
                    </div>
                    <p className="error">{error?.find(error => error.email)?.email}</p>
                </div>
                <div className="col-12 col-lg-6 field_box">
                    <label>Mobile Number</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="number"
                            {...register("phoneNumber")}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    className="user-box-input"
                                    placeholder="Enter Mobile Number"
                                    value={val.phoneNumber}
                                    onChange={(e) => {
                                        setval({
                                            ...val,
                                            phoneNumber: e.target.value
                                        })
                                    }}
                                />
                            )}
                        />

                    </div>
                    <p className="error">{error?.find(error => error.phoneNumber)?.phoneNumber}</p>
                </div>
                {
                    vendorInfo?.edit == true ? null :

                        <div className="col-12 col-lg-6 field_box">
                            <label>Password</label>
                            <div className="form_field">
                                <Controller
                                    control={control}
                                    name="password"
                                    {...register("password")}
                                    render={({ field }) => (
                                        <input
                                            {...field}
                                            className="user-box-input"
                                            placeholder="Enter Password"
                                            value={val.password}
                                            onChange={(e) => {
                                                setval({
                                                    ...val,
                                                    password: e.target.value
                                                })
                                            }}
                                        />
                                    )}
                                />

                            </div>
                            <p className="error">{error?.find(error => error.password)?.password}</p>
                        </div>
                }

                <div className="col-12 col-lg-6 field_box ">
                    <label>Country</label>
                    <div className="form_field">
                        <Controller
                            control={control}
                            name="country"
                            {...register("country")}
                            render={({ field: { onChange, value } }) => (
                                <Select
                                    menuPosition={'fixed'}
                                    classNamePrefix="form_dropdown"
                                    placeholder="Select Country"
                                    options={countryList}
                                    value={countryList?.find(x => x.value == val.country)}
                                    onChange={(e) => {
                                        onChange(e);
                                        setval({
                                            ...val,
                                            country: e.value
                                        });
                                    }}
                                />
                            )}
                        />
                    </div>

                    <p className="error">{error?.find(error => error.country)?.country}</p>
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

export default Step0