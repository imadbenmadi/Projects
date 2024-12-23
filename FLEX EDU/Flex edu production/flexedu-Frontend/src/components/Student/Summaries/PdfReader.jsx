import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import Swal from "sweetalert2";

// Use cdn for pdf.worker.js
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PDFReader = ({ fileLink }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [error, setError] = useState(null);

    // Disable right-click and keyboard shortcuts
    useEffect(() => {
        const handleContextMenu = (e) => {
            e.preventDefault();
            Swal.fire(
                "Security Alert",
                "Right-click disabled for security reasons!",
                "warning"
            );
        };

        const handleKeyDown = (e) => {
            if (e.ctrlKey && (e.key === "s" || e.key === "p")) {
                e.preventDefault();
                Swal.fire(
                    "Security Alert",
                    "Save/Print is disabled!",
                    "warning"
                );
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1); // Reset to page 1 when a new document is loaded
    }

    function onDocumentLoadError(error) {
        setError("Failed to load PDF document.");
    }

    return (
        <div className="pdf-viewer">
            {error ? (
                <div className="text-red-600">{error}</div>
            ) : (
                <Document
                    file={fileLink}
                    onLoadSuccess={onDocumentLoadSuccess}
                    onLoadError={onDocumentLoadError}
                    className="pdf-document"
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            )}
            {numPages && (
                <div className="pdf-controls">
                    <button
                        disabled={pageNumber <= 1}
                        onClick={() => setPageNumber(pageNumber - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {pageNumber} of {numPages}
                    </span>
                    <button
                        disabled={pageNumber >= numPages}
                        onClick={() => setPageNumber(pageNumber + 1)}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default PDFReader;
