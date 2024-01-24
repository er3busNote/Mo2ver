import React, { FC, useState, ChangeEvent, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AppSearchItemsMobile from './AppSearchItemsMobile';
import {
	changeTitle,
	changeDescription,
	changePrevDescription,
	changeNext,
	menuActive,
} from '../../store/index';
import {
	Box,
	Grid,
	Paper,
	Divider,
	SvgIcon,
	Typography,
	Popper,
	Collapse,
	InputBase,
	IconButton,
	MenuList,
	MenuItem,
	ListItemText,
	ListItemButton,
} from '@mui/material';
import { ClickAwayListener } from '@mui/base';
import { SxProps, Theme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { BrowserView, MobileView } from 'react-device-detect';
import { ReactComponent as MainIcon } from '../../logo.svg';

const searchDatas = [
	{ id: 1, keyword: '삼성전자' },
	{ id: 2, keyword: '모니터' },
	{ id: 3, keyword: '3060' },
	{ id: 4, keyword: 'b660m' },
	{ id: 5, keyword: '노트북' },
	{ id: 6, keyword: '애플' },
	{ id: 7, keyword: 'b550' },
	{ id: 8, keyword: 'cpu' },
	{ id: 9, keyword: 'ddr5-4800' },
	{ id: 10, keyword: 'h610m' },
];

interface AppSearchProps {
	description: string;
}

const SearchDivider: FC = (): JSX.Element => {
	return (
		<Box sx={{ lineHeight: '20px' }}>
			<Divider
				orientation="vertical"
				variant="middle"
				sx={{
					ml: '5px',
					mr: '-2px',
					mt: '10px',
					mb: 0,
					height: '0.6rem',
					display: 'inline-flex',
					borderColor: '#E1E3E3',
				}}
			/>
		</Box>
	);
};

const AppSearchItemsPC: FC = (): JSX.Element => {
	const [open, setOpen] = useState(false);
	const recentClick = () => {
		setOpen(false);
	};
	const popularClick = () => {
		setOpen(true);
	};
	return (
		<Box>
			<Box sx={{ bgcolor: '#F7F8F9', display: 'inline-flex' }}>
				<ListItemButton
					selected={!open}
					onClick={() => recentClick()}
					sx={{ '&.Mui-selected': { backgroundColor: '#fff' } }}
				>
					<ListItemText
						secondaryTypographyProps={{
							px: 3,
							fontSize: { xs: '11px', sm: '13px' },
						}}
						secondary={'최근검색어'}
					/>
				</ListItemButton>
				<ListItemButton
					selected={open}
					onClick={() => popularClick()}
					sx={{ '&.Mui-selected': { backgroundColor: '#fff' } }}
				>
					<ListItemText
						secondaryTypographyProps={{
							px: 3,
							fontSize: { xs: '11px', sm: '13px' },
						}}
						secondary={'인기검색어'}
					/>
				</ListItemButton>
			</Box>
			<Box>
				<MenuList sx={{ px: 0.5, pt: 0.2, pb: 0.2 }}>
					{open &&
						searchDatas.map((data: any) => (
							<MenuItem
								key={data.id}
								dense
								sx={{
									px: 2,
									minHeight: 20,
								}}
							>
								<ListItemText
									primaryTypographyProps={{
										style: { fontSize: 12 },
									}}
									primary={data.id + '. ' + data.keyword}
								/>
							</MenuItem>
						))}
				</MenuList>
			</Box>
			<Paper
				sx={{
					bgcolor: '#F7F8F9',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				<IconButton sx={{ p: 0 }}>
					<Typography
						color="#000"
						align="center"
						sx={{ p: 1, fontSize: { xs: '12px', sm: '13px' } }}
					>
						최근검색어 전체 삭제
					</Typography>
				</IconButton>
				<IconButton sx={{ p: 0 }}>
					<Typography
						color="#000"
						align="center"
						sx={{ p: 1, fontSize: { xs: '12px', sm: '13px' } }}
					>
						닫기
					</Typography>
				</IconButton>
			</Paper>
		</Box>
	);
};

const AppSearchMobile: FC<AppSearchProps> = ({ description }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const [focus, setFocus] = useState(false);
	const [keyword, setKeyword] = useState('');
	const [openSearch, setSearchOpen] = useState<boolean>(false);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

	// (Diff) focus는 focusing하는 boolean값 ↔ open은 list를 출력하는 boolean값
	const showAnchorEl = (event: ChangeEvent<HTMLInputElement>) => {
		setAnchorEl(event.currentTarget);
		setOpen(true);
	};
	const closeAnchorEl = () => {
		setAnchorEl(null);
		setOpen(false);
	};

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		const text = event.currentTarget.value;
		if (text === '') {
			setFocus(false);
			closeAnchorEl(); // → Popper Close
		} else {
			// fetchData(0, text); // 초기화
			setFocus(true);
			showAnchorEl(event); // Popper Open
		}
		setKeyword(text);
	};
	const searchOnKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.code === 'Enter') {
			closeAnchorEl(); // → Popper Close
			event.preventDefault();
		}
	};
	const searchClick = (text: string) => {
		setKeyword(text);
		closeAnchorEl(); // → Popper Close
	};

	const cancelClick = () => {
		setKeyword('');
		setFocus(false);
		closeAnchorEl(); // → Popper 닫기
	};

	const toggleSearch = () => {
		setSearchOpen(!openSearch);
	};

	const activeClick = (
		title: string,
		nextDescription: string,
		path: string
	) => {
		dispatch(changeTitle(title));
		dispatch(changeDescription(nextDescription));
		dispatch(changePrevDescription(description));
		dispatch(changeNext());
		dispatch(menuActive(path));
		navigate(path);
	};

	const searchFontSize = '12px';

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
			fontSize: { xs: '13px', sm: '14px' },
		},
	};
	return (
		<Paper sx={{ width: '100%' }} component="div" square variant="outlined">
			<Box>
				<MobileView>
					<Grid container>
						<Grid item sx={{ mt: -2.5, width: '60%', height: '100px' }}>
							<IconButton
								onClick={() => activeClick('홈', '메인', '/')}
								sx={{ p: 0 }}
							>
								<SvgIcon
									component={MainIcon}
									color="primary"
									sx={{ width: '8em', height: '5em' }}
									inheritViewBox
								/>
							</IconButton>
						</Grid>
						<Grid
							item
							sx={{
								pb: 3,
								display: 'grid',
								justifyContent: 'center',
								width: '40%',
							}}
						>
							<Box
								sx={{
									mt: 3,
									mb: -1,
									width: '160px',
									height: '55px',
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Collapse
									orientation="horizontal"
									in={focus}
									collapsedSize={150}
								>
									<AppSearchItemsMobile
										openSearch={openSearch}
										setSearchOpen={setSearchOpen}
									/>
									<Box>
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
											}}
										>
											<InputBase
												sx={inputBase}
												placeholder="무슨 옷 입을까?"
												onClick={toggleSearch}
												readOnly={true}
											/>
											<SearchIcon sx={icon} />
										</Paper>
									</Box>
								</Collapse>
							</Box>
						</Grid>
					</Grid>
				</MobileView>
				<BrowserView>
					<Grid container>
						<Grid item sx={{ mt: -2.5, width: '100%', height: '100px' }}>
							<IconButton
								onClick={() => activeClick('홈', '메인', '/')}
								sx={{ p: 0 }}
							>
								<SvgIcon
									component={MainIcon}
									color="primary"
									sx={{ width: '8em', height: '5em' }}
									inheritViewBox
								/>
							</IconButton>
						</Grid>
						<Grid
							item
							sx={{
								display: 'grid',
								justifyContent: 'center',
								width: '100%',
							}}
						>
							<Box
								sx={{
									width: '420px',
									height: '40px',
									display: 'inline-flex',
									justifyContent: 'flex-end',
								}}
							>
								<Collapse
									orientation="horizontal"
									in={focus}
									collapsedSize={320}
								>
									<ClickAwayListener onClickAway={cancelClick}>
										<Box>
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
												}}
											>
												<InputBase
													sx={inputBase}
													placeholder="오늘 뭐 괜찮은 옷 있을까?"
													value={keyword}
													onChange={searchOnChange}
													onKeyPress={searchOnKeyPress}
												/>
												{focus ? (
													<IconButton
														onClick={cancelClick}
														sx={{ p: 0, mr: 1 }}
													>
														<ClearIcon sx={icon} />
													</IconButton>
												) : (
													<SearchIcon sx={icon} />
												)}
											</Paper>
											<Popper
												id={'search'}
												open={open}
												anchorEl={anchorEl}
												placement="bottom-start"
												modifiers={[
													{
														name: 'offset',
														options: {
															offset: [-38, 3],
														},
													},
												]}
											>
												<Paper
													elevation={0}
													sx={{ mt: -1, border: '#ddd 1px solid' }}
												>
													<AppSearchItemsPC />
												</Paper>
											</Popper>
										</Box>
									</ClickAwayListener>
								</Collapse>
							</Box>
						</Grid>
					</Grid>
				</BrowserView>
				<Box
					sx={{
						ml: '-5px',
						pb: '10px',
						width: '420px',
						display: 'inline-flex',
						justifyContent: 'flex-end',
					}}
				>
					<Grid container spacing={1} sx={{ width: 400 }}>
						<Grid item>
							<Typography
								color="#666"
								align="center"
								sx={{ fontSize: searchFontSize, fontWeight: 'bold' }}
							>
								추천검색어
							</Typography>
						</Grid>
						<Grid item>
							<Typography
								color="#999"
								align="center"
								sx={{ fontSize: searchFontSize }}
							>
								설기획세트
							</Typography>
						</Grid>
						<SearchDivider />
						<Grid item>
							<Typography
								color="#999"
								align="center"
								sx={{ fontSize: searchFontSize }}
							>
								ddr5-4800
							</Typography>
						</Grid>
						<SearchDivider />
						<Grid item>
							<Typography
								color="#999"
								align="center"
								sx={{ fontSize: searchFontSize }}
							>
								HP Z 모니터
							</Typography>
						</Grid>
						<SearchDivider />
						<Grid item>
							<Typography
								color="#999"
								align="center"
								sx={{ fontSize: searchFontSize }}
							>
								rtx 3080ti
							</Typography>
						</Grid>
						<SearchDivider />
						<Grid item>
							<Typography
								color="#999"
								align="center"
								sx={{ fontSize: searchFontSize }}
							>
								6900xt
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Paper>
	);
};

export default AppSearchMobile;
