import React, { useContext, useState, useEffect } from "react";
import Filter from "../../../helper/filter/Filter";
import DataTable from "react-data-table-component";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment-timezone";
import { handleLoader, Toast, useDispatch } from "../../../helper/links/Link";
import { DateRangePicker } from "rsuite";
import { predefinedRanges } from "../../../../common/helper/calendarValues/calendarValues";
import { ApiCampaignHistoryList } from "../../../api-wrapper/campaignHistory/ApiCampaignHistory";
import getSymbolFromCurrency from "currency-symbol-map";
import CustomFilter from "../../../helper/filter/CustomFilter";
import { PermissionCheck } from '../../../helper/permission/PermissionCheck';
import CurrencyCode from "../../../helper/currencyCode/CurrencyCode";
import TypeShortName from "../../../helper/typeShortName/TypeShortName";
import { useTranslation } from "react-i18next";

function CampaignHistory() {
    const { t } = useTranslation();
    let { profileId, timezone } = useContext(ProfileContext);
    const [date, setDate] = useState([new Date(moment().startOf("month")), new Date()]);
    const [arg, setArg] = useState({ pageNo: 1, perPage: 10 });
    const [perPage, setPerPage] = useState(10);
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState([]);
    const [searchName, setSearchName] = useState('')
    const dispatch = useDispatch();
    // custom filter
    const defaultValue = { firstCondition: '<', firstValue: 0, operator: '', secondCondition: '>', secondValue: 0 }
    const [conditionObj, setConditionObj] = useState(defaultValue)
    const [showSpendFilter, setShowSpendFilter] = useState(false);
    const [showSalesFilter, setShowSalesFilter] = useState(false);
    const [showACOSFilter, setShowACOSFilter] = useState(false);
    const [showROASFilter, setShowROASFilter] = useState(false);
    const [showCPCFilter, setShowCPCFilter] = useState(false);
    const [showImpressionsFilter, setShowImpressionsFilter] = useState(false);
    const [showClicksFilter, setShowClicksFilter] = useState(false);
    const [showOrdersFilter, setShowOrdersFilter] = useState(false);
    const [filterModal, setfilterModal] = useState();
    const [runType, setrunType] = useState('');

    const columns = [


        {
            name: t('name'),
            width: "250px",
            id: "name",
            sortable: true,
            selector: (row) => row.name,
        },
        {
            name: t('runType'),
            id: "id",
            width: "150px",
            sortable: true,
            selector: (row) => row.runType,
        },
        {
            name: t('beforeStatus'),
            width: "150px",
            selector: (row) => row.fromStatus,
            sortable: true,
            cell: (e) => {
                return (
                    <p
                        className={`${e.fromStatus === "ENABLED" ? "enable" : ""}${e.fromStatus === "PAUSED" ? "pause" : ""
                            }${e.fromStatus === "ARCHIVED" ? "archived" : ""}${e.fromStatus === "ENDED" ? "ended" : ""
                            } status`}
                    >
                        {e.fromStatus ? e.fromStatus : "-"}
                    </p>
                );
            },
        },
        {
            name:t('afterStatus'),
            width: "150px",
            selector: (row) => row.toStatus,
            sortable: true,
            cell: (e) => {
                return (
                    <p
                        className={`${e.toStatus === "ENABLED" ? "enable" : ""}${e.toStatus === "PAUSED" ? "pause" : ""
                            }${e.toStatus === "ARCHIVED" ? "archived" : ""}${e.toStatus === "ENDED" ? "ended" : ""
                            } status`}
                    >
                        {e.toStatus ? e.toStatus : "-"}
                    </p>
                );
            },
        },

        {
            name: t('beforeBudget'),
            selector: (row) => row.fromBudget,
            width: "150px",
            sortable: true,
            cell: (e) => {
                return (
                    <>
                        <div className="budgetBox">
                            <div className="mt-2 px-1">
                                <p className="p-0 m-0 tblHead d-flex justify-centent-center align-items-center">
                                    {e.fromBudget ? (
                                        <>
                                            {getSymbolFromCurrency(e?.currencyCode)}
                                            {e.fromBudget.toFixed(2)}
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </p>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            name: t('afterBudget'),
            selector: (row) => row.toBudget,
            width: "150px",
            sortable: true,
            cell: (e) => {
                return (
                    <>
                        <div className="budgetBox">
                            <div className="mt-2 px-1">
                                <p className="p-0 m-0 tblHead d-flex justify-centent-center align-items-center">
                                    {e.toBudget ? (
                                        <>
                                            {getSymbolFromCurrency(e?.currencyCode)}
                                            {e.toBudget.toFixed(2)}
                                        </>
                                    ) : (
                                        "-"
                                    )}
                                </p>
                            </div>
                        </div>
                    </>
                );
            },
        },
        {
            name: t('dateAndtime'),
            selector: (row) => row.updatedAt,
            sortable: true,
            width: "250px",
            cell: (e) => {
                return moment(e?.updatedAt)
                    .tz(timezone && timezone)
                    .format("MM/DD/YYYY hh:mm:ss A z");
            },
        },
        {
            name: t('type'),
            selector: (row) => row.type,
            width: '80px',
            sortable: true,
            cell: (e) => (
                <div className="flex-column">
                    <p className="p-0 m-0 tblHead">{TypeShortName(e.type)}</p>
                </div>
            ),
        },
        {
            name: (
                <div>
                    {t('spend')}
                    <CustomFilter field={'spend'} showFilter={showSpendFilter} setShowFilter={setShowSpendFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.spend,
            cell: (e) => (
                <div>
                    {CurrencyCode(e.spend)}
                </div>
            ),
        },
        {
            name: (
                <div>
                    {t('sales')}
                    <CustomFilter field={'sales'} showFilter={showSalesFilter} setShowFilter={setShowSalesFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.sales,
            cell: (e) => (
                <div>
                    {CurrencyCode(e.spend)}
                </div>
            ),
        },
        {
            name: "ACOS",
            name: (
                <div>
                    {t('acos')}
                    <CustomFilter field={'acos'} showFilter={showACOSFilter} setShowFilter={setShowACOSFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.acos,
            cell: (e) => <div>{e.acos.toFixed(2)}%</div>,
        },
        {
            name: (
                <div>
                    {t('roas')}
                    <CustomFilter field={'roas'} showFilter={showROASFilter} setShowFilter={setShowROASFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.roas,
            cell: (e) => <div>{e.roas}</div>,
        },
        {
            name: (
                <div>
                    {t("impressions")}
                    <CustomFilter field={'impressions'} showFilter={showImpressionsFilter} setShowFilter={setShowImpressionsFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            width: "140px",
            selector: (row) => row.impressions,
            cell: (e) => <div>{e.impressions}</div>,
        },
        {
            name: (
                <div>
                    {t('cpc')}
                    <CustomFilter field={'cpc'} showFilter={showCPCFilter} setShowFilter={setShowCPCFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.cpc,
            cell: (e) => (
                <div>
                    {CurrencyCode(e.spend)}
                </div>
            ),
        },
        {
            name: (
                <div>
                    {t("clicks")}
                    <CustomFilter field={'clicks'} showFilter={showClicksFilter} setShowFilter={setShowClicksFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.clicks,
        },
        {
            name: (
                <div>
                    {t("Orders")}
                    <CustomFilter field={'orders'} showFilter={showOrdersFilter} setShowFilter={setShowOrdersFilter} conditionObj={conditionObj} setConditionObj={setConditionObj} data={tableData} setData={setTableData} />
                </div>
            ),
            selector: (row) => row.orders,
        },
    ];

    useEffect(() => {
        if (profileId.value) {
            getCronJobHistoryList(arg);
        }
    }, [profileId.value, date, runType]);

    const getCronJobHistoryList = async (arg) => {
        dispatch(handleLoader(true));
        const data = {

            startDate: moment(date?.[0]).format("YYYY-MM-DD"),
            endDate: moment(date?.[1]).format("YYYY-MM-DD"),
            profileId: profileId.value,
            searchCampaign: searchName,
            runType: runType,
            ...arg
        };
        await ApiCampaignHistoryList(data)
            .then((e) => {
                if (e?.isSuccess) {
                    dispatch(handleLoader(false));
                    setTableData(e.data);
                    setData(e)

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


    const handleSearch = (e) => {
        setSearchName(e.target.value)
        if (e.target.value == '') {
            getCronJobHistoryList({ ...arg, searchCampaign: e.target.value })
        }
    }
    const handlePageChange = (page) => {
        getCronJobHistoryList({ pageNo: page, perPage: perPage })
    }
    const handlePerRowsChange = async (newPerPage, page) => {
        setPerPage(newPerPage)
        getCronJobHistoryList({ pageNo: page, perPage: newPerPage })
    }
    return (
        <>
            <Filter
                name={"Campaign History"}
                nameShow={false}
                dateShow={false}
                profileShow={true}
            />
            <div className="middle_container budget_container">
                <div className="data_content data_content_btn">
                    <div className="data_model_btn camapgin_btn">
                        <div>
                            <h5>{t('campaignHistory')}</h5>
                        </div>

                        <div className="filTypeBox">

                            <div className="fil pb-1 campaign_first pe-0 ps-0 ps-lg-2 me-ms-0 me-md-2">
                                <select
                                    name="portfolio"
                                    onChange={(e) => setrunType(e?.target?.value)}
                                    value={runType}
                                >
                                    <option value="">{t('allType')}</option>
                                    <option value="Schedule">{t('Schedule')}</option>
                                    <option value="Budget Rule">{t('budgetRule')}</option>

                                </select>
                            </div>

                            <div className="search_option pb-1">
                                <input type="text" placeholder={t('searchHere')} onChange={(e) => handleSearch(e)} />
                                <button onClick={() => getCronJobHistoryList({ ...arg, searchCampaign: searchName })}>Go</button>
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
                        PermissionCheck('Campaign History', 'View Only') &&
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
    )
}

export default CampaignHistory