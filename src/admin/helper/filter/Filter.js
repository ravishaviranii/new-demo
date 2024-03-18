import React, { useState, useContext, useEffect } from 'react'
import Select from 'react-select';
import { ProfileContext } from '../../helper/usecontext/useContext';
import { handleLoader, useDispatch } from "../../helper/links/Link";
import { ApiSelectAccount, ApiMainAccount, ApiGetPermission } from '../../api-wrapper/auth/ApiAuth';
import moment from "moment-timezone";
import { useSelector } from 'react-redux';
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../common/helper/calendarValues/calendarValues";
function Filter({ nameShow, name, dateShow, profileShow }) {

    let { setToday, setSelectedDate, setProfileData, profileId, setProfileId, setPagePermission, setTypeValue } = useContext(ProfileContext)
    const dispatch = useDispatch()

    const [accountList, setAccountList] = useState([]);
    const [mainAccount, setMainAccount] = useState([]);

    const [mainAccountId, setmainAccountId] = useState();
    const [profileList, setProfileList] = useState([]);
    const [date, setDate] = useState();

    const [connected, setconnection] = useState(localStorage.getItem('connection'));


    const profileHandler = () => {
        let data = []

        ApiSelectAccount()
            .then((res) => {
                if (res.isSuccess) {

                    setProfileList(res.data)
                    setToday(moment(new Date()).tz(res.data[0]?.timezone && res.data[0]?.timezone)?.format("YYYY-MM-DD"))


                    if (localStorage.getItem('profile') == null) {
                        let arr = [
                            moment(new Date()).startOf('month')?.format("YYYY-MM-DD"),
                            moment(new Date()).tz(res.data[0]?.timezone && res.data[0]?.timezone)?.format("YYYY-MM-DD")
                        ]
                        setSelectedDate(arr)
                        let sendData = {
                            profile: res.data[0],
                            date: arr
                        }
                        localStorage.setItem('profile', JSON.stringify(sendData))
                    }

                    res.data.map(el => {
                        data.push({
                            label: `${el.type} - ${el.name} - ${el?.countryCode} - ${el.profileId}`,
                            value: el.profileId
                        })
                    })

                }
            }).catch((err) => {
                dispatch(handleLoader(false))
            });
        setAccountList(data)
    }
    useEffect(() => {
        if (connected == "true") {
            profileHandler()
        }

    }, []);

    useEffect(() => {
    }, []);
    useEffect(() => {
        let dataArr = []
        ApiGetPermission()
            .then((res) => {

                setPagePermission(res.data.pages)
                localStorage.setItem('permission', JSON.stringify(res.data.pages))
                res.campaignType.map(el => {

                    dataArr.push({
                        label: el,
                        value: el
                    })
                })
                setTypeValue(dataArr)

            }).catch((err) => {
            });
    }, []);

    const mainAccountChange = (e) => {
        setmainAccountId(e)
    }



    const profileChange = (e) => {
        console.log(e.value)
        setProfileId(e)
        let find = profileList.find(x => x.profileId == e.value)
        setProfileData(find)
        let storeData = JSON.parse(localStorage.getItem('profile'));
        storeData.profile = find
        localStorage.setItem('profile', JSON.stringify(storeData))
    }

    const dateChangeHandler = e => {
        let storeData = JSON.parse(localStorage.getItem('profile'));

        let arr;
        if (e?.length == 0) {
            arr = [];
        } else {
            arr = [
                moment(e && e[0]).format("YYYY-MM-DD"),
                moment(e && e[1]).format("YYYY-MM-DD"),
            ];
        }
        setDate(arr)
        setSelectedDate(arr)
        storeData.date = arr;
        localStorage.setItem('profile', JSON.stringify(storeData))


    }

    useEffect(() => {
        let storeData = JSON.parse(localStorage.getItem('profile'));
        setDate([storeData?.date[0], storeData?.date[1]])


        setSelectedDate([storeData?.date[0], storeData?.date[1]])
    }, [localStorage.getItem('profile')]);


    useEffect(() => {
        let storeData = JSON.parse(localStorage.getItem('profile'));
        setProfileId({
            label: `${storeData?.profile?.type} - ${storeData?.profile?.name} - ${storeData?.profile?.countryCode} - ${storeData?.profile.profileId}`,
            value: storeData?.profile?.profileId
        })
    }, [localStorage.getItem('profile')]);



    return (
        <div className='filter_section'>
            <div>
                {
                    nameShow &&
                    <div className=' inner_filter pb-2 pb-lg-0'  >
                        <p className='heading'>{name}</p>
                    </div>
                }
            </div>
            <div className='select_icon select_option inner_filter visibility-hidden m-0' >
                {/* {
                    connected &&
                    <>
                        <i class="fa fa-id-badge"></i>
                        <Select

                            classNamePrefix="select_dropdown"
                            placeholder="Select Account"
                            options={mainAccount}
                            value={mainAccountId}
                            onChange={(e) => mainAccountChange(e)}
                        />
                    </>
                } */}
            </div>
            <div>
                {
                    dateShow &&
                    <div className='inner_filter date_range pb-2 pb-lg-0'>
                        <>
                            <DateRangePicker
                                className='filter_date'
                                ranges={predefinedRanges}
                                showOneCalendar
                                value={[
                                    date &&
                                    date[0] !== undefined &&
                                    moment(date[0], "YYYY-MM-DD").toDate(),

                                    date &&
                                    date[1] !== undefined &&
                                    moment(date[1], "YYYY-MM-DD").toDate(),
                                ]}
                                placeholder="Select Date"
                                onChange={(e) => dateChangeHandler(e)}
                                format="yyyy-MM-dd"
                                cleanable={false}
                                placement='bottomEnd'
                            />
                        </>
                    </div>
                }
            </div>
            <div>
                {
                    profileShow && (
                        <div className='select_icon inner_filter last_inner' style={{ visibility: profileShow ? 'visible' : 'hidden' }}>
                            <>
                                <i class="fa fa-home"></i>
                                <Select
                                    value={profileId}
                                    classNamePrefix="select_dropdown"
                                    placeholder="Select Profile"
                                    options={accountList}
                                    onChange={(e) => profileChange(e)}
                                />
                            </>

                        </div>
                    )
                }
            </div>

        </div >
    )
}

export default Filter