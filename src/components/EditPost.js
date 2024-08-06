import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useNavigate();

  useEffect(() => {
    axios.get(`/api/posts/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
      })
      .catch(error => console.error(error));
  }, [id]);

  const handleEditPost = () => {
    axios.put(`/api/posts/${id}`, { title, content })
      .then(response => history.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Edit Post</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button onClick={handleEditPost}>Save</button>
    </div>
  );
};

export default EditPost;
