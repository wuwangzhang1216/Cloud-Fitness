import React from 'react';

interface Equipment3DViewProps {
  equipmentId: string;
}

const BenchPressModel: React.FC = () => (
    <div className="absolute w-96 h-64" style={{ transform: 'translateZ(-100px)'}}>
        {/* Bench */}
        <div className="absolute bg-gray-600 w-28 h-64 left-1/2 -translate-x-1/2 top-0 rounded-lg shadow-xl" style={{transform: 'rotateX(80deg) translateZ(-60px)'}}></div>
        {/* Rack */}
        <div className="absolute bg-gray-500 w-4 h-40 bottom-16 -left-4 shadow-lg" style={{transform: 'rotateY(-90deg) translateZ(2px)'}}></div>
        <div className="absolute bg-gray-500 w-4 h-40 bottom-16 -right-4 shadow-lg" style={{transform: 'rotateY(-90deg) translateZ(-2px)'}}></div>
        {/* Barbell */}
        <div className="absolute bg-gray-400 w-96 h-3 top-12 left-0 rounded-full flex items-center justify-between px-2 shadow-2xl">
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
            <div className="w-10 h-10 bg-gray-800 rounded-full"></div>
        </div>
    </div>
)

const TreadmillModel: React.FC = () => (
    <div className="absolute w-96 h-72" style={{ transform: 'translateZ(-120px)'}}>
        {/* Base */}
        <div className="absolute bg-gray-800 w-40 h-72 bottom-0 left-1/2 -translate-x-1/2 rounded-lg" style={{transform: 'rotateX(85deg) translateZ(-110px)'}}></div>
         {/* Console */}
        <div className="absolute bg-gray-600 w-32 h-24 top-10 left-1/2 -translate-x-1/2 rounded-t-lg" style={{transform: 'rotateX(-20deg) translateZ(10px)'}}></div>
    </div>
)


const Equipment3DView: React.FC<Equipment3DViewProps> = ({ equipmentId }) => {
  switch (equipmentId) {
    case 'benchPress':
      return <BenchPressModel />;
    case 'treadmill':
        return <TreadmillModel />;
    default:
      return null;
  }
};

export default Equipment3DView;
