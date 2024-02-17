import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineViewColumns,
} from 'react-icons/hi2';

import LandingCard, { CardType } from './LandingCard';

const cards: CardType[] = [
  {
    icon: <HiOutlineViewColumns />,
    title: 'Customize your boards and tasks',
    description: `Unleash the full potential of your team by creating custome boards.
    Seamlessly map out your project journey by breaking it down into
    actionable tasks. Collaborate effortlessly as a team, assign and track
    tasks, and visualize progress in real-time.`,
    img: '/screenshoot_1.png',
  },
  {
    icon: <HiOutlineUserGroup />,
    title: 'Create projects and teams',
    description: `Take control of your work with the ability to create projects and
    build teams for seamless collaboration. Empower your team by inviting
    members to work together efficiently within dedicated project spaces.`,
    img: '/screenshoot_1.png',
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    title: 'Real time messaging',
    description: `Seamlessly connect with your team in real-time, fostering
    collaboration and enhancing communication. Create customized groups to
    streamline discussions, share ideas, and boost productivity.`,
    img: '/screenshoot_1.png',
  },
];

const LandingCards = () => {
  return (
    <section className=' my-6 px-6 lg:px-48'>
      <ul className='flex flex-col gap-4'>
        {cards.map(card => (
          <LandingCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
            img={card.img}
          />
        ))}
      </ul>
    </section>
  );
};

export default LandingCards;
