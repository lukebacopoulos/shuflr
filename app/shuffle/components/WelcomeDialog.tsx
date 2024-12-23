"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const WelcomeDialog = () => {
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisitedBefore");

    if (!hasVisited) {
      setShowDialog(true);
      // Set the flag in localStorage
      localStorage.setItem("hasVisitedBefore", "true");
    }
  }, []);

  return (
    <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
      <AlertDialogContent className="max-w-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl">
            How does this work?
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-4 text-lg">
            <p>
              1. First, select a playlist. Up to 50 songs will be selected and
              shuffled automatically.
            </p>
            <p>
              2. You can then use the buttons in the playlist view to
              re-shuffle, remove, select, and push tracks directly to your
              Spotify queue.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-full sm:w-auto">
            Let's go!
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default WelcomeDialog;
