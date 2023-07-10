import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {
  modalStatus,
  closeModal,
} from "../../utils/reducers/headlessModalSlice";
import { Typography } from "@mui/material";
function HeadlessModal() {
  const [isOpen, setIsOpen] = useState(true);

  // start rtk
  const dispatch = useDispatch();
  const {
    headlessModalStatus,
    headlessModalMessage,
    headlessModalPayload,
    headlessModalHeadName,
    closeModal: closemodal,
  } = useSelector((state) => state.headlessModalSlice);
  // end rtk

  const closeHandler = () => {
    if (headlessModalStatus) {
      dispatch(modalStatus());
      setTimeout(() => {
        dispatch(closeModal());
      }, 300);
    }
  };

  // function openModal() {
  //   setIsOpen(true);
  // }

  return (
    <>
      {/* <div className="fixed inset-0 flex items-center justify-center">
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Open dialog
        </button>
      </div> */}

      <Transition
        appear
        show={headlessModalStatus && headlessModalMessage ? true : false}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="relative z-[9999]"
          onClose={() => closeHandler()}
          initialFocus={closeHandler}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-in duration-300"
                enterFrom="opacity-0 scale-50"
                enterTo="opacity-100 scale-100"
                leave="ease-out duration-300"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-0"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    {headlessModalHeadName
                      ? headlessModalHeadName
                      : "no modal head name"}
                  </Dialog.Title>
                  <div className="mt-2">
                    <Typography
                      variant={"body2"}
                      component={"p"}
                      className="text-sm text-gray-500"
                    >
                      {headlessModalMessage
                        ? headlessModalMessage
                        : "no modal message"}
                    </Typography>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeHandler}
                    >
                      ok
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default HeadlessModal;
