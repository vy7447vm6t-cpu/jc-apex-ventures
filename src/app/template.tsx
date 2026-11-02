import { ViewTransition } from 'react';

/**
 * Remounts on every navigation, so each page fades and rises in while the last one fades out
 * (CSS in globals.css, off for reduced motion). The navigation bar keeps its own transition name
 * and stays put.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-enter" exit="page-exit" default="none">
      {children}
    </ViewTransition>
  );
}
