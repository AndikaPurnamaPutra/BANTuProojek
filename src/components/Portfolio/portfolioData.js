import ImgItem1 from '../../assets/images/portfolio/portfolio-img_item1.png';
import ImgItem2 from '../../assets/images/portfolio/portfolio-img_item2.png';
import ImgItem3 from '../../assets/images/portfolio/portfolio-img_item3.png';
import ImgItem4 from '../../assets/images/portfolio/portfolio-img_item4.png';
import IcProfile from '../../assets/images/portfolio/img-profile.png';
import { users } from '../../data/dataDummy';

// Update profile image sesuai dengan author pada users
const getProfileImage = (author) => {
  const user = users.find((user) => user.namaPengguna === author);
  return user ? user.profile : IcProfile; // Jika tidak ada profil yang sesuai, gunakan gambar default
};

const portfolioData = [
  {
    id: 'portfolio-001',
    title: 'Vivid Light',
    category: 'Illustration',
    image: ImgItem1,
    author: 'Raka Lestari',
    profile: getProfileImage('Raka Lestari'), // Ambil gambar profil sesuai dengan pengguna
    likes: 22,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-002',
    title: 'Ink Bloom',
    category: 'Photography',
    image: ImgItem4,
    author: 'Raka Ihsan',
    profile: IcProfile,
    likes: 47,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-003',
    title: 'Flat Valley',
    category: 'Illustration',
    image: ImgItem1,
    author: 'Galuh Angga',
    profile: IcProfile,
    likes: 11,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-004',
    title: 'Creative Mix',
    category: 'Video Editing',
    image: ImgItem2,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 8,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-005',
    title: 'Creative Mix',
    category: 'Videography',
    image: ImgItem3,
    author: 'Galuh Maulana',
    profile: IcProfile,
    likes: 41,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-006',
    title: 'Pixel Vibe',
    category: 'Branding',
    image: ImgItem3,
    author: 'Luna Hasna',
    profile: IcProfile,
    likes: 19,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-007',
    title: 'Urban Gloss',
    category: 'Videography',
    image: ImgItem1,
    author: 'Galuh Mahesa',
    profile: IcProfile,
    likes: 11,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-008',
    title: 'Pixel Storm',
    category: 'Copywriter',
    image: ImgItem3,
    author: 'Galuh Pratama',
    profile: IcProfile,
    likes: 10,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-009',
    title: 'Inspire Pad',
    category: 'Graphic Design',
    image: ImgItem2,
    author: 'Yulia Pratama',
    profile: IcProfile,
    likes: 38,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-010',
    title: 'Shadow Craft',
    category: 'Graphic Design',
    image: ImgItem1,
    author: 'Galuh Hasna',
    profile: IcProfile,
    likes: 19,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-011',
    title: 'Grid System',
    category: 'Videography',
    image: ImgItem1,
    author: 'Yulia Mahesa',
    profile: IcProfile,
    likes: 47,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-012',
    title: 'Bold Sense',
    category: 'Animation',
    image: ImgItem3,
    author: 'Ardi Zahra',
    profile: IcProfile,
    likes: 18,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-013',
    title: 'Frame Flick',
    category: 'Art Director',
    image: ImgItem2,
    author: 'Fikri Ihsan',
    profile: IcProfile,
    likes: 19,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-014',
    title: 'Gradient Wave',
    category: 'Photography',
    image: ImgItem4,
    author: 'Nadia Pratama',
    profile: IcProfile,
    likes: 1,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-015',
    title: 'Gradient Wave',
    category: 'Photography',
    image: ImgItem2,
    author: 'Nadia Ramadhan',
    profile: IcProfile,
    likes: 25,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-016',
    title: 'Soft Form',
    category: 'Animation',
    image: ImgItem1,
    author: 'Nadia Ramadhan',
    profile: IcProfile,
    likes: 26,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-017',
    title: 'Digital Touch',
    category: 'Animation',
    image: ImgItem3,
    author: 'Fikri Maulana',
    profile: IcProfile,
    likes: 24,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-018',
    title: 'Color Twist',
    category: 'Photography',
    image: ImgItem3,
    author: 'Fikri Pratama',
    profile: IcProfile,
    likes: 44,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-019',
    title: 'Vector Dash',
    category: 'Illustration',
    image: ImgItem4,
    author: 'Putri Maulana',
    profile: IcProfile,
    likes: 24,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-020',
    title: 'Creative Sphere',
    category: 'Design Manager',
    image: ImgItem1,
    author: 'Ardi Maulana',
    profile: IcProfile,
    likes: 42,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-021',
    title: 'Glow Form',
    category: 'Motion Graphics',
    image: ImgItem3,
    author: 'Luna Lestari',
    profile: IcProfile,
    likes: 17,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-022',
    title: 'Mono Cast',
    category: 'Branding',
    image: ImgItem3,
    author: 'Fikri Ramadhan',
    profile: IcProfile,
    likes: 40,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-023',
    title: 'Fusion UI',
    category: 'Videography',
    image: ImgItem1,
    author: 'Nadia Mahesa',
    profile: IcProfile,
    likes: 28,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-024',
    title: 'Aura Echo',
    category: 'Design Manager',
    image: ImgItem4,
    author: 'Raka Mahesa',
    profile: IcProfile,
    likes: 9,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-025',
    title: 'Bold Sense',
    category: 'Motion Graphics',
    image: ImgItem2,
    author: 'Yulia Mahesa',
    profile: IcProfile,
    likes: 10,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-026',
    title: 'Fresh Mark',
    category: 'UI/UX Design',
    image: ImgItem2,
    author: 'Raka Aditya',
    profile: IcProfile,
    likes: 48,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-027',
    title: 'Alpha Flow',
    category: 'Videography',
    image: ImgItem1,
    author: 'Dimas Lestari',
    profile: IcProfile,
    likes: 12,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-028',
    title: 'Motion Tide',
    category: 'Design Manager',
    image: ImgItem1,
    author: 'Raka Mahesa',
    profile: IcProfile,
    likes: 16,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-029',
    title: 'Motion Tide',
    category: 'Branding',
    image: ImgItem4,
    author: 'Fikri Maulana',
    profile: IcProfile,
    likes: 13,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-030',
    title: 'Smooth UX',
    category: 'Photography',
    image: ImgItem1,
    author: 'Ardi Ihsan',
    profile: IcProfile,
    likes: 8,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-031',
    title: 'Flat Valley',
    category: 'Photography',
    image: ImgItem1,
    author: 'Yulia Hasna',
    profile: IcProfile,
    likes: 5,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-032',
    title: 'Color Twist',
    category: 'Videography',
    image: ImgItem2,
    author: 'Ayu Maulana',
    profile: IcProfile,
    likes: 26,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-033',
    title: 'Design Root',
    category: 'Art Director',
    image: ImgItem1,
    author: 'Fikri Lestari',
    profile: IcProfile,
    likes: 35,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-034',
    title: 'Creative Mix',
    category: 'Design Manager',
    image: ImgItem3,
    author: 'Ardi Pratama',
    profile: IcProfile,
    likes: 10,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-035',
    title: 'Smooth UX',
    category: 'Videography',
    image: ImgItem3,
    author: 'Putri Ihsan',
    profile: IcProfile,
    likes: 20,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-036',
    title: 'Minimal Pulse',
    category: 'Motion Graphics',
    image: ImgItem2,
    author: 'Yulia Ihsan',
    profile: IcProfile,
    likes: 16,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-037',
    title: 'Glass Morph',
    category: 'Social Media Design',
    image: ImgItem2,
    author: 'Ayu Zahra',
    profile: IcProfile,
    likes: 45,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-038',
    title: 'Concept Drift',
    category: 'Art Director',
    image: ImgItem4,
    author: 'Putri Pratama',
    profile: IcProfile,
    likes: 8,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-039',
    title: 'Prime Core',
    category: 'Art Director',
    image: ImgItem3,
    author: 'Ayu Ihsan',
    profile: IcProfile,
    likes: 27,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-040',
    title: 'Smooth UX',
    category: 'Motion Graphics',
    image: ImgItem1,
    author: 'Ayu Mahesa',
    profile: IcProfile,
    likes: 20,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-041',
    title: 'Core Vision',
    category: 'Animation',
    image: ImgItem2,
    author: 'Luna Aditya',
    profile: IcProfile,
    likes: 26,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-042',
    title: 'Soft Form',
    category: 'Art Director',
    image: ImgItem2,
    author: 'Ardi Ihsan',
    profile: IcProfile,
    likes: 6,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-043',
    title: 'Urban Slide',
    category: 'Graphic Design',
    image: ImgItem2,
    author: 'Yulia Maulana',
    profile: IcProfile,
    likes: 33,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-044',
    title: 'Design Root',
    category: 'Animation',
    image: ImgItem2,
    author: 'Dimas Ramadhan',
    profile: IcProfile,
    likes: 29,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-045',
    title: 'Neon Depth',
    category: 'Photography',
    image: ImgItem2,
    author: 'Raka Hasna',
    profile: IcProfile,
    likes: 38,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-046',
    title: 'Gradient Wave',
    category: 'Branding',
    image: ImgItem4,
    author: 'Luna Maulana',
    profile: IcProfile,
    likes: 17,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-047',
    title: 'Nova Grid',
    category: 'Video Editing',
    image: ImgItem4,
    author: 'Yulia Mahesa',
    profile: IcProfile,
    likes: 29,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-048',
    title: 'Flat Zoom',
    category: 'Design Manager',
    image: ImgItem3,
    author: 'Putri Ihsan',
    profile: IcProfile,
    likes: 6,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-049',
    title: 'Geo Pop',
    category: 'Motion Graphics',
    image: ImgItem1,
    author: 'Dimas Lestari',
    profile: IcProfile,
    likes: 4,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-050',
    title: 'Ink Bloom',
    category: 'Social Media Design',
    image: ImgItem3,
    author: 'Galuh Zahra',
    profile: IcProfile,
    likes: 41,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-051',
    title: 'Modern Blur',
    category: 'Illustration',
    image: ImgItem2,
    author: 'Ayu Hasna',
    profile: IcProfile,
    likes: 30,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-052',
    title: 'Frame Flick',
    category: 'UI/UX Design',
    image: ImgItem2,
    author: 'Fikri Aditya',
    profile: IcProfile,
    likes: 22,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-053',
    title: 'Urban Gloss',
    category: 'Graphic Design',
    image: ImgItem1,
    author: 'Dimas Mahesa',
    profile: IcProfile,
    likes: 10,
    description:
      '<h2>Project Overview</h2>\n      <p>This is a detailed explanation of project content and purpose, tailored for presentation or documentation purposes.</p>\n      <h3>Main Features</h3>\n      <ul>\n        <li>Clean Interface</li>\n        <li>Accessibility Support</li>\n        <li>Responsive Layout</li>\n      </ul>\n      <p>Thank you for reviewing this project! 🚀</p>',
  },
  {
    id: 'portfolio-054',
    title: 'Dream Pixel',
    category: 'Graphic Design',
    image: ImgItem1,
    author: 'Raka Lestari',
    profile: IcProfile,
    likes: 31,
    description:
      '<h2>Project Overview</h2><p>This is a second project by Raka Lestari with a vibrant design focus.</p><h3>Main Features</h3><ul><li>Bright Color Palette</li><li>Grid System</li><li>Interactive Mockups</li></ul>',
  },
  {
    id: 'portfolio-055',
    title: 'Bright Stroke',
    category: 'Illustration',
    image: ImgItem2,
    author: 'Raka Lestari',
    profile: IcProfile,
    likes: 27,
    description:
      '<h2>Project Overview</h2><p>Exploration of hand-drawn elements and fluid lines.</p><h3>Main Features</h3><ul><li>Sketchy Style</li><li>Organic Layouts</li><li>Custom Illustrations</li></ul>',
  },
  {
    id: 'portfolio-056',
    title: 'Muted Ink',
    category: 'Photography',
    image: ImgItem3,
    author: 'Raka Ihsan',
    profile: IcProfile,
    likes: 34,
    description:
      '<h2>Project Overview</h2><p>A moody, minimal photography series.</p><h3>Main Features</h3><ul><li>Monochrome</li><li>Minimal Post-Processing</li><li>Framing Focus</li></ul>',
  },
  {
    id: 'portfolio-057',
    title: 'Silent Bloom',
    category: 'Photography',
    image: ImgItem4,
    author: 'Raka Ihsan',
    profile: IcProfile,
    likes: 40,
    description:
      '<h2>Project Overview</h2><p>Close-ups of natural elements with soft light effects.</p><h3>Main Features</h3><ul><li>Macro Shots</li><li>Natural Colors</li><li>Bokeh Effects</li></ul>',
  },
  {
    id: 'portfolio-058',
    title: 'Flat Burst',
    category: 'Illustration',
    image: ImgItem1,
    author: 'Galuh Angga',
    profile: IcProfile,
    likes: 13,
    description:
      '<h2>Project Overview</h2><p>Sharp vector graphics inspired by street art.</p><h3>Main Features</h3><ul><li>Bold Shapes</li><li>Urban Aesthetic</li><li>High Contrast</li></ul>',
  },
  {
    id: 'portfolio-059',
    title: 'Line Echo',
    category: 'Illustration',
    image: ImgItem4,
    author: 'Galuh Angga',
    profile: IcProfile,
    likes: 15,
    description:
      '<h2>Project Overview</h2><p>Delicate line work and repetition to build harmony.</p><h3>Main Features</h3><ul><li>Line Patterns</li><li>Repetitive Composition</li><li>Symmetry</li></ul>',
  },
  {
    id: 'portfolio-060',
    title: 'Pixel Drift',
    category: 'UI/UX Design',
    image: ImgItem2,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 12,
    description:
      '<h2>Project Overview</h2><p>Futuristic user interface for a music application.</p><h3>Main Features</h3><ul><li>Dark Mode</li><li>Waveform Visuals</li><li>Interactive Sliders</li></ul>',
  },
  {
    id: 'portfolio-061',
    title: 'Neon Fade',
    category: 'Video Editing',
    image: ImgItem3,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 18,
    description:
      '<h2>Project Overview</h2><p>Video edit with layered transitions and sound sync.</p><h3>Main Features</h3><ul><li>Motion Tracking</li><li>Glow Effects</li><li>Audio-Visual Harmony</li></ul>',
  },
  {
    id: 'portfolio-062',
    title: 'Stream Form',
    category: 'Videography',
    image: ImgItem4,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 22,
    description:
      '<h2>Project Overview</h2><p>Cinematic-style documentary scenes of nature.</p><h3>Main Features</h3><ul><li>Slow Motion</li><li>Voice Overlay</li><li>Nature Shots</li></ul>',
  },
  {
    id: 'portfolio-063',
    title: 'Skyward Motion',
    category: 'Videography',
    image: ImgItem1,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 29,
    description:
      '<h2>Project Overview</h2><p>Exploration of aerial shots capturing urban landscapes.</p><h3>Main Features</h3><ul><li>Drone Footage</li><li>Time-lapse</li><li>Cityscape Views</li></ul>',
  },
  {
    id: 'portfolio-064',
    title: 'Vibe Shift',
    category: 'Motion Graphics',
    image: ImgItem2,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 35,
    description:
      '<h2>Project Overview</h2><p>Colorful abstract transitions for music videos.</p><h3>Main Features</h3><ul><li>Rhythmic Visuals</li><li>Color Shifting</li><li>Seamless Transitions</li></ul>',
  },
  {
    id: 'portfolio-065',
    title: 'Cinematic Burst',
    category: 'Video Editing',
    image: ImgItem3,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 18,
    description:
      '<h2>Project Overview</h2><p>Short film editing with emotional storytelling.</p><h3>Main Features</h3><ul><li>Sound Design</li><li>Scene Matching</li><li>Color Grading</li></ul>',
  },
  {
    id: 'portfolio-066',
    title: 'Glow Overlay',
    category: 'Animation',
    image: ImgItem4,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 24,
    description:
      '<h2>Project Overview</h2><p>Animated overlays used for social content reels.</p><h3>Main Features</h3><ul><li>Minimal Motion</li><li>Looped Animations</li><li>Translucent Effects</li></ul>',
  },
  {
    id: 'portfolio-067',
    title: 'Visual Harmony',
    category: 'Graphic Design',
    image: ImgItem2,
    author: 'Luna Pratama',
    profile: IcProfile,
    likes: 30,
    description:
      '<h2>Project Overview</h2><p>Branding and layout design for lifestyle brands.</p><h3>Main Features</h3><ul><li>Clean Typography</li><li>Muted Palettes</li><li>Modular Grids</li></ul>',
  },
];

export default portfolioData;
