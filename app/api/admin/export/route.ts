import { NextRequest } from "next/server";
import { fetchAuthQuery } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import ExcelJS from "exceljs";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  // 1. Authenticate the admin session
  let admin = null;
  try {
    admin = await fetchAuthQuery(
      api.admin.getCurrentAdmin,
      {}
    );
  } catch (e) {
    // Ignore and unauthorized
  }

  if (!admin || !admin.isActive) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const eventId = searchParams.get("eventId");

  // Create workbook
  const workbook = new ExcelJS.Workbook();
  workbook.creator = "E-Cell Woxsen Portal";
  workbook.lastModifiedBy = admin.name;
  workbook.created = new Date();
  workbook.modified = new Date();

  // Theme color tokens matching globals.css
  const primaryNavy = "020817";
  const accentGreen = "4CAF62";

  // Fetch registrations from Convex
  if (eventId) {
    // Export single event registrations
    const regs = await fetchAuthQuery(
      api.admin.getRegistrationsForEvent,
      { eventId }
    );

    const event = await fetchAuthQuery(
      api.events.getBySlug,
      { slug: eventId }
    );

    const sheetName = eventId.substring(0, 30); // Excel sheet name limit is 31 chars
    const worksheet = workbook.addWorksheet(sheetName);

    // Title Row
    worksheet.mergeCells("A1:G1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = `${event?.title || eventId} - Student Roster`;
    titleCell.font = { name: "Arial", size: 16, bold: true, color: { argb: "FFFFFF" } };
    titleCell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: primaryNavy },
    };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };
    worksheet.getRow(1).height = 40;

    // Headers Row
    const headersRow = ["Student Name", "Email", "Phone", "School/College", "Course", "Year", "Registered At"];
    worksheet.addRow([]); // Blank spacer
    const headerRowNode = worksheet.addRow(headersRow);
    headerRowNode.height = 25;
    
    headerRowNode.eachCell((cell) => {
      cell.font = { name: "Arial", size: 11, bold: true, color: { argb: "FFFFFF" } };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: accentGreen },
      };
      cell.alignment = { vertical: "middle" };
    });

    // Data rows
    regs.forEach((r) => {
      worksheet.addRow([
        r.name,
        r.email,
        r.phone,
        r.school || "",
        r.course || "",
        r.year || "",
        new Date(r.registeredAt).toLocaleDateString(),
      ]);
    });

    // Auto-fit column widths
    worksheet.columns.forEach((column) => {
      let maxLen = 0;
      column.eachCell?.({ includeEmpty: true }, (cell) => {
        const valStr = cell.value ? cell.value.toString() : "";
        if (valStr.length > maxLen) {
          maxLen = valStr.length;
        }
      });
      column.width = Math.max(maxLen + 3, 12);
    });

  } else {
    // Export ALL registrations (sheet per event)
    const events = await fetchAuthQuery(
      api.events.list,
      {}
    );

    const regs = await fetchAuthQuery(
      api.admin.getAllRegistrations,
      {}
    );

    if (events.length === 0) {
      const ws = workbook.addWorksheet("Empty");
      ws.addRow(["No events found"]);
    }

    events.forEach((ev) => {
      const eventRegs = regs.filter((r) => r.eventId === ev.slug);
      const sheetName = ev.slug.substring(0, 30);
      const worksheet = workbook.addWorksheet(sheetName);

      // Title
      worksheet.mergeCells("A1:G1");
      const titleCell = worksheet.getCell("A1");
      titleCell.value = `${ev.title} - Master Student Roster`;
      titleCell.font = { name: "Arial", size: 14, bold: true, color: { argb: "FFFFFF" } };
      titleCell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: primaryNavy },
      };
      titleCell.alignment = { horizontal: "center", vertical: "middle" };
      worksheet.getRow(1).height = 35;

      // Headers Row
      const headersRow = ["Student Name", "Email", "Phone", "School/College", "Course", "Year", "Registered At"];
      worksheet.addRow([]); // Spacer
      const headerRowNode = worksheet.addRow(headersRow);
      headerRowNode.height = 22;
      
      headerRowNode.eachCell((cell) => {
        cell.font = { name: "Arial", size: 10, bold: true, color: { argb: "FFFFFF" } };
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: accentGreen },
        };
        cell.alignment = { vertical: "middle" };
      });

      // Data rows
      eventRegs.forEach((r) => {
        worksheet.addRow([
          r.name,
          r.email,
          r.phone,
          r.school || "",
          r.course || "",
          r.year || "",
          new Date(r.registeredAt).toLocaleDateString(),
        ]);
      });

      // Auto-fit column widths
      worksheet.columns.forEach((column) => {
        let maxLen = 0;
        column.eachCell?.({ includeEmpty: true }, (cell) => {
          const valStr = cell.value ? cell.value.toString() : "";
          if (valStr.length > maxLen) {
            maxLen = valStr.length;
          }
        });
        column.width = Math.max(maxLen + 3, 12);
      });
    });
  }

  // Write to buffer
  const buffer = await workbook.xlsx.writeBuffer();

  const filename = eventId ? `ecell_registrations_${eventId}.xlsx` : "ecell_registrations_master.xlsx";

  return new Response(buffer as any, {
    headers: {
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
