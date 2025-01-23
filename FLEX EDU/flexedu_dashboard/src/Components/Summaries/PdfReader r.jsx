import React, { useRef } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

// Create an instance of the default layout plugin with custom toolbar and hidden attachments
const PDFReader = ({ fileUrl }) => {
    const viewerRef = useRef(null); // Ref for the PDF viewer container

    // Customize the default layout plugin to hide the attachment tab
    const defaultLayoutPluginInstance = defaultLayoutPlugin({
        sidebarTabs: (defaultTabs) =>
            defaultTabs.filter((tab) => tab.key !== "attachment"), // Remove the attachment tab
        renderToolbar: (toolbarSlot) => (
            <div style={{ display: "flex" }}>
                {toolbarSlot.searchPopover}
                {toolbarSlot.previousPageButton}
                {toolbarSlot.currentPageInput}
                {toolbarSlot.nextPageButton}
                {toolbarSlot.zoomOutButton}
                {toolbarSlot.zoomPopover}
                {toolbarSlot.zoomInButton}
                {toolbarSlot.downloadButton}
            </div>
        ),
    });

    // Function to toggle full screen
    const toggleFullScreen = () => {
        if (viewerRef.current) {
            if (!document.fullscreenElement) {
                viewerRef.current.requestFullscreen().catch((err) => {
                    // eslint-disable-next-line no-console
                });
            } else {
                document.exitFullscreen();
            }
        }
    };

    return (
        <div>
            <div className="w-full flex justify-center">
                <button
                    onClick={toggleFullScreen}
                    style={{ marginBottom: "10px" }}
                    className="py-2 my-3 px-1 bg-gray-300 w-fit rounded font-semibold text-gray-800 hover:bg-gray-400 hover:text-gray-900"
                >
                    Full Screen
                </button>
            </div>
            <div ref={viewerRef} style={{ height: "750px" }}>
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[defaultLayoutPluginInstance]}
                    />
                </Worker>
            </div>
        </div>
    );
};

export default PDFReader;
