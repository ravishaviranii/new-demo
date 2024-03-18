import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Toast,
    Controller,
} from "../../../helper/links/Link";
import { Modal } from "react-bootstrap";
import Select from 'react-select';
import { ApiCategoryList, ApiCreate } from '../../../api-wrapper/supportSystem/SupportSystem';
import { useTranslation } from 'react-i18next';

function AddTicket({ addFlag, setAddFlag, HandleList }) {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        control,
        reset,
        setValue,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [category, setCategory] = useState([]);

    useEffect(() => {
        if (addFlag){
            let arr = []
            ApiCategoryList()
                .then((res) => {
                    if (res.isSuccess) {
                        res.data.map(el => {
                            arr.push({
                                label: el.categoryName,
                                value: el._id
                            })
                        })
                        setCategory(arr)
                    }
                    else {
                        setCategory([])
                        Toast.error(res.message);
                    }
                }).catch((err) => {
                    Toast.error("Somthing went wrong");
                });
        }
      
    }, [addFlag])

    console.log(addFlag,"addFlag")

    useEffect(() => {
        clearErrors()
        reset()
    }, [addFlag]);

    const submitHandler = (data) => {

        let sendData = {
            categoryId: data.category.value,
            title: data.title,
            message: data.message
        }
        ApiCreate(sendData)
            .then((res) => {

                if (res.isSuccess) {
                    Toast.success(res.message);
                    reset()
                    HandleList()
                    setAddFlag(false)
                }
                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });


    }


    return (
        <Modal show={addFlag} onHide={() => setAddFlag(false)} centered size="lg">
            <Modal.Header className="campaign_modal_head">
                <div className="col-11 modal_title_box">
                    <p>{t("ticket")}</p>
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
                <form onSubmit={handleSubmit(submitHandler)} className="campaign_form row">
                    <div className="col-6 field_box">
                        <label>{t("categorytype")}</label>
                        <div className='form_field' >

                            <Controller
                                name="category"
                                control={control}
                                rules={{ required: t("categoryIsRequired") }}
                                {...register('category')}
                                render={({ field: { onChange, value } }) => (
                                    <Select
                                        classNamePrefix="form_dropdown"
                                        placeholder={t("selectcategory")}
                                        options={category}

                                        onChange={(e) => {
                                            onChange(e);
                                        }}
                                    />
                                )}
                            />
                            {errors.category && (
                                <p className="error">{errors.category.message}</p>
                            )}

                        </div>
                    </div>
                    <div className="col-6 field_box">
                        <label>{t("title")}</label>
                        <div className='form_field'>
                            <Controller
                                control={control}
                                name="title"
                                rules={{ required: t("titleIsRequired") }}
                                {...register("title")}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        {...field}
                                        placeholder={t("entertitle")}
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        {errors.title && (
                            <p className="error">{errors.title.message}</p>
                        )}

                    </div>

                    <div className="col-12 field_box">
                        <label>{t("message")}</label>
                        <div className='form_field'>
                            <Controller
                                control={control}
                                name="message"
                                rules={{ required: t("messageIsRequired") }}
                                {...register("message")}
                                render={({ field }) => (

                                    <textarea  {...field}
                                        placeholder={t("entermessage")}
                                        rows="4" cols="50"
                                        value={field.value}
                                        onChange={(e) => {
                                            field.onChange(e.target.value);
                                        }}
                                    ></textarea>

                                )}
                            />
                        </div>
                        {errors.message && (
                            <p className="error">{errors.message.message}</p>
                        )}

                    </div>
                    <div className="form_btn">
                        <button className="cancel_btn" type="button" onClick={() => setAddFlag(false)}>
                            {t("cancel")}
                        </button>
                        <button className="save_btn" type="submit">
                            {t("submit")}
                        </button>
                    </div>
                </form>

            </Modal.Body>
        </Modal>
    )
}

export default AddTicket