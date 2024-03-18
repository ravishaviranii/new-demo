import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from 'react-i18next';
import i18next from 'i18next';
import Filter from "../../../helper/filter/Filter";
import { Form } from "react-bootstrap";
import { Toast } from "../../../helper/links/Link";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";


const LanguageSetting = () => {
    const { t, i18n } = useTranslation();
    const [language, setLanguage] = useState()

    const changeLanguage = () => {
        i18n.changeLanguage(language);
        // Save the selected language in local storage
        localStorage.setItem('selectedLanguage', language);
        Toast.success(`${t('languageChanged')}`)
    }

    // Read the selected language from local storage when the component mounts
    useEffect(() => {
        const selectedLanguage = localStorage.getItem('selectedLanguage');
        if (selectedLanguage) {
            i18n.changeLanguage(selectedLanguage);
            setLanguage(selectedLanguage)
        }
    }, []);

    return (
        <>
            <Filter
                name={t('languageSetting')}
                nameShow={true}
                dateShow={false}
                profileShow={false}
            />
            <div className="router_container theme">
                <label className="fs-6 fw-medium">{t("chooseLanguage")}</label>
                <div className="d-flex mt-2">
                    <Form.Check
                        inline
                        label="English"
                        name="sortingType"
                        type="radio"
                        className="fw-medium"
                        value="en"
                        onChange={(e) => setLanguage(e.target.value)}
                        id={`inline-1`}
                        checked={language === "en"}
                    />
                    <Form.Check
                        inline
                        label="Hindi"
                        name="sortingType"
                        type="radio"
                        className="fw-medium"
                        value="hi"
                        onChange={(e) => setLanguage(e.target.value)}
                        id={`inline-2`}
                        checked={language === "hi"}

                    />
                    <Form.Check
                        inline
                        label="Gujarati"
                        name="sortingType"
                        type="radio"
                        className="fw-medium"
                        value="gu"
                        onChange={(e) => setLanguage(e.target.value)}
                        id={`inline-3`}
                        checked={language === "gu"}
                    />
                    <Form.Check
                        inline
                        label="Chinese"
                        name="sortingType"
                        type="radio"
                        className="fw-medium"
                        value="zh"
                        onChange={(e) => setLanguage(e.target.value)}

                        id={`inline-4`}
                        checked={language === "zh"}

                    />
                    <Form.Check
                        inline
                        label="German"
                        name="sortingType"
                        type="radio"
                        className="fw-medium"
                        value="ge"
                        onChange={(e) => setLanguage(e.target.value)}

                        id={`inline-4`}
                        checked={language === "ge"}

                    />
                </div>
                {/* {
                    PermissionCheck('Language Setting', 'Allow Language Change') && (
                        <div className="mt-2">
                            <button className="save_btn px-5" onClick={changeLanguage}>Save</button>
                        </div>
                    )
                } */}
                <div className="mt-2">
                    <button className="save_btn px-5" onClick={changeLanguage}>{t('save')}</button>
                </div>
            </div>
        </>
    )
}

export default LanguageSetting