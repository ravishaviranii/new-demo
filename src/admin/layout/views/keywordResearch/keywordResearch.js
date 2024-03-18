import React, { useContext, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { handleLoader, Toast, useDispatch } from "../../../helper/links/Link";
import { KeywordResearchListing } from "../../../api-wrapper/keywordResearch/keywordResearch";
import { ProfileContext } from "../../../helper/usecontext/useContext";
import { PermissionCheck } from "../../../helper/permission/PermissionCheck";
import Filter from "../../../helper/filter/Filter";
import { languages } from "./data";
import { SelectPicker } from "rsuite";
import { useTranslation } from 'react-i18next';


const KeywordResearch = () => {

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [search, setSearch] = useState();
  const [tableData, setTableData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filter, setFilter] = useState({
    type: "phrase",
    minCPC: "",
    maxCPC: "",
    location: "IN",
    language: "en",
    minSearchVolume: "",
    maxSearchVolume: "",
  });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data.map((country) => ({
          label: (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={country.flags.svg}
                alt={country.name.common}
                width={24}
                height={16}
                style={{ marginRight: '8px' }}
              />
              {country.name.common}
            </div>
          ),
          value: country.cca2,
        })));
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;

    setFilter((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };


  const columns = [
    {
      name: `${t("keyword")}`,
      selector: (row) => row.keyword,
      cell: (row) => {
        return (
          <div className='text-uppercase'>{row.keyword}</div>
        )
      },
      sortable: true,
    },
    {
      name: `${t("similarity")}`,
      selector: (row) => row.similarity,
      cell: (row) => {
        let similarity = Number(row.similarity);
        similarity = similarity.toFixed(2);
        return (
          <div>{similarity}</div>
        )
      },
      sortable: true,
    },
    {
      name: `${t("searchvolume")}`,
      selector: (row) => row.searchVolume,
      sortable: true,
    },
    {
      name: `${t("cpc")}`,
      selector: (row) => row.cpc,
      cell: (row) => {
        let cpc = Number(row.cpc);
        if (cpc) {
          cpc = cpc.toFixed(2);
        }
        return (
          <div>{cpc}</div>
        )
      },
      sortable: true,
    },
    {
      name: `${t("paidcompetition")}`,
      selector: (row) => row.paidCompetition,
      sortable: true,
    },
  ];

  const keywordListing = async () => {
    if (!search) {
      return Toast.warning("please enter search value");
    } else if (filter.maxCPC && filter.minCPC) {
      if (filter.maxCPC < filter.minCPC) {
        return Toast.warning("maxcpc should not be less than mincpc");
      }
    } else if (filter.maxSearchVolume && filter.minSearchVolume) {
      if (filter.maxSearchVolume < filter.minSearchVolume) {
        return Toast.warning(
          "max search volume should not be less than min search volume"
        );
      }
    }
    dispatch(handleLoader(true));
    let keywordParam = "";
    if (filter.type === "phrase") {
      keywordParam = "phrase";
    } else if (filter.type === "exact") {
      keywordParam = "exact";
    }
    const data = {
      [keywordParam]: search,
      minCPC: filter.minCPC ? parseInt(filter.minCPC) : 0,
      maxCPC: filter.maxCPC ? parseInt(filter.maxCPC) : 0,
      location: filter.location,
      language: filter.language,
      minSearchVolume: filter.minSearchVolume
        ? parseInt(filter.minSearchVolume)
        : 0,
      maxSearchVolume: filter.maxSearchVolume
        ? parseInt(filter.maxSearchVolume)
        : 0,
    };
    await KeywordResearchListing(data)
      .then((e) => {
        if (e?.isSuccess) {
          const keywordsData = e?.data?.keywords;
          const keywordNames = Object.keys(keywordsData);

          const keywordDetails = keywordNames.map((keyword) => {
            return {
              keyword: keyword,
              searchVolume: keywordsData[keyword]["search volume"],
              similarity: keywordsData[keyword]["similarity"],
              cpc: keywordsData[keyword]["cpc"],
              paidCompetition: keywordsData[keyword]["paid competition"],
            };
          });
          setTableData(keywordDetails);
          setTotalRecords(keywordDetails.length);
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
  };

  return (
    <>
      <Filter name={t("keywordResearchTool")} nameShow={true} dateShow={false} profileShow={false} />
      <div className="middle_container">
        <div className="data_content data_content_btn mt-3">
          <div className="search_keyword">
            <div className="row row-cols-1 d-flex justify-content-center px-1">
              <div className="col col-12 col-md-8 col-lg-6 col-xl-5 col-xxl-4  search_option ms-1 p-2 ">
                <input
                  type="text"
                  placeholder={t("searchHere")}
                  onChange={(e) => handleSearch(e)}
                />
                <button
                  className="me-2"
                  onClick={keywordListing}
                >
                  {t("search")}
                </button>
              </div>
            </div>
            <div className="set_values p-2 py-0 py-md-2 px-1 border-bottom">
              <div className="row row-cols-1 row-cols-lg-2 pt-2">
                <div className="col col-lg-4">
                  <div className="row row-cols-1 row-cols-md-2">

                    <div className="col p-2 pt-0 pt-md-2">
                      <SelectPicker
                        data={countries}
                        value={filter.location}
                        onChange={(value) => { setFilter({ ...filter, location: value }) }}
                        style={{ width: '100%' }}
                        renderMenuItem={(label, item) => (
                          <div key={item.value} style={{ display: 'flex', alignItems: 'center' }}>
                            {label}
                          </div>
                        )}
                      />
                    </div>
                    <div className="col p-2 pt-0 pt-md-2">
                      <SelectPicker
                        data={languages?.map(x => ({ value: x.languageCode, label: x.languageName }))}
                        style={{ width: '100%' }}
                        value={filter.language}
                        onChange={(value) => { setFilter({ ...filter, language: value }) }}
                        placeholder="All Vendor"
                      />
                    </div>
                  </div>
                </div>
                <div className="col col-lg-8">
                  <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 pt-0 pt-lg-2 value_inputs">
                    <div className="col p-2 pt-0">
                      <input
                        name="minCPC"
                        type="number"
                        className="w-100"
                        onChange={handleChange}
                        placeholder={t("entermincpc")}
                      />
                    </div>
                    <div className="col p-2 pt-0">
                      <input
                        name="maxCPC"
                        type="number"
                        className="w-100 h-100"
                        onChange={handleChange}
                        placeholder={t("entermaxcpc")}
                      />
                    </div >
                    <div className="col p-2 pt-0">
                      <input
                        name="minSearchVolume"
                        type="number"
                        className="w-100"
                        onChange={handleChange}
                        placeholder={t("enterminsearch")}
                      />
                    </div>
                    <div className="col p-2 pt-0">
                      <input
                        name="maxSearchVolume"
                        type="number"
                        className="w-100"
                        onChange={handleChange}
                        placeholder={t("entermaxsearch")}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {PermissionCheck('Keyword Research Tool', 'View Only') &&
            <div className="data_table mt-4">
              <DataTable
                className="table_content"
                columns={columns}
                data={Object.values(tableData)}
                pagination
                paginationTotalRows={totalRecords}
                paginationPerPage={10} // You can set the number of rows per page
                // Add other DataTable props as needed
                striped
                fixedHeader
              />
            </div>
          }
        </div>
      </div>
    </>
  );
};

export default KeywordResearch;
