"use client";
import cn from "clsx";
import React, {useRef, useState} from "react";
import { toast } from "sonner";
import useFileUpload from "@/lib/hooks/use-file-upload"; // New custom hook for file upload logic
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function BuddyListUploader() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { getValues, formState, setValue } = useCampaignContext();
  const buddyListURL = getValues('buddyListURL');

  const { errors } = formState;

  const { data, setData, uploadFile, handleDragDrop } = useFileUpload({
    onSuccess: (newBlob, file) => {
      setValue('buddyListURL', newBlob.url);
        setData({
            buddy_list_url: newBlob.url,
            fileName: file.name,
            fileSize: file.size,
            fileStatus: "uploaded",
        });
    },
    onFailure: (error) => {
      toast.error(error.message);
      // Update UI on error
      setData(prev => ({ ...prev, fileStatus: "error" }));
    },
    maxSize: 50 * 1024 * 1024, // 50MB
    validTypes: ["text/csv", "application/vnd.ms-excel"]
  });
  // @ts-ignore
  return (
      <div>
        {/* Displaying the existing buddy list URL and any errors */}
        <div className="flex justify-between mt-4">
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

        {/* File upload label and drag-and-drop area */}
        <label htmlFor="buddy_list-upload" className={cn("aspect-square max-w-xs group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50")}>
          <div className="absolute z-[5] h-full w-full rounded-md" onDragOver={handleDragDrop} onDragEnter={handleDragDrop} onDragLeave={handleDragDrop} onDrop={handleDragDrop}>
            {/* SVG icon and instructional text */}
            <div className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${data.buddy_list_url ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md" : "bg-white opacity-100 hover:bg-gray-50"}`}>
              <svg className={`h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                <path d="M12 12v9"></path>
                <path d="m16 16-4-4-4 4"></path>
              </svg>
              <p className="mt-2 text-center text-sm text-gray-500">Drag and drop or click to upload.</p>
              <p className="mt-2 text-center text-sm text-gray-500">Max file size: 50MB</p>
              <span className="sr-only">List upload</span>
            </div>
          </div>

          {/* Displaying file details after upload */}
          {data.buddy_list_url && (
              <div className="border p-4 rounded-md bg-gray-100">
                <p>File Name: {data.fileName}</p>
                <p>File Size: {data.fileSize} bytes</p>
                <p>File url: {data.buddy_list_url}</p>
              </div>
          )}
        </label>

        {/* Hidden file input for uploading files */}
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
              id="buddy_list-upload"
              ref={inputRef}
              name="buddy_list"
              type="file"
              accept=".csv"
              className="sr-only"
              onChange={(e) => {
                const files = e.currentTarget.files;
                if (files && files.length > 0) {
                  uploadFile(files[0]).then(r => console.log(r));
                }
              }}
          />
        </div>
      </div>

  );
}
