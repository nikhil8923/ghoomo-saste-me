import React, { useState } from "react";
import { X, User, Phone, Mail, Calendar, Users, ShieldCheck, Send } from "lucide-react";

const BookingModal = ({ isOpen, onClose, tripTitle }) => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    travelDate: "",
    travelers: "1",
    sharing: "double"
  });

  if (!isOpen) return null;

  // ✅ Updated handleChange with restrictions
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name") {
      value = value.replace(/[^A-Za-z ]/g, "");
    }

    if (name === "phone") {
      value = value.replace(/[^0-9]/g, "").slice(0, 10);
    }

    setFormData({ ...formData, [name]: value });
  };

  // ✅ Email validation
  const isValidEmail = (email) => {
    return /^\S+@\S+\.\S+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // ✅ Validation before submit
    if (formData.name.trim().length < 3) {
      alert("Please enter a valid name");
      return;
    }

    if (formData.phone.length !== 10) {
      alert("Please enter a valid 10 digit WhatsApp number");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }

    if (!formData.travelDate) {
      alert("Please select travel date");
      return;
    }

    setIsSubmitting(true);

    try {

      let budgetMap = {
        double: 7000,
        triple: 6000,
        quad: 5000
      };

      let budget = budgetMap[formData.sharing] || 5000;

      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        destination: tripTitle,
        date: formData.travelDate,
        travelers: formData.travelers,
        sharing: formData.sharing,
        budget: budget
      };

      console.log("📤 Sending data:", payload);

      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);

      const response = await fetch("https://api.ghoomosasteme.com/api/send-lead",  {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeout);

      const data = await response.json();
      console.log("✅ Response:", data);

      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);

    } catch (err) {
      console.error("❌ Booking Error:", err);
      alert("Something went wrong. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (

    <div className="fixed inset-0 z-[999999] flex items-center justify-center p-4">

      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">

        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-black"
        >
          <X size={24} />
        </button>

        <div className="overflow-y-auto p-6 md:p-10">

          {!isSuccess ? (

            <form onSubmit={handleSubmit}>

              <div className="mb-6">
                <p className="text-xs font-bold uppercase text-blue-600 mb-1">
                  Confirm Your Slot
                </p>

                <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 uppercase">
                  {tripTitle}
                </h2>
              </div>

              <div className="space-y-4">

                {/* NAME */}
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                  />
                </div>

                {/* PHONE */}
                <div className="relative">
                  <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="WhatsApp Number"
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                  />
                </div>

                {/* EMAIL */}
                <div className="relative">
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                  />
                </div>

                {/* DATE */}
                <div className="relative">
                  <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    required
                    type="date"
                    name="travelDate"
                    value={formData.travelDate}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                  />
                </div>

                {/* TRAVELERS */}
                <div className="relative">
                  <Users size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <select
                    name="travelers"
                    value={formData.travelers}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-600"
                  >
                    <option value="1">1 Traveler</option>
                    <option value="2">2 Travelers</option>
                    <option value="3">3 Travelers</option>
                    <option value="4">4 Travelers</option>
                    <option value="5">5 Travelers</option>
                    <option value="6">6 Travelers</option>
                    <option value="7+">7+ Travelers</option>
                  </select>
                </div>

                {/* SHARING */}
                <div className="relative">
                  <select
                    name="sharing"
                    value={formData.sharing}
                    onChange={handleChange}
                    className="w-full border rounded-xl py-3 px-4 outline-none focus:border-blue-600"
                  >
                    <option value="double">Double Sharing (₹7000)</option>
                    <option value="triple">Triple Sharing (₹6000)</option>
                    <option value="quad">Quad Sharing (₹5000)</option>
                  </select>
                </div>

              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold flex justify-center items-center gap-2 hover:bg-black transition"
              >

                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Send Booking Query <Send size={18} /></>
                )}

              </button>

              <p className="text-center text-xs text-gray-400 mt-4 flex justify-center items-center gap-1">
                <ShieldCheck size={14} className="text-green-500" />
                Secure Booking
              </p>

            </form>

          ) : (

            <div className="text-center py-10">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck size={32} className="text-green-600" />
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Query Received!
              </h3>

              <p className="text-gray-500 text-sm">
                Our travel expert will contact you shortly.
              </p>
            </div>

          )}

        </div>
      </div>
    </div>

  );
};

export default BookingModal;