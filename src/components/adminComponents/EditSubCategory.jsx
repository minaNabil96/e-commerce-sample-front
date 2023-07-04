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
import {
	useGetAllCategoriesQuery,
	useEditSubCategoryMutation,
} from "../../utils/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import useModalHandler from "../../helpers/useModalHandler";
import { imagesUploader } from "../../helpers/imagesUploader";
import { IoMdCloudDone } from "react-icons/io";
import { BiEditAlt } from "react-icons/bi";

const EditSubCategory = () => {
	const [subCategoryName, setSubCategoryName] = useState("");
	const [selectedCategory, setSelectedCategory] = useState("");
	const [isImageSelected, setIsImageSelected] = useState({
		status: false,
		imageShowing: "",
		imageForUpload: "",
	});
	// form handler
	const dispatch = useDispatch();
	const {
		materialModalStatus,
		materialModalMessage,
		materialModalHeadName,
		materialModalPayload,
	} = useSelector((state) => state.materialModalSlice);

	// start rtk query
	const { data: allCategories } = useGetAllCategoriesQuery({
		page: 1,
		limit: 16,
	});

	const categoriesMap =
		allCategories &&
		allCategories.allCategories.map(({ name, _id }) => (
			<MenuItem
				value={_id}
				onClick={() => setSelectedCategory({ name, _id })}
				key={_id}
			>
				{name}
			</MenuItem>
		));

	const [editSubCategory, { data: editedSub }] = useEditSubCategoryMutation();

	// end rtk query
	// start add Subcategory
	const { modalOpen, modalClose } = useModalHandler();

	const handleEditSubCategory = async () => {
		let editSubObj = {
			name: subCategoryName,
			image: "",
			category: selectedCategory ? selectedCategory._id : "",
		};

		if (
			!subCategoryName &&
			!isImageSelected.imageForUpload &&
			!selectedCategory._id
		) {
			modalOpen(`Info`, `Please enter what you want to change..!`);
			modalClose();
		} else if (isImageSelected.imageForUpload) {
			const { imageUrl } = await imagesUploader(
				isImageSelected.imageForUpload
			);
			editSubObj.image = await imageUrl;
			let editSubObjCopy = { ...editSubObj };

			Object.keys(editSubObj).forEach((key) => {
				if (editSubObj[key] === "" || editSubObj[key] === undefined) {
					delete editSubObjCopy[key];
				}
			});
			if (imageUrl) {
				editSubCategory({
					id: materialModalPayload,
					editSubObj: editSubObjCopy,
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
			let editSubObjCopy = { ...editSubObj };

			Object.keys(editSubObj).forEach((key) => {
				if (editSubObj[key] === "" || editSubObj[key] === undefined) {
					delete editSubObjCopy[key];
				}
			});
			editSubCategory({
				id: materialModalPayload,
				editSubObj: editSubObjCopy,
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
				Edit SubCategory
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
					onChange={(e) => setSubCategoryName(e.target.value)}
					id="subCategoryName"
					label="SubCatagory Name"
				/>
				<FormControl className={``}>
					<InputLabel
						className="ms-2 mx-1"
						variant="filled"
						id={selectedCategory.name || "name"}
					>
						Product Category *
					</InputLabel>
					<Select
						value={selectedCategory._id || ""}
						variant="standard"
						// labelId={name}
						id={selectedCategory.name || "name"}
						className={`w-52 mx-3 my-2 pt-3 h-[47px]   `}
					>
						{categoriesMap}
					</Select>
				</FormControl>
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
					onClick={() => handleEditSubCategory()}
					endIcon={<BiEditAlt />}
				>
					Edit
				</Button>
			</Box>
		</Box>
	);
};

export default EditSubCategory;
