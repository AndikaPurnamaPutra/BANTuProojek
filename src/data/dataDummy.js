import IcProfile from '../assets/images/portfolio/img-profile.png';

export const users = [
  {
    email: 'admin',
    password: '1234',
    namaDepan: 'Admin',
    namaPengguna: 'Raka Lestari', // Sinkronkan dengan author di portfolioData.jsx
    role: 'designer',
    deskripsi: 'Saya seorang designer handal.',
    profile: IcProfile, // Gunakan IcProfile di sini untuk gambar profil
    portfolio: ['portfolio-001', 'portfolio-054', 'portfolio-055'] // ID portfolio yang sesuai
  },
  {
    email: 'user@example.com',
    password: 'abcd1234',
    namaDepan: 'User',
    namaPengguna: 'Galuh Angga', // Sinkronkan dengan author di portfolioData.jsx
    role: 'artisan',
    deskripsi: 'Saya mencari desainer untuk proyek saya.',
    profile: IcProfile, // Gunakan IcProfile di sini untuk gambar profil
    portfolio: ['portfolio-003', 'portfolio-058', 'portfolio-059'] // ID portfolio yang sesuai
  }
];
