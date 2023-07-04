import React, { useState, useRef } from "react";
import {
	Box,
	TextField,
	Typography,
	IconButton,
	InputLabel,
} from "@mui/material";
import Button from "@mui/material/Button";
import {
	modalStatus,
	modalHeadName,
	modalMessage,
} from "../../utils/reducers/headlessModalSlice";
import useModalHandler from "../../helpers/useModalHandler";
import { useDispatch } from "react-redux";
import { useAddOfferMutation } from "../../utils/api/apiSlice";
import { imagesUploader } from "../../helpers/imagesUploader";
import { BsCamera } from "react-icons/bs";
import { IoIosCloudDone, IoMdCloudDone } from "react-icons/io";
import { MdSend } from "react-icons/md";

const AddOffer = () => {
	const [offerName, setOfferName] = useState("");
	const [offerDiscount, setOfferDiscount] = useState("");
	// const [offerImage, setofferImage] = useState("");
	const [errorState, setErrorState] = useState({
		offerName: false,
		offerImage: false,
	});
	const [isImageSelected, setIsImageSelected] = useState({
		status: false,
		imageShowing: "",
		imageForUpload: "",
	});

	const { modalOpen, modalClose } = useModalHandler();
	const dispatch = useDispatch();
	const [
		addOffer,
		{ isLoading, isError, error, isSuccess, data: addedOffer },
	] = useAddOfferMutation();

	const errorStatus = (e) => {
		const id = e.target.id;
		const value = e.target.value;
		id === "offerName" ? setOfferName(value) : setOfferDiscount(value);
		e.target.value === "" && e.target.id === "offerName"
			? setErrorState({ ...errorState, offerName: true })
			: setErrorState({
					...errorState,
					offerImage: false,
					offerName: false,
			  });
	};

	const preset = process.env.REACT_APP_CLOUDUPLOADPRESET_OFFERS;

	const handleAddOffer = async () => {
		if (!offerName || !isImageSelected.imageForUpload) {
			modalOpen(`Info`, `Please enter offer info..!`);
			modalClose();
		} else if (offerName && isImageSelected.imageForUpload) {
			const { imageUrl } = await imagesUploader(
				isImageSelected.imageForUpload,
				preset
			);
			if (imageUrl) {
				const obj = {
					name: offerName,
					image: imageUrl,
					discount: offerDiscount,
				};
				const offerObj = { ...obj };
				Object.keys(offerObj).forEach((key) => {
					if (obj[key] === "" || undefined) {
						delete offerObj[key];
					}
				});
				addOffer(offerObj)
					.unwrap()
					.then((res) => {
						console.log(res);
						if (res.message === "success") {
							modalOpen("info", "successfully added");
							modalClose();
						}
					})
					.catch((err) => {
						console.log(err);
						modalOpen("error", "error");
						modalClose();
					});
			}
		}
	};

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
		<Box className={`w-fit`}>
			<Typography variant="h6" component={`span`} color={`primary`}>
				Add Offer
			</Typography>

			<Box
				className={`w-64 mt-4 `}
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
					id="outlined-read-only-input"
					label="Admin Name"
					defaultValue={`${localStorage.getItem("userName")}`}
					InputProps={{
						readOnly: true,
					}}
				/>
				<TextField
					multiline
					maxRows={3}
					error={errorState.offerName}
					onChange={(e) => errorStatus(e)}
					required
					id="offerName"
					label="Offer Name"
				/>
				<TextField
					multiline
					onChange={(e) => errorStatus(e)}
					id="offerDiscount"
					label="Offer Discount"
				/>
				<Box className={`my-4 sm:my-1 ms-[7px] me-3 rounded-lg`}>
					<InputLabel
						sx={{ fontSize: "14px", marginX: "3px" }}
						variant="standard"
					>
						offerImage *
					</InputLabel>

					<Box
						component={"div"}
						className={`flex items-center justify-between   border-blue-400 bg-slate-100 w-[200px] sm:h-10   rounded-md border`}
					>
						<label
							htmlFor="upload1"
							className="w-20 h-full bg-blue-600 flex cursor-pointer rounded-md  "
						>
							<Button
								variant="contained"
								id="offerImage"
								component="div"
								className=""
								onChange={(e) => selectImageHandler(e)}
							>
								<input
									id="upload1"
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
				</Box>
				<Button
					sx={{ margin: "15px" }}
					variant="contained"
					onClick={() => handleAddOffer()}
					endIcon={<MdSend />}
				>
					Add
				</Button>
			</Box>
		</Box>
	);
};

export default AddOffer;
