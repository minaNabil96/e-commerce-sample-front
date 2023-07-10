import { useDispatch } from "react-redux";
import {
  modalStatus,
  modalHeadName,
  modalMessage,
  closeModal,
} from "../utils/reducers/headlessModalSlice";
const useModalHandler = (time) => {
  const dispatch = useDispatch();

  const modalOpen = (headName, message) => {
    dispatch(modalStatus());
    dispatch(modalHeadName(`${headName}`));
    dispatch(modalMessage(`${message}`));
  };
  const modalClose = () => {
    // setTimeout(
    //   () => {
    //     dispatch(modalStatus());
    //   },
    //   time ? time : 2500
    // );
    // setTimeout(
    //   () => {
    //     dispatch(closeModal());
    //   },
    //   time ? time + 1000 : 3500
    // );
    setTimeout(() => {
      dispatch(modalStatus());
    }, 2500);
  };
  return { modalOpen, modalClose };
};

export default useModalHandler;
