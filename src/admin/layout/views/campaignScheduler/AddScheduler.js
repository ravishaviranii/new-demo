import React, { useContext, useState } from 'react';
import { APIcreateSchedule, APIupdateSchedule } from '../../../api-wrapper/scheduler-wrapper/ApiSchedule';
import { Toast, useDispatch, useForm, yupResolver, } from "../../../helper/links/Link";
import { addScheduleSchema } from '../../../utility/validator';
import { useEffect } from 'react';
import { ProfileContext } from '../../../helper/usecontext/useContext';
import Time from './Time';
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import RuleSearch from '../../component/search/RuleSearch';
import { ApigetCampaign } from '../../../api-wrapper/budgetRule/ApiBudgetRule';
import { useTranslation } from "react-i18next";
function AddScheduler({ setAddSchedulerModal, editId, editData, getSchedule, addFlag, setAddFlag, copyallIds }) {
    const { t } = useTranslation();

    // -------------variable ------------//
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        control,
        setValue
    } = useForm({
        resolver: yupResolver(addScheduleSchema)
    });
    const dispatch = useDispatch()
    let { timezone, profileId, countryCode } = useContext(ProfileContext)

    //-------------function-----------//
    // cancel //
    const cancelHandler = () => {
        setAddSchedulerModal(false)
    }

    const [scheduleName, setscheduleName] = useState('');

    // submit data  //
    const submitHandler = (data) => {

        let sendData = {
            scheduleName: scheduleName,
            profileId: profileId?.value,
            countryCode: countryCode,
            timezone: timezone,
            times: mainRuleData,
            campaignIds: allIds
        }




        if (editId) {
            APIupdateSchedule(editId, sendData)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res.message)
                        setAddSchedulerModal(false)
                        getSchedule()
                    }
                    else {
                        Toast.error(res.message)
                    }
                }).catch((err) => {

                    Toast.error("Something went wrong, please try again")

                });
        }
        else {
            APIcreateSchedule(sendData)
                .then((res) => {
                    if (res.isSuccess) {
                        Toast.success(res.message)
                        setAddSchedulerModal(false)
                        getSchedule()
                    }
                    else {
                        Toast.error(res.message)
                    }
                }).catch((err) => {
                    Toast.error("Something went wrong, please try again")

                });
        }


    }

    //-------------useeffct-----------//

    useEffect(() => {

        if (editData) {
            setscheduleName(editData?.scheduleName)
            setMainRuleData(editData?.times)
            // setAllIds(editData?.campaignIds)
        }
        if (addFlag) {
            setValue('scheduleName', null)
            setscheduleName('')
            setMainRuleData([{
                dayName: "",
                startTime: "",
                endTime: ""
            }]
            );
            setAddFlag(false)
        }
    }, [editData]);


    const [mainRuleData, setMainRuleData] = useState([
        {
            dayName: "",
            startTime: "",
            endTime: "",
        },
    ]);
    const addConditionHandler = () => {
        setMainRuleData([
            ...mainRuleData,
            {
                dayName: "",
                startTime: "",
                endTime: "",
            },
        ]);
    };
    const mainLabel = [
        { value: 'Sunday', label: t("sunday") },
        { value: 'Monday', label: t("monday") },
        { value: 'Tuesday', label: t('Tuesday') },
        { value: 'Wednesday', label: t('wednesDay') },
        { value: 'Thursday', label: t('Thursday') },
        { value: 'Friday', label: t('Friday') },
        { value: 'Saturday', label: t('Saturday') },
    ];
    const handleRemoveRule = (index) => {
        const newData = [...mainRuleData];
        newData.splice(index, 1);
        setMainRuleData(newData);
    }

    const mainRuleChangeHandler = (e, obj, address_type, numberVal) => {
        if (address_type) {
            obj[address_type] = e.target.value;
        } else {
            obj[e.target.attributes["data-name"].value] = e.target.value;
        }
        setMainRuleData([...mainRuleData]);
    };


    // campaign detail //
    const [searchData, setSearchData] = useState([]);
    const [selectAllCheck, setselectAllCheck] = useState();
    const [allIds, setAllIds] = useState([]);



    useEffect(() => {

        let arr = [];

        let data = {
            profileId: profileId?.value
        }
        ApigetCampaign(data)
            .then((res) => {
                if (res.isSuccess) {
                    if (res.data.length == allIds?.length) {
                        setselectAllCheck(true);
                    } else {
                        setselectAllCheck(false);
                    }
                    res.data.map((el) => {
                        arr.push({
                            campaignId: el.campaignId,
                            name: el.name,
                            type: el.type,
                            status: el.status
                        });
                    });
                } else {

                }
                setSearchData(arr);

            })
            .catch((err) => {

                Toast.error(err);
            });
    }, []);
    useEffect(() => {
        if (copyallIds) {
            setAllIds(copyallIds);
        }
    }, [copyallIds]);

    return (
        <>
            <form className='mb-1 mt-2 new_rule' >

                <div className='col-lg-12 p-3 m-auto form_group'>
                    <label>{t('scheduleName')} :</label>
                    <input type="text" value={scheduleName} onChange={(e) => setscheduleName(e.target.value)} placeholder={t("enterScheduleName")} />
                    {/* {errors.scheduleName && <p className="error">{errors.scheduleName.message}</p>} */}
                </div>

                <div className="row mt-2">
                    <div className="col-11">
                        <label>{t('time')} :</label>
                    </div>
                    <div className="col-1 text-end">
                        <AiOutlinePlus size={22} className="plus_icon" onClick={() => addConditionHandler()} />
                    </div>
                </div>
                {
                    mainRuleData?.map((element, index) => {
                        return (
                            <div className="row mb-2 main_row scheduler_row">
                                <div className="" >
                                    <select
                                        className="form_rule"
                                        name="dayName"
                                        {...register(`main.${index}.dayName`, {
                                            onChange: (e) =>
                                                mainRuleChangeHandler(e, element, "dayName"),
                                        })}
                                        value={element.dayName}

                                    >
                                        <option selected >{t('day')}</option>
                                        {mainLabel.map((el, i) => (
                                            <>

                                                <option value={el.value} key={i}>
                                                    {el.label}
                                                </option>
                                            </>

                                        ))}
                                    </select>

                                    {/* {errorFun(index, "conditionType", "condition")} */}
                                </div>
                                <div className="" >

                                    <input
                                        data-name="startTime"
                                        type="time"
                                        className='input_rule'
                                        {...register(`mainRuleData.${index}.startTime`, {
                                            onChange: (e) => mainRuleChangeHandler(e, element, ''),
                                        })}
                                        value={element.startTime}
                                    />
                                    {/* {errorFun(index, "conditionOperator", "condition")} */}

                                </div>
                                <div className="" >

                                    <input
                                        type="time"
                                        data-name="endTime"
                                        className="form_rule"

                                        {...register(`mainRuleData.${index}.endTime`, {
                                            onChange: (e) => mainRuleChangeHandler(e, element, ''),
                                        })}
                                        value={element.endTime}

                                    />

                                    {/* {errorFun(index, "conditionValue", "condition")} */}

                                </div>


                                <div className="minus_icon" >
                                    {
                                        index != 0 &&
                                        <AiFillDelete size={22} className="icon" onClick={() => handleRemoveRule(index)} />
                                    }

                                </div>

                            </div>


                        )
                    })
                }

                {/* campaign detail */}



                {/* time */}
                {/* <Time
                    // scheduleId={scheduleId}
                    getSchedule={getSchedule}
                // copyallIds={copyallIds}
                /> */}
            </form>
            <div className="row campaign_section">
                <h5>{t('associatedCampaigns')}:</h5>
                <RuleSearch
                    campaignList={searchData}
                    allIds={allIds}
                    setAllIds={setAllIds}
                    campaignIds={copyallIds}
                    selectAllCheck={selectAllCheck}
                    setselectAllCheck={setselectAllCheck}
                />

            </div>

            <div className='form_btn mt-3 mb-3'>
                <button className="cancel_btn" type='button' onClick={() => cancelHandler()}>{t('cancel')}</button>
                <button className="save_btn" type="button" onClick={() => submitHandler()}  >{t('submit')}</button>
            </div>
        </>
    )
}

export default AddScheduler;
