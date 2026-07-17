import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { countryRules } from "../utils/countryRules";
import { budgetOptions } from "../utils/budgetOptions";
import { validatePhone } from "../utils/phoneValidation";
import { countries } from "../data/countries";

import { ArrowRight } from "lucide-react";

export default function LeadForm() {
  const navigate = useNavigate();

  const [countryCode, setCountryCode] = useState("");
  const [phone, setPhone] = useState("");
  console.log("Whatsapp No.", phone);
  
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState({});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [service, setService] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
    }

    if (!countryCode) {
      newErrors.countryCode = "Please select a country";
    }

    if (!phone.trim()) {
      newErrors.phone = "Whatsapp number is required";
    } else if (!validatePhone(countryCode, phone)) {
      newErrors.phone = `Invalid whatsapp number for ${countryRules[countryCode]?.name}`;
    }

    if (!budget) {
      newErrors.budget = "Please select a budget";
    }

    if (!service) {
      newErrors.service = "Please select a service";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    try {
      setLoading(true);
      setSubmitMessage("");

      await fetch(import.meta.env.VITE_GOOGLE_SHEET, {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          countryCode,
          phone,
          budget,
          service,
        }),
      });

      setSubmitStatus("success");
      setSubmitMessage(
        "Thank you! Your message has been sent successfully."
      );

      setName("");
      setEmail("");
      setCountryCode("");
      setPhone("");
      setBudget("");
      setService("");
      setErrors({});

      // navigate("/thank-you");
    } catch (error) {
      console.error(error);

      setSubmitStatus("error");
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="cta-form-wrap">
      <form className="cta-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {errors.name && <span className="error">{errors.name}</span>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-row">
          <select
            required
            value={countryCode}
            onChange={(e) => {
              setCountryCode(e.target.value);
              setBudget("");
            }}
          >
            <option value="">Country Code</option>

            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.code} ({country.name})
              </option>
            ))}
          </select>
          {errors.countryCode && (
            <span className="form-error">{errors.countryCode}</span>
          )}
          <input
            type="tel"
            placeholder="Whatsapp Number"
            value={phone}
            inputMode="numeric"
            maxLength={countryRules[countryCode]?.phoneLength || 15}
            onChange={(e) => {
              setPhone(e.target.value.replace(/\D/g, ""));
            }}
            onKeyDown={(e) => {
              if (
                !/[0-9]/.test(e.key) &&
                !["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"].includes(
                  e.key
                )
              ) {
                e.preventDefault();
              }
            }}
          />

          {errors.phone && <span className="error">{errors.phone}</span>}
        </div>
        <div className="form-row">
          <select
            required
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Select Budget</option>

            {countryCode &&
              budgetOptions[countryRules[countryCode]?.budgetKey]?.map(
                (option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                )
              )}
          </select>

          {errors.budget && (
            <span className="form-error">{errors.budget}</span>
          )}
          <select
            required
            value={service}
            onChange={(e) => setService(e.target.value)}
          >
            <option value="">Select Service</option>
            <option value="seo">iGaming SEO</option>
            <option value="meta">Meta Ads</option>
            <option value="telegram">Telegram & Community Marketing</option>
            <option value="affiliate">Affiliate Marketing</option>
            <option value="acquisition">Player Acquisition</option>
            <option value="creative">Creative Production</option>
            <option value="cro">Conversion Optimization</option>
          </select>
          {errors.service && (
            <span className="form-error">{errors.service}</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? (
            "Submitting..."
          ) : (
            <>
              Take The First Step <ArrowRight size={16} />
            </>
          )}
        </button>
        {submitMessage && (
          <div
            className={
              submitStatus === "success" ? "submit-success" : "submit-error"
            }
          >
            {submitMessage}
          </div>
        )}
      </form>
    </div>
  );
}