import {
  HiOutlineChatBubbleLeftRight,
  HiOutlineUserGroup,
  HiOutlineViewColumns,
} from 'react-icons/hi2';

import LandingCard, { CardType } from './LandingCard';

const cards: CardType[] = [
  {
    icon: <HiOutlineViewColumns />,
    title: 'Customize your boards',
    description: `Unleash the full potential of your team by creating custome boards. Collaborate effortlessly as a team, assign and track
    tasks, and visualize progress in real-time.`,
  },
  {
    icon: <HiOutlineUserGroup />,
    title: 'Create projects and teams',
    description: `Build teams for seamless collaboration. Empower your team by working together efficiently within dedicated project spaces.`,
  },
  {
    icon: <HiOutlineChatBubbleLeftRight />,
    title: 'Real time messaging',
    description: `Connect with your team in real-time, fostering
    collaboration and enhancing communication.`,
  },
];

const LandingCards = () => {
  return (
    <section className='my-6 px-6 lg:px-48'>
      <ul className='flex flex-col gap-4 md:grid lg:grid-cols-3'>
        {cards.map(card => (
          <LandingCard
            key={card.title}
            icon={card.icon}
            title={card.title}
            description={card.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default LandingCards;
