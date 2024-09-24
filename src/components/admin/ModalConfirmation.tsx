import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

type ModalConfirmationProps = {
  isOpen: boolean;
  handler: (isOpen: boolean) => void;
  onConfirm: () => void;
  title?: string;
  messege?: string;
  buttonActionName?: string;
};

export const ModalConfirmation = ({
  isOpen,
  handler,
  onConfirm,
  title = "Delete Data",
  messege = "Are you sure you want to delete this data?",
  buttonActionName = "Delete",
}: ModalConfirmationProps) => {
  return (
    <Dialog size="xs" open={isOpen} handler={() => handler(true)}>
      <DialogHeader color="red">{title}</DialogHeader>
      <DialogBody>{messege}</DialogBody>
      <DialogFooter>
        <Button
          variant="outlined"
          onClick={() => {
            handler(false);
          }}
        >
          Cancel
        </Button>
        <Button color="red" className="ml-2" onClick={() => onConfirm()}>
          {buttonActionName}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};
