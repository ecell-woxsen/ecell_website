"use client";

import { useState, useEffect, useRef } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface TeamMemberFormDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  memberToEdit?: any;
}

export default function TeamMemberFormDrawer({ isOpen, onClose, memberToEdit }: TeamMemberFormDrawerProps) {
  const createMember = useMutation(api.team.create);
  const updateMember = useMutation(api.team.update);
  const generateUploadUrl = useMutation(api.admin.generateUploadUrl);

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [department, setDepartment] = useState("");
  const [initials, setInitials] = useState("");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isLeadership, setIsLeadership] = useState(false);
  const [isActive, setIsActive] = useState(true);
  
  // Image can be a standard URL link or a Convex storage ID
  const [image, setImage] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");
  const [isDirty, setIsDirty] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (memberToEdit) {
      setName(memberToEdit.name || "");
      setRole(memberToEdit.role || "");
      setDepartment(memberToEdit.department || "");
      setInitials(memberToEdit.initials || "");
      setBio(memberToEdit.bio || "");
      setLinkedin(memberToEdit.linkedin || "");
      setInstagram(memberToEdit.instagram || "");
      setIsLeadership(!!memberToEdit.isLeadership);
      setIsActive(memberToEdit.isActive !== false);
      setImage(memberToEdit.image || "");
      setIsDirty(false);
    } else {
      setName("");
      setRole("");
      setDepartment("");
      setInitials("");
      setBio("");
      setLinkedin("");
      setInstagram("");
      setIsLeadership(false);
      setIsActive(true);
      setImage("");
      setIsDirty(false);
    }
    setError("");
  }, [memberToEdit, isOpen]);

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

  // Generate initials automatically from name
  const handleNameChange = (val: string) => {
    setName(val);
    setIsDirty(true);
    if (!memberToEdit) {
      const initialsVal = val
        .split(" ")
        .map((part) => part[0])
        .join("")
        .toUpperCase()
        .substring(0, 3);
      setInitials(initialsVal);
    }
  };

  // Handle Convex image file upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setError("");

      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) {
        throw new Error("Failed to upload image file");
      }

      const { storageId } = await result.json();
      
      setImage(storageId);
      setIsDirty(true);
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !role || !department) {
      setError("Please fill in Name, Role, and Department.");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      const payload = {
        name,
        role,
        department,
        initials: initials || "EC",
        isLeadership,
        isActive,
        bio: bio || undefined,
        linkedin: linkedin || undefined,
        instagram: instagram || undefined,
        image: image || undefined,
      };

      if (memberToEdit) {
        await updateMember({
          id: memberToEdit.id || memberToEdit._id, // map custom / database ID
          ...payload,
        });
      } else {
        await createMember(payload);
      }

      setIsDirty(false);
      onClose();
    } catch (err: any) {
      setError(err.message || "An error occurred while saving the profile.");
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
              {memberToEdit ? "Edit Team Member" : "Create Team Member"}
            </h3>
            <p className="text-[10px] font-mono tracking-widest text-white/45 uppercase">
              {memberToEdit ? "Modify member details" : "Add new builder to crew"}
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

          {/* Name */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. Ramuni Shivaa Kiran"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Role */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Role (Title)
              </label>
              <input
                type="text"
                required
                value={role}
                onChange={(e) => handleFieldChange(setRole, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="e.g. Vice President"
              />
            </div>

            {/* Initials */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Initials (Display Icon)
              </label>
              <input
                type="text"
                required
                maxLength={3}
                value={initials}
                onChange={(e) => handleFieldChange(setInitials, e.target.value.toUpperCase())}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] font-mono focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="e.g. RSK"
              />
            </div>
          </div>

          {/* Department */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Department & Graduation
            </label>
            <input
              type="text"
              required
              value={department}
              onChange={(e) => handleFieldChange(setDepartment, e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[14px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
              placeholder="e.g. BBA · Class of 2028"
            />
          </div>

          {/* Bio */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Bio
            </label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => handleFieldChange(setBio, e.target.value)}
              className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13.5px] leading-relaxed focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors resize-none"
              placeholder="Short bio about their responsibilities and achievements..."
            />
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-4">
            {/* LinkedIn */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                LinkedIn URL
              </label>
              <input
                type="text"
                value={linkedin}
                onChange={(e) => handleFieldChange(setLinkedin, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13.5px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
                Instagram URL
              </label>
              <input
                type="text"
                value={instagram}
                onChange={(e) => handleFieldChange(setInstagram, e.target.value)}
                className="w-full px-4 py-2.5 bg-[#020817] border border-white/[0.08] rounded-xl text-white text-[13.5px] focus:outline-none focus:border-[var(--green-lt)]/40 transition-colors"
                placeholder="https://instagram.com/..."
              />
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-[11px] font-mono tracking-wider text-white/40 uppercase mb-2">
              Avatar Image
            </label>
            <div className="space-y-3">
              <input
                type="text"
                value={image}
                onChange={(e) => handleFieldChange(setImage, e.target.value)}
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
                  {isUploading ? "Uploading file..." : "Upload Profile Photo"}
                </button>
              </div>
            </div>
          </div>

          {/* Status Options */}
          <div className="pt-2 flex items-center justify-between gap-6 bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isLeadership"
                checked={isLeadership}
                onChange={(e) => handleFieldChange(setIsLeadership, e.target.checked)}
                className="w-4.5 h-4.5 rounded border-white/[0.08] bg-[#020817] text-[var(--green)] focus:ring-[var(--green)]"
              />
              <label htmlFor="isLeadership" className="text-[13px] text-white/80 cursor-pointer select-none">
                Leadership Team (Top grid section)
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={isActive}
                onChange={(e) => handleFieldChange(setIsActive, e.target.checked)}
                className="w-4.5 h-4.5 rounded border-white/[0.08] bg-[#020817] text-[var(--green)] focus:ring-[var(--green)]"
              />
              <label htmlFor="isActive" className="text-[13px] text-white/80 cursor-pointer select-none">
                Active Member (Shows on site)
              </label>
            </div>
          </div>
        </form>

        {/* Footer Actions */}
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
            {isSaving ? "Saving changes..." : "Save Member"}
          </button>
        </div>
      </div>
    </div>
  );
}
