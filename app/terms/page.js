export default function TermsOfService() {
  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen p-8 md:p-16">
      <h1 className="text-4xl font-bold mb-6 text-white">Terms of Service</h1>
      <p className="mb-6 text-gray-300">
        Welcome to PragatiIQ! By using our website, you agree to comply with and be bound by the following terms and conditions.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Use of Service</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Access our website only for lawful purposes.</li>
          <li>Do not misuse our services, including harmful or illegal activities.</li>
          <li>Respect intellectual property rights.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">User Accounts</h2>
        <ul className="list-disc list-inside text-gray-300">
          <li>Provide accurate information when creating an account.</li>
          <li>Keep your account credentials secure.</li>
          <li>Notify us immediately of any unauthorized account usage.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Limitation of Liability</h2>
        <p className="text-gray-300">
          We are not responsible for any direct, indirect, or consequential damages arising from your use of our website.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Changes to Terms</h2>
        <p className="text-gray-300">
          We may update these Terms of Service periodically. Continued use of our website after updates constitutes acceptance.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-white">Contact</h2>
        <p className="text-gray-300">
          For any questions regarding these Terms, reach out to us at 
          <a href="/contact" className="text-blue-400 hover:text-blue-500 ml-1">Help Center</a>.
        </p>
      </section>
    </div>
  );
}