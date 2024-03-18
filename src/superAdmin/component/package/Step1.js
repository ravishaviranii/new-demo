import React, { useState } from 'react'
import { AiOutlineExclamation } from "react-icons/ai";
import { Tooltip } from "react-tippy";
import { ApiReportList } from '../../api-wrapper/ApiPackage';
import {
    Toast,
    useForm,
} from "../../../admin/helper/links/Link";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { packageInfoHandler } from '../../../common/redux/action';
function Step1(props) {
    let { step, onPrevious, onNext } = props;
    const { packageInfo } = useSelector(state => state.superData)
    const dispatch = useDispatch()
    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm();

    const [demoArr, setDemoArr] = useState([]);

    useEffect(() => {

        let arr = []

        ApiReportList()
            .then((res) => {
                if (res.isSuccess) {


                    res.data.map(el => {
                        arr.push({
                            name: el.name,
                            module: el.module,
                            estimatedPriceINR: el.estimatedPriceINR,
                            estimatedPriceUSD: el.estimatedPriceUSD,
                            description: el.description,
                            check: false,
                            INRAmount: 0,
                            USDAmount: 0,
                            totalCount: 0,
                            moduleId: el._id,

                        })
                    })

                    // }
                    setDemoArr(arr)
                    if (arr.length != 0 && packageInfo?.step1?.length != 0 && packageInfo?.step1 != undefined) {

                        let sendArr = [...arr];
                        packageInfo?.step1?.map(x => {

                            arr.map(y => {

                                if (x.moduleId == y.moduleId) {
                                    y.check = true
                                    y.totalCount = x.totalCount
                                    y.INRAmount = Number(y.estimatedPriceINR) * Number(x.totalCount)
                                    y.USDAmount = Number(y.estimatedPriceUSD) * Number(x.totalCount)
                                }

                            })
                        })

                        setDemoArr(sendArr)
                    }

                }

                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });



    }, []);

    const handleChange = (e, el) => {

        let arr = [...demoArr]
        let find = arr.find(x => x.moduleId == el.moduleId)

        if (e.target.checked) {
            find.check = true;
        }
        else {
            find.check = false;
        }
        setDemoArr(arr)
    }

    const hanldeAmount = (e, el) => {


        let arr = [...demoArr]
        let find = arr.find(x => x.moduleId == el.moduleId)
        find.totalCount = e.target.value;
        find.INRAmount = Number(find.estimatedPriceINR) * Number(e.target.value)
        find.USDAmount = Number(find.estimatedPriceUSD) * Number(e.target.value)
        setDemoArr(arr)
    }




    const submitHandler = () => {

        let arr = demoArr;
        let filter = arr.filter(x => x.check == true);



        let item = {
            ...packageInfo,
            step1: filter
        }

        dispatch(packageInfoHandler(item));
        onNext()
    }




    return (
        <form onSubmit={handleSubmit(submitHandler)}>
            <div className='step_1'>
                <div className="row campaign_form border border-1 p-2 " style={{ overflow: 'auto' }}>
                    <div className="col-12 field_box px-0">

                        <div className="form_field ps-0  row row-cols-1 ">

                            <table className='package_table'>
                                <tr>
                                    <th>Choose Module</th>
                                    <th className='input_box'>Value</th>
                                    <th>Net Amount</th>
                                    <th>Total Amount</th>
                                </tr>
                                {
                                    demoArr?.map(el => {
                                        return (
                                            <tr className='main_package'>
                                                <td>
                                                    <input className='form-check-input'
                                                        onChange={(e) => handleChange(e, el)}
                                                        type="checkbox"
                                                        checked={el.check}
                                                    />
                                                    <label>
                                                        {el.name} ({el.module.map((x, index) => (index < el.module.length - 1 ? x + ',' : x))})
                                                    </label>
                                                    <Tooltip title={el.description} className='tooltip_show'>
                                                        <AiOutlineExclamation className='tooltip_mark' />
                                                    </Tooltip>
                                                </td>
                                                <td className='input_box'>

                                                    <input type='number' value={el.totalCount} onChange={(e) => hanldeAmount(e, el)} />

                                                </td>
                                                <td><b>{el.estimatedPriceINR}₹ &nbsp; &nbsp;{el.estimatedPriceUSD}$</b></td>

                                                <td><b>{el.INRAmount}₹ &nbsp; &nbsp;{el.USDAmount}$</b></td>
                                            </tr>
                                        )
                                    })
                                }


                            </table>
                        </div>
                    </div>
                </div>
                <hr />

                <div className='package_btn'>
                    <button className='previous' onClick={onPrevious} disabled={step === 0}>
                        Previous
                    </button>
                    <button className='next' type="submit" disabled={step === 3}>
                        Next
                    </button>
                </div>

            </div>
        </form>
    )
}

export default Step1