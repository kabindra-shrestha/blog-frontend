import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const history = useNavigate();

  const handleCreatePost = () => {
    axios.post('/api/posts', { title, content })
      .then(response => history.push('/'))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <h1>Create Post</h1>
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
      <button onClick={handleCreatePost}>Create</button>
    </div>
  );
};

export default CreatePost;
