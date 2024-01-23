import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ActionCreatorsMapObject } from 'redux';
import { useDispatch } from 'react-redux';
import { changeTitle, changeDescription, menuActive } from '../../store/index';
import UserSubHeaderMobile from './cmmn/UserSubHeaderMobile';
import CartDeliveryMobile from './status/CartDeliveryMobile';
import GoodsRegisterMobile from './status/GoodsRegisterMobile';
import {
	Box,
	Grid,
	Stack,
	Badge,
	Avatar,
	Button,
	List,
	Breadcrumbs,
	Typography,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { SxProps, Theme } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import AutoFixNormalOutlinedIcon from '@mui/icons-material/AutoFixNormalOutlined';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface UserDetailProps {
	member: ActionCreatorsMapObject;
}

const UserDetailMobile: FC<UserDetailProps> = ({ member }): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [profile, setProfile] = useState(0);

	const registerClick = () => {
		dispatch(changeTitle('Register'));
		dispatch(changeDescription('상품등록'));
		dispatch(menuActive('/register'));
		navigate('/register');
	};

	const logoutClick = () => {
		member.logout();
		navigate('/');
	};

	const avatarIcon: SxProps<Theme> = {
		width: { xs: 60, sm: 70 },
		height: { xs: 60, sm: 70 },
		bgcolor: purple[600],
		color: '#fff',
	};
	const avatarOption: SxProps<Theme> = {
		width: { xs: 18, sm: 22 },
		height: { xs: 18, sm: 22 },
		bgcolor: '#fff',
		color: '#bdbdbd',
		boxShadow: '2px 3px 4px 0px',
	};
	const avatarPreview: SxProps<Theme> = {
		pt: 1,
		display: 'flex',
		justifyContent: 'left',
	};
	const avatarName: SxProps<Theme> = {
		fontSize: { xs: '14px', sm: '15px' },
		fontWeight: 'bold',
	};
	const avatarArrow: SxProps<Theme> = {
		pb: 0.5,
		fontSize: { xs: '14px', sm: '15px' },
		color: '#6b6b6b',
	};
	const avatarTier: SxProps<Theme> = {
		pr: 1,
		display: 'flex',
		justifyContent: 'center',
	};
	const avatarInfo: SxProps<Theme> = {
		fontSize: { xs: '13px', sm: '14px' },
		color: '#6b6b6b',
		fontWeight: 'bold',
	};
	const avatarMainStack: SxProps<Theme> = {
		px: 4,
		alignItems: 'center',
	};
	const avatarSubStack: SxProps<Theme> = {
		alignItems: 'center',
	};
	const avatarRegister: SxProps<Theme> = {
		mx: 1,
	};
	const avatarLogout: SxProps<Theme> = {
		mx: 1,
	};
	const profileBox: SxProps<Theme> = {
		bgcolor: '#F8F8F8',
	};
	const avatarBox: SxProps<Theme> = {
		p: 4,
	};
	const statusBox: SxProps<Theme> = {
		pt: 2,
		px: 2,
		pb: 1,
	};
	const buttonBox: SxProps<Theme> = {
		mx: 1,
		mb: 2,
	};
	const detailBox: SxProps<Theme> = {
		px: 1,
	};
	const switchBox: SxProps<Theme> = {
		pt: 2,
	};
	const itemSummary: SxProps<Theme> = {
		'.MuiAccordionSummary-content': {
			alignItems: 'center',
		},
	};
	const itemText: SxProps<Theme> = {
		px: 2,
		fontSize: { xs: '14px', sm: '15px' },
		fontWeight: 'bold',
		color: '#6b6b6b',
	};
	return (
		<Box sx={{ mb: 10 }}>
			<UserSubHeaderMobile />
			<Box sx={profileBox}>
				<Stack direction="row" spacing={2} sx={avatarMainStack}>
					<Box sx={avatarBox}>
						<Badge
							overlap="circular"
							anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
							badgeContent={
								<Avatar sx={avatarOption}>
									<AutoFixNormalOutlinedIcon fontSize="small" />
								</Avatar>
							}
						>
							<Avatar sx={avatarIcon}>
								<PersonIcon sx={avatarIcon} />
							</Avatar>
						</Badge>
					</Box>
					<Box>
						<Box sx={avatarPreview}>
							<Stack direction="row" spacing={0.5} sx={avatarSubStack}>
								<Typography component="span" sx={avatarName}>
									Mo2ver님
								</Typography>
								<ArrowForwardIosIcon fontSize="small" sx={avatarArrow} />
							</Stack>
						</Box>
						<Box sx={avatarTier}>
							<Breadcrumbs aria-label="breadcrumb">
								<Typography component="span" sx={avatarInfo}>
									브론즈
								</Typography>
								<Typography component="span" sx={avatarInfo}>
									일반회원
								</Typography>
							</Breadcrumbs>
						</Box>
					</Box>
				</Stack>
			</Box>
			<Box sx={statusBox}>
				{profile === 0 && (
					<CartDeliveryMobile type={'DS'} value={0} setSwitch={setProfile} />
				)}
				{profile === 1 && (
					<GoodsRegisterMobile type={'RS'} value={1} setSwitch={setProfile} />
				)}
			</Box>
			<Box sx={buttonBox}>
				<Grid container spacing={1}>
					<Grid item xs={6}>
						<Box sx={avatarRegister}>
							<Button
								sx={{
									py: 0.5,
									width: '100%',
									fontSize: '14px',
									fontWeight: 'bold',
									borderRadius: 3,
								}}
								color="primary"
								variant="outlined"
								onClick={registerClick}
							>
								상품 등록하기
							</Button>
						</Box>
					</Grid>
					<Grid item xs={6}>
						<Box sx={avatarLogout}>
							<Button
								sx={{
									py: 0.5,
									width: '100%',
									fontSize: '14px',
									fontWeight: 'bold',
									borderRadius: 3,
								}}
								color="error"
								variant="outlined"
								onClick={logoutClick}
							>
								로그아웃
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
			<Box sx={detailBox}>
				{profile === 0 && (
					<CartDeliveryMobile type={'DA'} value={0} setSwitch={setProfile} />
				)}
				{profile === 1 && (
					<GoodsRegisterMobile type={'RA'} value={1} setSwitch={setProfile} />
				)}
				<Accordion disabled>
					<AccordionSummary
						expandIcon={<ExpandMoreIcon />}
						aria-controls="account-content"
						id="account-header"
						sx={itemSummary}
					>
						<ManageAccountsOutlinedIcon />
						<Typography sx={itemText}>회원정보수정</Typography>
					</AccordionSummary>
					<AccordionDetails>테스트</AccordionDetails>
				</Accordion>
			</Box>
			<Box sx={switchBox}>
				<List>
					{profile !== 0 && (
						<CartDeliveryMobile type={'DL'} value={0} setSwitch={setProfile} />
					)}
					{profile !== 1 && (
						<GoodsRegisterMobile type={'RL'} value={1} setSwitch={setProfile} />
					)}
				</List>
			</Box>
		</Box>
	);
};

export default UserDetailMobile;
