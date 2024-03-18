import React, { useEffect, useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import {
    Toast,
    useForm,
    Controller,
} from "../../../admin/helper/links/Link";
import { ProfileContext } from "../../../admin/helper/usecontext/useContext";
import Select from 'react-select'
import { ApiTypeList, ApiCreate, ApiActiveCustomer } from '../../api-wrapper/ApiUtility';
import { DatePicker } from "rsuite";
import moment from "moment-timezone";

function Add(props) {

    const { show, setShow, addFlag, HandleList } = props;
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [customer, setCustomer] = useState([]);
    const [type, setType] = useState([]);

    useEffect(() => {
        if (show) {
            let arr = []

            ApiActiveCustomer()
                .then((res) => {
                    if (res.isSuccess) {
                        res.data.map(el => {
                            arr.push({
                                label: el.fullName,
                                value: el._id
                            })
                        })
                        setCustomer(arr)
                    }
                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }


    }, [show]);

    useEffect(() => {
        if (show) {
            let arr = []

            ApiTypeList()
                .then((res) => {
                    if (res.isSuccess) {

                        res.data.map(el => {

                            arr.push({
                                label: el.cronName,
                                value: el._id
                            })
                        })
                        setType(arr)
                    }

                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }


    }, [show]);

    const submitHandler = (data) => {
        const startDate = moment(data.startDate);
        const endDate = moment(data.endDate);

        let sendData = {
            customerId: data.customerId.value,
            startDate: startDate.format("YYYY-MM-DD"),
            endDate: endDate.format("YYYY-MM-DD"),
            type: data.type.value
        };

        if (startDate.diff(endDate, 'days') > 0) {
            Toast.error('Date is not valid !!');
        } else {
            ApiCreate(sendData)
                .then((res) => {
                    if (res.isSuccess) {
                        HandleList()
                        Toast.success(res.message);
                    }
                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });


            setShow(false)
        }


    }

    useEffect(() => {
        if (addFlag) {
            clearErrors()
            setValue("startDate", null)
            setValue("endDate", null)
            setValue("customerId", null)
            setValue("type", null)
        }
    }, [show, addFlag]);



    return (
        <>
            <Modal show={show} onHide={() => setShow(false)} centered size="lg" className="add_utility">
                <Modal.Header className="campaign_modal_head">
                    <div className="col-11 modal_title_box">
                        <p>Utility</p>
                    </div>
                    <div className="col-1">
                        <i
                            className="fa fa-times red modal_close_box"
                            aria-hidden="true"
                            onClick={() => setShow(false)}
                        ></i>
                    </div>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <div className="row campaign_form">

                            <div className="col-12 field_box ">
                                <label>Start Date</label>
                                <div className="form_field full-height">
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        rules={{
                                            required: 'Start Date is required',

                                        }}
                                        render={({ field }) => (
                                            <>
                                                <DatePicker
                                                    className={`rangeDate utility_date`}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                        clearErrors('startDate');
                                                    }}
                                                    placeholder="Select Date"
                                                    placement='bottomEnd'
                                                    format="yyyy-MM-dd"
                                                    cleanable={false}
                                                />
                                                {errors.startDate && (
                                                    <p className="error">{errors.startDate.message}</p>
                                                )}
                                            </>
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="col-12 field_box ">
                                <label>End Date</label>
                                <div className="form_field full-height">

                                    <Controller
                                        name="endDate"
                                        control={control}
                                        rules={{
                                            required: 'End Date is required'

                                        }}
                                        render={({ field }) => (
                                            <>
                                                <DatePicker
                                                    className={`rangeDate utility_date`}
                                                    value={field.value}
                                                    onChange={(date) => {
                                                        field.onChange(date);
                                                        clearErrors('endDate');
                                                    }}
                                                    placeholder="Select Date"
                                                    placement='bottomEnd'
                                                    format="yyyy-MM-dd"
                                                    cleanable={false}
                                                />
                                                {errors.endDate && (
                                                    <p className="error">{errors.endDate.message}</p>
                                                )}
                                            </>
                                        )}
                                    />

                                </div>
                            </div>


                            <div className="col-12  field_box">
                                <label>Vendor</label>
                                <div className="form_field full-height">
                                    <Controller
                                        name="customerId"
                                        control={control}
                                        rules={{ required: 'Vendor is required' }}
                                        {...register('customerId')}
                                        render={({ field: { onChange, value } }) => (
                                            <Select

                                                classNamePrefix="form_dropdown"
                                                placeholder="Select Vendor"
                                                options={customer}
                                                value={customer?.find(x => x.value == value) || value}
                                                onChange={(e) => {
                                                    onChange(e);

                                                }}
                                            />
                                        )}
                                    />
                                    {errors.customerId && (
                                        <p className="error">{errors.customerId.message}</p>
                                    )}
                                </div>
                            </div>
                            <div className="col-12  field_box">
                                <label>Type</label>
                                <div className="form_field full-height">
                                    <Controller
                                        name="type"
                                        control={control}
                                        rules={{ required: 'Type is required' }}
                                        {...register('type')}
                                        render={({ field: { onChange, value } }) => (
                                            <Select
                                                menuPosition={'fixed'}
                                                classNamePrefix="form_dropdown"
                                                placeholder="Select Type"
                                                options={type}
                                                value={type?.find(x => x.value == value) || value}
                                                onChange={(e) => {
                                                    onChange(e);

                                                }}
                                            />
                                        )}
                                    />
                                    {errors.type && (
                                        <p className="error">{errors.type.message}</p>
                                    )}
                                </div>
                            </div>
                        </div>


                        <div className="modal_footer">
                            <button className="cancel_btn" type="button" onClick={() => setShow(false)}>
                                Cancel
                            </button>
                            <button className="save_btn" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>

                </Modal.Body>
            </Modal>
        </>
    )
}

export default Add