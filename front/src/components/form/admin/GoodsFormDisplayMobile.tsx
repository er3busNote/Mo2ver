import React, {
	FC,
	useRef,
	useState,
	useEffect,
	ChangeEvent,
	BaseSyntheticEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeNext, menuActive } from '../../../store/index';
import { TitleInfo } from '../../../store/types';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
	Box,
	Grid,
	Paper,
	Button,
	Checkbox,
	InputBase,
	Typography,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	MenuItem,
	InputLabel,
	FormControl,
	Pagination,
	Table,
	TableHead,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
} from '@mui/material';
import { SxProps, Theme, styled, alpha } from '@mui/material/styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import SearchIcon from '@mui/icons-material/Search';
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { GoodsFormDisplayValues } from './types';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';
import { isMobile } from 'react-device-detect';

const tableBorder = '1px solid #d2d2d2';
const tableBorderHeader = '3px solid #333';

const goodsDisplaySchema = yup
	.object()
	.shape({
		title: yup
			.string()
			.required('제목을 입력해주세요')
			.min(5, '5자 이상 입력해주세요!')
			.max(50, '입력 범위가 초과되었습니다'),
		startDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.nullable()
			.required('시작날짜가 존재하질 않습니다'),
		endDate: yup
			.mixed<Dayjs>()
			.transform((originalValue) => {
				return originalValue ? dayjs(originalValue) : null;
			})
			.when(
				'startDate',
				(startDate, schema) =>
					startDate &&
					schema.test({
						test: (endDate) =>
							endDate && endDate.isAfter(startDate.toLocaleString()),
						message: '시작날짜 이후여야 합니다',
					})
			)
			.nullable()
			.required('마지막날짜가 존재하질 않습니다'),
		position: yup.string().required(),
		type: yup.string().required(),
		useyn: yup.string().required(),
	})
	.required();

interface GoodsProp {
	title: string;
	description: string;
	onSubmit: (
		data: GoodsFormDisplayValues,
		event?: BaseSyntheticEvent<object, any, any>
	) => void;
}

const goodsDisplayValues = {
	title: '',
	startDate: dayjs(),
	endDate: dayjs(),
	position: '',
	type: 'GD',
	useyn: 'Y',
};

interface DialogProps {
	open: boolean;
	handleClose: () => void;
	header: SxProps<Theme>;
	base: SxProps<Theme>;
}

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	width: '100%',
	'& .MuiInputBase-input': {
		border: '2px solid #ddd',
		borderRadius: '7px',
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		fontSize: '12px',
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('xs')]: {
			width: '28ch',
			'&:focus': {
				width: '38ch',
			},
		},
	},
}));

