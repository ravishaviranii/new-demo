import React from 'react';
import { APIcreateTime, APIupdateTime } from '../../../api-wrapper/scheduler-wrapper/ApiTime';
import { addTimeSchema } from '../../../utility/validator';
import { useEffect } from 'react';
import { Toast, useDispatch, useForm, yupResolver, Controller } from "../../../helper/links/Link";
function AddTime({ setTimeModal, scheduleId, formData, setFormData, addFlag, setAddFlag, getTime, timeId }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        control
    } = useForm({
        resolver: yupResolver(addTimeSchema)
    });
    const dispatch = useDispatch()

    const mainLabel = [
        { value: 'Sunday', label: 'Sunday' },
        { value: 'Monday', label: 'Monday' },
        { value: 'Tuesday', label: 'Tuesday' },
        { value: 'Wednesday', label: 'Wednesday' },
        { value: 'Thursday', label: 'Thursday' },
        { value: 'Friday', label: 'Friday' },
        { value: 'Saturday', label: 'Saturday' },
    ];

    const submitHandler = data => {

        let sendData = {
            dayName: data.dayName,
            startTime: data.startTime,
            endTime: data.endTime,
        }
        if (timeId) {
            APIupdateTime(sendData,scheduleId,timeId)
                .then((res) => {
                    if (res.isSuccess) {
                      
                        Toast.success(res.message)
                        getTime()
                        setTimeModal(false)
                    }
                    else {
                      
                        Toast.error(res.message)
                    }
                }).catch((err) => {
                   

                    Toast.error("Something went wrong, please try again")

                });
        }
        else {
            APIcreateTime(sendData, scheduleId)
                .then((res) => {
                    if (res.isSuccess) {
                  
                        Toast.success(res.message)
                        getTime()
                        setTimeModal(false)
                    }
                    else {
              
                        Toast.error(res.message)

                    }
                }).catch((err) => {
                   
                    Toast.error("Something went wrong, please try again")
                });
        }

    }

    useEffect(() => {
        if (formData) {
            reset(formData)
        }
        if (addFlag) {
            setValue('dayName', null)
            setValue('startTime', null)
            setValue('endTime', null)
            setAddFlag(false)
        }
    }, [formData]);




    return (
        <form className='mb-4' onSubmit={handleSubmit(submitHandler)}  >
            <div className='row  p-4'>

                <div className='col-lg-12 form_group'>
                    <label>Day Of Week</label>
                    <Controller
                        control={control}
                        name="dayName"
                        {...register("dayName")}
                        render={({ field }) => (
                            <select className="form_rule" {...field}>
                                <option hidden>Select</option>
                                {mainLabel.map((el, i) => (
                                    <option value={el.value} key={i}>
                                        {el.label}
                                    </option>
                                ))}
                            </select>
                        )}
                    />
                    {errors.dayName && <p className="error">{errors.dayName.message}</p>}
                </div>
             

                <div className='form_group'>
                    <label>Start Time</label>
                    <Controller
                        control={control}
                        {...register("startTime")}
                        render={({ field }) => (
                            <input
                                type="time"
                                className='input_rule'
                                {...field}
                            />
                        )}
                    />
                    {errors.startTime && <p className="error">{errors.startTime.message}</p>}
                </div>

                <div className='form_group'>
                    <label>End Time</label>
                    <Controller
                        control={control}
                        {...register("endTime")}
                        render={({ field }) => (
                            <input
                                type="time"
                                className='input_rule'
                                {...field}
                            />
                        )}
                    />
                    {errors.endTime && <p className="error">{errors.endTime.message}</p>}
                </div> 

            </div>
          
            <div className='form_btn mt-3'>
                    <button className="cancel_btn" type='button' onClick={() => setTimeModal(false)}>  Cancel </button>
                    <button className="save_btn" type="submit"  >Apply</button>
                </div>
        </form>
    )
}

export default AddTime