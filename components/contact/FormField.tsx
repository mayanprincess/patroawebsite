import type { InputHTMLAttributes, ReactNode, SelectHTMLAttributes, TextareaHTMLAttributes } from "react";

const labelClassName =
  "text-2xs font-semibold uppercase tracking-widest text-petroa-text/50";

const fieldClassName =
  "w-full border-b border-black/15 bg-transparent py-3 text-sm text-petroa-text outline-none transition-colors placeholder:text-petroa-text/30 focus:border-petroa-primary disabled:cursor-not-allowed disabled:opacity-50";

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
};

export function FormField({ id, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClassName}>
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-xs text-red-600" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  className = "",
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${fieldClassName} ${className}`} {...props} />;
}

export function SelectInput({
  className = "",
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={`${fieldClassName} ${className}`} {...props}>
      {children}
    </select>
  );
}

export function TextArea({
  className = "",
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={`${fieldClassName} min-h-28 resize-y ${className}`}
      {...props}
    />
  );
}

export const submitButtonClassName =
  "inline-flex min-h-11 items-center justify-center border-b-2 border-petroa-primary px-1 pb-1 text-xs font-semibold uppercase tracking-wider text-petroa-primary transition-colors hover:text-petroa-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg disabled:cursor-not-allowed disabled:opacity-50";

export const secondaryButtonClassName =
  "inline-flex min-h-11 items-center justify-center text-xs font-medium uppercase tracking-wider text-petroa-text/50 transition-colors hover:text-petroa-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-petroa-primary focus-visible:ring-offset-2 focus-visible:ring-offset-petroa-bg disabled:cursor-not-allowed disabled:opacity-50";
