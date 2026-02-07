"use client";

import { useState, useEffect } from "react";

interface Video {
  id: number;
  video_id: string;
  url: string;
  title: string;
  author: string;
  description: string;
  thumbnail_url: string;
  transcript: string;
  transcript_length: number;
  ai_summary: {
    training_summary?: string;
    tooling_summary?: string[];
    full_summary?: string;
    key_insights?: string[];
    action_items?: string[];
    tools_mentioned?: string[];
    critical_configuration?: string[];
    setup_checklist?: string[];
    common_pitfalls?: string[];
  };
  processed_at: string;
  metadata: {
    viewCount?: string;
    likeCount?: string;
    publishedAt?: string;
    extractedUrls?: string[];
  };
}

export default function Home() {
  const [urls, setUrls] = useState("");
  const [status, setStatus] = useState<"idle" | "processing" | "success" | "error">("idle");
  const [results, setResults] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  
  // Dashboard state
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [sortBy, setSortBy] = useState("processed_at");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"process" | "dashboard">("process");
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState<"text" | "json">("text");

  const fetchVideos = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/videos?page=${page}&limit=25&sortBy=${sortBy}&sortOrder=${sortOrder}&search=${encodeURIComponent(search)}`
      );
      const data = await response.json();
      if (response.ok) {
        setVideos(data.data);
        setTotalPages(data.totalPages);
        setTotal(data.total);
      }
    } catch (error) {
      console.error("Failed to fetch videos:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (activeTab === "dashboard") {
      fetchVideos();
    }
  }, [page, sortBy, sortOrder, search, activeTab]);

  // Parse URLs for preview
  const parsedUrls = urls
    .split(/[\n,]+/)
    .map((url) => url.trim())
    .filter((url) => url.length > 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("processing");
    setMessage("");
    setResults([]);

    const urlList = parsedUrls;

    if (urlList.length === 0) {
      setStatus("error");
      setMessage("Please enter at least one YouTube URL");
      return;
    }

    try {
      const response = await fetch("/api/wherk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls: urlList }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setResults(data.results);
        setMessage(`Processed ${data.processed} videos successfully!`);
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Failed to process videos. Please try again.");
    }
  };

  const openModal = (title: string, content: string, type: "text" | "json" = "text") => {
    setModalTitle(title);
    setModalContent(content);
    setModalType(type);
    setModalOpen(true);
  };

  const downloadCSV = () => {
    const headers = ["Video ID", "Title", "Author", "Description", "Transcript Length", "Has Summary", "Processed At", "View Count", "Like Count"];
    const rows = videos.map(v => [
      v.video_id,
      v.title,
      v.author,
      v.description?.slice(0, 200) + "...",
      v.transcript_length,
      v.ai_summary?.full_summary ? "Yes" : "No",
      new Date(v.processed_at).toLocaleDateString(),
      v.metadata?.viewCount || "N/A",
      v.metadata?.likeCount || "N/A"
    ]);
    
    const csv = [headers.join(","), ...rows.map(r => r.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wherk-it-videos-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const downloadJSON = () => {
    const blob = new Blob([JSON.stringify(videos, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wherk-it-videos-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return <span className="text-black">↕</span>;
    return <span className="text-purple-600">{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Wherk It
          </h1>
          <p className="text-xl text-purple-200">
            Extract transcripts & AI summaries from YouTube videos
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 rounded-lg p-1 flex">
            <button
              onClick={() => setActiveTab("process")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "process"
                  ? "bg-white text-purple-700"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Process Videos
            </button>
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === "dashboard"
                  ? "bg-white text-purple-700"
                  : "text-white hover:bg-white/10"
              }`}
            >
              Dashboard ({total})
            </button>
          </div>
        </div>

        {activeTab === "process" ? (
          /* Process Tab */
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="urls" className="block text-sm font-medium text-black mb-2">
                  YouTube Video URLs
                </label>
                <p className="text-sm text-black mb-3">
                  Enter URLs separated by commas or line breaks
                </p>
                <textarea
                  id="urls"
                  rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none font-mono text-sm"
                  placeholder="Paste YouTube URLs here...&#10;One per line or comma separated&#10;&#10;https://youtube.com/watch?v=...&#10;https://youtube.com/watch?v=..."
                  value={urls}
                  onChange={(e) => setUrls(e.target.value)}
                  disabled={status === "processing"}
                />
              </div>

              {/* URL Preview */}
              {parsedUrls.length > 0 && (
                <div className="mb-6 bg-gray-100 border border-gray-300 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-bold text-black">
                      Detected URLs ({parsedUrls.length})
                    </h4>
                    <button
                      type="button"
                      onClick={() => setUrls("")}
                      className="text-xs font-bold text-red-700 hover:text-red-900"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {parsedUrls.map((url, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm bg-white p-2 rounded border border-gray-200">
                        <span className="text-black font-bold w-6">{index + 1}.</span>
                        <span className="text-black truncate flex-1 font-mono text-xs">{url}</span>
                        <button
                          type="button"
                          onClick={() => {
                            const newUrls = parsedUrls.filter((_, i) => i !== index);
                            setUrls(newUrls.join("\n"));
                          }}
                          className="text-red-700 hover:text-red-900 font-bold text-xs px-2 py-1 bg-red-100 rounded"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "processing" || !urls.trim()}
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-4 px-8 rounded-lg text-lg hover:from-purple-700 hover:to-indigo-700 transition-all disabled:opacity-50"
              >
                {status === "processing" ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Wherk It"
                )}
              </button>
            </form>

            {message && (
              <div className={`mt-6 p-4 rounded-lg ${status === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
                {message}
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-black mb-4">Results</h3>
                <div className="space-y-3">
                  {results.map((result, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${result.status === "success" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={result.status === "success" ? "text-green-600" : "text-red-600"}>
                          {result.status === "success" ? "✓" : "✗"}
                        </span>
                        <span className="font-medium text-black">{result.videoId}</span>
                      </div>
                      {result.status === "success" && (
                        <div className="text-sm text-black ml-7">
                          <p>Title: {result.data.title}</p>
                          <p>Transcript: {result.data.transcriptLength.toLocaleString()} chars</p>
                          <p>AI Summary: {result.data.hasAISummary ? "✓ Generated" : "✗"}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Dashboard Tab */
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            {/* Search and Download */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div className="flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="flex gap-2">
                <button onClick={downloadCSV} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  Download CSV
                </button>
                <button onClick={downloadJSON} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Download JSON
                </button>
              </div>
            </div>

            {/* Data Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-black cursor-pointer hover:bg-gray-300" onClick={() => handleSort("title")}>
                      Title <SortIcon column="title" />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-black cursor-pointer hover:bg-gray-300" onClick={() => handleSort("author")}>
                      Author <SortIcon column="author" />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-black">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-black cursor-pointer hover:bg-gray-300" onClick={() => handleSort("transcript_length")}>
                      Transcript <SortIcon column="transcript_length" />
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-black">
                      AI Summary
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-black cursor-pointer hover:bg-gray-300" onClick={() => handleSort("processed_at")}>
                      Date <SortIcon column="processed_at" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={6} className="text-center py-8">Loading...</td></tr>
                  ) : videos.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-8 text-black">No videos found</td></tr>
                  ) : (
                    videos.map((video) => (
                      <tr key={video.id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {video.thumbnail_url && (
                              <img src={video.thumbnail_url} alt="" className="w-10 h-10 rounded object-cover" />
                            )}
                            <div>
                              <p className="font-medium text-black max-w-xs truncate">{video.title}</p>
                              <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-xs text-purple-600 hover:underline">
                                View on YouTube
                              </a>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-black">{video.author}</td>
                        <td className="px-4 py-3">
                          {video.description ? (
                            <button
                              onClick={() => openModal(`Description - ${video.title}`, video.description)}
                              className="text-purple-600 hover:underline text-xs"
                            >
                              View ({video.description.length.toLocaleString()} chars)
                            </button>
                          ) : (
                            <span className="text-black">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {video.transcript ? (
                            <button
                              onClick={() => openModal(`Transcript - ${video.title}`, video.transcript)}
                              className="text-purple-600 hover:underline text-xs"
                            >
                              View ({video.transcript_length.toLocaleString()} chars)
                            </button>
                          ) : (
                            <span className="text-black">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {video.ai_summary?.full_summary ? (
                            <div className="space-y-1">
                              <button
                                onClick={() => openModal(`Full Summary - ${video.title}`, video.ai_summary.full_summary || "")}
                                className="text-purple-600 hover:underline text-xs block"
                              >
                                Full Summary
                              </button>
                              <button
                                onClick={() => openModal(`Training Summary - ${video.title}`, video.ai_summary.training_summary || "")}
                                className="text-blue-600 hover:underline text-xs block"
                              >
                                Training
                              </button>
                              <button
                                onClick={() => openModal(`Tooling Summary - ${video.title}`, (video.ai_summary.tooling_summary || []).join("\n"))}
                                className="text-green-600 hover:underline text-xs block"
                              >
                                Tooling
                              </button>
                              {video.ai_summary.critical_configuration && video.ai_summary.critical_configuration.length > 0 && (
                                <button
                                  onClick={() => openModal(`⚠️ Critical Configuration - ${video.title}`, (video.ai_summary.critical_configuration || []).map((item, i) => `${i + 1}. ${item}`).join("\n\n"))}
                                  className="text-red-600 hover:underline text-xs block font-bold"
                                >
                                  ⚠️ Critical Config ({video.ai_summary.critical_configuration.length})
                                </button>
                              )}
                              {video.ai_summary.setup_checklist && video.ai_summary.setup_checklist.length > 0 && (
                                <button
                                  onClick={() => openModal(`✅ Setup Checklist - ${video.title}`, (video.ai_summary.setup_checklist || []).join("\n"))}
                                  className="text-teal-600 hover:underline text-xs block"
                                >
                                  ✅ Checklist ({video.ai_summary.setup_checklist.length})
                                </button>
                              )}
                              {video.ai_summary.common_pitfalls && video.ai_summary.common_pitfalls.length > 0 && (
                                <button
                                  onClick={() => openModal(`🚫 Common Pitfalls - ${video.title}`, (video.ai_summary.common_pitfalls || []).map((item, i) => `${i + 1}. ${item}`).join("\n\n"))}
                                  className="text-orange-600 hover:underline text-xs block"
                                >
                                  🚫 Pitfalls ({video.ai_summary.common_pitfalls.length})
                                </button>
                              )}
                              <button
                                onClick={() => openModal(`AI Summary JSON - ${video.title}`, JSON.stringify(video.ai_summary, null, 2), "json")}
                                className="text-gray-600 hover:underline text-xs block"
                              >
                                View JSON
                              </button>
                            </div>
                          ) : (
                            <span className="text-black">-</span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-black">
                          {new Date(video.processed_at).toLocaleDateString()}
                          <br />
                          <span className="text-xs text-black">
                            {video.metadata?.viewCount ? `${parseInt(video.metadata.viewCount).toLocaleString()} views` : ""}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <p className="text-sm text-black">
                Showing {((page - 1) * 25) + 1} - {Math.min(page * 25, total)} of {total} videos
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2 text-black">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold text-black">{modalTitle}</h3>
              <button onClick={() => setModalOpen(false)} className="text-black hover:text-black text-2xl">
                ×
              </button>
            </div>
            <div className="p-4 overflow-auto flex-1">
              {modalType === "json" ? (
                <pre className="text-xs bg-gray-100 p-4 rounded-lg overflow-auto whitespace-pre-wrap text-black">
                  {modalContent}
                </pre>
              ) : (
                <div className="prose max-w-none whitespace-pre-wrap text-black">
                  {modalContent}
                </div>
              )}
            </div>
            <div className="p-4 border-t flex justify-end gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(modalContent);
                }}
                className="px-4 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-300"
              >
                Copy to Clipboard
              </button>
              <button
                onClick={() => {
                  const blob = new Blob([modalContent], { type: "text/markdown" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `${modalTitle.slice(0, 50).replace(/[^a-z0-9]/gi, "_")}.md`;
                  a.click();
                }}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                Download as .md
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
