
import { Doctor } from '../types/doctor';

interface DoctorCardProps {
  doctor: Doctor;
}

const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <div
      data-testid="doctor-card"
      className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full overflow-hidden">
          <img
            src={doctor.photo || '/placeholder.svg'}
            alt={doctor.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 data-testid="doctor-name" className="text-xl font-semibold text-gray-900">
            {doctor.name}
          </h2>
          <p data-testid="doctor-specialty" className="text-blue-600">
            {doctor.specialities[0]?.name}
          </p>
          <div className="mt-2 space-y-1">
            <p data-testid="doctor-experience" className="text-gray-600">
              {doctor.experience}
            </p>
            <p data-testid="doctor-fee" className="text-gray-600">
              Consultation fee: {doctor.fees}
            </p>
            <p className="text-gray-600">
              {doctor.video_consult ? 'Online' : ''} 
              {doctor.video_consult && doctor.in_clinic ? ' & ' : ''}
              {doctor.in_clinic ? 'In-Person' : ''} consultation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;

