import React, { useContext, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Toast, Controller } from "../../../admin/helper/links/Link";
import { Modal } from "react-bootstrap";
import moment from "moment";
import {
  ApiView,
  ApiReplyMsg,
  ApiCloseTicket,
} from "../../api-wrapper/ApiSupportSystem";
import io from "socket.io-client";
function Chat({
  viewId,
  viewFlag,
  setViewFlag,
  status,
  HandleList,
  ticketnumber,
}) {
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
      ApiReplyMsg(data, viewId)
        .then((res) => {
          if (res.isSuccess) {
            setMsg("");
            HandleView();
          } else {
            Toast.error(res.message);
          }
        })
        .catch((err) => {
          Toast.error("Somthing went wrong");
        });
    }
  };

  const HandleCloseTicket = () => {
    let data = {
      status: 1,
    };

    ApiCloseTicket(data, viewId)
      .then((res) => {
        if (res.isSuccess) {
          setMsg("");
          HandleList();
          setViewFlag(false);
          Toast.success(res.message);
        } else {
          Toast.error(res.message);
        }
      })
      .catch((err) => {
        Toast.error("Somthing went wrong");
      });
  };

  return (
    <div className="chat superadmin">
      <div className="row title">
        <div className="col-6">
          <div className="">
            <p onClick={() => setViewFlag(false)}>{title}</p>
          </div>
        </div>
        <div className="col-6">
          <div className="">
            <p className="text-dark d-flex flex-wrap justify-content-end">
              Ticket Number - {ticketnumber}
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
                className={`${localStorage.getItem("sellerSuperAdminLoginUser") ==
                    el.customerId?.fullName
                    ? "right"
                    : "left"
                  } inner_msg`}
              >
                <h6>
                  {el.customerId?.fullName}{" "}
                  <span> ({moment(el?.createdAt).format("hh:mm A")})</span>
                </h6>
                <p>{el.message}</p>
              </div>
            );
          })}
        </div>
        {status == 0 && (
          <div className="send_btn">
            {error && <p className="error">Please enter the message</p>}
            <textarea
              id="w3review"
              rows="2"
              cols="50"
              placeholder="Enter Your Message..."
              value={msg}
              onChange={(e) => {
                setMsg(e.target.value);
                setError(false);
              }}
            ></textarea>
            <button type="submit" onClick={() => HandleSubmit()}>
              Submit
            </button>
            <button
              type="submit"
              className="close_ticket"
              onClick={() => HandleCloseTicket()}
            >
              Close Ticket
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;
