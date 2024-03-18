import React from 'react'
import { Modal } from "react-bootstrap";
import { Steps, Panel } from 'rsuite';
import { useDispatch } from 'react-redux';
import Step0 from './Step0';
import Step1 from './Step1';
import Step2 from './Step2';
import { vendorInfoHandler } from '../../../common/redux/action';
import Step3 from './Step3';
function AddVendor(props) {
    let dispatch = useDispatch();
    const { setShowAddPackage, showAddPackage, handleList, step, setStep } = props;

    const onChange = nextStep => {
        setStep(nextStep < 0 ? 0 : nextStep > 4 ? 4 : nextStep);
    };

    const onNext = () => onChange(step + 1);
    const onPrevious = () => onChange(step - 1);
    const handleClose = () => {
        setShowAddPackage(false);
        setStep(0)
        dispatch(vendorInfoHandler())
    };
    return (
        <Modal show={showAddPackage} onHide={handleClose} centered size="xl" className='add_package'>
            <Modal.Header className="campaign_modal_head">
                <div className="col-11 modal_title_box">
                    <p> Vendor</p>
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
                    <Steps.Item title="Vendor Profile" />
                    <Steps.Item title="Company Details" />
                    <Steps.Item title="Packages" />
                    <Steps.Item title='Vendor Credentials' />
                </Steps>
                <Panel>
                    {
                        step == 0 ?
                            <Step0 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                            step == 1 ?
                            <Step3 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                            step == 2 ?
                                <Step1 step={step} onPrevious={onPrevious} onNext={onNext} /> :
                                step == 3 ?
                                    <Step2 step={step} setStep={setStep} onPrevious={onPrevious} onNext={onNext} setShowAddPackage={setShowAddPackage} handleList={handleList} />
                                    : null
                    }

                </Panel>
            </Modal.Body>
        </Modal>
    )
}

export default AddVendor