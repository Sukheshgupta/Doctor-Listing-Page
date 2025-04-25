
import { Doctor } from '../types/doctor';

export const filterDoctors = (
  doctors: Doctor[],
  search: string,
  specialty: string[],
  consultationType: string,
  sortBy: string
) => {
  let filtered = [...doctors];

  // Apply search filter
  if (search) {
    filtered = filtered.filter(doctor =>
      doctor.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Apply specialty filter
  if (specialty.length > 0) {
    filtered = filtered.filter(doctor =>
      specialty.includes(doctor.specialities[0]?.name)
    );
  }

  // Apply consultation type filter
  if (consultationType) {
    filtered = filtered.filter(doctor =>
      consultationType === 'online' 
        ? doctor.video_consult
        : doctor.in_clinic
    );
  }

  // Apply sorting
  if (sortBy) {
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'fee-low':
          return parseInt(a.fees.replace(/[^\d]/g, '')) - parseInt(b.fees.replace(/[^\d]/g, ''));
        case 'fee-high':
          return parseInt(b.fees.replace(/[^\d]/g, '')) - parseInt(a.fees.replace(/[^\d]/g, ''));
        case 'experience-low':
          return parseInt(a.experience) - parseInt(b.experience);
        case 'experience-high':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });
  }

  return filtered;
};

export const getTopSuggestions = (doctors: Doctor[], search: string) => {
  if (!search) return [];
  
  return doctors
    .filter(doctor => 
      doctor.name.toLowerCase().includes(search.toLowerCase())
    )
    .slice(0, 3);
};

