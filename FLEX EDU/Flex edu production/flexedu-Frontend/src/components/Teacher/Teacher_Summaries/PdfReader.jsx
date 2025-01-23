const PDFReader = ({ fileUrl }) => {
  return (
    <div className="flex flex-col items-center w-full max-w-4xl mx-auto">
      {fileUrl ? (
        <div className="w-full h-screen max-w-4xl mx-auto p-4">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              fileUrl
            )}&embedded=true`}
            className="w-full h-full border-0 rounded-lg shadow-lg"
            title="PDF Viewer"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
          />
        </div>
      ) : (
        <div className="text-gray-500">No file uploaded</div>
      )}
    </div>
  );
};

export default PDFReader;
