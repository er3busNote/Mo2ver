import React, { FC } from 'react';
import { connect } from 'react-redux';
import { TitleState } from '../../store/types';
import { Box, Link, Typography, Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import Title from '../Title';

const menuFontSize = '13px';

const AdminSubHeader: FC<TitleState> = ({ title }): JSX.Element => {
	return (
		<Box
			sx={{ px: 10, py: 2, display: 'flex', justifyContent: 'space-between' }}
		>
			<Box sx={{ pt: 2 }}>
				<Title>{title}</Title>
			</Box>
			<Breadcrumbs separator="›" aria-label="breadcrumb">
				<Link
					underline="hover"
					sx={{ display: 'flex', alignItems: 'center' }}
					color="inherit"
					href="/admin"
				>
					<HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
					<Typography sx={{ fontSize: menuFontSize }}>홈</Typography>
				</Link>
				<Link
					underline="hover"
					sx={{ display: 'flex', alignItems: 'center' }}
					color="inherit"
					href="/admin"
				>
					<Typography sx={{ fontSize: menuFontSize }}>카테고리 관리</Typography>
				</Link>
				<Typography
					sx={{ display: 'flex', alignItems: 'center', fontSize: menuFontSize }}
					color="text.primary"
				>
					상품 목록
				</Typography>
			</Breadcrumbs>
		</Box>
	);
};

const mapStateToProps = (state: any) => ({
	title: (state.title as TitleState).title,
});

export default connect(mapStateToProps, null)(AdminSubHeader);
