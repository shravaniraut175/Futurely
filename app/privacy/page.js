export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 md:p-16">
      <h1 className="text-4xl font-bold mb-6 text-white">Privacy Policy</h1>
      <p className="mb-6 text-gray-300">
        Your privacy is critically important to us. At PragatiIQ, we are committed to protecting the information you share with us.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Information We Collect</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Personal information you provide (name, email, etc.)</li>
          <li>Usage data from your interaction with our site</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">How We Use Your Information</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>To provide and improve our services</li>
          <li>To communicate updates, offers, and newsletters</li>
          <li>To analyze website usage and enhance user experience</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Your Rights</h2>
        <p className="text-gray-300 mb-2">You have the right to:</p>
        <ul className="list-disc list-inside text-gray-300">
          <li>Access and update your personal data</li>
          <li>Request deletion of your data</li>
          <li>Opt out of marketing communications</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Contact Us</h2>
        <p className="text-gray-300">
          If you have any questions about this Privacy Policy, please contact us at: 
          <a href="/contact" className="text-blue-400 hover:text-blue-500 ml-1">Help Center</a>.
        </p>
      </section>
    </div>
  );
}