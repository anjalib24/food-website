import React, { useEffect } from "react";
import WR360 from "@webrotate360/imagerotator";
import "@webrotate360/imagerotator/build/css/all.css";

const Test = () => {
  useEffect(() => {
    const viewer = WR360.ImageRotator.Create("webrotate360");
    viewer.licenseCode = "your-license-code";
    viewer.settings.configFileURL = "/example/example.xml";
    viewer.settings.graphicsPath = "/graphics";
    viewer.settings.alt = "Your alt image description";
    viewer.settings.responsiveBaseWidth = 800;
    viewer.settings.responsiveMinHeight = 300;

    viewer.settings.apiReadyCallback = (api, isFullScreen) => {
      api.images.onDrag((event) => {
        console.log(
          `${
            event.action
          }; current image index = ${api.images.getCurrentImageIndex()}`
        );
      });
    };

    viewer.runImageRotator();
  }, []);
  return <div id="webrotate360"></div>;
};

export default Test;
