import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import TitleHeader from "../components/TitleHeader";

const Contact = () => {
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loading state

    try {
      await emailjs.sendForm(
          import.meta.env.VITE_APP_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_APP_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_APP_EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);

      // Reset form and stop loading
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setSuccess(false);
      setError("Failed to send message. Please try again later.");
      console.error("EmailJS Error:", error); // Optional: show toast
    } finally {
      setLoading(false); // Always stop loading, even on error
    }
  };

  return (
      <section
          id="contact"
          className="flex-center section-padding bg-[#f8fffe] dark:bg-black text-[#2c4a47] dark:text-white"
      >

        <div className="w-full h-full md:px-10 px-5">
          <TitleHeader
              title="Begin Your Wellness Journey With Milagro"
              sub="🌿 Take the first step towards natural healing — we're here to support your path to wellness"
          />

          <div className="grid-12-cols mt-16">
            {/* Form Section */}
            <div className="xl:col-span-5">
              <div className="flex-center card-border border-none rounded-xl p-10 bg-white dark:bg-zinc-900 shadow-md dark:shadow-lg">
                <form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-7"
                >
                  <div>
                    <label htmlFor="name" className="block mb-1 text-sm font-medium text-[#2c4a47] dark:text-white">
                      Your Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Help us personalize your care experience"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-white/10 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block mb-1 text-sm font-medium text-[#2c4a47] dark:text-white">
                      Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Your secure contact for wellness updates"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-white/10 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block mb-1 text-sm font-medium text-[#2c4a47] dark:text-white">
                      Health & Wellness Goals
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your health concerns, wellness goals, or therapeutic interests. Our team will help create a personalized care plan for you."
                        rows="5"
                        required
                        className="w-full p-3 border border-gray-300 dark:border-white/10 rounded-md bg-white dark:bg-zinc-800 text-black dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/50"
                    />
                  </div>

                  <button type="submit" disabled={loading}>
                    <div className="cta-button group">
                      <div className="bg-circle" />
                      <p className="text">
                        {loading ? "Connecting You to Care..." : "Request a Wellness Consultation"}
                      </p>
                      <div className="arrow-wrapper">
                        <img src="/images/arrow-down.svg" alt="arrow" />
                      </div>
                    </div>
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Experience Panel */}
            <div className="xl:col-span-7">
              <div className="bg-[#e8f5f3] dark:bg-[#1a4a44] hover:cursor-grab rounded-3xl overflow-hidden transition-colors duration-300">
                <img
                    src="/images/contact.jpg"
                    alt="Wellness consultation visual"
                    className="w-full object-center object-cover rounded-3xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

  );
};

export default Contact;