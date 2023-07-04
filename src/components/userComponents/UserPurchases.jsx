import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { Link } from "react-router-dom";
const UserPurchases = () => {
	return (
		<Box
			className={` min-h-full  flex items-center justify-center bg-white border border-green-400 rounded-sm mx-[1px]`}
		>
			<Box
				className={` min-w-[85%] py-20 md:p-20 flex flex-col items-center space-y-16   bg-green-50 `}
			>
				<Typography sx={{ fontSize: "19px" }}>
					!لم يتم شراء أي منتج
				</Typography>
				<Box
					className={`flex items-center justify-center w-[80%] gap-x-10`}
				>
					<Link to={`/`}>
						<Button
							sx={{ backgroundColor: "green" }}
							startIcon={<BsFillArrowLeftSquareFill />}
							variant={`contained`}
						>
							تسوق الأن
						</Button>
					</Link>
					{/* <BsFillArrowLeftSquareFill className={`text-green-800`} /> */}
					{/* <Typography */}
					{/* 	sx={{ */}
					{/* 		fontSize: "18px", */}
					{/* 	}} */}
					{/* 	className={`bg-white text-green-800 p-1 rounded-sm`} */}
					{/* > */}
					{/* 	تسوق الأن */}
					{/* </Typography> */}
				</Box>
			</Box>
		</Box>
	);
};

export default UserPurchases;
