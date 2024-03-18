import React, { useEffect } from "react";
import font from "../../../admin/assets/images/filter.svg";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useRef } from "react";
import { Form } from "react-bootstrap";

function CustomFilter({
  field,
  showFilter,
  setShowFilter,
  conditionObj,
  setConditionObj,
  setfieldName,
  setCustomFilterFlag,
  defaultValue,
}) {
  const [firstvalidation, setfirstvalidation] = useState(false);
  const [secondvalidation, setsecondvalidation] = useState(false);
  const [sortingType, setsortingType] = useState("");
  const [flag, setflag] = useState(false);
  const targetDivRef = useRef(null);
  const calculateModalPosition = () => {
    const targetDivRect = targetDivRef.current.getBoundingClientRect();
    const modalWidth = 150;

    const modalStyle = {
      top: `${targetDivRect.bottom + window.scrollY - 20}px`,
      left: `${targetDivRect.left + window.scrollX + (targetDivRect.width - modalWidth)
        }px`,
      width: "200px",
    };
    return modalStyle;
  };

  const FilterHandler = (field) => {
    
    setflag(true);

    if (conditionObj?.operator != "") {
      if (secondvalidation) {
        // let arr = []
        // let filterFunction = new Function('x', `
        // return x.${field} ${conditionObj?.firstCondition} ${conditionObj?.firstValue} ${conditionObj?.operator} x.${field} ${conditionObj?.secondCondition} ${conditionObj?.secondValue};
        // `);
        // arr = data.filter((x, i) => filterFunction(x));
        // setData(arr)
        // setConditionObj({ firstCondition: '', firstValue: 0, operator: '', secondCondition: '', secondValue: 0 })
        setfieldName(field);
        setCustomFilterFlag(true);
        setShowFilter(false);
      }
    } else {
      if (firstvalidation) {
        // let arr = []
        // let filterFunction = new Function('x', `
        // return x.${field} ${conditionObj?.firstCondition} ${conditionObj?.firstValue};
        //  `);
        // arr = data.filter((x, i) => filterFunction(x));
        // setData(arr)
        // setConditionObj({ firstCondition: '', firstValue: 0, operator: '', secondCondition: '', secondValue: 0 })
        setfieldName(field);
        setCustomFilterFlag(true);
        setShowFilter(false);
      }
    }
  };

  const TypeHandler = (e) => {
    
    if (e.target.checked) {
      setConditionObj({ ...conditionObj, sortType: e.target.value });
    } else {
    }
  };

  useEffect(() => {
    
    setConditionObj(defaultValue);
  }, []);

  useEffect(() => {
    
    if (showFilter == true) {
      setConditionObj(defaultValue);
    }
  }, [showFilter]);

  return (
    <>
      <img
        className="ms-2"
        style={{ width: "12px", height: "15px", marginBottom: "2px" }}
        src={font}
        onClick={() => {
          setShowFilter(true);
        }}
        ref={targetDivRef}
      />
      <div className="customFilter">
        {showFilter && (
          <Modal
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            show={showFilter}
            onHide={() => setShowFilter(false)}
            style={calculateModalPosition()}
          >
            <Modal.Header className="p-2 bg-light" closeButton>
              <p className="text-uppercase fw-bold">{field}</p>
            </Modal.Header>
            <Modal.Body className="p-2">
              <select
                id="cars"
                name="firstCondtion"
                value={conditionObj?.firstCondition}
                className="my-1 border border-1 fw-2 rounded w-100"
                onChange={(e) => {
                  setConditionObj({
                    ...conditionObj,
                    firstCondition: e.target.value,
                  });
                }}
              >
                <option value="">Select</option>
                <option value="LESS_THAN">Less than</option>
                <option value="LESS_THAN_OR_EQUAL_TO">
                  Less than or equals to
                </option>
                <option value="EQUAL_TO">Equals to</option>
                <option value="GREATER_THAN_OR_EQUAL_TO">
                  Greater than or equals to
                </option>
                <option value="GREATER_THAN">Greater than</option>
              </select>
              <input
                type="number"
                className="my-1 border border-1 fw-2 rounded w-100"
                placeholder="Enter value here"
                value={conditionObj?.firstValue ? conditionObj.firstValue : ""}
                onChange={(e) => {
                  setConditionObj({
                    ...conditionObj,
                    firstValue: e.target.value,
                  });
                  setfirstvalidation(true);
                }}
              />
              {!firstvalidation && flag && (
                <p className="error">Check the first condition.</p>
              )}

              <select
                id="cars"
                name="firstCondtion"
                value={conditionObj?.operator}
                className="my-1 border border-1 fw-2 rounded w-100"
                onChange={(e) =>
                  setConditionObj({
                    ...conditionObj,
                    operator: e.target.value,
                  })
                }
              >
                <option value="" selected>
                  Select condition here..
                </option>
                <option value="AND">AND</option>
                <option value="OR">OR</option>
              </select>
              {conditionObj?.operator != "" && (
                <>
                  <select
                    id="cars"
                    name="secondOption"
                    value={conditionObj?.secondCondition}
                    className="my-1 border border-1 fw-2 rounded w-100"
                    onChange={(e) =>
                      setConditionObj({
                        ...conditionObj,
                        secondCondition: e.target.value,
                      })
                    }
                  >
                    <option value="">Select</option>
                    <option value="LESS_THAN">Less than</option>
                    <option value="LESS_THAN_OR_EQUAL_TO">
                      Less than or equals to
                    </option>
                    <option value="EQUAL_TO">Equals to</option>
                    <option value="GREATER_THAN_OR_EQUAL_TO">
                      Greater than or equals to
                    </option>
                    <option value="GREATER_THAN">Greater than</option>
                  </select>
                  <input
                    type="number"
                    className="my-1 border border-1 fw-2 rounded w-100"
                    placeholder="Enter value here"
                    value={
                      conditionObj?.secondValue ? conditionObj.secondValue : ""
                    }
                    onChange={(e) => {
                      setConditionObj({
                        ...conditionObj,
                        secondValue: e.target.value,
                      });
                      setsecondvalidation(true);
                    }}
                  />
                  {!secondvalidation && flag && (
                    <p className="error">Check the second condition.</p>
                  )}
                </>
              )}
              <div className="border border-secondory-1 p-1 rounded-1 mt-1">
                <div className="d-flex px-1 justify-content-between ps-0">
                  <div class="d-flex">
                    {/* <input
                      class="me-1"
                      type="radio"
                      value="ASC"
                      checked={conditionObj?.sortType == "ASC" ? true : false}
                      name="sortingType"
                      onChange={(e) => TypeHandler(e)}
                    />
                    <label
                      class="form-check-label"
                      for="flexRadioDefault1"
                      value="ASC"
                      onChange={(e) => TypeHandler(e)}
                    >
                      ASC
                    </label> */}
                    <Form.Check
                      inline
                      label="ASC"
                      name="sortingType"
                      type="radio"
                      //   className="me-1"
                      value="ASC"
                      onChange={(e) => TypeHandler(e)}
                      id={`inline-1`}
                      checked={conditionObj?.sortType == "ASC" ? true : false}
                    />
                  </div>
                  <div class="d-flex">
                    {/* <input
                      class="me-1"
                      type="radio"
                      value="DESC"
                      checked={conditionObj?.sortType == "DESC" ? true : false}
                      name="sortingType"
                      onChange={(e) => TypeHandler(e)}
                    />
                    <label class="form-check-label" for="flexRadioDefault2">
                      DESC
                    </label> */}
                    <Form.Check
                      inline
                      label="DESC"
                      name="sortingType"
                      type="radio"
                      //   className="me-1"
                      value="DESC"
                      onChange={(e) => TypeHandler(e)}
                      id={`inline-2`}
                      checked={conditionObj?.sortType == "DESC" ? true : false}
                    />
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer className="p-0 bg-light d-block">
              <div className="text-center">
                <button
                  className="btn btn-secondary rounded px-2 py-0"
                  onClick={() => {
                    FilterHandler(field);
                  }}
                >
                  Filter
                </button>
              </div>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </>
  );
}

export default CustomFilter;
