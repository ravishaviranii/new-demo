import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment-timezone";
import { handleLoader, Toast, useDispatch } from "../../../helper/links/Link";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import { AiOutlineCheck } from "react-icons/ai";
import success from "../../../assets/images/success.svg";
import { PermissionCheck } from '../../../helper/permission/PermissionCheck';
import { ApiCampaignSchedularHistoryList } from "../../../api-wrapper/campaignSchedularHistory/CampaignSchedularHistory";
import { useTranslation } from "react-i18next";
function CampaignSchedularHistory() {
    const { t } = useTranslation();
    let { profileId, today, timezone, pagePermission } = useContext(ProfileContext);
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [perPage, setPerPage] = useState(10);
    const [data, setData] = useState([]);

    const [tableData, setTableData] = useState([]);
    const [searchName, setSearchName] = useState('')

    const dispatch = useDispatch();

    useEffect(() => {
        if (profileId.value) {
            getCampainSchedularHistoryList(arg);
        }
    }, [profileId.value, date]);

    const getCampainSchedularHistoryList = async (arg) => {
        dispatch(handleLoader(true));
        const data = {
            fromDate: moment(date?.[0]).format("YYYY-MM-DD"),
            toDate: moment(date?.[1]).format("YYYY-MM-DD"),
            profileId: profileId.value,
            search: searchName,
            ...arg
        };
        await ApiCampaignSchedularHistoryList(data)
            .then((e) => {
                if (e?.isSuccess) {
                    dispatch(handleLoader(false));
                    setTableData(e.data);
                    setData(e)
                    // Toast.success(e?.message);
                } else {
                    dispatch(handleLoader(false));
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                dispatch(handleLoader(false));
                Toast.error("Somthing went wrong");
            });
    };

    const columns = [
        {
            name: t("scheduleName"),
            selector: (row) => (row.scheduleName ? row.scheduleName : "-"),
            sortable: true,
        },
        {
            name: t("date"),
            selector: (row) => (row.createdAt ? row.createdAt : "-"),
            sortable: true,
            cell: (e) => (
                <div>
                    {moment(e?.createdAt)
                        .tz(timezone && timezone)
                        .format("MM/DD/YYYY")}
                </div>
            ),
        },
        {
            name: t("time"),
            selector: (row) => (row.createdAt ? row.createdAt : "-"),
            sortable: true,
            cell: (e) => (
                <div>
                    {moment(e?.createdAt)
                        .tz(timezone && timezone)
                        .format("hh:mm A")}
                </div>
            ),
        },
        {
            name: t("status"),
            selector: (row) => row.status,
            sortable: true,
            cell: (e) => (
                <div
                    className={`${e.status == "PAUSED"
                        ? "pending"
                        : e.status == "ENABLED"
                            ? "completed"
                            
                                : null
                        } status`}
                >
                    {e.status ? e.status : "-"}
                </div>
            ),
        },
    ];

    const handleSearch = (e) => {
        setSearchName(e.target.value)
        if (e.target.value == '') {
            getCampainSchedularHistoryList({ search: e.target.value })
        }
    }
    const handlePageChange = (page) => {
        getCampainSchedularHistoryList({ pageNo: page, perPage: perPage })
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage)
        getCampainSchedularHistoryList({ pageNo: page, perPage: newPerPage })
    }

    return (
        <>
            <Filter
                name={"Cron Job Scheduler"}
                nameShow={false}
                dateShow={false}
                profileShow={true}
            />
            <div className="middle_container budget_container">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div>
                            <h5>{t('campaignSchedularHistory')}</h5>
                        </div>

                        <div className="filTypeBox">
                            <div className="search_option pb-1">
                                <input type="text" placeholder={t('searchHere')} onChange={(e) => handleSearch(e)} />
                                <button onClick={() => getCampainSchedularHistoryList({ search: searchName })}>Go</button>
                            </div>

                            <DateRangePicker
                                className={`rangeDate custom-date-range-picker px-lg-2 pb-1`}
                                ranges={predefinedRanges}
                                showOneCalendar
                                value={date}
                                placeholder="Select Date"
                                onChange={(e) => setDate(e)}
                                placement="bottomEnd"
                                format="yyyy-MM-dd"
                                cleanable={false}
                            />
                        </div>
                    </div>

                    {
                        PermissionCheck('Campaign Scheduler History', 'View Only') &&
                        <div className="data_table">
                            <DataTable
                                className="table_content"
                                columns={columns}
                                striped={true}
                                data={tableData}
                                pagination
                                paginationServer
                                fixedHeader
                                paginationTotalRows={data && data?.totalRecords}
                                onChangePage={handlePageChange}
                                onChangeRowsPerPage={handlePerRowsChange}

                            />
                        </div>
                    }

                </div>
            </div>
        </>
    );
}

export default CampaignSchedularHistory;
