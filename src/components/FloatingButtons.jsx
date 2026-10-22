export default function FloatingButtons() {
  return (
    <div className="floating-buttons">
      <a
        href="https://wa.me/447418622761?text=Hello,%20I%20want%20full%20information"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/sticky icons/whatsApp-icon.webp" alt="WhatsApp"
          loading="lazy"
          decoding="async"
          width="100"
          height="100" />
      </a>

              <a
        href="https://telegram.me/rickytmk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img src="/sticky icons/telegram-icon.webp" alt="Telegram"
          loading="lazy"
          decoding="async"
          width="86"
          height="86" />
      </a>
    </div>
  );
}