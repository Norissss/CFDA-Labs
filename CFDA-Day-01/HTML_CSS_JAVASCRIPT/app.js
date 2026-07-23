const form = document.querySelector('#task-form');
const list = document.querySelector('#task-list');
const search = document.querySelector('#search');
const filter = document.querySelector('#filter');
let tasks = JSON.parse(localStorage.getItem('devflow.tasks') || '[]');

const persist = () => localStorage.setItem('devflow.tasks', JSON.stringify(tasks));
const escapeHtml = (value) => value.replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[c]));

function render() {
    const q = search.value.trim().toLowerCase();
    const status = filter.value;
    const visible = tasks.filter(t => t.title.toLowerCase().includes(q) && (status === 'all' || t.status === status));
    list.innerHTML = visible.length ? visible.map(t => `
    <article class="task">
      <div><strong>${escapeHtml(t.title)}</strong><div>Prioritas: ${t.priority} • Status: ${t.status}</div></div>
      <div><button data-action="toggle" data-id="${t.id}">${t.status === 'done' ? 'Buka Lagi' : 'Selesai'}</button> <button data-action="delete" data-id="${t.id}">Hapus</button></div>
    </article>`).join('') : '<p>Belum ada task yang sesuai.</p>';
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.querySelector('#title').value.trim();
    const priority = document.querySelector('#priority').value;
    if (!title) return;
    tasks.unshift({ id: crypto.randomUUID(), title, priority, status: 'todo' });
    persist(); form.reset(); render();
});

list.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-id]');
    if (!button) return;
    const { id, action } = button.dataset;
    if (action === 'delete') tasks = tasks.filter(t => t.id !== id);
    if (action === 'toggle') tasks = tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'todo' : 'done' } : t);
    persist(); render();
});
search.addEventListener('input', render); filter.addEventListener('change', render); render();

const nama = "Sigit";
let jmlklik;
var nm_mahasiswa = "Dina";

function klik() {
    jmlklik = 1;
    jmlklik = jmlklik + 1;
    jmlklik++;
    console.log(jmlklik);

    jmlklik = jmlklik + 4;
    jmlklik++;
    console.log(jmlklik);

    console.log(nama);
    //nama = "Ferry";
    //console.log(nama);

    console.log(nm_mahasiswa); //Dina
    nm_mahasiswa = "Jhonatan";
    console.log(nm_mahasiswa); //Jhonatan
}