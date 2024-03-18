import { loginSchema } from "../../admin/utility/validator";
import { ApiLogin } from "../../admin/api-wrapper/auth/ApiAuth";
import {
  Toast,
  useDispatch,
  useNavigate,
  Link,
  useForm,
  yupResolver,
  Controller,
} from "../../admin/helper/links/Link";
import React, { useState, useEffect } from "react";
import {
  connectionHandler,
  handleLoader,
  profileInfoHandler,
} from "../redux/action";
import Cookies from "js-cookie";
import Loader from "../helper/loader/Loader";
import { useSelector } from "react-redux";
import Setting from "../../admin/layout/views/themeSetting/Setting";
import { ProfileContext } from "../../admin/helper/usecontext/useContext";
import { useContext } from "react";
import { ApiCheckAmazonConnection } from "../../admin/api-wrapper/other/ApiSetting";
import Logo from "../img/ADVERTISE IQ.svg";
import axios from "axios";
import { sidebar, header, button, chart, body } from '../../admin/layout/views/themeSetting/field';
function Login() {
  let dispatch = useDispatch();
  const Loading = useSelector((state) => state.data);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginSchema) });

  const [login, setLogin] = useState({
    email: "",
    password: "",
    ipAddress: "",
  });

  const [location, setLocation] = useState({
    country_name: "",
    country_code: "",
    state_name: "",
    state_code: "",
    city: "",
    postal_code: "",
    latitude: "",
    longitude: "",
  });

  const [timeZone, setTimeZone] = useState({
    name: "",
    abbreviation: "",
    current_time: "",
  });

  const [currency, setCurrency] = useState({
    currency_name: "",
    currency_code: "",
  });

  const [countryflag, setCountryFlag] = useState()

  const [flag, setFlag] = useState(false);

  const APIkey = process.env.REACT_APP_API_KEY_IPLOCATION;

  const getUserLocationFromAPI = async () => {
    try {
      const response = await axios.get(
        `https://ipgeolocation.abstractapi.com/v1/?api_key=${APIkey}`
      );
      console.log(response);
      setLocation({
        country_name: response.data?.country,
        country_code: response.data?.country_code,
        state_name: response.data?.region,
        state_code: response.data?.region_iso_code,
        city: response.data?.city,
        postal_code: response.data?.postal_code,
        latitude: response.data?.latitude.toString(),
        longitude: response.data?.longitude.toString(),
      });
      setTimeZone({
        name: response.data?.timezone?.name,
        abbreviation: response.data?.timezone?.abbreviation,
        current_time: response.data?.timezone?.current_time
      })
      setCurrency({
        currency_name: response.data?.currency?.currency_name,
        currency_code: response.data?.currency?.currency_code
      })
      setCountryFlag(response.data?.flag?.svg)
    } catch (error) {
      console.log("Something went wrong getting Geolocation from API!", error);
    }
  };

  const getIpAddress = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    setLogin({ ...login, ipAddress: res.data?.ip })
  };

  useEffect(() => {
    getIpAddress();
    getUserLocationFromAPI();
  }, []);

  useEffect(() => {
    if (Cookies.get("sellerLogin")) {
      setLogin({
        email: JSON.parse(Cookies.get("sellerLogin")).email,
        password: JSON.parse(Cookies.get("sellerLogin")).password,
      });
      reset({
        email: JSON.parse(Cookies.get("sellerLogin")).email,
        password: JSON.parse(Cookies.get("sellerLogin")).password,
      });
      setFlag(true);
    }
  }, []);

  useEffect(() => {
    if (login && flag) {
      Cookies.set("sellerLogin", JSON.stringify(login));
    }
  }, [flag, login]);

  const submitHandler = (data) => {
    const updatedData = {
      ...data,
      ip_address: login.ipAddress,
      location: location,
      timeZone: timeZone,
      currency: currency,
      flag: countryflag
    };
    setLogin(updatedData);
    dispatch(handleLoader(true));
    ApiLogin(updatedData)
      .then((res) => {
        if (res.isSuccess) {

          if (res.role == 1) {
            localStorage.setItem("sellerPanel", "superAdmin");
            localStorage.setItem("superAdminToken", res.authToken);
            window.location.href = "/";
          } else {
            localStorage.setItem("sellerPanel", "admin");
            localStorage.setItem("sellerToken", res.authToken);
            if (res.themeData) {
              localStorage.setItem("themeData", JSON.stringify(res.themeData));
            }
            Toast.success(res.message);
            if (res.authToken) {
              let idSend = {
                customerId: res.customerId,
              };
              const headers = {
                Authorization: `Bearer ${res.authToken}`,
                "Content-Type": "application/json",
              };
              axios
                .post(
                  `${process.env.REACT_APP_API_BASE}/api/configAds/checkConnectAccount`,
                  idSend,
                  { headers }
                )
                .then((result) => {
                  if (result.data.connect) {

                    console.log("result for login::", result)

                    window.location.href = "/";
                    localStorage.setItem("connection", true);
                    dispatch(handleLoader(false));
                  } else {
                    localStorage.setItem("connection", false);
                    window.location.href = "/settings";
                    dispatch(handleLoader(false));
                  }
                })
                .catch((err) => {
                  window.location.href = "/";
                });
            }
          }
        } else {
          Toast.error(res.message);
          dispatch(handleLoader(false));
        }
      })
      .catch((err) => {
        dispatch(handleLoader(false));
        Toast.error("Somthing went wrong");
      });
  };

  const rememberMeHandler = (e) => {
    if (e.target.checked) {
      setFlag(true);
    } else {
      Cookies.remove("sellerLogin", JSON.stringify(login));
      setFlag(false);
    }
  };

  return (
    <>
      {Loading.loader === true && <Loader />}
      <div className="login_section">
        <div className="section_1">
          <div className="section_1_content">
            <img src={Logo} className="logo_section" />
            <h3>Welcome to the Advertise IQ</h3>
            <p>
              "The Associates Program will provide all the tools and data needed
              to make quick content decisions and continually grow your
              earnings"
            </p>
            <h6>~ Advertise IQ</h6>
          </div>
        </div>
        <div className="section_2 login-box">
          <div className="inner_section">
            <h3>LOGIN TO YOUR ACCOUNT</h3>

            <form onSubmit={handleSubmit(submitHandler)}>
              <div className="user-box">
                <label className="user-box-label">Email</label>
                <br />
                <Controller
                  control={control}
                  name="email"
                  {...register("email")}
                  render={({ field }) => (
                    <input
                      {...field}
                      className="user-box-input"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />

                {errors.email && (
                  <p className="error">{errors.email.message}</p>
                )}
              </div>
              <div className="user-box">
                <label className="user-box-label">Password</label>
                <br />
                <Controller
                  control={control}
                  name="password"
                  {...register("password")}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      className="user-box-input"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                      }}
                    />
                  )}
                />

                {errors.password && (
                  <p className="error">{errors.password.message}</p>
                )}
              </div>

              <div className="remember">
                <input
                  type="checkbox"
                  checked={flag}
                  onClick={(e) => rememberMeHandler(e)}
                />
                <label className="ps-2">Remember me</label>
              </div>
              <button type="submit" className="login-box-button">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
