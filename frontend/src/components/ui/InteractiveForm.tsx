"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";

interface FormFieldProps {
  label: string;
  type?: "text" | "email" | "tel" | "url" | "select" | "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  options?: string[];
  rows?: number;
}

function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  options,
  rows,
}: FormFieldProps) {
  if (type === "select" && options) {
    return (
      <div>
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "_")}>
          {label} {required && "*"}
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem
                key={option}
                value={option.toLowerCase().replace(/\s+/g, "_")}
              >
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div>
        <Label htmlFor={label.toLowerCase().replace(/\s+/g, "_")}>
          {label} {required && "*"}
        </Label>
        <Textarea
          id={label.toLowerCase().replace(/\s+/g, "_")}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows || 3}
        />
      </div>
    );
  }

  return (
    <div>
      <Label htmlFor={label.toLowerCase().replace(/\s+/g, "_")}>
        {label} {required && "*"}
      </Label>
      <Input
        id={label.toLowerCase().replace(/\s+/g, "_")}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}

interface InteractiveFormProps {
  fields: Array<{
    name: string;
    label: string;
    type?: "text" | "email" | "tel" | "url" | "select" | "textarea";
    placeholder?: string;
    required?: boolean;
    options?: string[];
    rows?: number;
  }>;
  onSubmit: (data: Record<string, string>) => void;
  submitLabel?: string;
  initialData?: Record<string, string>;
}

export default function InteractiveForm({
  fields,
  onSubmit,
  submitLabel = "Save Changes",
  initialData = {},
}: InteractiveFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>(
    fields.reduce(
      (acc, field) => ({
        ...acc,
        [field.name]: initialData[field.name] || "",
      }),
      {}
    )
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleFieldChange = (fieldName: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit(formData);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          type={field.type}
          value={formData[field.name] || ""}
          onChange={(value) => handleFieldChange(field.name, value)}
          placeholder={field.placeholder}
          required={field.required}
          options={field.options}
          rows={field.rows}
        />
      ))}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? (
          "Saving..."
        ) : isSaved ? (
          "Saved!"
        ) : (
          <>
            <Save className="mr-2 w-4 h-4" />
            {submitLabel}
          </>
        )}
      </Button>
    </form>
  );
}
