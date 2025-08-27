import React, { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UserSubHeaderPC from './cmmn/UserSubHeaderPC';
import CartDeliveryPC from './status/CartDeliveryPC';
import GoodsRegisterPC from './status/GoodsRegisterPC';
import {
	Box,
	Paper,
	Chip,
	Stack,
	Badge,
	Avatar,
	Button,
	Divider,
	Breadcrumbs,
	Typography,
} from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';
import {
	Person as PersonIcon,
	AutoFixNormalOutlined as AutoFixNormalOutlinedIcon,
	ArrowForwardIos as ArrowForwardIosIcon,
} from '@mui/icons-material';
import goToGoodsForm from '@navigate/goods/goToGoodsForm';
import { useTransition, animated, UseTransitionProps } from 'react-spring';
import {
	Position,
	DetailType,
	DetailBoxProps,
	UserProps,
} from '@/types/user/status';

const DETAIL: DetailType[] = ['Delivery', 'Register'];
const DetailInfo: Record<DetailType, FC<Omit<DetailBoxProps, 'type'>>> = {
	Delivery: CartDeliveryPC as FC<Omit<DetailBoxProps, 'type'>>,
	Register: GoodsRegisterPC as FC<Omit<DetailBoxProps, 'type'>>,
};

const UserDetailPC: FC<UserProps> = ({
	title,
	description,
	member,
	goodsData,
	setGoodsPage,
	setSearchGoodsData,
}): JSX.Element => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [detail, setDetail] = useState<DetailType>(DETAIL[0]);
	const [isAnimating, setAnimating] = useState(false);
	const transitionProps: UseTransitionProps = {
		from: { position: 'relative' as Position, transform: 'translateY(200%)' },
		enter: { transform: 'translateY(0%)' },
		leave: { position: 'absolute' as Position, transform: 'translateY(500%)' },
		reset: false,
		onRest: () => {
			setAnimating(false); // 애니메이션이 끝났을 때 호출되는 콜백
		},
	};
	const transition = useTransition(detail, transitionProps);

	const switchClick = (item: DetailType) => {
		if (!isAnimating) {
			setAnimating(true);
			setDetail(item);
		}
	};

	const registerClick = () => {
		goToGoodsForm({
			title,
			description,
			dispatch,
			navigate,
		});
	};

	const logoutClick = () => {
		member.logout();
		navigate('/');
	};

	const avatarIcon: SxProps<Theme> = {
		width: 70,
		height: 70,
		bgcolor: '#bdbdbd',
		color: '#fff',
	};
	const avatarOption: SxProps<Theme> = {
		width: 22,
		height: 22,
		bgcolor: '#fff',
		color: '#bdbdbd',
		boxShadow: '2px 3px 4px 0px',
	};
	const avatarPreview: SxProps<Theme> = {
		pt: 1,
		display: 'flex',
		justifyContent: 'center',
	};
	const avatarName: SxProps<Theme> = {
		fontSize: { sm: '14px', lg: '15px' },
		fontWeight: 'bold',
	};
	const avatarArrow: SxProps<Theme> = {
		pb: 0.5,
		fontSize: { sm: '14px', lg: '15px' },
		color: '#6b6b6b',
	};
	const avatarTier: SxProps<Theme> = {
		pr: 1,
		display: 'flex',
		justifyContent: 'center',
	};
	const avatarInfo: SxProps<Theme> = {
		fontSize: { sm: '13px', lg: '14px' },
		color: '#6b6b6b',
		fontWeight: 'bold',
	};
	const avatarTag: SxProps<Theme> = {
		pt: 3,
		pr: 1,
	};
	const avatarStack: SxProps<Theme> = {
		alignItems: 'center',
		justifyContent: 'center',
	};
	const avatarChip: SxProps<Theme> = {
		height: '22px',
		fontSize: { sm: '11px', lg: '12px' },
		color: '#b2b2b2',
		border: '1px solid #b2b2b2',
	};
	const avatarDivider: SxProps<Theme> = {
		my: 3,
		mr: 1,
		borderWidth: 0.5,
	};
	const avatarRegister: SxProps<Theme> = {
		mr: 1,
		mb: 1,
	};
	const avatarLogout: SxProps<Theme> = {
		mr: 1,
	};
	const profileBox: SxProps<Theme> = {
		pl: 2,
		py: 2,
		width: '20%',
	};
	const avatarBox: SxProps<Theme> = {
		py: 2,
		pr: 1,
		mt: 3,
	};
	const statusBox: SxProps<Theme> = {
		p: 2,
		width: '80%',
	};
	return (
		<Box>
			<UserSubHeaderPC tab={detail} setTab={(item) => switchClick(item)} />
			<Paper sx={{ position: 'relative' }}>
				<Stack
					direction="row"
					divider={<Divider orientation="vertical" flexItem />}
					spacing={1}
				>
					<Box sx={profileBox}>
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
						<Box sx={avatarPreview}>
							<Stack direction="row" spacing={0.5} sx={avatarStack}>
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
						<Box sx={avatarTag}>
							<Stack
								direction="row"
								spacing={1}
								useFlexGap
								flexWrap="wrap"
								sx={avatarStack}
							>
								<Chip label="스웨터" variant="outlined" sx={avatarChip} />
								<Chip label="티셔츠" variant="outlined" sx={avatarChip} />
								<Chip label="스니커즈" variant="outlined" sx={avatarChip} />
								<Chip label="악세서리" variant="outlined" sx={avatarChip} />
							</Stack>
						</Box>
						<Divider sx={avatarDivider} />
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
					</Box>
					<Box sx={statusBox}>
						{transition((style, item: DetailType) => {
							const DetailBox = DetailInfo[item];
							const props =
								item == 'Register'
									? ({
											title,
											description,
											goodsData,
											setGoodsPage,
											setSearchGoodsData,
									  } as Omit<DetailBoxProps, 'type'>)
									: ({ title, description } as Omit<DetailBoxProps, 'type'>);
							return (
								<animated.div key={item} style={style}>
									<DetailBox {...props} />
								</animated.div>
							);
						})}
						;
					</Box>
				</Stack>
			</Paper>
		</Box>
	);
};

export default UserDetailPC;
