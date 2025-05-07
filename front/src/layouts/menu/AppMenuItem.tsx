import React, {
	FC,
	useState,
	Dispatch,
	SetStateAction,
	CSSProperties,
} from 'react';
import { Paper, MenuItem, ListItemText } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

interface AppMenuItemProps {
	categoryCode: string;
	categoryName: string;
	setHover: Dispatch<SetStateAction<string>>;
	menuClick: (title: string, code: string, type: string) => void;
	isMain?: boolean;
}

const AppMenuItem: FC<AppMenuItemProps> = ({
	categoryCode,
	categoryName,
	setHover,
	menuClick,
	isMain = false,
}): JSX.Element => {
	const [isHover, setIsHover] = useState(false);

	const onMouseEnter = () => {
		setHover(categoryCode);
		setIsHover(true);
	};

	const onMouseLeave = () => {
		setIsHover(false);
	};

	const menu: SxProps<Theme> = {
		opacity: isHover ? 1 : 0.6,
		borderRadius: 0,
	};
	const item: SxProps<Theme> = {
		px: '24px',
		py: '11px',
	};
	const font: CSSProperties = {
		fontSize: 13,
		fontWeight: 'bold',
	};
	return (
		<Paper
			elevation={0}
			sx={isMain && menu}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			<MenuItem
				dense
				onClick={() => menuClick(categoryName, categoryCode, 'L')}
				sx={item}
			>
				<ListItemText
					primaryTypographyProps={{
						style: font,
					}}
					primary={categoryName}
				/>
			</MenuItem>
		</Paper>
	);
};

export default AppMenuItem;
