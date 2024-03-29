import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";
import logo from "../../assets/logo-raleway-h40.png"

function Footer() {
  return (
    <div className="footer-container">
      <h1>
        DEVELOPERS
        <a
          href="https://github.com/kevinledev/serene-brook-14726"
          target="_blank"
          className="footer-rowname"
        >
          Project Repo
        </a>
        {/* <div className="footer-rowname">GitHub</div> */}
      </h1>

      <div className="dev-cards">
        <div className="dev-card">
          Kevin Le
          <div className="devlinks">
            <a
              className="fa fa-linkedin"
              href="https://www.linkedin.com/in/kevinledev/"
              target="_blank"
            ></a>
            <a
              href="https://github.com/kevinledev"
              target="_blank"
              className="fa-brands fa-github"
            ></a>
          </div>
        </div>
        <div className="dev-card">
          Alex Moxley{" "}
          <div className="devlinks">
            <a 
              className="fa fa-linkedin"
              href="https://www.linkedin.com/in/alex-moxley-3a86a9237/"
              target="_blank"
              ></a>
            <a
              href="https://github.com/amoxley-dev"
              className="fa-brands fa-github"
              target="_blank"
            ></a>
          </div>
        </div>
        <div className="dev-card">
          Elhoussine Elouardy{" "}
          <div className="devlinks">
            <a
              className="fa fa-linkedin"
              href="https://www.linkedin.com/in/elhoussine-elouardy/"
              target="_blank"
            ></a>
            <a
              href="https://github.com/elhoussine"
              className="fa-brands fa-github"
              target="_blank"
            ></a>
          </div>
        </div>
        <div className="dev-card">
          Ras Ally{" "}
          <div className="devlinks">
            <a 
              className="fa fa-linkedin"
              href="https://www.linkedin.com/in/ras-ally-856145221/"
              target="_blank"
              ></a>
            <a
              href="https://github.com/RasAlly"
              className="fa-brands fa-github"
              target="_blank"
            ></a>
          </div>
        </div>
        <Link to={`/`}>
          {" "}
          <img src={logo} height="21px"></img>
        </Link>
      </div>
    </div>
  );
}

export default Footer;
