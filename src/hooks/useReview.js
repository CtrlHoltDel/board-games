import { useEffect } from "react";
import { useState } from "react";
import { checkLike, getItem } from "../api/actions";

const useReview = (endpoint, value, user) => {
  const [item, setItem] = useState();
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const getReview = async () => {
      setLoading(true);
      const { review } = await getItem(endpoint, value);
      const bool = await checkLike(review.review_id, user);
      setLiked(bool);
      setItem(review);
      setLoading(false);
    };

    getReview();
  }, [endpoint, value, user]);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return { item, loading, liked, toggleLike };
};

export default useReview;
