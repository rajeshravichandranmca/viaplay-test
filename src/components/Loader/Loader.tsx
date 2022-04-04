import React from 'react';
import './Loader.css';

export default function Loader() {
    return (
        <div className="loader-block">
            <div className="loader-content">Please wait while we are loading the movies</div>
            <div className="loader"></div>
        </div>
    );
}