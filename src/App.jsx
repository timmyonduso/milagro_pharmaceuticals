import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";

const App = () => (
  <>
    <div className="overflow-hidden">
      <Suspense
        fallback={
          <div className="flex justify-center items-center w-full h-[100vh] bg-slate-100">
            <div className="custom-loader"></div>
          </div>
        }
      >
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  </>
);

export default App;
