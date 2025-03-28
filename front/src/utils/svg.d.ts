import { FC, SVGProps } from 'react';

declare module '*.svg' {
	export const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	const src: string;
	export default src;
}
