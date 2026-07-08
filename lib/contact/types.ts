export type ContactFormType = "quote" | "team";

export type QuoteFormData = {
  type: "quote";
  name: string;
  email: string;
  phone?: string;
  company: string;
  service: string;
  message: string;
};

export type TeamFormData = {
  type: "team";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  preferredContact: "email" | "phone";
  message: string;
};

export type ContactFormData = QuoteFormData | TeamFormData;
