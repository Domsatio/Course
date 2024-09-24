import { Dialog, DialogBody } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  XIcon,
} from "react-share";
import { XCircleIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { CheckIcon, DocumentDuplicateIcon } from "@heroicons/react/24/solid";
import { useCopyToClipboard } from "usehooks-ts";

type ModalShareProps = {
  isOpen: boolean;
  handler: (e: boolean) => void;
  title?: string;
};

export default function ModalShare({
  isOpen,
  handler,
  title = "Share",
}: ModalShareProps) {
  const [value, copy] = useCopyToClipboard();
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [pathname]);

  return (
    <Dialog size="xs" open={isOpen} handler={() => handler(false)}>
      <DialogBody className="relative flex flex-col gap-5 items-center p-5">
        <XCircleIcon
          className="h-6 w-6 text-black absolute top-5 right-5 cursor-pointer hover:scale-110"
          onClick={() => handler(false)}
        />
        <h1 className="text-lg font-bold">{title}</h1>
        <div className="flex gap-3">
          <FacebookShareButton url={pathname}>
            <FacebookIcon size={40} round />
          </FacebookShareButton>
          <TwitterShareButton url={pathname} title={"twitter"}>
            <XIcon size={40} round />
          </TwitterShareButton>
          <LinkedinShareButton url={pathname} title={"linkedin"}>
            <LinkedinIcon size={40} round />
          </LinkedinShareButton>
          <WhatsappShareButton
            url={pathname}
            title={"whatsapp"}
            separator=":: "
          >
            <WhatsappIcon size={40} round />
          </WhatsappShareButton>
          <TelegramShareButton url={pathname} title={"telegram"}>
            <TelegramIcon size={40} round />
          </TelegramShareButton>
        </div>
        <div>
          <div
            onMouseLeave={() => setCopied(false)}
            onClick={() => {
              copy(currentUrl);
              setCopied(true);
            }}
            className="flex text-white bg-black rounded-lg items-center gap-x-3 px-4 py-2.5 lowercase cursor-pointer"
          >
            <div className="relative border-r border-gray-400/50 pr-3 max-w-[300px] font-normal overflow-hidden whitespace-nowrap">
              {currentUrl}
            </div>
            {copied ? (
              <CheckIcon className="h-4 w-4 text-white" />
            ) : (
              <DocumentDuplicateIcon className="h-4 w-4 text-white" />
            )}
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
