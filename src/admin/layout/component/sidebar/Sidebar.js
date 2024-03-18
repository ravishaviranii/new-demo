import React, { useEffect, useState, forwardRef } from "react";
import logo from "../../../../common/img/ADVERTISE IQ.svg";
import { useTranslation } from "react-i18next";
import nav from "../../../router/nav";
import Dropdown from "react-bootstrap/Dropdown";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
	Toast,
	useDispatch,
	useNavigate,
	handleLoader,
} from "../../../helper/links/Link";
import { ApiLink } from "../../../api-wrapper/other/ApiSetting";
import Modal from "react-bootstrap/Modal";
import {
	ApiChangePassword,
	ApiGetPermission,
} from "../../../api-wrapper/auth/ApiAuth";
import { useSelector } from "react-redux";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { useContext } from "react";
import passwordImage from "../../../assets/images/passwordChange.jpg";
import { changePWDSchema } from "../../../utility/validator";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Stack from "@mui/material/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { ModifyNotification } from "../../../api-wrapper/notifications/notifications";

import Popper from "@mui/material/Popper";
import { useSpring, animated } from "@react-spring/web";

import Notification from "../notification/notification";
import { Link } from "react-router-dom";
import { IoIosArrowForward, IoIosArrowDown } from "react-icons/io";
function Sidebar({ open, setOpen }) {
	const { t } = useTranslation();
	const [openedMenu, setOpenedMenu] = useState("");

	const [modalShow, setModalShow] = React.useState(false);
	let { pagePermission } = useContext(ProfileContext);
	let navigate = useNavigate();
	let location = useLocation();
	const dispatch = useDispatch();
	const [profileData, setProfileData] = useState();
	const [navRoutes, setNavRoutes] = useState();
	const [checkFlag, setcheckFlag] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [seenNotifications, setSeenNotifications] = useState([]);
	const [unSeenNotifications, setUnseenNotifications] = useState([]);
	const [permissionPages, setPermissionPages] = useState([]);

	const api = `${process.env.REACT_APP_API_BASE}/api/notification/`;
	const authToken = localStorage.getItem("sellerToken");
	const headers = {
		Authorization: `Bearer ${authToken}`,
		"Content-Type": "application/json",
	};

	const [opens, setOpens] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const handleClick = (event) => {
		setOpens((previousOpen) => !previousOpen);
	};

	const canBeOpen = opens && Boolean(anchorEl);
	const id = canBeOpen ? "spring-popper" : undefined;

	const Fade = forwardRef(function Fade(props, ref) {
		const { in: open, children, onEnter, onExited, ...other } = props;
		const style = useSpring({
			from: { opacity: 0 },
			to: { opacity: open ? 1 : 0 },
			onStart: () => {
				if (open && onEnter) {
					onEnter();
				}
			},
			onRest: () => {
				if (!open && onExited) {
					onExited();
				}
			},
		});

		return (
			<animated.div ref={ref} style={style} {...other}>
				{children}
			</animated.div>
		);
	});

	const logoutHandler = () => {
		localStorage.removeItem("sellerToken");
		localStorage.removeItem("profile");
		localStorage.removeItem("themeData");
		localStorage.removeItem("connection");
		localStorage.removeItem("customerId");
		localStorage.clear();
		navigate("/login");
	};

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["Notification"],
		queryFn: () => {
			dispatch(handleLoader(false));

			axios
				.get(`${api}/get-notifications`, {
					headers,
				})
				.then((res) => {
					const response = res.data?.data;
					const finalNotifications = response?.reverse();
					const seenTrueData = finalNotifications?.filter(
						(item) => item.seen === true
					);
					const seenFalseData = finalNotifications?.filter(
						(item) => item.seen === false
					);
					setNotifications(finalNotifications);
					setSeenNotifications(seenTrueData);
					setUnseenNotifications(seenFalseData);
					dispatch(handleLoader(false));
				})
				.catch((err) => {
					dispatch(handleLoader(false));

					throw err;
				});
		},
		enabled: false,
	});

	const pageChangeHandler = (path) => {
		setcheckFlag(true);
		navigate(path);
		if (window.innerWidth <= 715) {
			var element = document.getElementById("wrapper");
			element.classList.remove("toggled");
			setOpen(false);
		}
	};

	useEffect(() => {
		refetch();
		ApiLink()
			.then((res) => {
				if (res.isSuccess) {
					setProfileData(res.profile);
					localStorage.setItem("sellerAdminLoginUser", res.profile?.fullName);
				} else {
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				Toast.error("somthing went wrong!!");
			});
	}, []);

	const readNotification = (id) => {
		let data = {
			notificationId: id,
		};
		ModifyNotification(data)
			.then((res) => {
				if (res.isSuccess) {
					refetch();
				} else {
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				Toast.error("somthing went wrong!");
			});
	};

	const readAllNotifications = () => {
		return axios
			.delete(`${api}/clear-all-notifications`, {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("sellerToken")}`,
					"Content-Type": "application/json",
				},
			})
			.then((res) => {
				if (res.data?.isSuccess) {
					refetch();
				} else {
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				Toast.error("somthing went wrong!");
			});
	};

	function ChangePasswordModal(props) {
		const {
			register,
			handleSubmit,
			formState: { errors },
		} = useForm({
			resolver: yupResolver(changePWDSchema),
		});

		const changePwdHandler = async (data) => {

			dispatch(handleLoader(true));
			const passwordData = {
				oldPassword: data.oldpwd,
				newPassword: data.password,
				confirmPassword: data.confirmPwd,
			};
			await ApiChangePassword(passwordData)
				.then((e) => {
					if (e?.isSuccess) {
						dispatch(handleLoader(false));
						Toast.success(e?.message);
						localStorage.clear();
						navigate("/login");
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

		const [state, setState] = useState({});
		const handler = (children) => {
			return children.map((child, i) => {
				const category = !child.category ? null : (
					<div className="nav-item category">{child.category}</div>
				);

				if (!child.children) {
					return (
						<>
							{category}
							<li
								onClick={(e) => handleClick(e, child.name, child)}
								key={i}
								className={`${child.path == location.pathname ? "active" : ""}`}
							>
								<Link to={child.path} className="sidebar_link">
									{child.icon}
									{child.name}
								</Link>
								{/* <a className="sidebar_link">
                  {child.icon}
                  {child.name}
                </a> */}
							</li>
						</>
					);
				}
				return (
					<>
						{category}
						<li onClick={(e) => handleClick(e, child.name, child)} key={i}>
							<a className="sidebar_link">
								{child.icon}
								{child.name}
								{/* <span>{child.subicon}</span> */}
							</a>
							<ul className={`submenu ${state[child.name] ? "show" : ""}`}>
								{handler(child.children)}
							</ul>
						</li>
					</>
				);
			});
		};

		return (
			<Modal
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton>
					<Modal.Title id="contained-modal-title-vcenter">
						Change Password
					</Modal.Title>
				</Modal.Header>
				<Modal.Body className="p-0">
					<div className="password_wrapper row row-cols-1 row-cols-md-2 g-3">
						<div className="col mt-0">
							<div className="password-img p-0 py-md-4  p-lg-0">
								<img src={passwordImage} className="img-fluid"></img>
							</div>
						</div>
						<div className="col p-2 py-md-2 px-md-2 py-lg-4 mt-2 mt-md-0    ">
							<div className="p-2">
								<form
									className="w-100"
									onSubmit={handleSubmit(changePwdHandler)}
								>
									<div className="form-group py-2">
										<label className="form-label">Enter Old Password</label>
										<input
											className="form-control"
											type="password"
											{...register("oldpwd")}
										></input>
										{errors.oldpwd && (
											<p className="error">{errors.oldpwd.message}</p>
										)}
									</div>
									<div className="form-group py-2">
										<label className="form-label">Enter New Password</label>
										<input
											type="password"
											className="form-control"
											{...register("password")}
										></input>
										{errors.password && (
											<p className="error">{errors.password.message}</p>
										)}
									</div>
									<div className="form-group py-2">
										<label className="form-label">Confirm New Password</label>
										<input
											type="password"
											className="form-control"
											{...register("confirmPwd")}
										></input>
										{errors.confirmPwd && (
											<p className="error">{errors.confirmPwd.message}</p>
										)}
									</div>
									<div className="form-group g-2 py-2 d-flex justify-content-center   ">
										<div className="text-center py-2">
											<button className="save-btn" type="submit">
												Reset Password
											</button>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		);
	}

	useEffect(() => {
		let data = ["Settings", "User Manual"];

		if (localStorage.getItem("connection") == "false") {
			setNavRoutes(nav.filter((x) => data.includes(x.name)));
		} else {
			const pages = pagePermission?.map((el) => el.pageName) || [];

			pages.push("User Manual");
			pages.push("Settings");
			setPermissionPages(pages)
			setNavRoutes(nav.filter((x) => pages.includes(x.name)));
		}
	}, [localStorage.getItem("connection"), pagePermission]);



	const handleMenuClick = (menuName) => {
		if (openedMenu === menuName) {
			setOpenedMenu("");
		} else {
			setOpenedMenu(menuName);
		}
	};

	return (
		<>
			<aside id="sidebar-wrapper" className="sidebar_container">
				<div className="logo_section">
					<div className="menu" onClick={() => setOpen(!open)}>
						<i className="fa fa-bars"></i>
					</div>
					<div>
						<img src={logo} style={{ height: "60px", width: "auto" }} />
					</div>
				</div>

				<div className="sidebar_flex">
					<ul className="sidebar-nav sidebar_overflow pt-3">
						{navRoutes?.map((el, i) => {
							return (
								<li
									key={i}
									className={`${el.path == location.pathname ? "active" : ""}`}
									onClick={() => handleMenuClick(el.name)}
								>
									{el.children ? (
										<a
											className="sidebar_link"
											onClick={() => handleMenuClick(el.name)}
										>
											{el.icon}
											{t(el.name)}
											{el.children && (
												<span className="sidebar_arrow">
													{openedMenu === el.name ? (
														<IoIosArrowDown />
													) : (
														<IoIosArrowForward />
													)}
												</span>
											)}
										</a>
									) : (
										<Link to={el.path} className="sidebar_link">
											{el.icon}
											{t(el.name)}


										</Link>
									)}
									{el.children && (
										<ul
											className={`submenu ${openedMenu === el.name ? "show" : ""
												}`}
										>
											{el.children.map((child, j) =>
												pagePermission?.filter((x) =>
													x.pageName.includes(child.name)
												).length != 0 || child.name == "Profile Setting" ? (
													<>
														<li
															key={j}
															className={`${child.path === location.pathname ? "active" : ""
																}`}
														>
															<Link to={child.path} className="sidebar_link">
																{child.icon}
																{t(child.name)}

															</Link>
														</li>
													</>
												) : null
											)}
										</ul>
									)}
								</li>
							);
						})}
					</ul>

					<ul className="sidebar-nav profile_divider profile_name_sec">
						<li className="profile_section d-flex align-items-center">
							<Dropdown className="">
								<Dropdown.Toggle id="dropdown-basic">
									<i class="fa-solid fa-user "></i>
									<span className="ms-4 w-75">{profileData?.fullName}</span>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={() => logoutHandler()}>
										Logout
									</Dropdown.Item>
									<Dropdown.Item onClick={() => setModalShow(true)}>
										Change Password
									</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
							<div className="noti_icon">
								<Badge
									color="secondary"
									badgeContent={unSeenNotifications?.length}
									style={{ textIndent: 0 }}
								>
									<NotificationsIcon
										aria-describedby={id}
										onClick={(e) => handleClick(e)}
									/>
								</Badge>
							</div>
						</li>
					</ul>
					<ChangePasswordModal
						show={modalShow}
						onHide={() => setModalShow(false)}
					/>

					<Modal
						show={opens}
						onHide={(e) => handleClick(e)}
						size="lg"
						dialogClassName="notification-modal-dialog notification_admin"
					>
						<Modal.Body>
							<Notification
								unSeenNotifications={unSeenNotifications}
								readAllNotifications={readAllNotifications}
								notifications={notifications}
								readNotification={readNotification}
							/>
						</Modal.Body>
					</Modal>
				</div>
			</aside>
		</>
	);
}

export default Sidebar;
