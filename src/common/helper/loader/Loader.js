import React from "react";


export default function Spinner(props) {
    const { style } = props
    return (
        <div className="loader">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    );
}