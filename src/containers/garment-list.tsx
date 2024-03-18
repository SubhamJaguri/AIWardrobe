// GarmentList.tsx
import { useEffect, useState } from 'react';
import { fetchProcessedGarments } from '../api';

interface Garment {
  id: string;
  gender: 'male' | 'female';
  image_urls: {
    product_image: string;
  };
  tryon: {
    category: 'tops' | 'bottoms' | 'outerwear' | 'allbody';
    enabled: boolean;
    open_outerwear?: boolean;
    bottoms_sub_category?: 'pants' | 'shorts';
  };
}


const GarmentList: React.FC = () => {
  const [garmentsData, setGarmentsData] = useState< Garment[]>([]);
  const [selectedGarment, setSelectedGarment] = useState<Garment | null>(null);
  
  const handleGarmentSelect = (garment: Garment) => {
    setSelectedGarment(garment);
  };
  console.log(garmentsData)

  useEffect(() => {
    const fetchGarments = async () => {
      try {
        const data = await fetchProcessedGarments();
        setGarmentsData(data.garments);
      } catch (error) {
        console.error('Error fetching garments:', error);
      }
    };
    fetchGarments();
  }, []);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

// Function to handle category selection
const handleCategorySelect = (category: string) => {
  setSelectedCategory(category);
};

// Filter garments by selected category
const filteredGarments = garmentsData.filter(
  (garment) => garment.tryon.category === selectedCategory
);
return (
  <div className="app">
    <div className="left-panel">
      {/* Display the selected garment */}
      {selectedGarment && (
        <img src={selectedGarment.image_urls.product_image} alt={selectedGarment.tryon.category} />
      )}
    </div>
    <div className="right-panel">
      {/* Category selection */}
      <div className="categories">
        <button onClick={() => handleCategorySelect('tops')}>Tops</button>
        <button onClick={() => handleCategorySelect('bottoms')}>Bottoms</button>
        <button onClick={() => handleCategorySelect('outerwear')}>Outerwear</button>
        <button onClick={() => handleCategorySelect('allbody')}>Allbody</button>
      </div>
      {/* List garments of the selected category */}
      <div className="garments">
        {filteredGarments.map((garment) => (
          <img
            key={garment.id}
            src={garment.image_urls.product_image}
            alt={garment.tryon.category}
            onClick={() => handleGarmentSelect(garment)}
            className={`garment ${garment.tryon.category} ${selectedGarment?.id === garment.id ? 'selected' : ''}`}
            style={{ width: '100px', height: '100px' }} // Small square size
          />
        ))}
      </div>
    </div>
  </div>
);
};

export default GarmentList;
