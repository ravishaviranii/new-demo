import React, { createContext, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useStateManager } from "react-select";
import { sidebar, header, button, chart, body } from '../../layout/views/themeSetting/field';
export const ProfileContext = createContext();

export function UseContext({ children }) {
  const [profileData, setProfileData] = useState();
  const [selectedDate, setSelectedDate] = useState();
  const [today, setToday] = useState();
  const [themeData, setthemeData] = useState();
  const [currencyCode, setcurrencyCode] = useState()
  const [profileId, setProfileId] = useState([]);
  const [profileList, setProfileList] = useState([]);

  const [storeDara, setstoreDara] = useState();
  const [isConnection, setIsConnection] = useState(false);
  const [pagePermission, setPagePermission] = useState();
  const [typeValue, setTypeValue] = useState([]);

  useEffect(() => {
    setProfileData(profileList[0]);
  }, [profileList]);

  useEffect(() => {
    if (localStorage.getItem("profile") != null) {
      setstoreDara(JSON.parse(localStorage.getItem("profile")));
      setcurrencyCode(JSON.parse(localStorage.getItem("profile"))?.currencyCode)
    }
  }, [localStorage.getItem("profile")]);


  const themeCategories = [...sidebar, ...header, ...button, ...chart, ...body];


  useEffect(() => {
    if (localStorage.getItem('themeData')) {
      const theme = JSON.parse(localStorage.getItem('themeData'));
      const finalTheme = theme[0];
      const defaultThemeArray = [];
      for (const category in finalTheme) {
        const categoryObj = finalTheme[category];
        for (const property in categoryObj) {
          const colorValue = categoryObj[property];
          defaultThemeArray.push({ Id: property, color: colorValue });
        }
      }
      defaultThemeArray.forEach((x, i) => {
        const match = themeCategories.find((y, i) =>
          y.Id == x.Id
        )
        document.documentElement.style.setProperty(match?.colorName, x.color);
      })
    }

  }, [localStorage.getItem('themeData')]);



  // useEffect(() => {
  //   // if (localStorage.getItem("permission")) {
  //   //   setPagePermission(JSON.parse(localStorage.getItem("permission"))?.pages);
  //   // }
  //   if (pagePermission){
  //     setPagePermission()
  //   }
  // }, [localStorage.getItem("permission")]);
  console.log(storeDara, "storeDara")
  let data = {
    setToday,
    setSelectedDate,
    setProfileData,
    profileData,
    setProfileList,
    profileId,
    setProfileId,
    themeData,
    currencyCode,
    setthemeData,
    timezone: storeDara?.profile?.timezone,
    countryCode: storeDara?.profile?.countryCode,
    currencyCode: storeDara?.profile?.currencyCode,
    selectedDate,
    profileValue: storeDara?.profile?.profileId,
    profileSendID: storeDara?.profile?.profileId,
    today,
    fromDate: selectedDate && selectedDate[0],
    toDate: selectedDate && selectedDate[1],
    isConnection,
    setIsConnection,
    pagePermission,
    setPagePermission,
    setTypeValue,
    typeValue,
    customerId: storeDara?.profile?.customerId

  };

  return (
    <ProfileContext.Provider value={data}>{children}</ProfileContext.Provider>
  );
}
