import React from "react";
import {
	Box,
	Typography,
	Button,
	IconButton,
	Divider,
	Tooltip,
} from "@mui/material";
import { FcFullTrash, FcEditImage } from "react-icons/fc";
import { useDeleteFavoritesMutation } from "../../utils/api/apiSlice";
import useModalHandler from "../../helpers/useModalHandler";
import { Link } from "react-router-dom";
const UserFavorites = ({ userData, loading, error }) => {
	const userId = localStorage.getItem("userId");

	const [deleteFavorites, { data: deleted }] = useDeleteFavoritesMutation();
	const { modalOpen, modalClose } = useModalHandler();

	const handleDelete = (e, _id) => {
		deleteFavorites({ id: userId, productId: _id })
			.unwrap()
			.then((res) => {
				console.log(res);
				if (res.status.includes("success")) {
					modalOpen("info", "successfully deleted");
					modalClose();
				}
			})
			.catch((err) => {
				console.log(err);
				modalOpen("error", "error");
				modalClose();
			});
	};

	const favoritesMap =
		userData &&
		userData.favorites.length > 0 &&
		userData.favorites.map(({ _id, name, coverImage }) => (
			<Box
				key={_id}
				className={`  flex items-center justify-center  flex-col bg-white border border-green-400 rounded-md p-1 my-1`}
			>
				<Box className={`flex items-center justify-center m-1`}>
					<Tooltip title="Delete">
						<IconButton onClick={(e) => handleDelete(e, _id)}>
							<FcFullTrash />
						</IconButton>
					</Tooltip>
				</Box>
				<Box
					sx={{ direction: "rtl" }}
					className={`flex items-center justify-center m-1 text-start`}
				>
					<Typography variant={`body2`}>
						{name && name.length >= 15 ? name.slice(0, 15) : name}
					</Typography>
					<span
						className={`${
							name && name.length >= 15 ? "" : "hidden"
						}`}
					>
						...
					</span>
				</Box>
				<Link to={`/products/${_id}`} state={_id}>
					<img
						src={coverImage}
						alt={`productImg`}
						className={`h-28 w-28 rounded-md object-cover m-1`}
					/>
				</Link>
			</Box>
		));

	return loading ? (
		<Box
			className={`flex items-center justify-center min-h-full border border-green-400 rounded-sm mx-[1px]`}
		>
			loading...
		</Box>
	) : error ? (
		<Box
			className={`flex items-center justify-center min-h-full border border-green-400 rounded-sm mx-[1px]`}
		>
			{error.status}
		</Box>
	) : userData && userData.favorites.length === 0 ? (
		<Box
			className={` min-h-full flex items-center justify-center border border-green-400 rounded-sm mx-[1px] `}
		>
			<Typography sx={{ fontSize: "19px" }}>المفضلة فارغة</Typography>
		</Box>
	) : (
		<Box className={` min-h-full flex items-center justify-center  `}>
			{/* start from md screen */}

			<Box
				className={` max-h-[400px] w-full  m-10 bg-green-50 rounded-md shadow-sm shadow-green-50 overflow-auto`}
			>
				<Typography
					component={`div`}
					sx={{
						fontSize: "17px",
						margin: "2rem",
						direction: "rtl",
						fontWeight: "bold",
						paddingY: "1rem",
					}}
				>
					المفضلة
					<Divider className={`bg-slate-600 rotate-180`} />
				</Typography>

				<Box
					className={`flex items-center justify-around w-full h-full flex-wrap`}
				>
					{favoritesMap}
				</Box>
			</Box>
		</Box>
	);
};

export default UserFavorites;
