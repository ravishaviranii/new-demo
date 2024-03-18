import React, { useEffect, useState } from 'react'
import { DateRangePicker } from 'rsuite';
import DataTable from 'react-data-table-component';
import moment from 'moment';
import AddVendor from './AddVendor';
import Filter from '../../helper/Filter';
import { predefinedRanges } from '../../../common/helper/calendarValues/calendarValues';
import { Apidelete, ApiStatusChange, ApiAuthorizPermission, ApiVendorList, ApiCustomerList, ApiSubCustomerList, ApiSavePermission, ApigetPermissionByCustomer, ApiUpdatePermission } from '../../api-wrapper/ApiVendor';
import { Toast, useForm, Controller, useDispatch } from "../../../admin/helper/links/Link";
import Select from 'react-select';
import Carousel from "react-multi-carousel";
import { vendorInfoHandler } from '../../../common/redux/action';
import DeleteModal from '../../../admin/helper/modal/DeleteModal';
function Vendor() {
    let dispatch = useDispatch()
    const [showAddPackage, setShowAddPackage] = useState(false);
    const [search, setSearch] = useState("");
    const [vendorList, setVendorList] = useState([]);
    const [pagesList, setPagesList] = useState([]);
    const [pageId, setPageId] = useState("");
    const [permissionVal, setPermissionVal] = useState([]);
    const [permission, setPermission] = useState([]);
    const [customer, setCustomer] = useState();
    const [vendorTable, setVendorTable] = useState([])
    const [step, setStep] = React.useState(0);
    const [deleteId, setDeleteId] = useState();
    const [showDeleteModal, setShowDeleteModal] = useState(false);


    const col = [
        {
            name: "page Name",
            selector: (row) => row.pageName,
            sortable: true,
        },
        {
            name: "allocated Action",
            selector: (row) => row.allocatedAction,
            cell: (e) => {

                if (e && e.allocatedActions) {
                    const allocatedActionElements = e.allocatedActions
                        .map((x, index) => (

                            <div className={`${x.status} inner_action mb-1 mt-1`} onClick={() => handleAllocatedAction(x, e)}>
                                {x.actionType}

                            </div>

                        ));

                    return allocatedActionElements.length > 0 ? allocatedActionElements : "No actions";
                } else {
                    return "No actions";
                }
            }
        },

        {
            name: "allocated On",
            selector: (row) => row.allocatedOn,
            sortable: true,
            cell: (e) => {
                return(
                <div>{moment(e.allocatedOn).format("YYYY-MM-DD")+ " " + moment(e.allocatedOn).format("hh:mm:ss A") || "-"}
                </div>
                )
            },
        },
        {
            name: "action",
            cell: (e) => (
                <button className='remove_authorizedbtn' onClick={() => HandleAuthPermission(e)}>Remove Authorized Page</button>
            )
        },
    ]



    const handleList = () => {
        let data = {
            search: search
        }
        ApiVendorList(data)
            .then((res) => {
                if (res.isSuccess) {

                    setVendorList(res.data)
                }

                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }

    useEffect(() => {
        handleList()
    }, []);


    const handlePageList = () => {
        let arr = []
        let data = {
            customerId: customer?._id
        }
        ApiCustomerList(data)
            .then((res) => {
                if (res.isSuccess) {
                    res.data.map(el => {
                        arr.push({
                            label: el.pageName,
                            value: el._id
                        })
                    })
                    setPagesList(arr)
                }
                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }
    useEffect(() => {
        if (customer) {
            handlePageList()
        }

    }, [customer]);

    const HandleGetPermission = id => {
        setPermissionVal([])
        setPermission([])
        let arr = []
        let data = {
            pageId: id,
            customerId: customer?._id
        }
        ApiSubCustomerList(data)
            .then((res) => {
                if (res.isSuccess) {

                    res.data.map(el => {
                        arr.push({
                            label: el.actionType,
                            value: el._id
                        })
                    })
                    setPermission(arr)
                }
                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }

    const saveHandler = () => {
        let arr = []
        arr = permissionVal.map(x => x.value)
        let data = {
            customerId: customer._id,
            pages: {
                pageId: pageId.value,
                allocatedActions: arr
            }

        }
        ApiSavePermission(data)
            .then((e) => {
                if (e?.isSuccess) {
                    setPageId("")
                    setPermissionVal([])
                    setPermission([])
                    handlePageList()
                    HandlePermissionByCustomer(customer)
                    Toast.success(e?.message);
                } else {
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }

    const HandlePermissionByCustomer = e => {

        ApigetPermissionByCustomer(e._id)
            .then((res) => {
                if (res.isSuccess) {

                    setVendorTable(res.data.pages)
                }
                else {
                    Toast.error(res.message);
                }
            }).catch((err) => {
                Toast.error("Somthing went wrong");
            });
    }

    const handleAllocatedAction = (el, row) => {

        let data = {
            customerId: customer._id,
            pageId: row.pageId,
            actionId: el.actionId,
            status: el.status == true ? false : el.status == false ? true : null
        }
        ApiUpdatePermission(data)
            .then((e) => {
                if (e?.isSuccess) {
                    HandlePermissionByCustomer(customer)
                    Toast.success(e?.message);
                } else {
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }


    const HandleAuthPermission = (row) => {

        let data = {
            customerId: customer._id,
            pageId: row.pageId,
        }
        ApiAuthorizPermission(data)
            .then((e) => {
                if (e?.isSuccess) {

                    HandlePermissionByCustomer(customer)
                    handlePageList()
                    Toast.success(e?.message);
                } else {
                    Toast.error(e?.message);
                }
            })
            .catch((e) => {
                Toast.error("Somthing went wrong");
            });
    }

    const statusHandler = (event, el) => {
        let data = {
            isActive: event.target.checked,
            customerId: el._id
        };
        ApiStatusChange(data)
            .then((res) => {
                if (res.isSuccess) {
                    Toast.success(res.message || "Success");
                    handleList();
                } else {
                    Toast.error(res.message || "error");
                }
            })
            .catch((err) => {
                Toast.error(err.message || "Something went wrong");
            });
    };

    const handleEdit = (el) => {
        setStep(0)
        let data = {
            step0: {
                fullName: el.fullName,
                phoneNumber: el.phoneNumber,
                country: el.country?._id,
                email: el.email,
                password: el.password,
            },
            step1: {
                priceId: el.priceId,
                packageId: el.packageId
            },
            step2: {
                clientId: el.clientId,
                clientSecret: el.clientSecret,
                adsRefreshToken: el.adsRefreshToken,
            },
            edit: true,
            id: el._id
        }
        dispatch(vendorInfoHandler(data));
        setShowAddPackage(true)

    }

    const deleteHandler = () => {

        Apidelete(deleteId)
            .then((res) => {
                if (res.isSuccess) {
                    handleList();
                } else {
                    Toast.error(res.message);

                }
                setDeleteId();
            })
            .catch((err) => {
                Toast.error("somthing went wrong!!");
            });
    };


    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3, // Number of items to show at once on a desktop
        },
        tablet: {
            breakpoint: { max: 1024, min: 662 },
            items: 2, // Number of items to show at once on a tablet
        },
        mobile: {
            breakpoint: { max: 661 },
            items: 1, // Number of items to show at once on mobile
        },
    };

    const handleAdd = () => {
        dispatch(vendorInfoHandler());
        setShowAddPackage(true);
    }

    const HandleSelectCustomer = (el) => {
        if (!el.isDeleted) {
            setCustomer(el);
            HandlePermissionByCustomer(el)
        }

    }

    return (
        <>
            <Filter name={"Vendors"} />

            <div className="middle_container" id='Package'>
                <div className="data_content data_content_btn m-0">
                    <div className="data_model_btn camapgin_btn">
                        <div>

                        </div>
                        <div className="filTypeBox">
                            <div className="search_option pb-1">
                                <input type="text" placeholder="Search Here.." value={search} onChange={(e) => setSearch(e.target.value)} />
                                <button onClick={() => handleList()}>Go</button>
                            </div>

                            <div className="pb-1">
                                <button
                                    onClick={() => {
                                        handleAdd()
                                    }}
                                >
                                    <i class="fa fa-plus"></i>
                                    Add Vendor
                                </button>
                            </div>


                        </div>
                    </div>
                    <div className="slider-container">

                        <Carousel
                            responsive={responsive}
                            ssr={true}
                            className='slider_data'
                        >
                            {
                                vendorList.map(el => {
                                    return (
                                        <>
                                            <div className={`slider-item ${el.isDeleted ? 'delete_customer' : customer?._id == el?._id ? 'showActive' : ''}`} >
                                                <div className='inner_content'>
                                                    {
                                                        !el.isDeleted &&
                                                        <div className='action'>
                                                            <div className=" form-check form-switch">
                                                                <input
                                                                    className="form-check-input"
                                                                    type="checkbox"
                                                                    onClick={(e) => statusHandler(e, el)}
                                                                    checked={el.isActive}
                                                                    name="isActive"
                                                                    style={{ width: "50px", height: "20px" }}
                                                                />
                                                            </div>
                                                            <h4>{el.fullName}</h4>
                                                            <div className='vendorAction'>

                                                                <i
                                                                    className="fa fa-pencil" onClick={() => handleEdit(el)}></i>
                                                                <i class="fa fa-trash ms-1" onClick={() => { setShowDeleteModal(true); setDeleteId(el._id) }}></i>
                                                            </div>
                                                        </div>
                                                    }
                                                    {
                                                        el.isDeleted &&
                                                        <h6 className='deleted_vendor '>Deleted Vendor</h6>
                                                    }

                                                    <div className='other_detail' onClick={() => { HandleSelectCustomer(el) }}>
                                                        
                                                        <p className='pt-2'>Email : {el.email}</p>
                                                        <p>Password : {el.stringPassword}</p>
                                                        <p>Phone Number : {el.phoneNumber}</p>
                                                        <p>Country : {el.country?.countryName}</p>
                                                        <p>Role : {el.roleName}</p>
                                                    </div>

                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </Carousel>
                    </div>
                </div>
                {
                    customer != undefined &&

                    <div className="data_content data_content_btn vendor m-0 mt-4">
                        <div className="data_model_btn camapgin_btn">
                            <div className='label_name'>
                                <b>Authorized Page</b>
                            </div>
                            <div className="filTypeBox ">
                                <div className="search_option pb-1 pb-lg-0">
                                    <Select
                                        classNamePrefix="form_dropdown"
                                        placeholder="Select Pages"
                                        options={pagesList}
                                        value={pageId}
                                        onChange={(e) => {
                                            setPageId(e)
                                            HandleGetPermission(e.value)
                                        }}
                                    />
                                </div>

                                <div className="search_option pb-1 pb-lg-0">
                                    <Select
                                        classNamePrefix="form_dropdown"
                                        placeholder="Select Permision"
                                        options={permission}
                                        isClearable={false}
                                        isMulti
                                        value={permissionVal}
                                        onChange={(e) => {
                                            setPermissionVal(e)

                                        }}
                                    />
                                </div>
                                <div className="save_button">
                                    <button onClick={() => saveHandler()}>

                                        Save
                                    </button>
                                </div>
                            </div>

                        </div>

                        <div className='show_action'>
                            <div className='green_action'>
                                <div></div>
                                <p>Allocated Actions</p>
                            </div>
                            <div className='red_action'>
                                <div></div>
                                <p>Not Allocated Actions</p>
                            </div>
                        </div>
                        <div className="data_table">
                            <DataTable
                                className="table_content"
                                columns={col}
                                striped={true}
                                data={vendorTable}


                            />
                        </div>


                    </div>
                }
            </div>
            <AddVendor
                setShowAddPackage={setShowAddPackage}
                showAddPackage={showAddPackage}
                handleList={handleList}
                step={step}
                setStep={setStep}
            />

            <DeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                deleteHandler={deleteHandler}
                name={"Vendor"}
            />
        </>
    )
}

export default Vendor