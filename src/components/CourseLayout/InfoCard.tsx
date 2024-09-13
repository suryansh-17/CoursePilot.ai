import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  heading: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, heading, text }) => {
  return (
    <div className="flex gap-2">
      <div className="text-4xl text-primary">{icon}</div>
      <div>
        <h2 className="text-xs text-white">{heading}</h2>
        <h2 className="font-medium text-lg">{text}</h2>
      </div>
    </div>
  );
};

export default InfoCard;
