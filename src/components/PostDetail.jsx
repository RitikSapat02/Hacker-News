// PostDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styles from './PostDetail.module.css'; // Import CSS Module

const PostDetail = () => {
  const { objectID } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`https://hn.algolia.com/api/v1/items/${objectID}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post details', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [objectID]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post Detail</h1>

      {loading && <p>Loading...</p>}

      {post && (
        <div>
          <h2 className={styles.title}>{post.title}</h2>
          <p className={styles.points}>Points: {post.points}</p>
          <ul className={styles.commentList}>
            {post.children.map((comment) => (
              <li key={comment.id} className={styles.commentItem}>
                {comment.text}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostDetail;
