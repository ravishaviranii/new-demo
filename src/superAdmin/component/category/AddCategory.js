import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Toast,
    Controller,
} from '../../../admin/helper/links/Link';
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import { ApiCreate, ApiUpdate } from '../../api-wrapper/ApiCategory';
function AddCategory({ addFlag, setAddFlag, editData, setEditData, HandleList }) {
    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();


    const submitHandler = (data) => {
        if (editData == undefined) {

            ApiCreate(data)
                .then((res) => {

                    if (res.isSuccess) {
                        Toast.success(res.message);
                        reset()
                        HandleList()
                        setEditData()
                        setAddFlag(false)
                    }
                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }
        else {
            ApiUpdate(data, editData._id)
                .then((res) => {

                    if (res.isSuccess) {
                        Toast.success(res.message);
                        HandleList()
                        setEditData()
                        setAddFlag(false)
                        reset()
                    }
                    else {
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }
    }

    useEffect(() => {
        if (editData) {
            reset(editData)
        }
        clearErrors()
    }, [editData, addFlag]);

    return (
        <Modal show={addFlag} onHide={() => setAddFlag(false)} centered size="lg">
            <Modal.Header className="campaign_modal_head">
                <div className="col-11 modal_title_box">
                    <p>Category</p>
                </div>
                <div className="col-1">
                    <i
                        className="fa fa-times red modal_close_box"
                        aria-hidden="true"
                        onClick={() => setAddFlag(false)}
                    ></i>
                </div>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleSubmit(submitHandler)} className="campaign_form">
                    <div className="col-12 field_box">
                        <label>Name</label>
                        <div className='form_field'>
                            <Controller
                                control={control}
                                name="categoryName"
                                rules={{ required: "categoryName is required" }}
                                {...register("categoryName")}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        {...field}
                                        placeholder="Enter categoryName"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.categoryName && (
                            <p className="error">{errors.categoryName.message}</p>
                        )}

                    </div>

                    <div className="form_btn">
                        <button className="cancel_btn" type="button" onClick={() => setAddFlag(false)}>
                            Cancel
                        </button>
                        <button className="save_btn" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}

export default AddCategory