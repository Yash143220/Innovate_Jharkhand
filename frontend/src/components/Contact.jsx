import { useState } from "react";
import { Mail, MapPinned, PhoneCall, Send, Loader } from "lucide-react";

const initialForm = {
  name: "",
  email: "",
  interest: "Weekend waterfall trail",
  message: "",
  phone: "",
  paymentMethod: "razorpay",
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bookingId, setBookingId] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (form.paymentMethod === "payonline") {
        // Razorpay payment
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/bookings/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            interest: form.interest,
            message: form.message,
            amount: 5000,
            paymentMethod: "razorpay",
          }),
        });

        const data = await response.json();

        if (data.orderId) {
          setBookingId(data.orderId);
          initializeRazorpay(data);
        } else {
          setError("Failed to create booking. Please try again.");
          setLoading(false);
        }
      } else {
        // Pay on Counter
        const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
        const response = await fetch(`${API_URL}/api/bookings/save-file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            phone: form.phone,
            interest: form.interest,
            message: form.message,
            paymentMethod: "counter",
            amount: 5000,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setSubmitted(true);
          setForm(initialForm);
          alert(
            `Booking Confirmed!\nReference ID: ${data.bookingId}\nPlease save this ID for counter payment.\n\nAmount Due: ₹50`
          );
        } else {
          setError(data.message || "Failed to create booking. Please try again.");
        }
        setLoading(false);
      }
    } catch (err) {
      setError("Error connecting to server. Please check your backend.");
      console.error(err);
      setLoading(false);
    }
  };

  const initializeRazorpay = (orderData) => {
    const options = {
      key: "rzp_test_YOUR_KEY_ID", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: "INR",
      name: "Innovate Jharkhand",
      description: "Tourism Experience Booking",
      order_id: orderData.orderId,
      handler: async (response) => {
        try {
          // Verify payment on backend
          const verifyResponse = await fetch(
            "http://localhost:5000/api/bookings/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                orderId: orderData.orderId,
                paymentId: response.razorpay_payment_id,
                signature: response.razorpay_signature,
                email: form.email,
              }),
            }
          );

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            setSubmitted(true);
            setForm(initialForm);
            setBookingId("");
          } else {
            setError("Payment verification failed. Please contact support.");
          }
        } catch (err) {
          setError("Error verifying payment. Please contact support.");
          console.error(err);
        }
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.phone,
      },
      theme: {
        color: "#0E5A46",
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <section id="contact" className="bg-[color:var(--ink)] py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl" data-reveal="up">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[color:var(--sun)]">
            Contact and conversion
          </p>
          <h2 className="mt-4 font-heading text-4xl leading-tight md:text-5xl">
            Start your journey with a usable planning desk.
          </h2>
          <p className="mt-6 text-base leading-8 text-white/78 md:text-lg">
            This final section gives the project a proper endpoint. Visitors can
            express intent, choose a travel interest and send a concise brief
            without the page losing its tone or alignment.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
          <aside
            data-reveal="right"
            className="rounded-[2rem] border border-white/10 bg-white/6 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.18)]"
          >
            <h3 className="text-2xl font-semibold">Tourism desk notes</h3>
            <p className="mt-3 text-sm leading-7 text-white/72">
              Use this block in demos to explain how the platform guides first
              conversations with students, travelers, judges or stakeholders.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex gap-4 rounded-3xl border border-white/8 bg-white/6 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <MapPinned className="h-5 w-5 text-[color:var(--sun)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Focus areas</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Ranchi circuits, Netarhat drives, Betla forest stays and
                    Deoghar-linked cultural travel.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-3xl border border-white/8 bg-white/6 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <Mail className="h-5 w-5 text-[color:var(--sun)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">What to ask for</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    Travel dates, group size, preferred route style and whether
                    the trip is nature-led, cultural or devotional.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 rounded-3xl border border-white/8 bg-white/6 p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10">
                  <PhoneCall className="h-5 w-5 text-[color:var(--sun)]" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Presentation-ready</p>
                  <p className="mt-1 text-sm leading-6 text-white/68">
                    The form behaves cleanly in demos and gives the page a
                    complete finish even without a live backend submission flow.
                  </p>
                </div>
              </div>
            </div>
          </aside>

          <form
            data-reveal="left"
            onSubmit={handleSubmit}
            className="rounded-[2rem] bg-[color:var(--sand)] p-6 text-[color:var(--ink)] shadow-[0_18px_45px_rgba(0,0,0,0.2)]"
          >
            <div className="grid gap-5 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium">
                Name
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-[color:var(--forest)]"
                  placeholder="Your full name"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Email
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-[color:var(--forest)]"
                  placeholder="you@example.com"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Phone
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-[color:var(--forest)]"
                  placeholder="+91 XXXXX XXXXX"
                  required
                />
              </label>

              <label className="flex flex-col gap-2 text-sm font-medium">
                Interest
                <select
                  name="interest"
                  value={form.interest}
                  onChange={handleChange}
                  className="rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-[color:var(--forest)]"
                >
                  <option>Weekend waterfall trail</option>
                  <option>Plateau and forest retreat</option>
                  <option>Culture, craft and pilgrimage loop</option>
                  <option>Custom mixed itinerary</option>
                </select>
              </label>
            </div>

            <label className="mt-5 flex flex-col gap-2 text-sm font-medium">
              Trip brief
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows="6"
                className="rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 outline-none transition-colors duration-200 focus:border-[color:var(--forest)]"
                placeholder="Tell us your dates, group size, interests and what kind of experience you want to build."
                required
              />
            </label>

            <label className="mt-5 flex flex-col gap-3 text-sm font-medium">
              Payment Method
              <div className="space-y-3">
                <label className="flex items-center gap-3 rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 cursor-pointer hover:bg-[rgba(14,90,70,0.05)] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payonline"
                    checked={form.paymentMethod === "payonline"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-[color:var(--ink)]">
                    <strong>Pay Online (Razorpay)</strong> - Instant payment
                  </span>
                </label>
                <label className="flex items-center gap-3 rounded-2xl border border-[rgba(27,29,19,0.12)] bg-white px-4 py-3 cursor-pointer hover:bg-[rgba(14,90,70,0.05)] transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="counter"
                    checked={form.paymentMethod === "counter"}
                    onChange={handleChange}
                    className="w-4 h-4"
                  />
                  <span className="text-[color:var(--ink)]">
                    <strong>Pay on Counter</strong> - Pay when you visit
                  </span>
                </label>
              </div>
            </label>

            <div className="mt-6 flex flex-col gap-4">
              {error && (
                <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-[color:var(--ink-soft)]">
                  {form.paymentMethod === "payonline"
                    ? "Secure booking with Razorpay"
                    : "Book now and pay at counter"}
                </p>
                <button
                  type="submit"
                  disabled={loading}
                  className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[color:var(--forest)] hover:-translate-y-0.5"
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {form.paymentMethod === "payonline"
                        ? "Book Now (₹50)"
                        : "Confirm Booking"}
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>

            {submitted && (
              <p className="mt-5 rounded-2xl bg-[rgba(14,90,70,0.08)] px-4 py-3 text-sm font-medium text-[color:var(--forest)]">
                Thanks. Your Jharkhand trip brief is ready for follow-up.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
