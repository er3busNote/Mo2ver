import React, { FC } from 'react';
import { Box, Collapse, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import {
	TreeItem,
	TreeItemProps,
	treeItemClasses,
} from '@mui/x-tree-view/TreeItem';

interface StyledTreeItemProps extends TreeItemProps {
	labelText: string;
}

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
	[`& .${treeItemClasses.iconContainer}`]: {
		'& .close': {
			opacity: 0.3,
		},
	},
	[`& .${treeItemClasses.group}`]: {
		marginLeft: 15,
		paddingLeft: 18,
		borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
	},
}));

const StyledTreeItem: FC<StyledTreeItemProps> = ({
	labelText,
	...other
}): JSX.Element => {
	return (
		<StyledTreeItemRoot
			label={
				<Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
					<Typography
						variant="body2"
						sx={{
							pl: 2,
							fontWeight: 'inherit',
							flexGrow: 1,
							textAlign: 'left',
						}}
					>
						{labelText}
					</Typography>
				</Box>
			}
			TransitionComponent={Collapse}
			{...other}
		/>
	);
};

export default StyledTreeItem;
