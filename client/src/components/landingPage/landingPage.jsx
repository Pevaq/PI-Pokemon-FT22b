import React from 'react';
import {Link} from 'react-router-dom';
import style from "./landingPage.module.css";

export default function LandingPage () {
    return (
        <div>
          <div>
              <div className={style.bgImage}>
            <h2> Welcome! </h2>
            <div>
              <button>
                <Link to="/home">
                  Home
                </Link>
              </button>
            </div>
          </div>
          </div>
        </div>
      );
    }