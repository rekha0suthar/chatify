export const currentUser = {
  id: 0,
  name: 'me',
  avatar:
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png', // Replace with actual user avatar
};

export const contacts = [
  {
    id: 1,
    name: 'John Doe',
    avatar:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    lastMessage: 'Hey, how are you?',
    timestamp: '10:30 AM',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    lastMessage: "Let's meet tomorrow",
    timestamp: '9:45 AM',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    avatar:
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    lastMessage: 'Thanks for the help!',
    timestamp: 'Yesterday',
  },
];

export const messages = {
  1: [
    {
      id: 1,
      text: 'Hey, how are you?',
      sender: 'John Doe',
      timestamp: '10:30 AM',
      isSent: false,
    },
    {
      id: 2,
      text: "I'm good, thanks! How about you?",
      sender: 'me',
      timestamp: '10:31 AM',
      isSent: true,
    },
    {
      id: 3,
      text: 'Doing great! Want to grab lunch?',
      sender: 'John Doe',
      timestamp: '10:32 AM',
      isSent: false,
    },
  ],
  2: [
    {
      id: 1,
      text: "Hi Jane, about tomorrow's meeting...",
      sender: 'me',
      timestamp: '9:30 AM',
      isSent: true,
    },
    {
      id: 2,
      text: "Yes, I'll prepare the presentation",
      sender: 'Jane Smith',
      timestamp: '9:45 AM',
      isSent: false,
    },
  ],
  3: [
    {
      id: 1,
      text: 'Thanks for your help yesterday!',
      sender: 'Mike Johnson',
      timestamp: 'Yesterday',
      isSent: false,
    },
    {
      id: 2,
      text: 'No problem at all! Happy to help',
      sender: 'me',
      timestamp: 'Yesterday',
      isSent: true,
    },
  ],
};
