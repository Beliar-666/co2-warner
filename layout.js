(function () {
  const STYLE_ID = "co2-warner-layout";

  function injectStyle(shadowRoot, css) {
    if (!shadowRoot || shadowRoot.getElementById(STYLE_ID)) {
      return;
    }
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = css;
    shadowRoot.appendChild(style);
  }

  function applyLayout() {
    const app = document.querySelector("esp-app");
    if (!app || !app.shadowRoot) {
      return false;
    }

    injectStyle(
      app.shadowRoot,
      `
      main.flex-grid-half {
        display: grid !important;
        grid-template-columns: 1fr !important;
        grid-template-rows: auto auto !important;
        max-width: 1200px;
        margin: 0 auto;
        width: 100%;
      }
      main.flex-grid-half .col {
        margin: 8px !important;
        width: 100% !important;
        max-width: 100% !important;
        overflow: visible !important;
      }
      main.flex-grid-half .col:nth-child(1) {
        grid-row: 1;
      }
      main.flex-grid-half .col:nth-child(2) {
        grid-row: 2;
      }
    `
    );

    const entityTable = app.shadowRoot.querySelector("esp-entity-table");
    if (entityTable && entityTable.shadowRoot) {
      injectStyle(
        entityTable.shadowRoot,
        `
        #ent {
          display: grid !important;
          grid-template-columns: 1fr 1fr !important;
          gap: 8px;
          width: 100%;
        }
        #ent > .tab-container {
          min-width: 0;
        }
        @media (max-width: 768px) {
          #ent {
            grid-template-columns: 1fr !important;
          }
        }
      `
      );
    }

    return true;
  }

  function start() {
    if (applyLayout()) {
      return;
    }

    const observer = new MutationObserver(function () {
      if (applyLayout()) {
        observer.disconnect();
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });

    window.setInterval(applyLayout, 1500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
