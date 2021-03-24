import { useState, useEffect } from 'react';

export function useMedia(query: string): boolean {
  let [isMatches, setIsMatches] = useState<boolean>(false);

  useEffect(() => {
    let media = window.matchMedia(query);
    setIsMatches(media.matches);
    let listener = () => setIsMatches(media.matches);
    media.addEventListener('change', listener);
    () => media.removeEventListener('change', listener);
  }, [query]);

  return isMatches;
}

/**
 * this breaks to my app
 */
type MatchBreakBoints = {
  isMatchSmallBreakPoint: boolean;
  isMatchMediumBreakPoint: boolean;
  isMatchLargeBreakPoint: boolean;
  isMatchXLargeBreakPoint: boolean;
};
export function useMediaQuery(): MatchBreakBoints {
  const isMatchSmallBreakPoint = useMedia('(max-width: 576px)');
  const isMatchMediumBreakPoint = useMedia('(max-width: 768px)');
  const isMatchLargeBreakPoint = useMedia('(max-width: 992px)');
  const isMatchXLargeBreakPoint = useMedia('(max-width: 1200px)');

  return {
    isMatchSmallBreakPoint,
    isMatchMediumBreakPoint,
    isMatchLargeBreakPoint,
    isMatchXLargeBreakPoint,
  };
}
/**
 * --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
 */
