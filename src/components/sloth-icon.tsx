import type { SVGProps } from 'react';

export function SlothIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12.27 14.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M16.5 13.5h.5a2 2 0 0 1 2 2v2" />
      <path d="M16.5 10.5h.5a2 2 0 0 0 2-2v-2" />
      <path d="M7.5 13.5h-.5a2 2 0 0 0-2 2v2" />
      <path d="M7.5 10.5h-.5a2 2 0 0 1-2-2v-2" />
      <path d="M5.04 18.52A8.92 8.92 0 0 1 4 17c0-4.97 4.03-9 9-9s9 4.03 9 9a8.92 8.92 0 0 1-1.04 1.52" />
    </svg>
  );
}
