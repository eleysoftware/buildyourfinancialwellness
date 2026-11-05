import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { downloadFilename, fetchPublishedTools, type FinancialTool } from "@/lib/financial-tools";

function startDownload(tool: FinancialTool) {
  if (!tool.pdf_url) return;
  const link = document.createElement("a");
  link.href = tool.pdf_url;
  link.download = downloadFilename(tool);
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function ToolList() {
  const [pending, setPending] = useState<FinancialTool | null>(null);
  const { data: tools = [], isLoading } = useQuery({
    queryKey: ["financial-tools", "published"],
    queryFn: fetchPublishedTools,
  });

  if (isLoading) {
    return <p className="mt-10 text-lg text-navy-blue-sat50">Loading tools…</p>;
  }

  if (tools.length === 0) {
    return <p className="mt-10 text-lg text-navy-blue-sat50">Tools will be added here.</p>;
  }

  return (
    <>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {tools.map((tool) => (
          <article
            key={tool.id}
            className="flex h-full flex-col rounded bg-white p-6 shadow-[0px_15px_35px_0px_rgb(0_0_0_/_0.1)]"
          >
            <h2 className="text-[22px] font-semibold leading-snug text-navy-blue">{tool.title}</h2>
            <p className="mt-3 text-sm text-[#697694]">PDF download</p>
            <button
              type="button"
              onClick={() => setPending(tool)}
              className="mt-8 inline-flex h-14 items-center justify-center self-start rounded-[80px] bg-navy-blue px-6 text-base font-bold text-white no-underline shadow-[0px_4px_3px_0px_rgb(0_0_0_/_0.35)] transition hover:bg-[#57ae83] focus-visible:bg-[#57ae83] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#57ae83]"
            >
              Download
            </button>
          </article>
        ))}
      </div>

      <AlertDialog open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent className="bg-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-navy-blue">Download {pending?.title}?</AlertDialogTitle>
            <AlertDialogDescription className="text-navy-blue-sat50">
              Save to your device. Then open in Adobe Acrobat. (The free version works)
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="rounded-[80px] border-2 border-navy-blue text-navy-blue">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="rounded-[80px] bg-navy-blue text-white hover:bg-[#57ae83]"
              onClick={() => {
                if (pending) startDownload(pending);
              }}
            >
              Download
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
