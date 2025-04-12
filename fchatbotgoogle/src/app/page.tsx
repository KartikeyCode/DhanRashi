"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { answerDataQuestions } from "@/ai/flows/answer-data-questions";
import { summarizeData } from "@/ai/flows/summarize-data";
import { Toaster } from "@/components/ui/toaster";
import { Icons } from "@/components/icons";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import Navbar from "@/components/navbar";

export default function Home() {
  const [excelData, setExcelData] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [isLoadingAnswer, setIsLoadingAnswer] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = e.target?.result as string;
        setExcelData(data);
        setSummary(null); // Clear previous summary
        setAnswer(null); // Clear previous answer
      };
      reader.readAsText(file);
      toast({
        title: "File uploaded!",
        description: "Data is ready for analysis.",
      });
    }
  };

  const handleSummarizeData = async () => {
    if (!excelData) {
      toast({
        title: "No data!",
        description: "Please upload an Excel file first.",
      });
      return;
    }

    setIsLoadingSummary(true);
    try {
      const result = await summarizeData({ excelData });
      setSummary(result?.summary || "No summary available.");
    } catch (error: any) {
      console.error("Error summarizing data:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message || "Failed to summarize data. Please try again.",
      });
    } finally {
      setIsLoadingSummary(false);
    }
  };

  const handleAskQuestion = async () => {
    if (!excelData) {
      toast({
        title: "No data!",
        description: "Please upload an Excel file first.",
      });
      return;
    }

    if (!question) {
      toast({
        title: "No question!",
        description: "Please enter a question to ask.",
      });
      return;
    }

    setIsLoadingAnswer(true);
    try {
      const result = await answerDataQuestions({ excelData, question });
      setAnswer(result?.answer || "No answer available.");
    } catch (error: any) {
      console.error("Error answering question:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error?.message || "Failed to answer question. Please try again.",
      });
    } finally {
      setIsLoadingAnswer(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[40rem] p-4">
        <Toaster />
        <Card className="w-full max-w-6xl space-y-6">
          <CardHeader>
            <CardTitle>Finance Chatbot</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                id="upload"
                accept=".txt, .csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="upload"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 focus:ring-4 focus:outline-none focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center mr-2"
              >
                Upload Excel File <Icons.file className="w-4 h-4 ml-2" />
              </label>
              <Button onClick={handleSummarizeData} disabled={isLoadingSummary}>
                {isLoadingSummary ? (
                  <>
                    Analyzing...
                    <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Analyze Data"
                )}
              </Button>
            </div>

            <div>
              <p className="text-sm font-medium">Data Summary:</p>
              {isLoadingSummary ? (
                <Skeleton className="h-24 w-full" />
              ) : (
                <Textarea
                  readOnly
                  value={summary || "No data to display."}
                  className="h-24 resize-none"
                />
              )}
            </div>

            <div>
              <p className="text-sm font-medium">Ask a Question:</p>
              <div className="flex space-x-2">
                <Input
                  type="text"
                  placeholder="Enter your question..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  disabled={isLoadingAnswer}
                />
                <Button onClick={handleAskQuestion} disabled={isLoadingAnswer}>
                  {isLoadingAnswer ? (
                    <>
                      Answering...
                      <Icons.spinner className="ml-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Get Answer"
                  )}
                </Button>
              </div>
              {isLoadingAnswer ? (
                <Skeleton className="h-24 w-full mt-2" />
              ) : (
                answer && (
                  <Textarea
                    readOnly
                    value={answer}
                    className="h-60 resize-none mt-2"
                  />
                )
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
