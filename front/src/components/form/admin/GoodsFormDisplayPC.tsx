import React, {
	FC,
	useRef,
	useState,
	useEffect,
	Dispatch,
	SetStateAction,
	ChangeEvent,
	BaseSyntheticEvent,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	GoodsData,
	CategoryData,
	CategoryPageData,
} from '../../../services/types';
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
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import RenderTextField from '../../validate/TextField';
import RenderSelectField from '../../validate/SelectField';
import RenderDatePickerField from '../../validate/DatePickerField';
import { GoodsFormDisplayValues } from './types';
// import _ from 'lodash';
import dayjs, { Dayjs } from 'dayjs';

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
	goodsData: CategoryPageData;
	largeCategoryData: Array<CategoryData>;
	mediumCategoryData: Array<CategoryData>;
	smallCategoryData: Array<CategoryData>;
	setLargeCategoryCode: Dispatch<SetStateAction<string>>;
	setMediumCategoryCode: Dispatch<SetStateAction<string>>;
	setSmallCategoryCode: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<number>>;
	searchClick: (goodsName: string) => void;
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
	goodsData: CategoryPageData;
	largeCategoryData: Array<CategoryData>;
	mediumCategoryData: Array<CategoryData>;
	smallCategoryData: Array<CategoryData>;
	setLargeCategoryCode: Dispatch<SetStateAction<string>>;
	setMediumCategoryCode: Dispatch<SetStateAction<string>>;
	setSmallCategoryCode: Dispatch<SetStateAction<string>>;
	setPage: Dispatch<SetStateAction<number>>;
	searchClick: (goodsName: string) => void;
	setProductData: Dispatch<SetStateAction<readonly GoodsData[]>>;
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
		fontSize: '14px',
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		[theme.breakpoints.up('sm')]: {
			width: '28ch',
			'&:focus': {
				width: '38ch',
			},
		},
	},
}));

