"use client";

import React, { useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { debounce } from "lodash";
import { defaultTemp } from "./template";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
// import MyEditorConfig from "@/lib/types/editorType";

const Editor = () => {
  const [inputText, setInputText] = useState("");
  const editor = React.useRef(null);
  const [content, setContent] = React.useState(defaultTemp);

  const handleInputChange = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  }, 500);

  const config: any = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start building your resume...",
      height: "calc(100vh - 4rem)",
      width: "794px",

      buttons: [
        "bold",
        "italic",
        "underline",
        "|",
        "ul",
        "ol",
        "|",
        "font",
        "fontsize",
        "|",
        "align",
        "indent",
        "outdent",
        "|",
        "hr",
        "table",
        "|",
        "undo",
        "redo",
        "print",
      ],

      toolbarAdaptive: false,
      toolbar: true,
      toolbarSticky: true,
      toolbarStickyOffset: 0,

      style: {
        "& .jodit-toolbar__box": {
          "max-height": "none",
          overflow: "visible",
        },
        "& .jodit-toolbar-button": {
          width: "36px",
          height: "36px",
        },
        "& .jodit-toolbar-button__icon": {
          width: "24px",
          height: "24px",
        },
        "& .jodit-ui-button": {
          padding: "8px 12px",
          fontSize: "16px",
        },
      },

      removeButtons: [
        "video",
        "file",
        "image",
        "source",
        "about",
        "fullsize",
        "copyformat",
        "superscript",
        "subscript",
        "selectall",
        "cut",
        "copy",
        "paste",
        "symbol",
      ],

      disablePlugins: [
        "speech-recognize",
        "video",
        "media",
        "file-browser",
        "image-processor",
        "image-properties",
        "drag-and-drop",
        "modify",
        "mobile",
      ],

      spellcheck: true,
    }),
    []
  );

  const onSend = async (content: string, inputText: string): Promise<any> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/geminiEditor`,
        {
          content,
          inputText,
        }
      );
      
      return response.data;
    } catch (error) {
      console.error("Error sending data:", error);
      throw error;
    }
  };

  //NOTE:- useQuery runs automatically when input/content changes 
  //                          but 
  //       useMutation only runs when somthing like a button click happens
  const {mutate, data, isPending} = useMutation({
    mutationFn: ({ content, inputText }: { content: string; inputText: string }) =>
      onSend(content, inputText),
    onSuccess: (responseData) => {
      console.log("Response from Gemini:", responseData);
      setContent(responseData?.generatedResume)
    },
    onError: (error) => {
      console.error("Error sending data:", error);
    }
  })


  return (
    <div className="h-screen w-fit flex flex-col">
      <ScrollArea className="h-full w-full p-4">
        <div className="relative w-[794px] border border-gray-300 rounded-lg shadow-sm">
          <JoditEditor
            ref={editor}
            value={isPending ? "<p>Generating your request...</p>" : content}
            config={config}
            onBlur={(newContent) => setContent(newContent)}
            onChange={() => {}}
          />

          <div className="absolute flex w-full items-center gap-4 justify-center bottom-8 px-8">
            <Input
              className="border-black bg-white"
              placeholder="Ask gemini...."
              onChange={(e) => handleInputChange(e)}
            />
            <Button disabled={isPending} onClick={() => mutate({content, inputText})}>
              <Send />
            </Button>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Editor;
