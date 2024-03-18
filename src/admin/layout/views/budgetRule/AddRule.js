import React, { useState, useContext, useEffect } from 'react'
import { ApicreateRule, ApiupdateRule, ApiRuleConditions } from '../../../api-wrapper/budgetRule/ApiBudgetRule';
import { ProfileContext } from '../../../helper/usecontext/useContext';
import { handleLoader, Toast, useDispatch, useForm, } from "../../../helper/links/Link";
import { AiOutlinePlus } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { useTranslation } from "react-i18next";

function AddRule({ setaddModalFlag, setEditId, editId, getRule }) {
  const { t } = useTranslation();

  const {
    register,
    formState: { errors },
    reset,
  } = useForm({});
  const subValueType = [
    { value: "Paused", label: t("CampaignPaused") },
    { value: "Enabled", label: t("CampaignEnabled") },
    { value: "Increase", label: t("IncreaseBudget") },
    { value: "Decrease", label: t("DecreaseBudget") },
    { value: "setBudget", label: t("SetBudget") },
  ];
  const subLabel = [{ value: "Budget", label: "Budget" }];
  const mainLabel = [
    { value: "Budget", label: t("Budget") },
    { value: "Spend", label: t("spend") },
    { value: "ROAS", label: t("roas") },
    { value: "Sales", label: t("sales") },
    { value: "ACOS", label: t("acos") },
    { value: "Orders", label: t("Orders") },
    { value: "Impressions", label: t("impressions") },
    { value: "CPC", label: t("cpc") },
    { value: "Clicks", label: t("clicks") },
  ];
  const validatorLabel = [
    { value: "LESS_THAN", label: t("lessThan") },
    { value: "LESS_THAN_OR_EQUAL_TO", label: t("lessThanOrEqualTo") },
    { value: "GREATER_THAN_OR_EQUAL_TO", label: t("greaterThanOrEqualTo") },
    { value: "GREATER_THAN", label: t("greaterThan") },
    { value: "EQUAL_TO", label: t("equalto") },
  ];
  const selector = [
    { value: "Number", label: t("number") },
    { value: "Percentage", label: t("percentage") },
  ];
  const dispatch = useDispatch();
  let { profileId, today } = useContext(ProfileContext);
  const [error, seterror] = useState();
  const [ruleName, setRuleName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();


    let flag = false;
    let sendData = {
      ruleName: ruleName,
      actionType: actionType,
      profileId: profileId?.value,
      conditions: mainRuleData,
      times: timeData
    };

    let errorData = {};
    if (sendData.ruleName == "") {
      flag = true;
      errorData = {
        ...errorData,
        ruleName: t("ruleNameIsRequired"),
      };
    }

    if (sendData.conditions) {
      let mainArr = [];
      sendData?.conditions?.map((el, index) => {
        let subArr = [];
        for (const property in el) {
          if (el[property] === "") {
            flag = true;
            subArr.push({
              [property]: `${property} is required`,
            });
            mainArr[index] = subArr;
          }
        }
      });
      errorData = {
        ...errorData,
        conditions: mainArr,
      };
    }
    if (sendData.actionType) {
      if (sendData?.actionType.actionName == '') {
        flag = true;
        errorData = {
          ...errorData,
          actionName: t("actionNameIsRequired"),
        };
      }
      if (sendData?.actionType.actionName == 'Increase' || sendData?.actionType.actionName == 'Decrease') {
        if (sendData?.actionType.actionValue == '') {
          flag = true;
          errorData = {
            ...errorData,
            actionValue: t("actionValueIsRequired"),
          };
        }
        if (sendData?.actionType.actionValueType == '') {
          flag = true;
          errorData = {
            ...errorData,
            actionValueType: t("actionValueTypeIsRequired"),
          };
        }
      }
    }

    let mainArrCheck = [];
    sendData?.times?.map((el, index) => {

      let subArr = []
      if (Object.keys(el).length === 0) {
        flag = true;
        subArr.push({
          Time: `Time is required`
        })
        mainArrCheck[index] = (t("timeIsRequired"))
      }

      errorData = {
        ...errorData,
        timesErr: mainArrCheck
      }

    })

    seterror(errorData);



    // API call //
    if (!flag) {
      dispatch(handleLoader(true));
      if (editId) {
        ApiupdateRule(editId, sendData)
          .then((res) => {
            if (res.isSuccess) {
              getRule()
              Toast.success(res.message);
              dispatch(handleLoader(false));
            } else {
              Toast.error(res.message);
              dispatch(handleLoader(false));
            }
            setaddModalFlag(false);
          })
          .catch((err) => {
            Toast.error(err);
            dispatch(handleLoader(false));
            setaddModalFlag(false);
          });
      } else {


        ApicreateRule(sendData)
          .then((res) => {
            if (res.isSuccess) {
              getRule()
              Toast.success(res.message);
              dispatch(handleLoader(false));
            } else {
              Toast.error(res.message);
              dispatch(handleLoader(false));
            }
            setaddModalFlag(false);
          })
          .catch((err) => {
            Toast.error(err);
            dispatch(handleLoader(false));
            setaddModalFlag(false);
          });
      }

      seterror()
    }

  };

  // get rules by id  //
  useEffect(() => {
    if (editId) {
      dispatch(handleLoader(true));
      ApiRuleConditions(editId)
        .then((res) => {
          if (res.isSuccess) {
            setRuleName(res.data.ruleName);
            setActionType(res.data.actionType)
            setMainRuleData(res.data.conditions)
            setTimeData(res.data.times)
            reset(res.data);
            dispatch(handleLoader(false))

          } else {
            Toast.error(res.message);
            dispatch(handleLoader(false));
          }
        })
        .catch((err) => {
          dispatch(handleLoader(false));
          Toast.error(err);
        });
    }
  }, []);


  const errorFun = (index, label, arrayName) => {
    let arr;
    if (arrayName == 'condition') {
      arr = error?.conditions[index];
    }
    if (arrayName == 'time') {
      arr = error?.time[index];
    }
    return (
      <>
        {arr?.map((obj, i) => {
          if (obj.hasOwnProperty(label)) {
            return (
              <p key={i} className="error">
                {obj[label]}
              </p>
            );
          }
        })}
      </>
    );
  };



  const [actionType, setActionType] = useState({
    actionName: '',
    actionValue: '',
    actionValueType: ''

  });
  const [mainRuleData, setMainRuleData] = useState([
    {
      conditionType: "",
      conditionOperator: "",
      conditionValue: "",
      conditionValueType: "",
    },
  ]);

  const [timeData, setTimeData] = useState([
    {},
  ]);




  const mainRuleChangeHandler = (e, obj, address_type, numberVal, index) => {
    let data = mainRuleData;

    if (address_type == "conditionValueType") {
      obj.conditionValue = ''
    }


    if (data[index]?.conditionValueType == 'Percentage') {
      const newValue = parseFloat(e.target.value);

      if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
        obj[e.target.attributes["data-name"].value] = e.target.value;
      }
      else {
        obj[e.target.attributes["data-name"].value] = "";
      }
    }
    else {
      if (address_type) {
        obj[address_type] = e.target.value;
      } else {
        obj[e.target.attributes["data-name"].value] = e.target.value;
      }
    }
    setMainRuleData([...mainRuleData]);
  };

  const addConditionHandler = () => {
    setMainRuleData([
      ...mainRuleData,
      {
        conditionType: "",
        conditionOperator: "",
        conditionValue: "",
        conditionValueType: "",
      },
    ]);
  };


  const handleTimeChange = (index, e) => {


    let arr = timeData
    arr[index] = e.target.value
    setTimeData([...arr])
  };

  const handleAddTimeField = () => {
    setTimeData([...timeData, {}]);
  };

  const handleRemoveTimeField = (index) => {

    let arr = timeData
    arr.splice(index, 1)
    setTimeData([...arr])
  };
  const handleRemoveRule = (index) => {
    const newData = [...mainRuleData];
    newData.splice(index, 1);
    setMainRuleData(newData);
  }


  const handleActionType = (e, numberVal) => {


    if (e.target.name == 'actionValueType') {
      setActionType({
        ...actionType,
        actionValue: "",
        actionValueType: e.target.value
      })

    }

    else if (e.target.name == "actionValue" && actionType.actionValueType == "Percentage") {
      const newValue = parseFloat(e.target.value);
      if (!isNaN(newValue) && newValue >= 0 && newValue <= 100) {
        setActionType({
          ...actionType,
          [e.target.name]: e.target.value
        })
      }
      else {
        setActionType({
          ...actionType,
          actionValue: "",
        })
      }
    }
    else if (e.target.value == 'Paused' || e.target.value == 'Enabled') {
      setActionType({
        actionName: e.target.value,
        actionValue: '',
        actionValueType: ''
      })
    }
    else {
      setActionType({
        ...actionType,
        [e.target.name]: e.target.value
      })


    }


  }


  return (
    <>
      <div className="new_rule">
        <form>
          {/* ------------- rule name ------------ */}
          <div className="row" >
            <div className="col-12">
              <label>{t('ruleName')}:</label>
              <input
                type="text"
                {...register(`ruleName`)}
                onChange={(e) => setRuleName(e.target.value)}
                value={ruleName}
                className="input_rule"
                placeholder={t("enterRuleName")}
              />
              <p className="error">{error?.ruleName && error.ruleName}</p>
            </div>
          </div>
          <div className="add_border"></div>


          {/* ------------- condition matrix ------------ */}
          <div className="row mt-2">
            <div className="col-11">
              <label>{t("conditions")}:</label>
            </div>
            <div className="col-1 text-end">
              <AiOutlinePlus size={22} className="plus_icon" onClick={() => addConditionHandler()} />
            </div>
          </div>

          {
            mainRuleData?.map((element, index) => {
              return (
                <div className="row mb-2 main_row">
                  <div className="" >
                    <select
                      className="form_rule"
                      name="conditionType"
                      {...register(`main.${index}.conditionType`, {
                        onChange: (e) =>
                          mainRuleChangeHandler(e, element, "conditionType", index),
                      })}
                      value={element.conditionType}
                    >
                      <option hidden>{t('select')}</option>
                      {mainLabel.map((el, i) => (
                        <option value={el.value} key={i}>
                          {el.label}
                        </option>
                      ))}
                    </select>

                    {errorFun(index, "conditionType", "condition")}
                  </div>
                  <div className="" >

                    <select
                      name="conditionOperator"
                      className="form_rule"
                      {...register(`main.${index}.conditionOperator`, {
                        onChange: (e) =>
                          mainRuleChangeHandler(
                            e,
                            element,
                            "conditionOperator"
                          ),
                      })}
                      value={element.conditionOperator}
                    >
                      <option hidden>{t('select')}</option>
                      {validatorLabel.map((el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </select>

                    {errorFun(index, "conditionOperator", "condition")}

                  </div>

                  <div className="" >

                    <select
                      name="conditionValueType"
                      className="form_rule "
                      {...register(`main.${index}.conditionValueType`, {
                        onChange: (e) =>
                          mainRuleChangeHandler(e, element, "conditionValueType"),
                      })}
                      value={element.conditionValueType}
                    >
                      <option hidden>{t('select')}</option>
                      {selector.map((el, i) => (
                        <option key={i} value={el.value}>
                          {el.label}
                        </option>
                      ))}
                    </select>

                    {errorFun(index, "conditionValueType", "condition")}

                  </div>
                  <div className="" >

                    <input
                      type="number"
                      data-name="conditionValue"
                      className="form_rule"
                      placeholder={t("value")}
                      {...register(`mainRuleData.${index}.conditionValue`, {
                        onChange: (e) => mainRuleChangeHandler(e, element, '', "numberValue", index),
                      })}
                      value={element.conditionValue}

                    />

                    {errorFun(index, "conditionValue", "condition")}

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
          <div className="add_border"></div>
          {/* -------------- action type ------------- */}
          <div className="row mt-2" >
            <div className="col-11">
              <label>{t("actionType")}:</label>
            </div>

          </div>


          <div className="row action_row">
            <div>
              <select
                className="form_rule"
                name="actionName"
                onChange={(e) => { handleActionType(e); }}
                value={actionType.actionName}
              >
                <option hidden>{t('select')}</option>
                {subValueType.map((el, i) => (
                  <option key={i} value={el.value}>
                    {el.label}
                  </option>
                ))
                }
              </select>

              <p className="error">{error?.actionName && error.actionName}</p>
            </div>



            <div>

              {actionType.actionName != 'Paused' && actionType.actionName != 'Enabled' &&
                <>
                  <select
                    className="form_rule"
                    name="actionValueType"
                    onChange={(e) => handleActionType(e)}
                    value={actionType.actionValueType}
                  >
                    <option hidden>{t('select')}</option>
                    {selector.map((el, i) => (
                      <option key={i} value={el.value}>
                        {el.label}
                      </option>
                    ))}
                  </select>
                  <p className="error">{error?.actionValueType && error.actionValueType}</p>
                </>
              }

            </div>
            <div>

              {actionType.actionName != 'Paused' && actionType.actionName != 'Enabled' &&
                <>
                  <input
                    type="number"
                    name="actionValue"
                    className="form_rule"
                    placeholder={t("value")}
                    value={actionType.actionValue}
                    onChange={(e) => handleActionType(e, "numberVal")}

                  />
                  <p className="error">{error?.actionValue && error.actionValue}</p>
                </>
              }

            </div>
          </div>

          <div className="add_border"></div>


          {/* -------------- Time ------------- */}
          <div className="row mt-2">
            <div className="col-11">
              <label>{t("rulesTimes")} :</label>
            </div>
            <div className="col-1 text-end">
              <AiOutlinePlus size={22} className="plus_icon" onClick={() => handleAddTimeField()} />
            </div>
          </div>
          <div className="row time_row">
            {
              timeData?.map((element, index) => {
                return (
                  <>

                    <div className="mb-2">
                      <input
                        type="time"
                        className="form_rule"
                        placeholder="Value"
                        onChange={(e) => handleTimeChange(index, e)}
                        value={element}
                        id={`mainRuleData-${index}`}
                        name={`mainRuleData-${index}`}
                      />
                      <p className='error'>{error?.timesErr.length != 0 && error?.timesErr[index]}</p>
                    </div>

                    <div className="minus_icon className mb-2">
                      {
                        index != 0 &&
                        <AiFillDelete size={22} className="icon" onClick={() => handleRemoveTimeField(index)} />
                      }

                    </div>

                  </>
                )
              })
            }
          </div>
          <div className="add_border"></div>

          <div className='form_btn mt-3'>
            <button className="cancel_btn" type='button' onClick={() => setaddModalFlag(false)}>{t('cancel')}</button>
            <button className="save_btn" type="submit" onClick={(e) => submitHandler(e)} >{t('submit')}</button>
          </div>


        </form >
      </div >
    </>
  )
}

export default AddRule
