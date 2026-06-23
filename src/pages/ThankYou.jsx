import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ThankYou() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <section
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "30px",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <img
        src="/thank-you.gif"
        alt="Thank You"
        style={{
          maxWidth: "500px",
          width: "100%",
        }}
      />

      <div>
        <h2
          style={{
            marginBottom: "12px",
            color: "#fff",
          }}
        >
          Thank you for contacting us!
        </h2>

        <p
          style={{
            color: "#bbb",
            fontSize: "18px",
          }}
        >
          Redirecting to home page in{" "}
          <span
            style={{
              color: "#88C240",
              fontWeight: 700,
              fontSize: "24px",
            }}
          >
            {countdown}
          </span>{" "}
          second{countdown !== 1 ? "s" : ""}...
        </p>
      </div>
    </section>
  );
}