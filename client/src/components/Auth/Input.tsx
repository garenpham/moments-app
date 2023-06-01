import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Grid, IconButton, InputAdornment, TextField } from '@mui/material';

type Props = {
	name: string;
	half?: boolean;
	autoFocus?: boolean;
	type?: string;
	label: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleShowPassword?: () => void;
};

const Input = ({
	name,
	handleChange,
	label,
	half,
	autoFocus,
	type,
	handleShowPassword,
}: Props) => {
	return (
		<Grid
			item
			xs={12}
			sm={half ? 6 : 12}>
			<TextField
				name={name}
				onChange={handleChange}
				variant="outlined"
				required
				fullWidth
				label={label}
				autoFocus={autoFocus}
				type={type}
				InputProps={
					name === 'password'
						? {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton onClick={handleShowPassword}>
											{type === 'password' ? (
												<VisibilityIcon />
											) : (
												<VisibilityOffIcon />
											)}
										</IconButton>
									</InputAdornment>
								),
						  }
						: undefined
				}
				inputProps={{
					autoComplete: 'new-password', //turn off autocomplete
				}}
			/>
		</Grid>
	);
};

export default Input;
