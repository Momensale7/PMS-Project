import React from 'react';

interface DashboardCardProps {
  color: string;
  icon:any,
  status:string,
  number:string|undefined|number
}

// Function to convert HEX to RGBA
const hexToRgba = (hex: string, opacity: number): string => {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ color,icon ,status,number}) => {
  return (
    <div className='dashboard-card p-3 rounded-4 shadow' style={{ backgroundColor: hexToRgba(color, 0.5) }}>
      <div 
        className="dashboard-icon d-flex align-items-center justify-content-center " 
        style={{ backgroundColor: color, width: "50px", height: "50px" }}
      >
        {icon}
      </div>
      <p className='text-muted fs-6 mt-2 mb-0 fw-semibold '>{status}</p>
      <p className='fw-bold fs-4'>{number}</p>  
    </div>
  );
};

export default DashboardCard;
