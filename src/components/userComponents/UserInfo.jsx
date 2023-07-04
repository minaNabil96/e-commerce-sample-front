import React from "react";
import { Box, Typography, Button } from "@mui/material";
import LoadingsAndErrors from "../LoadingsAndErrors";
const UserInfo = ({ userData, loading, error }) => {
	return loading ? (
		<Box
			className={`flex items-center justify-center min-h-full border border-green-400 rounded-sm mx-[1px] `}
		>
			loading...
		</Box>
	) : error ? (
		<Box
			className={`flex items-center justify-center min-h-full border border-green-400 rounded-sm mx-[1px] `}
		>
			{error.status}
		</Box>
	) : (
		<Box
			className={` min-h-full flex items-center justify-center border border-green-400 rounded-sm mx-[1px]  `}
		>
			{/* start from md screen */}
			<Box
				className={`hidden md:block h-[85%] w-full  m-10 bg-green-50 rounded-md shadow-sm shadow-green-50 overflow-auto`}
			>
				<Box className={`flex  items-center justify-between flex-row `}>
					<Typography sx={{ margin: "3rem" }} variant={`subtitle1`}>
						username :
					</Typography>
					<Typography
						sx={{
							margin: "3rem",
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						{userData && userData.username && userData.username}
					</Typography>
				</Box>
				<Box
					className={`flex  items-center justify-between  flex-row `}
				>
					<Typography sx={{ margin: "3rem" }} variant={`subtitle1`}>
						email :
					</Typography>
					<Typography
						sx={{
							margin: "3rem",
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						{userData && userData.email && userData.email}
					</Typography>
				</Box>
			</Box>
			{/* end from md screen */}
			{/* start sm screen */}
			<Box
				className={` md:hidden  min-w-[85%]  bg-green-50 rounded-md shadow-sm shadow-green-50 overflow-auto`}
			>
				<Box className={`flex-col  items-center justify-center   `}>
					<Typography
						sx={{
							margin: "1rem",
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						username :
					</Typography>
					<Typography
						sx={{
							margin: "1rem",
							fontSize: "14px",
							flexGrow: "3",
						}}
					>
						{userData && userData.username && userData.username}
					</Typography>
				</Box>
				<Box className={`flex-col  items-center justify-center `}>
					<Typography
						sx={{
							margin: "1rem",
							fontSize: "14px",
							fontWeight: "bold",
						}}
					>
						email :
					</Typography>
					<Typography
						sx={{
							margin: "1rem",
							fontSize: "14px",
							flexGrow: "3",
						}}
					>
						{userData && userData.email && userData.email}
					</Typography>
				</Box>
			</Box>
			{/* end sm screen */}
		</Box>
	);
};

export default UserInfo;
