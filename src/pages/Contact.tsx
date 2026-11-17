import { useEffect, useRef } from "react";
import { useContactModal } from "@/hooks/use-contact-modal";

// /contact opens the existing contact form. The static home page and the
// Manifesto link here because they cannot open the React modal themselves.
const ContactPage = () => {
  const { isOpen, open } = useContactModal();
  const wasOpen = useRef(false);

  useEffect(() => {
    document.title = "Contact PeopleBrowsr";
    open();
  }, [open]);

  useEffect(() => {
    if (isOpen) wasOpen.current = true;
    else if (wasOpen.current) window.location.assign("/");
  }, [isOpen]);

  return (
    <main className="min-h-screen bg-[#0a0f1c] text-[#eef2f8] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold mb-3">Contact PeopleBrowsr</h1>
        <p className="text-[#c3cddd] mb-6">
          Send the team a message, or email contact@peoplebrowsr.com.
        </p>
        <button
          type="button"
          onClick={open}
          className="rounded-full bg-[#4fd1c5] text-[#06231f] font-semibold px-6 py-2.5"
        >
          Open the contact form
        </button>
      </div>
    </main>
  );
};

export default ContactPage;
