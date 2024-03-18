import React, { useEffect, useState } from 'react';
import logo from '../../../common/img/ADVERTISE IQ.svg';
import Dropdown from 'react-bootstrap/Dropdown';
import nav from '../../router/nav';
import { useLocation, useNavigate } from 'react-router-dom';
import Toast from '../../../common/helper/toast/Toast';
import { ApiGetProfile } from '../../api-wrapper/ApiSuperAdmin';

function Sidebar({ open, setOpen }) {
	let navigate = useNavigate()
	let location = useLocation()
	const [profileData, setProfileData] = useState();
	const [activePage, setActivePage] = useState('');
	const [subMenuOpen, setSubMenuOpen] = useState('');
	const [path, setpath] = useState('')


	const pageChangeHandler = (path, el) => {


	}


	const logoutHandler = () => {
		localStorage.clear();
		navigate('/')
	}

	useEffect(() => {
		ApiGetProfile()
			.then((res) => {
				if (res.isSuccess) {
					localStorage.setItem('sellerSuperAdminLoginUser', res.profile.fullName)
					setProfileData(res.profile);

				} else {
					Toast.error(res.message);
				}
			})
			.catch((err) => {
				Toast.error("something went wrong!!");
			});
	}, []);

	const [state, setState] = useState({});


	const handleClick = (e, item, child) => {
		e.stopPropagation();
		setState(state => ({
			...state,
			[item]: !state[item]
		}));
		navigate(child.path)

		if (window.innerWidth <= 715) {
			var element = document.getElementById("wrapper");
			element.classList.remove("toggled");
			setOpen(false)
		}
	};

	const handler = children => {
		return children.map((child, i) => {
			const category = !child.category ? null : (
				<div className="nav-item category">{child.category}</div>
			);

			if (!child.children) {

				return (
					<>
						{category}
						<li onClick={e => handleClick(e, child.name, child)} key={i} className={`${child.path == location.pathname ? 'active' : ''}`}>
							<a className='sidebar_link'>{child.icon}{child.name}

							</a>
						</li>

					</>
				);
			}
			return (
				<>
					{category}
					<li onClick={e => handleClick(e, child.name, child)} key={i} >
						<a className='sidebar_link'>{child.icon}{child.name}
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
		<>
			<aside id="sidebar-wrapper" className='sidebar_container'>

				<div className='logo_section'>
					<div className='menu' onClick={() => setOpen(!open)}>
						<i className="fa fa-bars"></i>
					</div>
					<div>
						<img src={logo} style={{ height: "60px", width: 'auto' }} />
					</div>
				</div>

				<div className='sidebar_flex'>
					{/* <ul className="sidebar-nav pt-3">
                        {
                            nav?.map((el, i) => {
                                return (
                                    <>
                                        <li key={i} className={`${el.path == location.pathname ? 'active' : ''}`}>
                                            <a className='sidebar_link' onClick={() => pageChangeHandler(el.path, el)}>{el.icon}{el.name}</a>
                                        </li>
                                        {
                                            el.submenu &&
                                            <ul style={{ display: subMenuOpen == el.path ? 'block' : 'none' }} className='submenu'>
                                                {el.submenu.map((sub) => {
                                                    return (
                                                        <li key={sub.id} className={`${sub.path == location.pathname ? 'subActive' : ''}`}>
                                                            <a className="sidebar_link" onClick={() => subMenuHandler(sub)}>
                                                                {el.icon}
                                                                {sub.name}
                                                            </a>
                                                        </li>
                                                    )

                                                }

                                                )}
                                            </ul >
                                        }
                                    </>

                                )
                            })
                        }

                    </ul> */}

					<ul className="sidebar-nav sidebar_overflow pt-3">
						{handler(nav)}
					</ul>
					<ul className="sidebar-nav profile_divider">
						<li className='profile_section'>

							<Dropdown className='ms-0'>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									<i class="fa-solid fa-user"></i>
									<span className='ms-4' >{profileData?.fullName}</span>
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item onClick={() => logoutHandler()}>Logout</Dropdown.Item>

								</Dropdown.Menu>
							</Dropdown>
						</li>
					</ul>

				</div>
			</aside >
		</>
	)
}

export default Sidebar