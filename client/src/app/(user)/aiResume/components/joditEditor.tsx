"use client";

import React, { useEffect, useMemo, useState } from "react";
import JoditEditor from "jodit-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "@/components/ui/textarea";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setHtml } from "@/lib/redux/aiResumeHtml/resumeHtmlSlice";
import { RootState } from "@/lib/redux/store";

const Editor = () => {
  const [inputText, setInputText] = useState("");
  const editor = React.useRef(null);
  const [content, setContent] = React.useState("");
  const { html } = useSelector((state: RootState) => state.htmlData);
  const dispatch = useDispatch();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  useEffect(() => {
    setContent(html);
  }, [html]);

  const config: any = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start building your resume...",
      height: "calc(100vh - 4rem)",
      width: "794px",

      // buttons: [
      //   "bold",
      //   "italic",
      //   "underline",
      //   "|",
      //   "ul",
      //   "ol",
      //   "|",
      //   "font",
      //   "fontsize",
      //   "|",
      //   "align",
      //   "indent",
      //   "outdent",
      //   "|",
      //   "hr",
      //   "table",
      //   "|",
      //   "undo",
      //   "redo",
      //   "print",
      // ],

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

      // removeButtons: [
      //   "video",
      //   "file",
      //   "image",
      //   "source",
      //   "about",
      //   "fullsize",
      //   "copyformat",
      //   "superscript",
      //   "subscript",
      //   "selectall",
      //   "cut",
      //   "copy",
      //   "paste",
      //   "symbol",
      // ],

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

  const { mutate, isPending } = useMutation({
    mutationFn: ({
      content,
      inputText,
    }: {
      content: string;
      inputText: string;
    }) => onSend(content, inputText),
    onSuccess: (responseData) => {
      dispatch(setHtml(responseData?.generatedResume));
      setContent(responseData?.generatedResume);
      setInputText("");
    },
    onError: (error) => {
      toast.error("Error sending data");
    },
  });

  return (
    <div className="h-screen w-fit flex flex-col bg-gray-50">
      <ScrollArea className="h-fit w-full">
        <div className="relative w-[794px] border border-gray-200 rounded-lg shadow-md bg-white overflow-hidden">
          <JoditEditor
            className="pb-48"
            ref={editor}
            value={
              isPending
                ? "<p class='text-gray-500 italic'>Generating your request...</p>"
                : content
            }
            config={config}
            onBlur={(newContent) => dispatch(setHtml(newContent))}
          />

          <div className="absolute w-full bottom-0 bg-white border-t border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <Textarea
                  value={inputText}
                  className="h-[72px] pr-14 py-3 resize-none border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Ask Gemini to help with your resume..."
                  onChange={handleInputChange}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      if (inputText.trim()) {
                        mutate({ content, inputText });
                      }
                    }
                  }}
                />
                <Button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 h-12 w-12 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
                  disabled={isPending}
                  onClick={() =>
                    inputText.trim() && mutate({ content, inputText })
                  }
                  title="Send to Gemini"
                >
                  <Send size={18} />
                </Button>
              </div>

              {isPending && (
                <div className="flex items-center text-sm text-gray-500">
                  <div className="inline-block h-3 w-3 mr-2 rounded-full border-2 border-blue-600 border-t-transparent animate-spin"></div>
                  Processing...
                </div>
              )}
            </div>

            <div className="mt-2 text-xs text-gray-500">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default Editor;
