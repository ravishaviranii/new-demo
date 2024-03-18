import React from 'react'
import { useEffect } from 'react';
import { Modal } from "react-bootstrap";
import {  useForm } from 'react-hook-form';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { Steps, Panel } from 'rsuite';
import { packageInfoHandler } from '../../../common/redux/action';
import { useDispatch, useSelector } from 'react-redux';
function AddPackage(props) {
    const dispatch = useDispatch()
    const { setShowAddPackage, showAddPackage, handleList, setStep, step } = props;
  
    // -----------step change-----------//

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);

    const {
        register,
        handleSubmit,
        control,
        clearErrors,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        clearErrors();
    }, [])

    const handleClose = () => {
        setShowAddPackage(false);
        setStep(0)
        dispatch(packageInfoHandler())
    };
    return (
        <Modal show={showAddPackage} onHide={handleClose} centered size="xl" className='add_package'>
            <Modal.Header className="campaign_modal_head">
                <div className="col-11 modal_title_box">
                    <p>Add Package</p>
                </div>
                <div className="col-1">
                    <i
                        className="fa fa-times red modal_close_box"
                        aria-hidden="true"
                        onClick={() => { setShowAddPackage(false) }}
                    ></i>
                </div>
            </Modal.Header>

            <Modal.Body className='pb-0'>

                <Steps current={step}>
                    <Steps.Item title="Package Info" />
                    <Steps.Item title="Choose Modal" />
                    <Steps.Item title="Profile Handle" />
                    <Steps.Item title="Verify" />
                </Steps>
                <Panel>
                    {
                        step == 0 ?
                            <Step0 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                            step == 1 ?
                                <Step1 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                                step == 2 ?
                                    <Step2 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                                    step == 3 ?
                                        <Step3 handleList={handleList} step={step} setStep={setStep} onPrevious={onPrevious} onNext={onNext} setShowAddPackage={setShowAddPackage} /> : null
                    }

                </Panel>
            </Modal.Body>
        </Modal>
    )
}

export default AddPackage