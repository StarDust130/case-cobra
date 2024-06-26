"use client";

import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useUploadThing } from "@/lib/uploadthings";
import { cn } from "@/lib/utils";
import { ImageIcon, Loader, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import DropZone, { FileRejection } from "react-dropzone";

const Upload = () => {
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const { toast } = useToast();

  const { startUpload, isUploading } = useUploadThing("imageUploader", {
    onClientUploadComplete: ([data]) => {
      const configId = data.serverData.configId;
      startTransition(() => {
        router.push(`/configure/design?id=${configId}`);
      });
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  //! File Upload Rejection Handler
  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;

    toast({
      title: `${file.file.name} type not supported!`,
      description:
        "Please upload a valid image file (PNG, JPG, JPEG) less than 4MB.",
      variant: "destructive",
    });
    setIsDragOver(false);
  };

  //! File Upload Acceptance Handler
  const onDropAccepted = (acceptedFile: File[]) => {
    startUpload(acceptedFile, { configId: undefined });

    setIsDragOver(false);

    toast({
      title: "File Uploaded Successfully!  🎉",
      description: "Redirecting to the design page...",
    });
  };

  const [isPending, startTransition] = useTransition();
  return (
    <div
      className={cn(
        "relative h-full flex-1 my-16 w-full rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:rounded-2xl flex justify-center flex-col items-center border-2 border-dashed border-gray-900/50 ",
        {
          "ring-blue-900/25 bg-blue-900/10": isDragOver,
        }
      )}
    >
      <div className="relative flex flex-1 flex-col items-center justify-center w-full cursor-pointer ">
        <DropZone
          onDropRejected={onDropRejected}
          onDropAccepted={onDropAccepted}
          accept={{ "image/*": ["png", "jpg", "jpeg"] }}
          onDragEnter={() => setIsDragOver(true)}
          onDragLeave={() => setIsDragOver(false)}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              className="h-full w-full flex-1 flex flex-col items-center justify-center"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragOver ? (
                <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
              ) : isUploading || isPending ? (
                <Loader className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
              ) : (
                <ImageIcon className="h-6 w-6 text-zinc-500 mb-2 " />
              )}
              <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                {isUploading ? (
                  <div className="flex flex-col items-center">
                    <p>Uploading...</p>
                    <Progress value={uploadProgress} className="w-64 mt-5" />
                  </div>
                ) : isPending ? (
                  <div className="flex flex-col items-center ">
                    <p>Redirecting, please wait...</p>
                  </div>
                ) : isDragOver ? (
                  <p>
                    <span className="font-semibold">Drop file</span> to upload
                  </p>
                ) : (
                  <p>
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                )}
              </div>

              {isPending ? null : (
                <p className="text-sm text-zinc-500">PNG, JPG, JPEG</p>
              )}
            </div>
          )}
        </DropZone>
      </div>
    </div>
  );
};
export default Upload;