const GoodsDialog: FC<DialogProps> = ({
	open,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
	setProductData,
	handleClose,
	header,
	base,
}): JSX.Element => {
	const [keyword, setKeyword] = useState('');
	const [checked, setChecked] = useState<readonly GoodsData[]>([]);
	const [left, setLeft] = useState<readonly GoodsData[]>(
		goodsData.content ?? []
	);
	const [right, setRight] = useState<readonly GoodsData[]>([]);

	useEffect(() => {
		setLeft(goodsData.content ?? []);
		setRight([]);
	}, [goodsData]);

	const handleLargeCategoryChange = (event: SelectChangeEvent) => {
		setLargeCategoryCode(event.target.value as string);
		setSmallCategoryCode(''); // 초기화
	};
	const handleMiddleCategoryChange = (event: SelectChangeEvent) => {
		setMediumCategoryCode(event.target.value as string);
	};
	const handleSmallCategoryChange = (event: SelectChangeEvent) => {
		setSmallCategoryCode(event.target.value as string);
	};

	const searchOnChange = (event: ChangeEvent<HTMLInputElement>) => {
		setKeyword(event.currentTarget.value as string);
	};
	const pageChange = (event: ChangeEvent<unknown>, page: number) => {
		const value = (event.target as HTMLButtonElement).textContent as any;
		if (value && value === String(page)) setPage(page);
	};

	const not = (a: readonly GoodsData[], b: readonly GoodsData[]) => {
		return a.filter((value) => b.indexOf(value) === -1);
	};
	const intersection = (a: readonly GoodsData[], b: readonly GoodsData[]) => {
		return a.filter((value) => b.indexOf(value) !== -1);
	};

	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value: GoodsData) => () => {
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

	const handleSelect = () => {
		setProductData(right);
		handleClose();
	};

	const selectForm: SxProps<Theme> = {
		width: 120,
		'.MuiInputLabel-shrink': {
			ml: 1,
			mt: 0.5,
		},
	};
	const selectLabel: SxProps<Theme> = {
		mt: -1,
		ml: 1,
		fontSize: { sm: '13px', lg: '14px' },
	};
	const selectInput: SxProps<Theme> = {
		'.MuiSelect-select': {
			py: 1.5,
			fontSize: { sm: '13px', lg: '14px' },
		},
	};
	const menuText: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
	};

	const customList = (items: readonly GoodsData[]) => (
		<Paper sx={{ width: 250, height: 230, overflow: 'auto' }}>
			<List dense component="div" role="list">
				{items.map((value: GoodsData, index: number) => {
					const labelId = `transfer-list-item-${value.goodsCode}-label`;

					return (
						<ListItemButton
							key={index}
							role="listitem"
							onClick={handleToggle(value)}
							sx={{ py: 0 }}
						>
							<ListItemIcon>
								<Checkbox
									checked={checked.indexOf(value) !== -1}
									tabIndex={-1}
									disableRipple
									inputProps={{
										'aria-labelledby': labelId,
									}}
								/>
							</ListItemIcon>
							<ListItemText id={labelId} primary={value.goodsCode} />
							<ListItemText id={labelId} primary={value.goodsName} />
						</ListItemButton>
					);
				})}
			</List>
		</Paper>
	);
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			sx={{ '.MuiDialog-paper': { minWidth: '680px' } }}
		>
			<DialogTitle sx={header}>상품찾기</DialogTitle>
			<DialogContent sx={{ pb: 0 }}>
				<Box sx={base}>
					<Box
						sx={{ pt: 1, pb: 0.5, display: 'flex', justifyContent: 'center' }}
					>
						<Box sx={{ px: 1 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>대분류</InputLabel>
								<Select
									label="대분류"
									onChange={handleLargeCategoryChange}
									sx={selectInput}
								>
									{largeCategoryData.map((data: CategoryData, i: number) => (
										<MenuItem key={i} sx={menuText} value={data.categoryCode}>
											{data.categoryCode}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ px: 1 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>중분류</InputLabel>
								<Select
									label="중분류"
									onChange={handleMiddleCategoryChange}
									sx={selectInput}
									disabled={mediumCategoryData.length === 0}
								>
									{mediumCategoryData.map((data: CategoryData, i: number) => (
										<MenuItem key={i} sx={menuText} value={data.categoryCode}>
											{data.categoryCode}
										</MenuItem>
									))}
								</Select>
							</FormControl>
						</Box>
						<Box sx={{ px: 1 }}>
							<FormControl sx={selectForm}>
								<InputLabel sx={selectLabel}>소분류</InputLabel>
								<Select
									label="소분류"
									onChange={handleSmallCategoryChange}
									sx={selectInput}
									disabled={smallCategoryData.length === 0}
								>
									{smallCategoryData.map((data: CategoryData, i: number) => (
										<MenuItem key={i} sx={menuText} value={data.categoryCode}>
											{data.categoryCode}
										</MenuItem>
									))}
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
								onChange={searchOnChange}
								inputProps={{ 'aria-label': 'search' }}
							/>
						</Search>
						<Button
							sx={{
								px: 4,
								mx: 1.5,
								my: 0.5,
								fontSize: '12px',
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
							onClick={() => searchClick(keyword)}
						>
							검색
						</Button>
					</Box>
					<Grid
						container
						spacing={2}
						justifyContent="center"
						alignItems="center"
					>
						<Grid item>{customList(left)}</Grid>
						<Grid item>
							<Grid container direction="column" alignItems="center">
								<Button
									sx={{
										my: 0.5,
										lineHeight: 1.25,
										minWidth: 40,
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
										my: 0.5,
										lineHeight: 1.25,
										minWidth: 40,
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
										my: 0.5,
										lineHeight: 1.25,
										minWidth: 40,
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
										my: 0.5,
										lineHeight: 1.25,
										minWidth: 40,
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
							count={goodsData.totalPages - 1}
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
						px: 6,
						py: 0.8,
						fontSize: '10px',
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
					onClick={handleSelect}
				>
					선택
				</Button>
				<Button
					sx={{
						px: 6,
						py: 0.8,
						fontSize: '10px',
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

const GoodsFormDisplayPC: FC<GoodsProp> = ({
	title,
	description,
	goodsData,
	largeCategoryData,
	mediumCategoryData,
	smallCategoryData,
	setLargeCategoryCode,
	setMediumCategoryCode,
	setSmallCategoryCode,
	setPage,
	searchClick,
	onSubmit,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const watchValue = useRef<string>('GD');
	const [open, setOpen] = useState(false);
	const [productData, setProductData] = useState<readonly GoodsData[]>([]);
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
		px: 2,
		py: 1.5,
		width: 120,
		fontSize: { sm: '13px', lg: '14px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const conditionTd: SxProps<Theme> = {
		px: 2,
		py: 2,
		fontSize: { sm: '13px', lg: '14px' },
		border: tableBorder,
	};
	const dataTh: SxProps<Theme> = {
		px: 2,
		py: 1.5,
		minWidth: '47px',
		fontSize: { sm: '13px', lg: '14px' },
		bgcolor: '#EEEEEE',
		border: tableBorder,
		fontWeight: 'bold',
	};
	const dataTd: SxProps<Theme> = {
		px: 2,
		py: 1,
		border: tableBorder,
		fontSize: { sm: '13px', lg: '14px' },
	};
	const bannerForm: SxProps<Theme> = {
		'input[type="text"]': {
			py: 2,
		},
		'.MuiFormControl-root': {
			mt: 0.5,
			overflowX: 'visible',
		},
		'label[id$="title-label"], label[id$="bnnrText-label"], label[id$="cnntUrl-label"]':
			{
				top: '-4px',
				ml: 1,
			},
		'label[id$="title-label"][data-shrink="true"], label[id$="bnnrText-label"][data-shrink="true"], label[id$="cnntUrl-label"][data-shrink="true"]':
			{
				top: '4px',
				ml: 2,
			},
	};
	const inputHeader: SxProps<Theme> = {
		px: 2,
		py: 0,
		color: '#fff',
		fontSize: '1.0rem',
		fontWeight: 'bold',
		lineHeight: '38px',
		bgcolor: '#363b74',
	};
	const inputBody: SxProps<Theme> = {
		px: 4,
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
									<HorizontalRuleIcon />
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
							<TableCell sx={conditionTh} align="center" component="th">
								템플릿 유형
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
						sx={{ fontWeight: 'bold' }}
					>
						상품전시
					</Typography>
				</Box>
				<Box>
					<Grid container spacing={1}>
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
								goodsData={goodsData}
								largeCategoryData={largeCategoryData}
								mediumCategoryData={mediumCategoryData}
								smallCategoryData={smallCategoryData}
								setLargeCategoryCode={setLargeCategoryCode}
								setMediumCategoryCode={setMediumCategoryCode}
								setSmallCategoryCode={setSmallCategoryCode}
								setPage={setPage}
								searchClick={searchClick}
								setProductData={setProductData}
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
						{productData.map((data: GoodsData, i: number) => (
							<TableRow key={i}>
								<TableCell sx={dataTd} align="center">
									{data.goodsCode}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{data.goodsName}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									{data.salePrice.toLocaleString()}
								</TableCell>
								<TableCell sx={dataTd} align="center">
									노출순서
								</TableCell>
								<TableCell sx={dataTd} align="center">
									관리
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ pt: 2 }}>
				<Button
					sx={{
						px: 6,
						py: 1,
						fontSize: '14px',
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

export default GoodsFormDisplayPC;
