import { useState } from "react";
import GetUpdates from "./components/GetUpdates";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UpdatesDetailById from "./components/UpdatesDetailById";
import ShowAll from "./components/admin/ShowAll";
import AddUpdate from "./components/PostUpdates";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetUpdates />} />
        <Route path="/updates/:id" element={<UpdatesDetailById />} />
        <Route path="/admin" element={<ShowAll />} />
        <Route path="/update/post" element={<AddUpdate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
