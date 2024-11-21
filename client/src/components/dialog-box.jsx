import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import PropTypes from "prop-types";

function DialogBox({ isOpen, setIsOpen, children, title }) {
  return (
    <>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/80">
          <DialogPanel className="max-w-lg sm:min-w-[500px] space-y-4 border bg-gray-100 p-6 rounded-md">
            <DialogTitle className="font-bold text-2xl text-center">
              {title}
            </DialogTitle>
            {children}
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}

DialogBox.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

export default DialogBox;
