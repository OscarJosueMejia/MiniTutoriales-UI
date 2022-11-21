import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
;

export const Routing = () => {

  return (
    <BrowserRouter>
      <Routes>

        {/* <Route path="/Login/*" element={<LoginRouting />}/>
        <Route path="/Personal/*" element={<PersonalRouting />}/>

          
          <Route path="*" element={<ErrorNotFound />}/>  */}

        {/* <Route index element={<LandingPage />}></Route> */}
      </Routes>
    </BrowserRouter>
  );
};