import type { ReactNode } from 'react';
import '../shared/styles/index.ts';

export default function BaseLayout({ children }: { children: ReactNode }) {
  return children;
}
