import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
} from "@material-tailwind/react";
import {
  ChatBubbleBottomCenterIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/libs/cn";

type ChatData = {
  id: number;
  user: string;
  message: string;
  time: string;
};

// const chatData = [
//   {
//     id: 1,
//     user: "Chat gpt",
//     message: "Hello",
//     time: "10:00",
//   },
//   {
//     id: 2,
//     user: "You",
//     message: "Hi",
//     time: "10:01",
//   },
//   {
//     id: 3,
//     user: "Chat gpt",
//     message: "How can I help you?",
//     time: "10:02",
//   },
//   {
//     id: 4,
//     user: "You",
//     message: "I want to buy a product",
//     time: "10:03",
//   },
// ];

export function ChatPopover() {
  const [chatData, setChatData] = useState<ChatData[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  const generateCurrentTime = () => {
    const currentTime = new Date();
    const options = { hour: 'numeric' as const, minute: 'numeric' as const, hour12: true }; // Define options for 12-hour format
    const formattedTime = currentTime.toLocaleTimeString([], options);
    return formattedTime;
  }

  const handleSendMessage = async () => {
    if (message === "") return;
    setLoading(true);
    try {
      const newChat = {
        id: chatData.length + 1,
        user: "Me",
        message,
        time: generateCurrentTime(),
      };
      setChatData([...chatData, newChat]);
      setMessage("");
      setIsTyping(true);
      console.log(message);

      // const API_URL = "https://api-inference.huggingface.co/models/EleutherAI/gpt-j-6B";
      const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-Nemo-Instruct-2407";
      const headers = {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_HUGGING_FACE_API_KEY}`,
        "Content-Type": "application/json",
      };

      const response = await fetch(API_URL, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          inputs: message,
          parameters: {
            max_new_tokens: 200,
            temperature: 0.7,
            top_p: 0.9,
            do_sample: true,
            no_repeat_ngram_size: 2
          },
          options: {
            use_cache: false,
          },
        }),
      });

      // const result = await response.json();
      // console.log(result, "result response");
      
      // Post-process the response
      // let generatedText = result[0].generated_text;
      // generatedText = generatedText.replace(message, '').trim();
      // generatedText = generatedText.split('\n').map((line: any) => line.trim()).join('\n');
      // console.log(generatedText);

      const data = await response.json();
      console.log(data, "data response");
      const newChatGpt = {
        id: chatData.length + 2,
        user: "AI",
        message: data[0].generated_text,
        time: generateCurrentTime(),
      };
      setChatData(prev => [...prev, newChatGpt]);
      setLoading(false);
      setIsTyping(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setIsTyping(false);
      setLoading(false);
      toast.error("Failed to send message");
    }
  };

  return (
    <div className="fixed z-10 bottom-3 right-3">
      <Popover
        placement="top-start"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0, y: 25 },
        }}
      >
        <PopoverHandler>
          <Button className="rounded-full text-center p-3 lg:p-5">
            <ChatBubbleBottomCenterIcon className="h-5 w-5" />
          </Button>
        </PopoverHandler>
        <PopoverContent className="flex flex-col min-w-[350px] max-w-sm">
          <div>
            <h4 className="font-semibold">Chat with AI</h4>
          </div>
          <div className="flex flex-col gap-3 h-80 lg:h-96 overflow-y-scroll bg-black bg-opacity-10 p-2 rounded-lg mt-2">
            {chatData.map((data: ChatData) => (
              <div
                key={data.id}
                className={cn("flex flex-col p-2 rounded-lg bg-white max-w-fit", {
                  "self-end": data.user === "Me",
                  "self-start": data.user === "AI",
                })}
              >
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">{data.user}</span>
                  <span className="text-xs text-gray-500">{data.time}</span>
                </div>
                <div className="text-sm">{data.message}</div>
              </div>
            ))}
            {isTyping && (
              <div className="flex flex-col p-2 rounded-lg bg-white max-w-fit">
                <div className="flex justify-between">
                  <span className="text-sm font-semibold">AI</span>
                </div>
                <div className="text-sm">Typing...</div>
              </div>
            )}
          </div>
          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              crossOrigin={"anonymous"}
              placeholder="Type a message"
              className="!border !border-gray-300 rounded-full lg:p-5 bg-white text-gray-900 shadow-lg shadow-gray-900/5 ring-4 ring-transparent placeholder:text-gray-500 placeholder:opacity-100 focus:!border-gray-900 focus:!border-t-gray-900 focus:ring-gray-900/10"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              labelProps={{
                className: "hidden",
              }}
            />
            <Button
              color="green"
              ripple={true}
              onClick={handleSendMessage}
              disabled={loading}
              className="rounded-full p-3"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
