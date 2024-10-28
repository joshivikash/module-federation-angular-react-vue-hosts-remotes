import React, { useEffect } from "react";
import { mount } from "angularRemoteApp/angularRemoteApp";
import "./AngularRemoteApp.css";

const AngularRemoteApp = () => {
  useEffect(() => {
    mount();  
  }, []);   
// Way to render the angular app
//return <div className="angular-remote-app"><app-root/></div>;
// Way to render the angular web components (Note: This throws an error in the console but still works. The error is regarding the angular component `app-root` not being found in the DOM.)
 return <div className="angular-remote-app"><angular-app-component/><angular-test-component/></div>;
};

export default AngularRemoteApp;