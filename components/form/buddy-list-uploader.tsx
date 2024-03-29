"use client";
import cn from "clsx";
import React, {useRef, useState} from "react";
import {toast} from "sonner";
import useFileUpload from "@/lib/hooks/use-file-upload"; // New custom hook for file upload logic
import useCampaignContext from "@/lib/hooks/use-campaign-context";

export default function BuddyListUploader() {
    const inputRef = useRef<HTMLInputElement>(null);
    const {getValues, formState, setValue} = useCampaignContext();
    const buddyListURL = getValues('buddyListURL');
    const {errors} = formState;



    function formatFileSize(size : number) {
        const ONE_MB = 1048576; // 1 MB in bytes
        if (size < ONE_MB) {
            return `${(size / 1024).toFixed(2)} KB`;
        } else {
            return `${(size / ONE_MB).toFixed(2)} MB`;
        }
    }


    const {data, setData, uploadFile, handleDragDrop} = useFileUpload({
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
            setData(prev => ({...prev, fileStatus: "error"}));
        },
        maxSize: 50 * 1024 * 1024, // 50MB
        validTypes: ["text/csv", "application/vnd.ms-excel"]
    });
    // @ts-ignore
    return (
        <div>
            {/* Displaying the existing buddy list URL and any errors
                Let's add a debugger statement*/}
            <div className="flex justify-between mt-4">
                {data.buddy_list_url && (
                    <div
                        className="border p-4 rounded-md bg-gray-100 flex items-center space-x-4"> {/* Updated to flex container */}
                        <a href={data.buddy_list_url} download
                           className="hover:underline flex items-center space-x-2"> {/* Filename as hyperlink with icon */}
                            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                 stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                 strokeLinejoin="round"> {/* Generic download icon */}
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            <span>List: {data.fileName}</span> {/* Text changed to "List" */}
                        </a>
                        <p>Size: {formatFileSize(data.fileSize)}</p> {/* Refactored file size display */}
                    </div>
                )}
                {errors.buddyListURL && (
                    <span
                        className="text-xs lg:text-sm font-medium lg:font-bold tracking-wide text-strawberry-red self-center ml-4">
                   {errors.buddyListURL.message}
                 </span>
                )}
            </div>


            {/* File upload label and drag-and-drop area */}
            <label htmlFor="buddy_list-upload"
                   className={cn("aspect-square max-w-xs group relative mt-2 flex cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50")}>
                <div className="absolute z-[5] h-full w-full rounded-md" onDragOver={handleDragDrop}
                     onDragEnter={handleDragDrop} onDragLeave={handleDragDrop} onDrop={handleDragDrop}>
                    {/* SVG icon and instructional text */}
                    <div
                        className={`absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${data.buddy_list_url ? "bg-white/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md" : "bg-white opacity-100 hover:bg-gray-50"}`}>
                        <svg
                            className={`h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                            <path d="M12 12v9"></path>
                            <path d="m16 16-4-4-4 4"></path>
                        </svg>
                        <p className="mt-2 text-center text-sm text-gray-500">Drag and drop or click to upload.</p>
                        <p className="mt-2 text-center text-sm text-gray-500">Max file size: 50MB</p>
                        <span className="sr-only">List upload</span>
                    </div>
                </div>
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
