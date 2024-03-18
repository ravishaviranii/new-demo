import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast, Controller } from "../../../helper/links/Link";
import { Modal } from "react-bootstrap";
import {
  ApiView,
  ApiSendMsg,
} from "../../../api-wrapper/supportSystem/SupportSystem";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import moment from "moment";
import { useTranslation } from 'react-i18next';

// import io from "socket.io-client";
function Chat({ viewId, viewFlag, setViewFlag, status, ticketnumber, setTicketnumber }) {
  const { t } = useTranslation();

  // const socket = io('http://localhost:6000/')
  let { loginUserName, timezone } = useContext(ProfileContext);
  const [title, setTitle] = useState("");
  const [msg, setMsg] = useState("");
  const [chatArr, setChatArr] = useState([]);
  const [error, setError] = useState(false);

  const HandleView = () => {
    ApiView(viewId)
      .then((res) => {
        if (res.isSuccess) {
          setTitle(res.getTicket?.title);
          setChatArr(res.getTicketMessages);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  };
  useEffect(() => {
    HandleView();
  }, []);

  const HandleSubmit = () => {
    if (msg == "") {
      setError(true);
    } else {
      let data = {
        message: msg,
      };
      ApiSendMsg(data, viewId)
        .then((res) => {
          if (res.isSuccess) {
            setMsg("");
            HandleView();
          } else {
            Toast.error(res.message);
          }
        })
        .catch((err) => { });
    }
  };

  const handleCloseView = () => {
    setViewFlag(false)
    setTicketnumber("")
  }

  return (
    <div className="chat">
      <div className="row title">
        <div className="col-6">
          <div className="">
            <p onClick={handleCloseView}>{title}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="">
            <p className="text-dark d-flex flex-wrap justify-content-end">
              {t("ticketNumber")} - {ticketnumber}
            </p>
          </div>
        </div>
      </div>

      <div
        className="chat_section"
        style={status == 0 ? { display: "inline" } : { display: "block" }}
      >
        <div
          className="msg"
          style={
            status == 0
              ? { height: "calc(100% - 201px)" }
              : { height: "calc(100% - 63px)" }
          }
        >
          {chatArr.map((el) => {
            return (
              <div
                className={`${localStorage.getItem("sellerAdminLoginUser") ==
                  el.customerId?.fullName
                  ? "right"
                  : "left"
                  } inner_msg`}
              >
                <h6>
                  {el.customerId?.fullName}{" "}
                  <span>
                    {" "}
                    (
                    {moment(el?.createdAt)
                      .tz(timezone && timezone)
                      .format("hh:mm A")}
                    )
                  </span>
                </h6>
                <p>{el.message}</p>
              </div>
            );
          })}
        </div>
        {status == 0 && (
          <div className="send_btn">
            {error && <p className="error">{t('pleaseEnterTheMessage')}</p>}
            <textarea
              id="w3review"
              rows="2"
              cols="50"
              placeholder={t('enterYourMessage')}
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                setError(false);
              }}
            ></textarea>
            <button type="submit" onClick={() => HandleSubmit()}>
              {t('save')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
