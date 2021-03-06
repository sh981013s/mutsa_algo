export const menuProps = {
  items: [
    {
      text: 'Home π ',
      link: '/',
    },
    {
      text: 'λ¬Έμ  π',
      link: '/problems',
    },
    {
      text: 'μ μΆλ΄μ­ ππ»ββοΈ',
      link: '/submitted',
    },
    {
      text: 'Admin π¨βπ©βπ§βπ§',
      link: '/admin',
    },
  ],
  logo: {
    text: 'π¦ λ©μμ΄ μ¬μμ²λΌ at κ΅­λ―Όλ μ¬μ κ³Όμ ',
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
