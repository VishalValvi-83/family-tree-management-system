import React from "react";
import "./HeroSection.css";
import HeroImg from './../../assets/FamilyTreeImg.png'
// import { Link } from "react-router-dom";
const HeroSection = () => {
    return (
        <section className="hero">
            <div className="hero-inner">
                <div className="hero-text">
                    <h1>
                        Build Your <span>Family Tree</span>
                    </h1>
                    <p>
                        Connect generations, preserve memories, and manage your family
                        history beautifully in one place.
                    </p>
                    <a href={'#addFamilyMemberForm'} className="hero-btn">Start Building</a>
                </div>
                <div className="hero-image">
                    <img
                        src={HeroImg}
                        alt="family tree"
                    />
                </div>
            </div>

            <div className="custom-shape-divider-bottom">
                <svg
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M985.66,83.29c-70.34,19.16-143.81,19.4-214.35.48C701.8,65.68,633.25,34.25,565,23.69,475.5,9.89,383.43,21,298.05,44.49,211.08,68.49,122.5,103.62,33.58,115.6,22.39,117.08,11.17,118,0,118V0H1200V27.35C1131.62,56.5,1055.92,64.13,985.66,83.29Z"
                        opacity=".25"
                        className="shape-fill"
                    ></path>
                </svg>
            </div>
        </section>
    );
};

export default HeroSection;
