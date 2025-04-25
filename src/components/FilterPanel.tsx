import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface FilterPanelProps {
  specialties: string[];
  selectedSpecialties: string[];
  consultationType: string;
  sortBy: string;
  onSpecialtyChange: (specialty: string) => void;
  onConsultationTypeChange: (type: string) => void;
  onSortChange: (sort: string) => void;
}

const FilterPanel = ({
  specialties,
  selectedSpecialties,
  consultationType,
  sortBy,
  onSpecialtyChange,
  onConsultationTypeChange,
  onSortChange,
}: FilterPanelProps) => {
  return (
    <div className="space-y-6 p-4 bg-white rounded-lg shadow">
      <div>
        <h3 data-testid="filter-header-speciality" className="text-lg font-semibold mb-3">
          Specialties
        </h3>
        {specialties.map((specialty) => (
          <div key={specialty} className="flex items-center space-x-2 mb-2">
            <Checkbox
              id={specialty}
              data-testid={`filter-specialty-${specialty.replace('/', '-')}`}
              checked={selectedSpecialties.includes(specialty)}
              onCheckedChange={() => onSpecialtyChange(specialty)}
            />
            <Label htmlFor={specialty}>{specialty}</Label>
          </div>
        ))}
      </div>

      <div>
        <h3 data-testid="filter-header-moc" className="text-lg font-semibold mb-3">
          Consultation Type
        </h3>
        <RadioGroup
          value={consultationType}
          onValueChange={onConsultationTypeChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="online" id="online" data-testid="filter-video-consult" />
            <Label htmlFor="online">Video Consult</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="in-person" id="in-person" data-testid="filter-in-clinic" />
            <Label htmlFor="in-person">In-Person</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <h3 data-testid="filter-header-sort" className="text-lg font-semibold mb-3">
          Sort By
        </h3>
        <RadioGroup
          value={sortBy}
          onValueChange={onSortChange}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fee-low" id="fee-low" data-testid="sort-fees" />
            <Label htmlFor="fee-low">Fees: Low to High</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fee-high" id="fee-high" />
            <Label htmlFor="fee-high">Fees: High to Low</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience-high" id="experience-high" data-testid="sort-experience" />
            <Label htmlFor="experience-high">Experience: Most to Least</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="experience-low" id="experience-low" />
            <Label htmlFor="experience-low">Experience: Least to Most</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default FilterPanel;
