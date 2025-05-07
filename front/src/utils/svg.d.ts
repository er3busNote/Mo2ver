import { FC, SVGProps } from 'react';

declare module '*.svg?react' {
	const ReactComponent: FC<SVGProps<SVGSVGElement>>;
	export default ReactComponent;
}
