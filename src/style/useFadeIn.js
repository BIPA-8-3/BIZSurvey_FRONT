import { useEffect, useState } from 'react';

const useFadeIn = () => {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);

    // 컴포넌트가 언마운트될 때 페이드 아웃 효과를 위해 설정
    return () => setFadeIn(false);
  }, []);

  return fadeIn;
};

export default useFadeIn;