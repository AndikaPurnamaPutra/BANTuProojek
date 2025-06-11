// JobData.js
import JobImage from '../../assets/images/loker_cardimg1.png'; // Contoh gambar untuk pekerjaan
import JobImage2 from '../../assets/images/loker_cardimg2.png'; // Contoh gambar untuk pekerjaan

const jobData = [
  {
    id: 1,
    title: 'Story Telling - Purwakala',
    date: '18 November 2024',
    image: JobImage, // Gambar pekerjaan
    link: '/job-detail/1', // Link untuk detail pekerjaan
    subheading: '✨ Panggilan untuk Kalian Semua! ✨',
    content: `
      Saat ini, BanTu Projek berkolaborasi dengan Purwakala untuk mencari Volunteer desainer grafis untuk bergabung bersama kami! 🎨✨
      Jika kamu memiliki kreativitas tinggi dan ingin berkontribusi dalam proyek sosial yang bermakna, inilah kesempatanmu!
      Posisi: Social Media Designer
      <br />
      👉 CP: 085731855199 📩
      <br />
      Jika ada pertanyaan, jangan ragu untuk mengirim DM ke kami. Jangan lewatkan kesempatan ini untuk menjadi bagian dari sesuatu yang lebih besar! Kami tunggu karya dan semangatmu! 💡💪
    `,
  },
  {
    id: 2,
    title: 'Volunteer Social Media Designer - Purwakala',
    date: '19 November 2024',
    image: JobImage2, // Gambar pekerjaan
    link: '/job-detail/2', // Link untuk detail pekerjaan
    subheading: '✨ Join Our Team! ✨',
    content: `
      BanTu Projek is looking for a volunteer Social Media Designer to join our creative team! If you have a passion for social media design and want to contribute to a meaningful project, this is your chance!
      <br />
      📍 Location: Hybrid
      <br />
      💬 Contact us: DM or Email us at info@bantu.com.
      <br />
      Don't miss out on the opportunity to make a difference while showcasing your skills!
    `,
  },
  {
    id: 3,
    title: 'Volunteers - Pewarna',
    date: '20 November 2024',
    image: JobImage, // Gambar pekerjaan
    link: '/job-detail/3', // Link untuk detail pekerjaan
    subheading: '🌟 Volunteers Needed! 🌟',
    content: `
      Join Pewarna's initiative to spread awareness on environmental sustainability! We are looking for volunteers to help with content creation, social media management, and more. Together, we can create a positive impact.
      <br />
      📅 Time Commitment: 5 hours a week
      <br />
      📧 Contact: pewarna.volunteers@bantu.com
      <br />
      Come be a part of a great cause!
    `,
  },
];

export default jobData;