const GoodsDialog: FC<DialogProps> = ({
	open,
	handleClose,
	header,
	base,
}): JSX.Element => {
	const [page, setPage] = useState(0);
	const [largeCategory, setLargeCategory] = useState<string>('');
	const [middleCategory, setMiddleCategory] = useState<string>('');
	const [smallCategory, setSmallCategory] = useState<string>('');
	const [checked, setChecked] = useState<readonly number[]>([]);
	const [left, setLeft] = useState<readonly number[]>([0, 1, 2, 3]);
	const [right, setRight] = useState<readonly number[]>([]);

	const handleLargeCategoryChange = (event: SelectChangeEvent) => {
		setLargeCategory(event.target.value as string);
	};
	const handleMiddleCategoryChange = (event: SelectChangeEvent) => {
		setMiddleCategory(event.target.value as string);
	};
	const handleSmallCategoryChange = (event: SelectChangeEvent) => {
		setSmallCategory(event.target.value as string);
	};

	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const not = (a: readonly number[], b: readonly number[]) => {
		return a.filter((value) => b.indexOf(value) === -1);
	};

	const intersection = (a: readonly number[], b: readonly number[]) => {
		return a.filter((value) => b.indexOf(value) !== -1);
	};

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value: number) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleAllRight = () => {
		setRight(right.concat(left));
		setLeft([]);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	const handleAllLeft = () => {
		setLeft(left.concat(right));
		setRight([]);
	};

	const checkBox: SxProps<Theme> = {
		minWidth: '42px',
		'& .MuiSvgIcon-root': {
			fontSize: 18,
		},
	};
	const selectForm: SxProps<Theme> = {
		width: 90,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
		overflowX: 'visible',
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { xs: '11px', sm: '12px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1,
			fontSize: { xs: '11px', sm: '12px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { xs: '12px', sm: '13px' },
		minHeight: '30px',
	};

	const customList = (items: readonly number[]) => (
		<Paper sx={{ width: 130, height: 180, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value: number) => {
					const labelId = `transfer-list-item-${value}-label`;

					return (
						<ListItemButton
							key={value}
							role="listitem"
							onClick={handleToggle(value)}
							sx={{ px: 0.5, py: 0 }}
						>
							<ListItemIcon sx={{ minWidth: '42px' }}>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									sx={checkBox}
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText
								id={labelId}
								primaryTypographyProps={{
									style: { fontSize: 14 },
								}}
								primary={`List item ${value + 1}`}
							/>
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);
	return (
		<Dialog open={open} onClose={handleClose}>
			<DialogTitle sx={header}>상품찾기</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>
					<Box sx={{ pb: 0.5, display: 'flex', justifyContent: 'center' }}>
						<Box sx={{ pt: 1, px: 0.5 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>대분류</InputLabel>
								<Select
									value={largeCategory}
									label="대분류"
									onChange={handleLargeCategoryChange}
									sx={selectInput}
								>
									<MenuItem sx={menuText} value={'C001000000'}>
										C001000000
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ pt: 1, px: 0.5 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>중분류</InputLabel>
								<Select
									value={middleCategory}
									label="중분류"
									onChange={handleMiddleCategoryChange}
									sx={selectInput}
								>
									<MenuItem sx={menuText} value={'C001001000'}>
										C001001000
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ pt: 1, px: 0.5 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>소분류</InputLabel>
								<Select
									value={smallCategory}
									label="소분류"
									onChange={handleSmallCategoryChange}
									sx={selectInput}
								>
									<MenuItem sx={menuText} value={'C001001001'}>
										C001001001
									</MenuItem>
								</Select>
							</FormControl>
						</Box>
					</Box>
					<Box
						sx={{ pt: 0.5, pb: 1, display: 'flex', justifyContent: 'center' }}
					>
						<Search>
							<SearchIconWrapper>
								<SearchIcon />
							</SearchIconWrapper>
							<StyledInputBase
								placeholder="상품명을 검색할 수 있어요!"
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
						<Button
							sx={{
								px: 2,
								mx: 1.5,
								mt: 0.2,
								mb: 0.5,
								fontSize: { xs: '10px', sm: '12px' },
								fontWeight: 'bold',
								bgcolor: '#F4F5FB',
								borderRadius: 0,
								border: '1px solid #87A0F4',
								color: '#87A0F4',
								'&:hover': {
									bgcolor: '#EFF1FF',
									border: '1px solid #93ACFF',
								},
							}}
							variant="outlined"
							onClick={handleClose}
						>
							검색
						</Button>
					</Box>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center"
						sx={{ display: isMobile ? 'grid' : 'flex' }}
					>
						<Grid item>{customList(left)}</Grid>
						<Grid item sx={{ pl: isMobile ? '4px !important' : '12px' }}>
							<Grid
								container
								direction={isMobile ? 'row-reverse' : 'column'}
								alignItems="center"
							>
								<Button
									sx={{
										mx: isMobile ? 0.5 : 0,
										my: isMobile ? 0 : 0.5,
										lineHeight: 1.05,
										minWidth: 30,
										fontSize: { xs: '0.6125rem', sm: '0.8125rem' },
										bgcolor: '#7C62FE',
										color: '#fff',
										'&:hover': {
											bgcolor: '#917EF1',
										},
									}}
									variant="outlined"
									size="small"
									onClick={handleAllRight}
									disabled={left.length === 0}
									aria-label="move all right"
								>
									≫
								</Button>
								<Button
									sx={{
										mx: isMobile ? 0.5 : 0,
										my: isMobile ? 0 : 0.5,
										lineHeight: 1.05,
										minWidth: 30,
										fontSize: { xs: '0.6125rem', sm: '0.8125rem' },
										bgcolor: '#EBEBEB',
										'&:hover': {
											bgcolor: '#EFEFEF',
											border: '1px solid #D4D4D4',
										},
									}}
									variant="outlined"
									size="small"
									onClick={handleCheckedRight}
									disabled={leftChecked.length === 0}
									aria-label="move selected right"
								>
									&gt;
								</Button>
								<Button
									sx={{
										mx: isMobile ? 0.5 : 0,
										my: isMobile ? 0 : 0.5,
										lineHeight: 1.05,
										minWidth: 30,
										fontSize: { xs: '0.6125rem', sm: '0.8125rem' },
										bgcolor: '#EBEBEB',
										'&:hover': {
											bgcolor: '#EFEFEF',
											border: '1px solid #D4D4D4',
										},
									}}
									variant="outlined"
									size="small"
									onClick={handleCheckedLeft}
									disabled={rightChecked.length === 0}
									aria-label="move selected left"
								>
									&lt;
								</Button>
								<Button
									sx={{
										mx: isMobile ? 0.5 : 0,
										my: isMobile ? 0 : 0.5,
										lineHeight: 1.05,
										minWidth: 30,
										fontSize: { xs: '0.6125rem', sm: '0.8125rem' },
										bgcolor: '#7C62FE',
										color: '#fff',
										'&:hover': {
											bgcolor: '#917EF1',
										},
									}}
									variant="outlined"
									size="small"
									onClick={handleAllLeft}
									disabled={right.length === 0}
									aria-label="move all left"
								>
									≪
								</Button>
							</Grid>
						</Grid>
						<Grid item>{customList(right)}</Grid>
					</Grid>
					<Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
						<Pagination
							count={1}
							variant="outlined"
							color="primary"
							siblingCount={2}
							boundaryCount={2}
							hidePrevButton
							hideNextButton
							onChange={pageChange}
							size="small"
						/>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions sx={{ justifyContent: 'center' }}>
				<Button
					sx={{
						px: 5,
						py: 0.8,
						fontSize: { xs: '8px', sm: '10px' },
						fontWeight: 'bold',
						bgcolor: '#7C62FC',
						border: '1px solid #757595',
						borderRadius: 0,
						color: '#fff',
						'&:hover': {
							bgcolor: '#917EF1',
						},
					}}
					variant="outlined"
					onClick={handleClose}
				>
					선택
				</Button>
				<Button
					sx={{
						px: 5,
						py: 0.8,
						fontSize: { xs: '8px', sm: '10px' },
						fontWeight: 'bold',
						bgcolor: '#555555',
						border: '1px solid #757595',
						borderRadius: 0,
						color: '#fff',
						'&:hover': {
							bgcolor: '#7F7F7F',
						},
					}}
					variant="outlined"
					onClick={handleClose}
				>
					취소
				</Button>
			</DialogActions>
		</Dialog>
	);
};

const GoodsFormDisplayMobile: FC<GoodsProp> = ({
	title,
	description,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const watchValue = useRef<string>('GD');
	const [open, setOpen] = useState(false);
	const {
		control,
		handleSubmit,
		formState: { isSubmitted, isValid },
		watch,
	} = useForm<GoodsFormDisplayValues>({
		mode: 'onChange',
		defaultValues: goodsDisplayValues,
		resolver: yupResolver(goodsDisplaySchema),
	});

	useEffect(() => {
		const type = watch('type');
		if (type !== watchValue.current) {
			const titleData: TitleInfo = {
				title: title,
				description: description,
				prevTitle: title,
				prevDescription: description,
			};
			switch (type) {
				case 'BN':
					dispatch(changeNext(titleData));
					dispatch(menuActive('/admin/banner/image'));
					navigate('/admin/banner/image');
					break;
				case 'VD':
					dispatch(changeNext(titleData));
					dispatch(menuActive('/admin/banner/video'));
					navigate('/admin/banner/video');
					break;
				default:
					break;
			}
		}
	}, [watch('type')]);

	const openGoods = () => setOpen(true);
	const closeGoods = () => setOpen(false);

	const cancelClick = () => {
		const titleData: TitleInfo = {
			title: title,
			description: description,
			prevTitle: title,
			prevDescription: description,
		};
		dispatch(changeNext(titleData));
		dispatch(menuActive('/admin/banner'));
		navigate('/admin/banner');
	};

	const conditionTh: SxProps<Theme> = {
		px: 1,
		py: 1.5,
		width: '20%',
		fontSize: { xs: '11px', sm: '13px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		pl: 1.5,
		pr: 0,
		fontSize: { xs: '12px', sm: '13px' },
		border: tableBorder,
	};
	const dataTh: SxProps<Theme> = {
		px: { xs: 1, sm: 2 },
		py: 1,
		fontSize: { xs: '11px', sm: '12px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 1.5,
		py: 0.5,
		border: tableBorder,
		fontSize: { xs: '11px', sm: '12px' },
	};
	const dateHorizonIcon: SxProps<Theme> = {
		px: 0.5,
	};
	const bannerForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 1.5,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"], label[id$="bnnrText-label"], label[id$="cnntUrl-label"]':
			{
				top: '-5px',
				ml: 1,
			},
		'label[id$="title-label"][data-shrink="true"], label[id$="bnnrText-label"][data-shrink="true"], label[id$="cnntUrl-label"][data-shrink="true"]':
			{
				top: '5px',
				ml: 2,
			},
	};
	const inputHeader: SxProps<Theme> = {
		px: 2,
		py: 0.5,
		color: '#fff',
		fontSize: '0.9rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const inputBody: SxProps<Theme> = {
		px: isMobile ? 0 : 2,
		py: 1,
	};
	return (
		<Box
			component="form"
			onSubmit={handleSubmit(onSubmit)}
			noValidate
			sx={bannerForm}
		>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableBody sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								제목
							</TableCell>
							<TableCell colSpan={3} sx={dataTd} align="left">
								<Controller
									name="title"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderTextField
											type="text"
											label="제목을 입력해주세요"
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								노출기간
							</TableCell>
							<TableCell colSpan={3} sx={conditionTd} align="left">
								<LocalizationProvider dateAdapter={AdapterDayjs}>
									<Controller
										name="startDate"
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderDatePickerField
												label="시작날짜"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
									<Typography component="span" sx={dateHorizonIcon}>
										-
									</Typography>
									<Controller
										name="endDate"
										control={control}
										render={({ field, fieldState, formState }) => (
											<RenderDatePickerField
												label="만료날짜"
												field={field}
												fieldState={fieldState}
												formState={formState}
											/>
										)}
									/>
								</LocalizationProvider>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								노출위치
							</TableCell>
							<TableCell sx={conditionTd} align="left">
								<Controller
									name="position"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderSelectField
											label="노출 위치"
											datas={[
												{ value: '', label: '전체' },
												{ value: '11', label: '메인상단-A' },
												{ value: '12', label: '메인상단-B' },
												{ value: '20', label: '메인중간' },
												{ value: '30', label: '메인중하단' },
												{ value: '40', label: '메인하단' },
												{ value: '50', label: '메인최상단' },
											]}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								템플릿
							</TableCell>
							<TableCell sx={conditionTd} align="left">
								<Controller
									name="type"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderSelectField
											label="템플릿 유형"
											datas={[
												{ value: 'BN', label: '배너이미지' },
												{ value: 'GD', label: '상품전시' },
												{ value: 'VD', label: '동영상' },
											]}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell sx={conditionTh} align="center" component="th">
								전시여부
							</TableCell>
							<TableCell colSpan={3} sx={conditionTd} align="left">
								<Controller
									name="useyn"
									control={control}
									render={({ field, fieldState, formState }) => (
										<RenderSelectField
											label="전시여부"
											datas={[
												{ value: '', label: '전체' },
												{ value: 'Y', label: '예' },
												{ value: 'N', label: '아니오' },
											]}
											field={field}
											fieldState={fieldState}
											formState={formState}
										/>
									)}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</TableContainer>
			<Box
				sx={{ pt: 4, pb: 2, display: 'flex', justifyContent: 'space-between' }}
			>
				<Box>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						sx={{ fontSize: '16px', fontWeight: 'bold' }}
					>
						상품전시
					</Typography>
				</Box>
				<Box sx={{ display: 'flex' }}>
					<Grid container spacing={1} sx={{ justifyContent: 'end' }}>
						<Grid item>
							<Button
								type="submit"
								sx={{
									px: 4,
									py: 0.8,
									fontSize: '8px',
									fontWeight: 'bold',
									bgcolor: '#7940B6',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#9373B5',
									},
								}}
								variant="outlined"
								disabled={isSubmitted && !isValid}
							>
								저장
							</Button>
						</Grid>
						<Grid item>
							<Button
								sx={{
									px: 4,
									py: 0.8,
									fontSize: '8px',
									fontWeight: 'bold',
									bgcolor: '#363658',
									border: '1px solid #757595',
									borderRadius: 0,
									color: '#fff',
									'&:hover': {
										bgcolor: '#757595',
									},
								}}
								variant="outlined"
								onClick={openGoods}
							>
								상품찾기
							</Button>
							<GoodsDialog
								open={open}
								handleClose={closeGoods}
								header={inputHeader}
								base={inputBody}
							/>
						</Grid>
					</Grid>
				</Box>
			</Box>
			<TableContainer>
				<Table size="small" sx={{ border: tableBorder }}>
					<TableHead sx={{ borderTop: tableBorderHeader }}>
						<TableRow>
							<TableCell sx={dataTh} align="center" component="th">
								상품코드
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								상품명
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								판매가
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								노출순서
							</TableCell>
							<TableCell sx={dataTh} align="center" component="th">
								관리
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<></>
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ pt: 2 }}>
				<Button
					sx={{
						px: 6,
						py: 1,
						width: '100%',
						fontSize: { xs: '10px', sm: '12px' },
						fontWeight: 'bold',
						bgcolor: '#363658',
						border: '1px solid #757595',
						borderRadius: 0,
						color: '#fff',
						'&:hover': {
							bgcolor: '#757595',
						},
					}}
					variant="outlined"
					onClick={cancelClick}
				>
					취소
				</Button>
			</Box>
		</Box>
	);
};

export default GoodsFormDisplayMobile;
