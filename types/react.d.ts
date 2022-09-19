declare module '~icons/*?raw' {
  const component: string;
  export default component;
}

declare module 'virtual:icons/*?raw' {
  const component: string;
  export default component;
}

declare module '~icons/*' {
  import type React from 'react';
  import type { SVGProps } from 'react';
  const component: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
  export default component;
}

declare module 'virtual:icons/*' {
  import type { SVGProps } from 'react'
  import type React from 'react'
  const component: (props: SVGProps<SVGSVGElement>) => React.ReactElement
  export default component
}
