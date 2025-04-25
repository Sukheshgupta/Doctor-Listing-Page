import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDoctorData } from '../hooks/useDoctorData';
import SearchBar from '../components/SearchBar';
import FilterPanel from '../components/FilterPanel';
import DoctorList from '../components/DoctorList';
import { filterDoctors } from '../utils/filterHelpers';
import { Doctor } from '../types/doctor';

const Index = () => {
  const { data: doctors = [], isLoading, error } = useDoctorData();
  const [searchParams, setSearchParams] = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>(
    searchParams.get('specialties')?.split(',').filter(Boolean) || []
  );
  const [consultationType, setConsultationType] = useState(
    searchParams.get('consultation') || ''
  );
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || '');

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (selectedSpecialties.length) params.set('specialties', selectedSpecialties.join(','));
    if (consultationType) params.set('consultation', consultationType);
    if (sortBy) params.set('sort', sortBy);
    setSearchParams(params);
  }, [search, selectedSpecialties, consultationType, sortBy, setSearchParams]);

  // Fix: Get specialties from the specialities array in doctor object
  const specialties: string[] = [...new Set(
    doctors.flatMap(doctor => doctor.specialities.map(s => s.name))
  )];
  
  const filteredDoctors = filterDoctors(
    doctors,
    search,
    selectedSpecialties,
    consultationType,
    sortBy
  );

  const handleSpecialtyChange = (specialty: string) => {
    setSelectedSpecialties(prev =>
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading doctors...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-red-600">Error loading doctors.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Find a Doctor</h1>
          <SearchBar doctors={doctors} onSearch={setSearch} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <FilterPanel
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              consultationType={consultationType}
              sortBy={sortBy}
              onSpecialtyChange={handleSpecialtyChange}
              onConsultationTypeChange={setConsultationType}
              onSortChange={setSortBy}
            />
          </div>
          <div className="lg:col-span-3">
            <DoctorList doctors={filteredDoctors} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
