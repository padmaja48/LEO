import React, { useEffect, useRef, memo } from "react";

const TradingViewWidget = ({ symbol = "NASDAQ:AAPL", chartHeight = 500 }) => {
  const container = useRef(null);

  useEffect(() => {
    // Clear previous chart before loading a new one
    if (container.current) {
      container.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol": "${symbol}",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "support_host": "https://www.tradingview.com"
      }`;

    container.current.appendChild(script);

    // Cleanup the previous chart when component unmounts or symbol changes
    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol]); // Reload chart when symbol changes

  return (
    <div 
      className="chart-wrapper"
      style={{
        height: `${chartHeight}px`,
        width: "100%",
        overflow: "auto", // Enables scrolling inside the chart
        position: "relative",
        cursor: "grab",
      }}
      onMouseDown={(e) => {
        e.target.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        e.target.style.cursor = "grab";
      }}
    >
      <div 
        className="tradingview-widget-container" 
        ref={container} 
        style={{
          height: "100%",
          width: "100%",
          overflowY: "auto", // Vertical scrolling enabled
          overflowX: "hidden",
        }}
      >
        <div 
          className="tradingview-widget-container__widget" 
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
