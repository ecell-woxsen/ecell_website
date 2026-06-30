import { NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { Resend } from "resend";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, ideaTitle, domain, stage, description, teamSize, website } = body;

    const id = await convex.mutation(api.ideas.submitIdea, {
      name,
      email,
      phone,
      ideaTitle,
      domain,
      stage,
      description,
      teamSize,
      website,
    });

    // Send email using Resend
    if (resend) {
      try {
        await resend.emails.send({
          from: "E-Cell Woxsen <onboarding@resend.dev>",
          to: "ecell@woxsen.edu.in",
          subject: `New Idea Submission: ${ideaTitle} by ${name}`,
          html: `
            <h2>New Idea Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <hr />
            <p><strong>Idea Name:</strong> ${ideaTitle}</p>
            <p><strong>Domain:</strong> ${domain}</p>
            <p><strong>Stage:</strong> ${stage}</p>
            ${teamSize ? `<p><strong>Team Size:</strong> ${teamSize}</p>` : ""}
            ${website ? `<p><strong>Website:</strong> <a href="${website}">${website}</a></p>` : ""}
            <p><strong>Description:</strong></p>
            <p>${description}</p>
          `,
          replyTo: email,
        });
      } catch (error) {
        console.error("Failed to send email via Resend:", error);
      }
    } else {
      console.warn("RESEND_API_KEY not found. Skipping email notification.");
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error("Failed to submit idea:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
