"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";

export default function NewTemplatePage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const isAdmin = session?.user?.role === "ADMIN";

  if (!isAdmin) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted">You do not have permission to create templates.</p>
      </Card>
    );
  }

  const handleCreate = () => {
    if (!name.trim()) {
      toast.error("Template name is required");
      return;
    }
    toast.success("Template created!");
    router.push("/dashboard/templates");
  };

  return (
    <div className="space-y-6 animate-metal-slide max-w-xl">
      <div>
        <h2 className="text-2xl font-bold text-foreground">New Template</h2>
        <p className="text-muted mt-1">Create a photobooth frame template</p>
      </div>
      <Card>
        <CardContent className="space-y-4 pt-6">
          <Input
            label="Template Name"
            id="template-name"
            placeholder="e.g. Elegant Gold Frame"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => router.back()}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleCreate}>
              Create & Open Editor
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
