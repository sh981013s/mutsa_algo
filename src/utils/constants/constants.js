export const menuProps = {
  items: [
    {
      text: 'Home 🏠',
      link: '/',
    },
    {
      text: '문제 📄',
      link: '/problems',
    },
    {
      text: '제출내역 🙋🏻‍♂️',
      link: '/submitted',
    },
    {
      text: 'Admin 👨‍👩‍👧‍👧',
      link: '/admin',
    },
  ],
  logo: {
    text: '🦁 멋쟁이 사자처럼 at 국민대 사전과제',
    link: '/',
  },
  style: {
    barStyles: {
      background: '#2a2b2d',
    },
    sidebarStyles: {
      background: '#222',
      buttonColor: 'white',
    },
  },
};

export const buttonScale = {
  whileHover: {
    scale: 1.1,
  },
  whileTap: {
    scale: 0.9,
  },
};

export const minusXAnimation = {
  initial: {
    x: -5000,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
  animate: {
    x: 0,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
};

export const plusXAnimation = {
  initial: {
    x: 5000,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
  animate: {
    x: 0,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
};

export const plusYAnimation = {
  initial: {
    y: 1500,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
  animate: {
    y: 0,
    transition: { type: 'spring', duration: 0.6, delay: 0.1 },
  },
};
