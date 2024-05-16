import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { PhotoList } from "./components/PhotoList";
import { Upload } from "./components/Upload";
import { Post } from "./components/Post";
import { Registration } from './components/Registration';
import { Myprofile } from './components/Myprofile';
import { Profile } from './components/Profile';
import { EditProfile } from './components/EditProfile';
import { Login } from './components/Login';
import AgreementForm from './components/AgreementForm';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/upload"
            element={
              <>
                <Header />
                <Upload />
                <Footer />
              </>
            }
          />
          <Route
            path="/my"
            element={
              <>
                <Header />
                <Myprofile />
                <Footer />
              </>
            }
          />
          <Route
            path="/user/:user_id"
            element={
              <>
                <Header />
                <Profile />
                <Footer />
              </>
            }
          />
          <Route
            path="/editProfile"
            element={
              <>
                <Header />
                <EditProfile />
                <Footer />
              </>
            }
          />
          <Route
            path="/post/:idPost"
            element={
              <>
                <Header />
                <Post />
                <Footer />
              </>
            }
          />
          <Route
            path="/search/:tags"
            element={
              <>
                <Header />
                <PhotoList />
                <Footer />
              </>
            }
          />
          <Route
            path="/search/"
            element={
              <>
                <Header />
                <PhotoList />
                <Footer />
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/" element={<AgreementForm />} />


        </Routes>
      </Router>
    </>
  );
}

export default App;
