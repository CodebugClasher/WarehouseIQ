import React from "react";

const WalmartHeader: React.FC = () => {
  return (
    <div id="__next">
      <div
        data-testid="layout-container"
        className="flex flex-column min-vh-100 shadow-2"
        style={{ transform: "none", transition: "transform 0.2s" }}
      >
        <span
          data-pcss-show="true"
          data-testid="global-header"
          data-dca-id="ui_global_header:header:module"
          data-dca-name="UiGlobalHeader"
          data-dca-type="module"
          className="bg-secondary w-100 top-0 z-1 sticky"
          style={{ transition: "top 0.65s" }}
        >
          <a
            aria-hidden="true"
            className="o-0 absolute"
            tabIndex={-1}
            href="#"
          ></a>
          <a
            className="slider skip-main bg-white-90"
            href="#maincontent"
          >
            Skip to Main Content
          </a>

          <header
            className="flex items-center justify-center pa3 center-hdkp ph4-hdkp pv3-hdkp"
            data-testid="responsiveHeader"
            data-dca-id="ui_global_header:responsive_header"
            data-dca-name="UiGlobalHeaderResponsiveHeaderPrimary"
            data-dca-type="module"
          >
            <div
              className="flex items-center justify-center dn-hdkp"
              style={{ transition: "opacity 0.3s" }}
            >
              <span
                className="dib relative w_5_HD br3"
                style={{ display: "inline" }}
              >
                <div>
                  <button
                    type="button"
                    className="flex items-center b--none bg-transparent mr3 pa0 pointer h3 w3 no-underline white"
                    aria-hidden="false"
                    aria-label="Menu"
                    aria-expanded="false"
                    data-testid="Menu"
                  >
                    <i
                      className="ld ld-Menu"
                      aria-hidden="true"
                      style={{
                        fontSize: "1.5rem",
                        verticalAlign: "-0.25em",
                        width: "24px",
                        height: "24px",
                        boxSizing: "content-box",
                      }}
                    ></i>
                  </button>
                </div>
              </span>
            </div>
          </header>
        </span>
      </div>
    </div>
  );
};

export default WalmartHeader;