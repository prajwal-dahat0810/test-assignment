import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router";
import { Landing } from "./pages/Landing";

import { NavBar } from "./components/NavBar";
import { Blog } from "./components/Blog";
import { PublishBlog } from "./pages/PublishBlog";
import { Update } from "./pages/Update";
import { SignUp } from "./pages/SignUp";
import { RecoilRoot } from "recoil";
import { SignIn } from "./pages/SignIn";

function App() {
  console.log(location.pathname);
  return (
    <div>
      <BrowserRouter>
        <RecoilRoot>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route
              path="*"
              element={
                <>
                  <NavBar />
                  <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/publish" element={<PublishBlog />} />
                    <Route path="/update/:id" element={<Update />} />
                    <Route path="/post/:id" element={<Blog />} />
                  </Routes>
                </>
              }
            />
          </Routes>
        </RecoilRoot>
      </BrowserRouter>
    </div>
  );
}

export default App;
