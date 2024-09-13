import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

interface LoadingModalProps {
  loading: boolean;
}

export const LoadingModal: React.FC<LoadingModalProps> = ({ loading }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogDescription>
            <div className="flex flex-col items-center py-1">
              <Image
                src="/rocket-loader.gif"
                width={100}
                height={100}
                alt="loader"
              />
              <p>Please wait... AI is generating your course </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingModal;
