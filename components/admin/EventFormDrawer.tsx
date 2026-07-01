"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface EventFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  eventToEdit?: any;
}

export default function EventFormDrawer({ isOpen, onClose, eventToEdit }: EventFormDrawerProps) {
  const createEvent = useMutation(api.events.create);
  const updateEvent = useMutation(api.events.update);
  const generateUploadUrl = useMutation(api.admin.generateUploadUrl);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("TBA");
  const [meta, setMeta] = useState("");
  const [tag, setTag] = useState("");
  const [tagType, setTagType] = useState<"upcoming" | "workshop" | "competition" | "talk">("upcoming");
  const [featured, setFeatured] = useState(false);
  const [registrationOpen, setRegistrationOpen] = useState(true);
  
  // Image URL can be a standard HTTP link or a Convex storage ID
  const [imageUrl, setImageUrl] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (eventToEdit) {
      setTitle(eventToEdit.title || "");
      setSlug(eventToEdit.slug || "");
      setDescription(eventToEdit.description || "");
      setDate(eventToEdit.date || "");
      setMeta(eventToEdit.meta || "");
      setTag(eventToEdit.tag || "");
      setTagType(eventToEdit.tagType || "upcoming");
      setFeatured(!!eventToEdit.featured);
      setRegistrationOpen(eventToEdit.registrationOpen !== false);
      setImageUrl(eventToEdit.imageUrl || "");
      setIsDirty(false);
    } else {
      setTitle("");
      setSlug("");
      setDescription("");
      setDate("TBA");
      setMeta("");
      setTag("");
      setTagType("upcoming");
      setFeatured(false);
      setRegistrationOpen(true);
      setImageUrl("");
      setIsDirty(false);
    }
    setError("");
  }, [eventToEdit, isOpen]);

  // Handle escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleCloseAttempt();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isDirty]);

  const handleCloseAttempt = () => {
    if (isDirty) {
      if (confirm("You have unsaved changes. Are you sure you want to discard them?")) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const handleFieldChange = (setter: any, value: any) => {
    setter(value);
    setIsDirty(true);
  };

  // Generate slug automatically from title when in create mode
  const handleTitleChange = (val: string) => {
    setTitle(val);
    setIsDirty(true);
    if (!eventToEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generatedSlug);
    }
  };

  // Handle Convex image file upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");

      // 1. Get Convex upload URL
      const uploadUrl = await generateUploadUrl();

      // 2. POST the file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image file to storage");
      }

      const { storageId } = await result.json();
      
      // 3. Save storageId as imageUrl
      setImageUrl(storageId);
      setIsDirty(true);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug || !description) {
      setError("Please fill in Title, Slug, and Description.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const payload = {
        title,
        slug,
        description,
        date,
        meta,
        tag,
        tagType,
        featured,
        registrationOpen,
        imageUrl: imageUrl || undefined,
      };

      if (eventToEdit) {
        await updateEvent({
          id: eventToEdit._id,
          ...payload,
        });
      } else {
        await createEvent(payload);
      }

      setIsDirty(false);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the event.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={handleCloseAttempt}
        className="absolute inset-0 bg-[#020817]/70 backdrop-blur-sm transition-opacity duration-300"
      />

      {/* Drawer Body */}
      <div className="relative w-full max-w-[540px] h-full bg-[#080d1c] border-l border-white/[0.08] shadow-2xl flex flex-col z-10 animate-[fadeIn_0.3s_ease]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/[0.06] flex items-center justify-between">
          <div>
            <h3 className="font-['Bebas_Neue',sans-serif] text-[28px] tracking-wide text-white">
              {eventToEdit ? "Edit Event" : "Create Event"}
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-white/45 uppercase">
              {eventToEdit ? "Modify live content" : "Add new program to grid"}
            </p>
          </div>
          <button 
            onClick={handleCloseAttempt}
            className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-white/50 hover:text-white hover:border-[var(--green-lt)]/35 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 text-[13px] rounded-xl text-center">
              {error}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Event Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. Failures to Fixes"
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              URL Slug (Unique ID)
            </label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => handleFieldChange(setSlug, e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] font-mono focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. failures-to-fixes"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Description
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => handleFieldChange(setDescription, e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13.5px] leading-relaxed focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors resize-none"
              placeholder="Provide a compelling description of the event..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Date (Display String)
              </label>
              <input
                type="text"
                required
                value={date}
                onChange={(e) => handleFieldChange(setDate, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="e.g. TBA or Ongoing"
              />
            </div>

            {/* Meta */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Location/Meta Tag
              </label>
              <input
                type="text"
                required
                value={meta}
                onChange={(e) => handleFieldChange(setMeta, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="e.g. Campus Series / Oval"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Tag (Category label) */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Category Label (Display)
              </label>
              <input
                type="text"
                required
                value={tag}
                onChange={(e) => handleFieldChange(setTag, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="e.g. Talk Series / Workshop"
              />
            </div>

            {/* TagType (Style key) */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Category Type (Style)
              </label>
              <select
                value={tagType}
                onChange={(e) => handleFieldChange(setTagType, e.target.value as any)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              >
                <option value="upcoming">Upcoming (Green)</option>
                <option value="workshop">Workshop (Blue)</option>
                <option value="competition">Competition (Orange)</option>
                <option value="talk">Talk/Content (Purple)</option>
              </select>
            </div>
          </div>

          {/* Image flyer */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Event Image Flyer
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => handleFieldChange(setImageUrl, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13px] font-mono focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="Paste URL or upload image file below"
              />
              
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[var(--green-lt)]/30 text-white text-[11px] font-mono tracking-wider uppercase rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploading ? "Uploading file..." : "Upload Image Flyer"}
                </button>
                {imageUrl && !imageUrl.startsWith("http") && (
                  <span className="text-[10px] font-mono text-white/40">
                    Convex Storage ID: {imageUrl.substring(0, 12)}...
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Toggle buttons (Featured & RegOpen) */}
          <div className="pt-2 flex items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="featured"
                checked={featured}
                onChange={(e) => handleFieldChange(setFeatured, e.target.checked)}
                className="w-4.5 h-4.5 rounded border-white/[0.08] bg-[#020817] text-[var(--green)] focus:ring-[var(--green)]"
              />
              <label htmlFor="featured" className="text-[13px] text-white/80 cursor-pointer select-none">
                Featured Event (Double columns width)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="registrationOpen"
                checked={registrationOpen}
                onChange={(e) => handleFieldChange(setRegistrationOpen, e.target.checked)}
                className="w-4.5 h-4.5 rounded border-white/[0.08] bg-[#020817] text-[var(--green)] focus:ring-[var(--green)]"
              />
              <label htmlFor="registrationOpen" className="text-[13px] text-white/80 cursor-pointer select-none">
                Registration Open
              </label>
            </div>
          </div>
        </form>

        {/* Footer actions */}
        <div className="px-6 py-4.5 border-t border-white/[0.06] flex items-center justify-end gap-3.5">
          <button
            type="button"
            onClick={handleCloseAttempt}
            disabled={isSaving}
            className="px-5 py-2.5 bg-transparent border border-white/[0.08] hover:border-white/20 text-white/70 hover:text-white text-[11px] font-mono tracking-wider uppercase rounded-xl transition-all cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving || isUploading}
            className="px-5 py-2.5 bg-[var(--green)] hover:bg-[var(--green-mid)] text-white text-[11px] font-mono tracking-wider uppercase rounded-xl transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-[0_0_15px_rgba(76,175,98,0.15)]"
          >
            {isSaving ? "Saving changes..." : "Save Event"}
          </button>
        </div>
      </div>
    </div>
  );
}
