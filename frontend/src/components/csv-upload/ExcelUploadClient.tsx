"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  FileSpreadsheet,
  Upload,
  CheckCircle,
  AlertTriangle,
  Download,
  Eye,
  Trash2,
  Save,
} from "lucide-react";

interface CsvData {
  fileName: string;
  data: Array<Record<string, any>>;
  headers: string[];
  uploadedAt: Date;
}

interface ProcessedDocument {
  id: string;
  title: string;
  content: string;
  extractedText: string;
  sourceFile: string;
  processedAt: Date;
  status: "processing" | "completed" | "error";
}

export function ExcelUploadClient() {
  const router = useRouter();
  const [csvData, setCsvData] = useState<CsvData | null>(null);
  const [documents, setDocuments] = useState<ProcessedDocument[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [documentTitle, setDocumentTitle] = useState("");
  const [documentContent, setDocumentContent] = useState("");

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    try {
      const text = await file.text();

      Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.data && results.data.length > 0) {
            const headers = Object.keys(results.data[0] as Record<string, any>);

            setCsvData({
              fileName: file.name,
              data: results.data as Array<Record<string, any>>,
              headers,
              uploadedAt: new Date(),
            });

            // Auto-generate document title and content
            setDocumentTitle(`Document from ${file.name}`);
            generateDocumentContent({
              data: results.data as Array<Record<string, any>>,
              headers,
              fileName: file.name,
            });
          }
        },
        error: (error: unknown) => {
          console.error("Error parsing CSV:", error);
        },
      });
    } catch (error) {
      console.error("Error reading file:", error);
    }
  }, []);

  const generateDocumentContent = (data: {
    data: Array<Record<string, any>>;
    headers: string[];
    fileName: string;
  }) => {
    if (!data || data.data.length === 0) return;

    let content = `# ${data.fileName}\n\n`;
    content += `This document contains data extracted from a CSV file.\n\n`;
    content += `## Summary\n`;
    content += `- Total rows: ${data.data.length}\n`;
    content += `- Columns: ${data.headers.join(", ")}\n\n`;
    content += `## Data Preview\n\n`;

    // Add first few rows as markdown table
    if (data.data.length > 0) {
      content += `| ${data.headers.join(" | ")} |\n`;
      content += `| ${data.headers.map(() => "---").join(" | ")} |\n`;

      data.data.slice(0, 5).forEach((row: Record<string, any>) => {
        const rowData = data.headers.map((header: string) =>
          String(row[header] || "").replace(/\|/g, "\\|")
        );
        content += `| ${rowData.join(" | ")} |\n`;
      });

      if (data.data.length > 5) {
        content += `\n*Showing first 5 rows of ${data.data.length} total rows*\n`;
      }
    }

    setDocumentContent(content);
  };

  const processDocument = async () => {
    if (!csvData || !documentTitle.trim()) return;

    setIsProcessing(true);
    setProcessingProgress(0);

    // Simulate processing with progress updates
    const progressInterval = setInterval(() => {
      setProcessingProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Simulate AI processing delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const newDocument: ProcessedDocument = {
        id: Date.now().toString(),
        title: documentTitle,
        content: documentContent,
        extractedText: `Extracted data from ${csvData.fileName} containing ${csvData.data.length} rows.`,
        sourceFile: csvData.fileName,
        processedAt: new Date(),
        status: "completed",
      };

      setDocuments((prev) => [newDocument, ...prev]);
      setProcessingProgress(100);

      // Reset form
      setCsvData(null);
      setDocumentTitle("");
      setDocumentContent("");

      setTimeout(() => {
        setIsProcessing(false);
        setProcessingProgress(0);
      }, 500);
    } catch (error) {
      console.error("Error processing document:", error);
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
    },
    multiple: false,
  });

  const downloadDocument = (doc: ProcessedDocument) => {
    const element = window.document.createElement("a");
    const file = new Blob([doc.content], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title}.md`;
    window.document.body.appendChild(element);
    element.click();
    window.document.body.removeChild(element);
  };

  const deleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.back()}
              className="text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="font-bold text-gray-900 text-3xl">CSV Upload</h1>
              <p className="mt-1 text-gray-600">
                Upload CSV files and convert them into searchable documents
              </p>
            </div>
          </div>
        </div>

        <div className="gap-8 grid grid-cols-1 lg:grid-cols-2">
          {/* Upload Section */}
          <div className="space-y-6">
            {!csvData ? (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="font-semibold text-gray-900 text-xl">
                    Upload CSV File
                  </CardTitle>
                  <CardDescription>
                    Drag and drop a CSV file to get started
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <FileSpreadsheet className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                    {isDragActive ? (
                      <p className="font-medium text-blue-600">
                        Drop the CSV file here...
                      </p>
                    ) : (
                      <div>
                        <p className="mb-2 font-medium text-gray-600">
                          Drop your CSV file here, or click to browse
                        </p>
                        <p className="text-gray-500 text-sm">
                          Supports .csv files
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="font-semibold text-gray-900 text-xl">
                    Process Document
                  </CardTitle>
                  <CardDescription>
                    Review and customize your document before processing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="title">Document Title</Label>
                    <Input
                      id="title"
                      value={documentTitle}
                      onChange={(e) => setDocumentTitle(e.target.value)}
                      placeholder="Enter document title..."
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="content">Document Content</Label>
                    <Textarea
                      id="content"
                      value={documentContent}
                      onChange={(e) => setDocumentContent(e.target.value)}
                      placeholder="Document content will be generated automatically..."
                      rows={8}
                      className="mt-1"
                    />
                  </div>

                  {isProcessing && (
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 text-sm">
                          Processing...
                        </span>
                        <span className="text-gray-600 text-sm">
                          {processingProgress}%
                        </span>
                      </div>
                      <Progress value={processingProgress} className="w-full" />
                    </div>
                  )}

                  <div className="flex space-x-3">
                    <Button
                      onClick={processDocument}
                      disabled={isProcessing || !documentTitle.trim()}
                      className="flex-1"
                    >
                      <Save className="mr-2 w-4 h-4" />
                      {isProcessing ? "Processing..." : "Save Document"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCsvData(null);
                        setDocumentTitle("");
                        setDocumentContent("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* CSV Data Preview */}
            {csvData && (
              <Card className="shadow-sm border-0">
                <CardHeader>
                  <CardTitle className="font-semibold text-gray-900 text-lg">
                    Data Preview: {csvData.fileName}
                  </CardTitle>
                  <CardDescription>
                    {csvData.data.length} rows uploaded on{" "}
                    {csvData.uploadedAt.toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg max-h-64 overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          {csvData.headers.map((header, index) => (
                            <th
                              key={index}
                              className="px-3 py-2 font-medium text-gray-900 text-left"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {csvData.data.slice(0, 10).map((row, rowIndex) => (
                          <tr key={rowIndex} className="border-t">
                            {csvData.headers.map((header, colIndex) => (
                              <td
                                key={colIndex}
                                className="px-3 py-2 text-gray-700"
                              >
                                {String(row[header] || "")}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {csvData.data.length > 10 && (
                    <p className="mt-2 text-gray-500 text-sm">
                      Showing first 10 rows of {csvData.data.length} total rows
                    </p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Documents Section */}
          <div>
            <Card className="shadow-sm border-0">
              <CardHeader>
                <CardTitle className="font-semibold text-gray-900 text-xl">
                  Processed Documents
                </CardTitle>
                <CardDescription>
                  Documents created from uploaded Excel files
                </CardDescription>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="py-8 text-center">
                    <FileSpreadsheet className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                    <p className="text-gray-600">No documents processed yet</p>
                    <p className="text-gray-500 text-sm">
                      Upload an Excel file to get started
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {documents.map((document) => (
                      <motion.div
                        key={document.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h3 className="mb-1 font-medium text-gray-900">
                              {document.title}
                            </h3>
                            <p className="mb-2 text-gray-600 text-sm">
                              {document.extractedText}
                            </p>
                            <div className="flex items-center space-x-4 text-gray-500 text-xs">
                              <span>Source: {document.sourceFile}</span>
                              <span>•</span>
                              <span>
                                {document.processedAt.toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2 ml-4">
                            <Badge
                              variant={
                                document.status === "completed"
                                  ? "default"
                                  : document.status === "error"
                                  ? "destructive"
                                  : "secondary"
                              }
                            >
                              {document.status === "completed" && (
                                <CheckCircle className="mr-1 w-3 h-3" />
                              )}
                              {document.status === "error" && (
                                <AlertTriangle className="mr-1 w-3 h-3" />
                              )}
                              {document.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mt-3">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadDocument(document)}
                          >
                            <Download className="mr-1 w-4 h-4" />
                            Download
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => deleteDocument(document.id)}
                          >
                            <Trash2 className="mr-1 w-4 h-4" />
                            Delete
                          </Button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
