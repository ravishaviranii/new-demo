import React, { useContext, useState, useEffect } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar';
import sale from '../../../assets/images/sale.svg';
import spend from '../../../assets/images/TotalSpend.svg';
import ROAS from '../../../assets/images/ROAS.svg';
import ACOS from '../../../assets/images/Acos.svg';
import { ApiPriceDetails } from "../../../api-wrapper/dashboard/ApiDashboard"
import { Toast, handleLoader, useDispatch } from "../../../helper/links/Link";
import { ProfileContext } from '../../../helper/usecontext/useContext';
import { useTranslation } from 'react-i18next';


function Price() {
    const { t } = useTranslation();

    const [priceData, setPriceData] = useState({})
    const dispatch = useDispatch()
    let { profileSendID, selectedDate, fromDate, toDate, currencyCode } = useContext(ProfileContext)

    const ApiListing = () => {
        if (profileSendID && fromDate && toDate) {

            const data = {
                profileId: profileSendID,
                fromDate: fromDate,
                toDate: toDate,
            }
            ApiPriceDetails(data).then(res => {
                if (res?.isSuccess) {

                    Toast.success(res?.message)
                    setPriceData(res)
                } else {

                    Toast.error(res?.message)
                }
            })
                .catch((err) => {

                    Toast.error('Somthing went wrong');
                });

        }

    }
    useEffect(() => {
        ApiListing()
    }, [profileSendID, fromDate, toDate])

    return (
        <div className='price_section'>


            <div className='box box_first'>
                <div className=' inner_box'>
                    <img src={sale} />

                    <div className='content'>
                        <p>{t("totalSale")}</p>
                        <span>{Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: currencyCode ? currencyCode : 'INR',
                        }).format(priceData?.totalSales)}</span>
                    </div>
                </div>
                <div className='content_display'>
                    <ProgressBar variant="warning" now={priceData?.percentageTotalSales} />
                    <div className='show_content'>
                        {
                            priceData?.flagTotalSales == 'Up' ?
                                <i className="fa fa-arrow-up" aria-hidden="true"></i> :
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        }

                        <span>
                            {priceData?.percentageTotalSales}% {t("sinceLastMonth")}
                        </span>

                    </div>

                </div>
            </div>

            <div className='box box_second'>
                <div className='inner_box'>
                    <img src={spend} />
                    <div className='content'>
                        <p>{t("totalSpend")}</p>
                        <span>{Intl.NumberFormat('en-US', {
                            style: 'currency',
                            currency: currencyCode ? currencyCode : 'INR',
                        }).format(priceData?.totalSpend)}</span>
                    </div>
                </div>
                <div className='content_display'>
                    <ProgressBar variant="warning" now={priceData?.percentageTotalSpend} />
                    <div className='show_content'>
                        {
                            priceData?.flagTotalSpend == 'Up' ?
                                <i className="fa fa-arrow-up" aria-hidden="true"></i> :
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        }
                        <span>
                            {priceData?.percentageTotalSpend}% {t("sinceLastMonth")}
                        </span>

                    </div>

                </div>
            </div>



            <div className='box box_third'>
                <div className=' inner_box'>
                    <img src={ACOS} />
                    <div className='content'>
                        <p>{t("acos")}</p>
                        <span>{priceData?.totalAcos || 0}%</span>
                    </div>
                </div>
                <div className='content_display'>
                    <ProgressBar variant="warning" now={priceData?.percentageTotalAcos} />
                    <div className='show_content'>
                        {
                            priceData?.flagTotalAcos == 'Up' ?
                                <i className="fa fa-arrow-up" aria-hidden="true"></i> :
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        }
                        <span>
                            {priceData?.percentageTotalAcos}% {t("sinceLastMonth")}
                        </span>

                    </div>

                </div>
            </div>
            <div className='box box_fourth'>
                <div className='inner_box'>
                    <img src={ROAS} />
                    <div className='content'>
                        <p>{t("roas")}</p>
                        <span>{priceData?.totalRoas || 0}</span>
                    </div>
                </div>
                <div className='content_display'>
                    <ProgressBar variant="warning" now={priceData?.percentageTotalRoas} />
                    <div className='show_content'>
                        {
                            priceData?.flagTotalRoas == 'Up' ?
                                <i className="fa fa-arrow-up" aria-hidden="true"></i> :
                                <i className="fa fa-arrow-down" aria-hidden="true"></i>
                        }

                        <span>
                            {priceData?.percentageTotalRoas}% {t("sinceLastMonth")}
                        </span>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Price