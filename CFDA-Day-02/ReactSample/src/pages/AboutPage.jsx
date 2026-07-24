function AboutPage() {
  return (
    <main className="page-container">
      <section className="content-card">
        <h1>Tentang Aplikasi</h1>

        <p>
          React Task Manager adalah aplikasi sederhana untuk
          mempelajari konsep dasar React.
        </p>

        <h2>Konsep yang digunakan</h2>

        <ul className="feature-list">
          <li>
            <strong>Component:</strong> memecah antarmuka
            menjadi bagian-bagian kecil.
          </li>

          <li>
            <strong>Props:</strong> mengirim data dan function
            dari parent ke child component.
          </li>

          <li>
            <strong>State:</strong> menyimpan data yang dapat
            berubah.
          </li>

          <li>
            <strong>useState:</strong> membuat dan memperbarui
            state.
          </li>

          <li>
            <strong>useEffect:</strong> menjalankan efek seperti
            memperbarui title browser.
          </li>

          <li>
            <strong>React Router:</strong> mengatur perpindahan
            halaman berdasarkan URL.
          </li>
        </ul>
      </section>
    </main>
  );
}

export default AboutPage;