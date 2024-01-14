import React, {useState} from 'react';
import { toast } from 'sonner';
import {PutBlobResult} from "@vercel/blob";
interface UseFileUploadProps {
    onSuccess?: (newBlob: PutBlobResult , file: File) => void;
    onFailure?: (error: Error) => void;
    maxSize: number;
    validTypes: string[];
}

const useFileUpload = ({ onSuccess, onFailure, maxSize, validTypes }: UseFileUploadProps) => {
    const [data, setData] = useState({
        buddy_list_url: "",
        fileName: "",
        fileSize: 0,
        fileStatus: "none selected",
    });
    const uploadFile = async (file: File) => {
        if (!file) return;

        // Check file size
        if (file.size > maxSize) {
            toast.error("File size too big (max 50MB)");
            return;
        }

        // Check file type
        if (!validTypes.includes(file.type)) {
            toast.error("Invalid file type (must be .csv)");
            return;
        }

        // Update UI before upload
        setData({
            buddy_list_url: "",
            fileName: file.name,
            fileSize: file.size,
            fileStatus: "uploading",
        });

        try {
            const response = await fetch(`/api/upload/buddy-list?filename=${file.name}`, {
                method: 'POST',
                body: file,
            });
            if (!response.ok) {
                const error = new Error('Upload failed');
                onFailure && onFailure(error);
                return;
            }
            const newBlob = (await response.json()) as PutBlobResult;
            // Call onSuccess callback
            onSuccess && onSuccess(newBlob, file);

        } catch (error) {
            if (error instanceof Error) {
                // Call onFailure callback with the Error object
                onFailure && onFailure(error);
            } else {
                // Handle non-Error objects (e.g., strings or other types)
                onFailure && onFailure(new Error('An unknown error occurred'));
            }
        }
    };

    const handleDragDrop = (event : React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();

        // Handle drag and drop events
        if (event.type === 'drop') {
            const file = event.dataTransfer.files[0];
            uploadFile(file)
            .then(() => {
                console.log('File uploaded successfully');
            })
            .catch((error) => {
                // Handle error
                console.error(error);
            });
        }
    };

    return { data, setData, uploadFile, handleDragDrop };
};

export default useFileUpload;
