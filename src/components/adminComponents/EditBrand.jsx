import React, { useState } from "react";
import {
	Box,
	TextField,
	Typography,
	Button,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
} from "@mui/material";
import { useEditBrandMutation } from "../../utils/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import useModalHandler from "../../helpers/useModalHandler";
import { imagesUploader } from "../../helpers/imagesUploader";
import { IoMdCloudDone } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";

const EditBrand = () => {
	const [brandName, setBrandName] = useState("");

	const [isImageSelected, setIsImageSelected] = useState({
		status: false,
		imageShowing: "",
		imageForUpload: "",
	});

	const [editBrand, { data: editedCat }] = useEditBrandMutation();

	const dispatch = useDispatch();
	const {
		materialModalStatus,
		materialModalMessage,
		materialModalHeadName,
		materialModalPayload,
	} = useSelector((state) => state.materialModalSlice);

	const { modalOpen, modalClose } = useModalHandler();
	console.log(materialModalPayload);
	const handleEditBrand = async () => {
		let editBrandObj = {
			name: brandName,
			image: "",
		};

		if (!brandName && !isImageSelected.imageForUpload) {
			modalOpen(`Info`, `Please enter what you want to change..!`);
			modalClose();
		} else if (isImageSelected.imageForUpload) {
			const { imageUrl } = await imagesUploader(
				isImageSelected.imageForUpload
			);
			editBrandObj.image = await imageUrl;
			let editBrandObjCopy = { ...editBrandObj };

			Object.keys(editBrandObj).forEach((key) => {
				if (
					editBrandObj[key] === "" ||
					editBrandObj[key] === undefined
				) {
					delete editBrandObjCopy[key];
				}
			});
			if (imageUrl) {
				editBrand({
					id: materialModalPayload,
					editBrandObj: editBrandObjCopy,
				})
					.unwrap()
					.then((res) => {
						console.log(res);
						if (res.message === "success") {
							modalOpen("info", "success");
							modalClose();
						}
					})
					.catch((err) => {
						console.log(err);
						modalOpen("error", "error");
						modalClose();
					});
			}
		} else {
			let editBrandObjCopy = { ...editBrandObj };

			Object.keys(editBrandObj).forEach((key) => {
				if (
					editBrandObj[key] === "" ||
					editBrandObj[key] === undefined
				) {
					delete editBrandObjCopy[key];
				}
			});
			editBrand({
				id: materialModalPayload,
				editBrandObj: editBrandObjCopy,
			})
				.unwrap()
				.then((res) => {
					console.log(res);
					if (res.message === "success") {
						modalOpen("info", "success");
						modalClose();
					}
				})
				.catch((err) => {
					console.log(err);
					modalOpen("error", "error");
					modalClose();
				});
		}
	};
	// end add subcategory
	// end rtk query
	const selectImageHandler = (e) => {
		const fileForUpload = e.target.files[0];
		const selectedFile = URL.createObjectURL(e.target.files[0]);
		if (selectedFile) {
			setIsImageSelected({
				...isImageSelected,
				status: true,
				imageShowing: selectedFile,
				imageForUpload: fileForUpload,
			});
		} else
			selectedFile({
				...isImageSelected,
				status: false,
				imageShowing: "",
				imageForUpload: "",
			});
	};

	return (
		<Box className={``}>
			<Typography variant="h6" component={`span`} color={`primary`}>
				Edit Brand
			</Typography>
			<Box
				className={`w-64 mt-4`}
				component="form"
				sx={{
					"& .MuiTextField-root": {
						m: 1,
						textAlign: "end",
						direction: "rtl",
					},
				}}
				noValidate
				autoComplete="off"
			>
				<TextField
					id="adminName"
					label="Admin Name"
					defaultValue={`${localStorage.getItem("userName")}`}
					InputProps={{
						readOnly: true,
					}}
				/>
				<TextField
					onChange={(e) => setBrandName(e.target.value)}
					id="brandName"
					label="brand Name"
				/>
				<Box
					component={"div"}
					className={`flex items-center justify-between my-2 ms-[7px] me-3  border-blue-400 bg-slate-100  rounded-md border`}
				>
					<label
						htmlFor="upload"
						className="w-20 h-full bg-blue-600 flex cursor-pointer rounded-md  "
					>
						<Button
							variant="contained"
							component="div"
							className=""
							onChange={(e) => selectImageHandler(e)}
						>
							<input
								id="upload"
								type="file"
								accept="image/*"
								hidden
								className=" cursor-pointer"
							/>
							upload
						</Button>
					</label>
					<img
						alt="img"
						src={isImageSelected.imageShowing}
						className={`${
							isImageSelected.imageShowing ? "" : "hidden"
						}  w-16 h-9`}
					/>
					<IoMdCloudDone
						className={`${
							isImageSelected.status ? "" : "hidden"
						} text-green-600 text-[24px]  mx-3 transition-all shadow-sm rounded-sm`}
					/>
				</Box>
				<Button
					sx={{ margin: "15px" }}
					variant="contained"
					onClick={() => handleEditBrand()}
					endIcon={<BiEditAlt />}
				>
					Edit
				</Button>
			</Box>
		</Box>
	);
};

export default EditBrand;
