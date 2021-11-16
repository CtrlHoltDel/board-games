import { useEffect, useState } from "react";
import { addItem, getList } from "../api/actions";

const useComments = (endpoint, p = 1) => {
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(true);
  const [postUploading, setPostUploading] = useState(false);
  const [queries, setQueries] = useState({ p });
  const [pagesAmount, setPagesAmount] = useState(0);
  const [currPage, setCurrPage] = useState(p);

  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true);
      const { comments, count = 0 } = await getList(endpoint, queries);
      setComments(comments);
      setPagesAmount(Math.round(count / 10) + 1);
      setCommentsLoading(false);
    };

    fetchComments();
  }, [endpoint, queries]);

  const addComment = async ({ username, body, reviewId }) => {
    setPostUploading(true);
    const { comment } = await addItem(`/reviews/${reviewId}/comments`, {
      username,
      body,
      reviewId,
    });

    setComments((currComments) => {
      return [comment, ...currComments];
    });

    setPostUploading(false);
  };

  const pagePicker = (page) => {
    setQueries((currQueries) => {
      return { ...currQueries, p: page };
    });
  };

  return {
    comments,
    commentsLoading,
    addComment,
    postUploading,
    pagesAmount,
    pagePicker,
    currPage,
    setCurrPage,
  };
};

export default useComments;
