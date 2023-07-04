import React, { Fragment, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import UserInfo from "../components/userComponents/UserInfo";
import UserFavorites from "../components/userComponents/UserFavorites";
import UserPurchases from "../components/userComponents/UserPurchases";
import { useGetSpecificUserQuery } from "../utils/api/apiSlice";
const taps = [
	{ name: "user's info" },
	{ name: "user's favorites" },
	{ name: "user's purchases" },
];

const UserPage = () => {
	const [clickedName, setClickedName] = useState("user's info");
	const userImage = localStorage.getItem("userImage");
	const id = localStorage.getItem("userId");

	const {
		isLoading,
		isError,
		error,
		isSuccess,
		data: userData,
	} = useGetSpecificUserQuery(id);
	const screens = [
		{
			name: "user's info",
			component: (
				<UserInfo
					userData={userData}
					loading={isLoading}
					error={error}
				/>
			),
		},
		{
			name: "user's favorites",
			component: (
				<UserFavorites
					userData={userData}
					loading={isLoading}
					error={error}
				/>
			),
		},
		{
			name: "user's purchases",
			component: (
				<UserPurchases
					userData={userData}
					loading={isLoading}
					error={error}
				/>
			),
		},
	];
	const screensMap = screens.map(({ name, component }, idx) => (
		<Fragment key={idx}>{name === clickedName && component}</Fragment>
	));
	const tapsMap = taps.map(({ name }, idx) => (
		<Fragment key={idx}>
			<ListItemButton onClick={() => setClickedName(name)}>
				<Typography
					className={` text-start md:ps-3 text-white hover:text-slate-400`}
					sx={{ fontSize: "14px" }}
				>
					{name}
				</Typography>
			</ListItemButton>
			<Divider varient={`middle`} sx={{ backgroundColor: "gray" }} />
		</Fragment>
	));

	return (
		<Box
			className={`md:min-h-screen  py-6 flex items-center justify-center  bg-slate-100 shadow-sm shadow-green-50`}
		>
			<Box
				className={`  bg-white  w-[85%] h-[85%] rounded-md grid grid-cols-7 md:grid-cols-5 overflow-auto md:overflow-hidden `}
			>
				<List
					className={`col-span-2 md:col-span-1 h-full bg-gradient-to-tr from-mainColor to-green-700  border-r border-slate-400`}
					sx={{ paddingY: "6rem" }}
				>
					<img
						className={` w-12 h-12 md:w-20 md:h-20 my-8 rounded-full mx-auto object-cover ring-yellow-700 ring-1`}
						src={userImage}
						alt={`userimage`}
					/>
					{tapsMap}
				</List>
				<Box className={`col-span-5 md:col-span-4`}>{screensMap}</Box>
			</Box>
		</Box>
	);
};

export default UserPage;
