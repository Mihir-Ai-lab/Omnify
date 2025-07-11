import React from 'react';

const teamMembers = [
  {
    name: 'Ava Patel',
    role: 'Founder & CEO',
    bio: 'Visionary leader and AI enthusiast. Ava brings wisdom, clarity, and a passion for empowering marketers with actionable insights.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    archetype: 'The Sage',
  },
  {
    name: 'Liam Chen',
    role: 'Chief Technology Officer',
    bio: 'Architect of transformation. Liam turns complex ideas into magical, intuitive products that delight and inspire.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    archetype: 'The Magician',
  },
  {
    name: 'Sophia Garcia',
    role: 'Head of Product',
    bio: 'Bold innovator and challenger of the status quo. Sophia ensures Omnify stays ahead with disruptive, user-centric solutions.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    archetype: 'The Innovator',
  },
  {
    name: 'Noah Smith',
    role: 'Lead Data Scientist',
    bio: 'Driven by curiosity and a love for truth in data. Noah crafts the intelligence that powers Omnify’s AI brain.',
    image: 'https://randomuser.me/api/portraits/men/65.jpg',
    archetype: 'The Sage',
  },
];

const Team: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5F7FA] via-[#E3EAF6] to-[#C1D3EA] py-16 px-4">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-5xl font-bold omnify-heading-xl mb-4">Meet the Team</h1>
        <p className="text-lg text-[#274472] omnify-body-lg max-w-2xl mx-auto">
          Omnify is built by a team of passionate experts, visionaries, and innovators. We blend wisdom, magic, and bold thinking to empower marketers everywhere.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto">
        {teamMembers.map((member) => (
          <div
            key={member.name}
            className="bg-white/80 glass rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 animate-fade-in"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-[#2BC5B4] mb-4 shadow omnify-animate-float"
            />
            <h2 className="text-2xl font-semibold omnify-heading mb-1 text-[#274472]">{member.name}</h2>
            <p className="text-[#2BC5B4] font-medium mb-1">{member.role}</p>
            <span className="inline-block bg-[#FFD700]/20 text-[#FFD700] text-xs px-3 py-1 rounded-full mb-2 font-semibold">
              {member.archetype}
            </span>
            <p className="text-[#274472] omnify-body-sm mb-2">{member.bio}</p>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto mt-16 text-center">
        <h3 className="text-xl omnify-heading mb-2 text-[#274472]">Want to join us?</h3>
        <p className="text-[#274472] omnify-body">We're always looking for passionate, curious minds. <a href="mailto:careers@omnify.ai" className="text-[#2BC5B4] underline font-medium">careers@omnify.ai</a></p>
      </div>
    </div>
  );
};

export default Team; 