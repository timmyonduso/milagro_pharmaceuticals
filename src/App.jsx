import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import GalleryPage from "./pages/GalleryPage";
import MeetUsPage from "./pages/MeetUsPage";
import EventPage from "./pages/EventPage";
import ContactPage from "./pages/ContactPage";
import { ShowroomPage } from "./pages/ShowroomPage";

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
            {/*<Route path="/about-us" element={<AboutPage />} />*/}
            {/*<Route path="/gallery" element={<GalleryPage />} />*/}
            {/*<Route path="/meet-us" element={<MeetUsPage />} />*/}
            {/*<Route path="/events" element={<EventPage />} />*/}
            {/*<Route path="/showroom" element={<ShowroomPage />} />*/}
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </Suspense>
    </div>
  </>
);

export default App;
