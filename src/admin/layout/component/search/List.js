import React, { useState, useEffect } from 'react'
import { useTranslation } from "react-i18next";
function List({ listId }) {
  const { t } = useTranslation();
  const [searchData, setSearchData] = useState();

  const [searchString, setsearchString] = useState("");
  const [filterValue, setfilterValue] = useState('All');

  useEffect(() => {
    setSearchData(listId)
  }, [listId]);

  const handleChange = (e) => {
   
    const searchString = e.target.value.trim().toLowerCase();
    setsearchString(e.target.value);

    let dataForSearch = listId;


    if (searchString !== "") {
      const arr = dataForSearch?.filter((l) =>
        l.name.toLowerCase().includes(searchString)
      );

      let filteredData;
      if (filterValue == 'All') {
        filteredData = arr
      }
      else {
        filteredData = arr.filter(x => x.type == filterValue)
      }

      setSearchData(filteredData);


    } else {
      let filteredData;
      if (filterValue == 'All') {
        filteredData = dataForSearch
      }
      else {
        filteredData = dataForSearch.filter(x => x.type == filterValue)
      }

      setSearchData(filteredData);

    }
  };


  const filterHandler = (val) => {

   
    setfilterValue(val)
    if (val == "All") {

      const filteredData = listId?.filter((l) =>
        l.name.toLowerCase().includes(searchString)
      );
      setSearchData(filteredData)




    }
    else {
      let arr = listId;

      let findArr = arr.filter(x => x.type == val)
      if (searchString) {
        const filteredData = findArr?.filter((l) =>
          l.name.toLowerCase().includes(searchString)
        );
        setSearchData(filteredData)
      }
      else {
        setSearchData(findArr)

      }


    }


  }


  return (
   
    <div className='assign_campaign_detail'>
      <div>
        <h6>Filter Campaign Type: </h6>

        <div className='filter_type'>
          <button onClick={() => filterHandler('All')} className={`${filterValue == 'All' ? 'active' : ''} filter_name`}  >All</button>
          <button onClick={() => filterHandler('Sponsored Products')} className={`${filterValue == 'Sponsored Products' ? 'active' : ''} filter_name`} >Products</button>
          <button onClick={() => filterHandler('Sponsored Brands')} className={`${filterValue == 'Sponsored Brands' ? 'active' : ''} filter_name`} >Brands</button>
          <button onClick={() => filterHandler('Sponsored Display')} className={`${filterValue == 'Sponsored Display' ? 'active' : ''} filter_name`}>Display</button>
        </div>

      </div>

      <div className='mt-2 search_section'>
        <h6>Search Campaign : </h6>
        <input
          type="text"
          className='serach_text'
          value={searchString}
          onChange={(e) => handleChange(e)}
          placeholder={t("searchHere")}
        />
      </div>


      <div className='campaign_list'>
        <div className='list'>
          {
            searchData?.length == 0 ?
              <h6 className='text-center pt-2'> Data Not Found</h6>
              :
              <div className='search_list'>
                {

                  searchData?.map((el, index) => {
                    return (
                      <div className='inner_list '>
                        <p className='m-0 ps-4'>{el.name} </p>
                      </div>
                    )
                  })}
              </div>
          }
        </div>
      </div>

    </div>
  )
}

export default List