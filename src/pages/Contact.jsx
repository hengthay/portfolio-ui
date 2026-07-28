import axios from "axios";
import { useState } from "react";
import { PiTelegramLogoThin } from "react-icons/pi";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = import.meta.env.VITE_TELEGRAM_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHATID;
      const text =
      `📩 *New Contact Message*\n` +
      `👤 *Name:* ${form.name}\n` +
      `📧 *Email:* ${form.email}\n` +
      `📝 *Message:*${form.message}`;

      await axios
        .post(
          `https://api.telegram.org/bot${token}/sendMessage`,
          {
            chat_id: chatId,
            text,
            parse_mode: "Markdown",
          }
        )
        .then((res) => {
          if (res.status === 200) {
            Swal.fire({
              title: "Successfully!",
              text: "Message has been sent!",
              icon: "success",
              draggable: true,
              timer: 1500
            });
          }
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "⚠️ Error sending message!",
            icon: "error",
            draggable: true,
            timer: 1500
          });
        });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }

    // reset (you had subject but no subject field)
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
      className="md:p-20 p-6 w-full mx-auto flex flex-col max-w-5xl"
    >
      <div className="md:p-0 p-4"> 
        {/* Header */}
        <motion.div variants={fadeUp} transition={{ duration: 0.5, ease: "easeOut" }} className="mb-10 md:mt-15 mt-10">
          <h1 className="text-3xl md:text-4xl font-semibold">Contact</h1>
          <p className="text-gray-400 mt-2">Send me a message or find me on the map.</p>
        </motion.div>

        {/* Map */}
        <motion.div
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          whileHover={{ scale: 1.01 }}
          className="w-full max-w-5xl mx-auto my-10"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 space-y-6">
            <div className="text-lg font-semibold">
              <h2>My Location</h2>
            </div>
            <div className="w-full h-100">
              <iframe
                title="Location Map"
                referrerPolicy="no-referrer-when-downgrade"
                loading="lazy"
                className="w-full h-full"
                src="https://www.google.com/maps?q=11.5296225,104.9247845&z=18&output=embed"
              ></iframe>
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} transition={{ duration: 0.55, ease: "easeOut" }} className="w-full">
          <h2 className="text-lg font-semibold mb-4">Send a Message</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <label className="text-sm text-gray-300">Name</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:border-cyan-500"
                  placeholder="Your name"
                  type="text"
                />
              </motion.div>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.45, ease: "easeOut" }}
              >
                <label className="text-sm text-gray-300">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:border-cyan-500"
                  placeholder="your-username@gmail.com"
                  type="email"
                />
              </motion.div>
            </div>

            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: "easeOut" }}>
              <label className="text-sm text-gray-300">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1 w-full rounded-xl bg-black/20 border border-white/10 px-4 py-3 outline-none focus:border-cyan-500 resize-none"
                placeholder="Write your message..."
              />
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: "easeOut" }} className="flex justify-end">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="flex gap-x-2 cursor-pointer px-6 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold py-3 transition"
              >
                <PiTelegramLogoThin size={28} />
                {isLoading ? <p>Sending<span className="animate-pulse">...</span></p> : "Send Message"}
              </motion.button>
            </motion.div>

            {/* Contact info */}
            <motion.div variants={fadeUp} transition={{ duration: 0.45, ease: "easeOut" }} className="pt-4 space-y-1">
              <p className="text-gray-400 text-sm">📍 Phnom Penh, Cambodia</p>
              <p className="text-gray-400 text-sm">✉️ laovkimhengthay@gmail.com</p>
              <p className="text-gray-400 text-sm">📞 +855 10 567 684</p>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Contact;
