import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ActionCreatorsMapObject } from 'redux';
import useSearchGoodsList from '@services/search/useSearchGoodsDebounceList';
import { Paper, InputBase, IconButton } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import goToGoodsSearch from '@navigate/goods/goToGoodsSearch';
import { useIsMobile } from '@providers/MobileProvider';

interface SearchCardProps {
	title: string;
	description: string;
	search: ActionCreatorsMapObject;
	showAnchorEl?: (event: ChangeEvent<HTMLInputElement>) => void;
	closeAnchorEl?: () => void;
	toggleSearch?: () => void;
	width?: string;
	readOnly?: boolean;
}

const SearchCard: FC<SearchCardProps> = ({
	title,
	description,
	search,
	showAnchorEl,
	closeAnchorEl,
	toggleSearch,
	width,
	readOnly,
}) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isMobile = useIsMobile();
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [userInput, setUserInput] = useState('');
	const { setKeywordData } = useSearchGoodsList({
		search,
		keyword,
		setKeyword,
	});

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			if (closeAnchorEl) closeAnchorEl();
		} else {
			setFocus(true);
			if (showAnchorEl) showAnchorEl(event);
		}
		setUserInput(text);
		setKeywordData(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			if (closeAnchorEl) closeAnchorEl();
			event.preventDefault();
			goToGoodsSearch({
				keyword: userInput,
				title: '검색',
				description: '검색',
				prevTitle: title,
				prevDescription: description,
				dispatch,
				navigate,
			});
		}
	};

	const cancelClick = () => {
		setUserInput('');
		setKeywordData('');
		setFocus(false);
		if (closeAnchorEl) closeAnchorEl();
	};

	const icon: SxProps<Theme> = {
		fontSize: '1.6rem',
		color: '#72BAF5',
	};
	const inputBase: SxProps<Theme> = {
		ml: 1,
		pt: 0.5,
		flex: 1,
		fontSize: '0.8rem',
		height: { xs: '1.5rem', sm: '2rem' },
		'& input::placeholder': {
			fontSize: { xs: '13px', sm: '15px' },
		},
	};

	return (
		<Paper
			component="form"
			elevation={0}
			sx={{
				mr: 2,
				px: '10px',
				display: 'flex',
				alignItems: 'center',
				borderRadius: 5,
				bgcolor: '#F1F1F1',
				height: { xs: '35px', sm: '40px' },
				width: width ?? 'auto',
			}}
		>
			{' '}
			{readOnly ? (
				<>
					<InputBase
						sx={inputBase}
						placeholder={
							isMobile ? '무슨 옷 입을까?' : '오늘 뭐 괜찮은 옷 있을까?'
						}
						onClick={toggleSearch}
						readOnly={true}
					/>
					<SearchIcon sx={icon} />
				</>
			) : (
				<>
					<InputBase
						sx={inputBase}
						placeholder={
							isMobile ? '무슨 옷 입을까?' : '오늘 뭐 괜찮은 옷 있을까?'
						}
						value={userInput}
						onChange={searchOnChange}
						onKeyPress={searchOnKeyPress}
					/>
					{focus ? (
						<IconButton onClick={cancelClick} sx={{ p: 0, mr: 1 }}>
							<ClearIcon sx={icon} />
						</IconButton>
					) : (
						<SearchIcon sx={icon} />
					)}
				</>
			)}
		</Paper>
	);
};

export default SearchCard;
