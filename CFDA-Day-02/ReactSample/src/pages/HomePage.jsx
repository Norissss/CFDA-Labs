import { Link } from "react-router";

function HomePage() {
  return (
    <main className="page-container">
      <section className="hero-section">
        <p className="hero-label">Belajar React</p>

        <h1>React Task Manager</h1>

        <p>
          Contoh aplikasi React yang menggunakan component,
          props, state, useState, useEffect, dan routing.
        </p>

        <Link className="primary-link" to="/tasks">
          Buka Task Manager
        </Link>
      </section>
    </main>
  );
}

export default HomePage;