import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../components/Home';
import PostDetail from '../components/PostDetail';
import Login from '../components/Login';
import Register from '../components/Register';
import UserProfile from '../components/UserProfile';
import CreatePost from '../components/CreatePost';
import EditPost from '../components/EditPost';

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/post/:id" element={<PostDetail />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/create-post" element={<CreatePost />} />
      <Route path="/edit-post/:id" element={<EditPost />} />
    </Routes>
  </Router>
);

export default AppRouter;
