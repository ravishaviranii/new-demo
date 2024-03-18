import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { handleLoader } from '../../../../common/redux/action'
import { useTranslation } from "react-i18next";
function RuleSearch({ campaignList, allIds, setAllIds, campaignIds, selectAllCheck, setselectAllCheck }) {
    const { t } = useTranslation();
    const [searchData, setSearchData] = useState();
    const [dummySearch, setDummySearch] = useState([]);
    const [type, setType] = useState('All');
    const [filterFlag, setfilterFlag] = useState(false);
    const [filterValue, setfilterValue] = useState('All');
    const [dummyArr, setDummyArr] = useState([]);
    const [searchString, setsearchString] = useState("");
    let dispatch = useDispatch()

    //select all //

    const selectAllHandler = (e) => {

        dispatch(handleLoader(true));
        let arr = allIds || [];
        if (e.target.checked) {
            setselectAllCheck(true);

            searchData.forEach((el) => {
                arr.push(el.campaignId.toString());
            });

            const uniqueArray = [...new Set(arr)];
            setAllIds(uniqueArray);
        } else {
            setselectAllCheck(false);
            setAllIds((prevIds) =>
                prevIds?.filter((id) => !searchData.map((el) => el.campaignId.toString()).includes(id))
            );
        }
        dispatch(handleLoader(false));
    };



    const campaignHandler = (e, id, index) => {

        let arr = [...allIds] || [];

        if (e.target.checked) {
            arr.push(id);

            const selectedCampaignIds = arr?.filter((id) =>
                searchData.some((campaign) => campaign.campaignId === id)
            );
            if (searchData.length != 0) {
                setselectAllCheck(selectedCampaignIds?.length === searchData?.length);
            }
        } else {
            arr = allIds.filter((x) => x != id);
            const selectedCampaignIds = arr?.filter((id) =>
                searchData?.some((campaign) => campaign.campaignId === id)
            );
            if (searchData.length != 0) {
                setselectAllCheck(selectedCampaignIds?.length === searchData?.length);
            }
        }
        setAllIds(arr);
    };


    const handleChange = (e) => {

        const searchString = e.target.value.trim().toLowerCase();
        setsearchString(e.target.value);


    };

    useEffect(() => {
        setAllIds(campaignIds);
    }, [campaignIds]);

    useEffect(() => {
        dispatch(handleLoader(true));
        setSearchData(campaignList)
        dispatch(handleLoader(false));
    }, [campaignList]);



    const filterHandler = (val) => {

        setfilterValue(val)

    }


    const statusHandler = (e) => {


        setType(e.target.value)

    }


    useEffect(() => {

        let data = campaignList
        let finalData = []
        if (filterValue == 'All' && searchString == '' && type == 'All') {
            finalData = data
        }
        else if (filterValue == 'All' && searchString == '') {
            let findData = data.filter(item => item.status === type)
            finalData = findData

        }
        else {

            if (filterValue != 'All' && searchString != '') {
                let filteredData;
                let arr;
                filteredData = data.filter(x => x.type == filterValue)
                arr = filteredData?.filter((l) =>
                    l.name.toLowerCase().includes(searchString)
                );

                if (type == 'All') {

                    finalData = arr
                }
                else {
                    let findData = arr?.filter(item => item.status === type)
                    finalData = findData

                }

            }
            if (filterValue == 'All' && searchString != '') {
                let arr = data?.filter((l) =>
                    l.name.toLowerCase().includes(searchString)
                );


                if (type == 'All') {
                    finalData = arr

                }
                else {
                    let findData = arr?.filter(item => item.status === type)
                    finalData = findData

                }

            }
            if (filterValue != 'All' && searchString == '') {
                let filteredData = [];
                filteredData = data.filter(x => x.type == filterValue)
                if (type == 'All') {
                    finalData = filteredData

                }
                else {
                    let findData = filteredData?.filter(item => item.status === type)
                    finalData = findData

                }

            }



        }

        if (finalData?.length === allIds?.length) {
            setselectAllCheck(true)
        }
        else if (allIds?.length === data.length) {
            setselectAllCheck(true)
        }
        else {
            setselectAllCheck(false)
        }

        setSearchData(finalData)

    }, [type, filterValue, searchString]);

    console.log(searchData, "searchData")
    console.log(allIds, "allIds")
    return (
        <>


            <div className='assign_campaign_detail'>
                <div>
                    <h6>{t("filterCampaignType")}: </h6>

                    <div className='filter_type'>
                        <button onClick={() => filterHandler('All')} className={`${filterValue == 'All' ? 'active' : ''} filter_name`}  >{t("all")}</button>
                        <button onClick={() => filterHandler('Sponsored Products')} className={`${filterValue == 'Sponsored Products' ? 'active' : ''} filter_name`} >{t("products")}</button>
                        <button onClick={() => filterHandler('Sponsored Brands')} className={`${filterValue == 'Sponsored Brands' ? 'active' : ''} filter_name`} >{t("brands")}</button>
                        <button onClick={() => filterHandler('Sponsored Display')} className={`${filterValue == 'Sponsored Display' ? 'active' : ''} filter_name`}>{t("display")}</button>
                    </div>

                </div>

                <div className='mt-2 search_section'>
                    <h6>{t("searchCampaign")}: </h6>
                    <input
                        type="text"
                        className='serach_text'
                        value={searchString}
                        onChange={(e) => handleChange(e)}
                        placeholder={t("searchHere")}
                    />
                </div>

                <div className='campaign_list'>


                    <div className='select_campaign' >

                        <div>

                            <input
                                className="me-2"
                                type="checkbox"
                                value={selectAllCheck}
                                checked={searchData?.length == 0 ? false : selectAllCheck}
                                onChange={(e) => selectAllHandler(e)}
                            />
                            <label>{t("selectAllCampaign")}</label>
                        </div>
                        <div className='inner_filter'>
                            <label>{t("status")} : </label>
                            <select
                                onChange={(e) => statusHandler(e)}
                                value={type}
                            >
                                <option value="All">{t("allCampaignStatus")}</option>
                                <option value="ENABLED">{t("enabled")}</option>
                                <option value="PAUSED">{t("paused")}</option>
                                <option value="ARCHIVED">{t("archived")}</option>
                            </select>
                        </div>
                        <div>
                            <label>{t("selectedCampaign")} : <b>{allIds?.length || 0} </b> </label>
                        </div>
                    </div>

                    <div className='list'>
                        {
                            searchData?.length == 0 ?
                                <h6 className='text-center pt-2'>{t("dateNotFound")}</h6>
                                :
                                <div className='search_list'>
                                    {

                                        searchData
                                            ?.sort((a, b) => {

                                                const aChecked = allIds?.includes(a.campaignId.toString());
                                                const bChecked = allIds?.includes(b.campaignId.toString());
                                                // Move checked items to the top
                                                if (aChecked && !bChecked) {
                                                    return -1;
                                                } else if (!aChecked && bChecked) {
                                                    return 1;
                                                }
                                                return 0;
                                            })
                                            .map((el, index) => {
                                                const campaignId = el.campaignId.toString();
                                                const isChecked = allIds?.includes(campaignId);
                                                return (
                                                    <div className='inner_list' key={campaignId}>
                                                        <input
                                                            type="checkbox"
                                                            value={isChecked}
                                                            checked={isChecked}
                                                            onChange={(e) => campaignHandler(e, campaignId, index)}
                                                        />
                                                        <p className='m-0 ps-4'>{el.name}</p>
                                                    </div>
                                                );
                                            })
                                    }

                                </div>
                        }
                    </div>
                </div>


            </div>
        </>
    )
}

export default RuleSearch