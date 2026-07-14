import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQSection({
  label = "FAQ",
  title = "Frequently Asked Questions",
  description = "",
  faqs = [],
}) {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  if (!faqs.length) return null;

  const mid = Math.ceil(faqs.length / 2);
  const leftFaqs = faqs.slice(0, mid);
  const rightFaqs = faqs.slice(mid);

  const renderFaq = (faq, index) => {
    const question = faq.q || faq.question;
    const answer = faq.a || faq.answer;

    return (
      <div
        className={`faq-item${openFaq === index ? " open" : ""}`}
        key={index}
      >
        <div
          className={`faq-q${openFaq === index ? " open" : ""}`}
          onClick={() => toggleFaq(index)}
        >
          <span>{question}</span>

          <span className="faq-icon">
            <ChevronDown size={12} />
          </span>
        </div>

        <div
  className={`faq-a${openFaq === index ? " open" : ""}`}
  dangerouslySetInnerHTML={{
    __html: answer,
  }}
/>
      </div>
    );
  };

  return (
    <section id="faq">
      <div className="container">
        {label && <p className="section-label">{label}</p>}

        {title && (
          <h2 className="section-title">
            {title}
          </h2>
        )}

        {description && (
  <div
    className="section-desc"
    dangerouslySetInnerHTML={{
      __html: description,
    }}
  />
)}

        <div className="faq-grid">
          <div className="faq-col">
            {leftFaqs.map((faq, i) => renderFaq(faq, i))}
          </div>

          <div className="faq-col">
            {rightFaqs.map((faq, i) =>
              renderFaq(faq, i + leftFaqs.length)
            )}
          </div>
        </div>
      </div>
    </section>
  );
}