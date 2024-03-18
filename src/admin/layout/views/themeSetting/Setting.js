import React, { useEffect, useState } from "react";
import Title from "../../component/title/Title";
import { sidebar, header, button, chart, body } from "./field";
import { HexColorPicker } from "react-colorful";
import Modal from "react-bootstrap/Modal";
import Filter from "../../../helper/filter/Filter";
import colors from "react-multi-date-picker/plugins/colors";
import { ApiThemeList } from "../../../api-wrapper/other/ApiSetting";
import { useDispatch } from "react-redux";
import { handleLoader } from "../../../../common/redux/action";
import Toast from "../../../../common/helper/toast/Toast";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import { useTranslation } from "react-i18next";


function Setting() {
  const { t } = useTranslation();

  const [headerSelected, setHeaderSelected] = useState();
  const [show, setShow] = useState(false);
  const [color, setColor] = useState();
  const [fieldName, setfieldName] = useState("");
  const dispatch = useDispatch()
  const defaultTheme = {
    sidebar: {
      sidebarBackgroundColor: "linear-gradient(180deg, #02468B 4.83%, #02468B 71.46%),  linear-gradient(0deg, #D4D4D4, #D4D4D4)",
      sidebarFontColor: 'white',
      sidebarIconColor: 'white'
    },
    header: {
      headerBackgroundColor: 'white',
      headerFontColor: '#18181B'
    },
    button: {
      saveButtonBackgroundColor: '#3B84DF',
      saveButtonFontColor: "white",
      cancelButtonBackgroundColor: '#FFFFFF',
      cancelButtonFontColor: '#E4E4E7',
      addButtonBackgroundColor: '#3B84DF',
      addButtonFontColor: 'white'
    },
    table: {
      chartsBackgroundColor: 'white'
    },
    body: {
      bodyBackgroundColor: 'white'
    },
  };
  const [changedTheme, setChangedTheme] = useState({
    sidebar: {
      sidebarBackgroundColor: "linear-gradient(180deg, #02468B 4.83%, #02468B 71.46%),  linear-gradient(0deg, #D4D4D4, #D4D4D4)",
      sidebarFontColor: 'white',
      sidebarIconColor: 'white'
    },
    header: {
      headerBackgroundColor: 'white',
      headerFontColor: '#18181B'
    },
    button: {
      saveButtonBackgroundColor: '#3B84DF',
      saveButtonFontColor: "white",
      cancelButtonBackgroundColor: '#FFFFFF',
      cancelButtonFontColor: '#E4E4E7',
      addButtonBackgroundColor: '#3B84DF',
      addButtonFontColor: 'white'
    },
    table: {
      chartsBackgroundColor: 'white'
    },
    body: {
      bodyBackgroundColor: 'white'
    },
  });
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




  const saveHandler = () => {

    if (color != undefined) {
      document.documentElement.style.setProperty(headerSelected, color);
    }
    if (fieldName.includes("sidebar")) {
      setChangedTheme(prevTheme => ({
        ...prevTheme,
        sidebar: {
          ...prevTheme.sidebar,
          [fieldName]: color,
        },
      }));
    }
    else if (fieldName.includes("header")) {
      setChangedTheme(prevTheme => ({
        ...prevTheme,
        header: {
          ...prevTheme.header,
          [fieldName]: color,
        },
      }));
    }
    else if (fieldName.includes("Button")) {
      setChangedTheme(prevTheme => ({
        ...prevTheme,
        button: {
          ...prevTheme.button,
          [fieldName]: color,
        },
      }));
    }
    else if (fieldName.includes("table")) {
      setChangedTheme(prevTheme => ({
        ...prevTheme,
        table: {
          ...prevTheme.table,
          [fieldName]: color,
        },
      }));
    }
    else if (fieldName.includes("body")) {
      setChangedTheme(prevTheme => ({
        ...prevTheme,
        body: {
          ...prevTheme.body,
          [fieldName]: color,
        },
      }));
    }

    setShow(false);
    setHeaderSelected();

  };



  // color picker modal //
  const handleClose = () => setShow(false);
  const handleShow = (id) => {
    setShow(true);
    setfieldName(id);
  };

  const cancelHandler = () => {
    setShow(false);
    setHeaderSelected();
  };


  const getClr = (variable) => {
    const rootStyles = getComputedStyle(document.documentElement);
    const titleBgColor = rootStyles?.getPropertyValue(variable);
    return titleBgColor;
  };


  const saveThemeHandler = async () => {
    localStorage.setItem('themeData', JSON.stringify([changedTheme]));
    dispatch(handleLoader(true));
    const data = changedTheme

    await ApiThemeList(data)
      .then((e) => {
        if (e?.isSuccess) {
          dispatch(handleLoader(false));
          Toast.success(e?.message);
        } else {
          dispatch(handleLoader(false));

          Toast.error(e?.message);
        }
      })
      .catch((e) => {
        dispatch(handleLoader(false));
        Toast.error("Somthing went wrong");
      });
  }



  const defaultThemeHandler = async () => {
    const defaultThemeArray = [];

    // Loop through each key in the theme object
    for (const category in defaultTheme) {
      const categoryObj = defaultTheme[category];

      // Loop through each property in the category object
      for (const property in categoryObj) {
        const colorValue = categoryObj[property];

        // Add an object to the array with property name and color value
        defaultThemeArray.push({ Id: property, color: colorValue });
      }
    }


    defaultThemeArray.forEach((x, i) => {
      const match = themeCategories.find((y, i) =>
        y.Id == x.Id
      )
      
      document.documentElement.style.setProperty(match.colorName, x.color);
    })


    dispatch(handleLoader(true));
    const data = defaultTheme

    await ApiThemeList(data)
      .then((e) => {
        if (e?.isSuccess) {
          dispatch(handleLoader(false));
          Toast.success(e?.message);
        } else {
          dispatch(handleLoader(false));

          Toast.error(e?.message);
        }
      })
      .catch((e) => {
        dispatch(handleLoader(false));
        Toast.error("Somthing went wrong");
      });
    setChangedTheme(defaultTheme)


  }
  return (
    <>
      <Filter
        name={t('themeSetting')}
        nameShow={true}
        dateShow={false}
        profileShow={false}
      />
      <div className="router_container theme">
        <div>
          {
            PermissionCheck('Theme Settings','Allow Theme Change') && (
              <button className="save-btn ms-auto me-0 me-2 mb-1 mb-md-0" onClick={saveThemeHandler}>{t('saveTheme')}</button>
              )
          }
          <button className="save-btn " onClick={defaultThemeHandler}>{t('defaultTheme')}</button>
        </div>
        <div className="theme_setting_container">
          <div className="theme_section">
            <h6>{t('sideBar')}</h6>

            <div className="sub_section">
              {sidebar?.map((el, i) => {
                return (
                  <div className="input_group" key={i}>
                    <label>{el.name}</label>
                    <br />
                    <div className="input_color">
                      <button
                        className="color_picker"
                        style={{ backgroundColor: getClr(el.colorName) }}
                        onClick={() => {
                          setHeaderSelected(el.colorName);
                          handleShow(el.Id);
                        }}
                      ></button>
                      <input type="text" value={getClr(el.colorName)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="theme_section">
            <h6>{t('header')}</h6>

            <div className="sub_section">
              {header?.map((el, i) => {
                return (
                  <div className="input_group" key={i}>
                    <label>{el.name}</label>
                    <br />
                    <div className="input_color">
                      <button
                        className="color_picker "
                        style={{ backgroundColor: getClr(el.colorName) }}
                        onClick={() => {
                          setHeaderSelected(el.colorName);
                          handleShow(el.Id);
                        }}
                      ></button>
                      <input type="text" value={getClr(el.colorName)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="theme_section">
            <h6>{t('button')}</h6>

            <div className="sub_section">
              {button?.map((el, i) => {
                return (
                  <div className="input_group" key={i}>
                    <label>{el.name}</label>
                    <br />
                    <div className="input_color">
                      <input type="text" value={getClr(el.colorName)} />
                      <button
                        className="color_picker"
                        style={{ backgroundColor: getClr(el.colorName) }}
                        onClick={() => {
                          setHeaderSelected(el.colorName);
                          handleShow(el.Id);
                        }}
                      ></button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="theme_section">
            <h6>{t('table')}</h6>

            <div className="sub_section">
              {chart?.map((el, i) => {
                return (
                  <div className="input_group" key={i}>
                    <label>{el.name}</label>
                    <br />
                    <div className="input_color">
                      <button
                        className="color_picker "
                        style={{ backgroundColor: getClr(el.colorName) }}
                        onClick={() => {
                          setHeaderSelected(el.colorName);
                          handleShow(el.Id);
                        }}
                      ></button>
                      <input type="text" value={getClr(el.colorName)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="theme_section">
            <h6>{t('body')}</h6>

            <div className="sub_section">
              {body?.map((el, i) => {
                return (
                  <div className="input_group" key={i}>
                    <label>{el.name}</label>
                    <br />
                    <div className="input_color">
                      <button
                        className="color_picker "
                        style={{ backgroundColor: getClr(el.colorName) }}
                        onClick={() => {
                          setHeaderSelected(el.colorName);
                          handleShow(el.Id);
                        }}
                      ></button>
                      <input type="text" value={getClr(el.colorName)} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{t('chooseColor')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <HexColorPicker color={color} onChange={setColor} />
          </Modal.Body>
          <Modal.Footer>
            <button
              className="cancel_btn ps-4 pt-2 pb-2 pe-4"
              onClick={() => cancelHandler()}
            >
              {t('cancel')}
            </button>
            <button
              className="save_btn ps-4 pt-2 pb-2 pe-4"
              onClick={() => saveHandler()}
            >
              {t('save')}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Setting;

