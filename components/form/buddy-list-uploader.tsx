"use client";

import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { toast } from "sonner";
import {PutBlobResult} from "@vercel/blob";
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function BuddyListUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {getValues, formState, setValue} = useCampaignContext();
  const buddyListURL = getValues('buddyListURL');
  const {errors} = formState;
  const [data, setData] = useState({
    buddy_list_url: "",
    fileName: "",
    fileSize: 0,
    fileStatus: "none selected",
  });
  const [dragActive, setDragActive] = useState(false);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Buddy List page file: ", file?.name, " size: ", file?.size);
    if (file) {
      const response = await fetch(`/api/upload/buddy-list?filename=${file.name}`, {
        method: 'POST',
        body: file,
      });
      // Store the URL in the form state and in the component state
      const newBlob = (await response.json()) as PutBlobResult;
      setValue('buddyListURL', newBlob.url);
      setData((prev) => ({
        ...prev,
        buddy_list_url : newBlob.url,
        fileName: file.name,
        fileSize: file.size,
        fileStatus: "uploaded",
      }));
    }
  };
  const handleUpload = (file: File | null) => {
    console.log("Handle File uploader file: ", file?.name, " size: ", file?.size);
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else if (
          !file.type.includes("csv")
      ) {
        toast.error("Invalid file type (must be .csv)");
      } else {
        setData((prev) => ({
          ...prev,
          buddy_list_url : "",
          fileName: file.name,
          fileSize: file.size,
          fileStatus: "uploading",
        }));
      };
    }
  }
  return (
      <div>
        <label className="flex flex-col mt-4">
          <div className="flex justify-between">
            {buddyListURL && (
                <div>
                  Blob url: <a href={buddyListURL}>{buddyListURL}</a>
                </div>
            )}
            {errors.buddyListURL && (
                <span className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red">
                    {errors.buddyListURL.message}
                    </span>
            )}
          </div>

        </label>
      <label
        htmlFor={"buddy_list-upload"}
        className={cn(
          "aspect-square max-w-xs group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50",
        )}
      >
        <div
          className="absolute z-[5] h-full w-full rounded-md"
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          onDrop={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);

            const file = e.dataTransfer.files && e.dataTransfer.files[0];
            inputRef.current!.files = e.dataTransfer.files; // set input file to dropped file
            handleUpload(file);
          }}
        />
        <div
          className={`${
            dragActive ? "border-2 border-black" : ""
          } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
            data.buddy_list_url
              ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
              : "bg-white opacity-100 hover:bg-gray-50"
          }`}
        >
          <svg
            className={`${
              dragActive ? "scale-110" : "scale-100"
            } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
            <path d="M12 12v9"></path>
            <path d="m16 16-4-4-4 4"></path>
          </svg>
          <p className="mt-2 text-center text-sm text-gray-500">
            Drag and drop or click to upload.
          </p>
          <p className="mt-2 text-center text-sm text-gray-500">
            Max file size: 50MB
          </p>
          <span className="sr-only">List upload</span>
        </div>
         {data.buddy_list_url && (
            <div className="border p-4 rounded-md bg-gray-100">
                <p>File Name: {data.fileName}</p>
                <p>File Size: {data.fileSize} bytes</p>
                <p>File url: {data.buddy_list_url}</p>
            </div>
        )}
      </label>
      <div className="mt-1 flex rounded-md shadow-sm">
        <input
          id={"buddy_list-upload"}
          ref={inputRef}
          name={"buddy_list"}
          type="file"
          accept=".csv"
          className="sr-only"
          onChange={(e) => {
            const file = e.currentTarget.files && e.currentTarget.files[0];
            handleUpload(file);
          }}
        />
      </div>
    </div>
  );
}
