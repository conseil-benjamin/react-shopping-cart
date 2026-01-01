import { useProducts } from 'contexts/products-context';
import * as S from './style';

export const availableCategories = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing"
];

const Filter = () => {
  const { 
    filters, 
    filterProducts, 
    handlePriceChange, 
    handleRatingChange, 
    handleSortChange,
    minPrice,
    maxPrice,
    minRating,
  } = useProducts();

  const toggleCheckbox = (label: string) => {
    const selectedCheckboxes = new Set(filters);

    if (selectedCheckboxes.has(label)) {
      selectedCheckboxes.delete(label);
    } else {
      selectedCheckboxes.add(label);
    }

    const newFilters = Array.from(selectedCheckboxes);
    filterProducts(newFilters);
  };

  return (
    <S.Container>
      <S.Title>Catégories:</S.Title>
      {availableCategories.map(cat => (
        <S.Checkbox 
          label={cat} 
          handleOnChange={() => toggleCheckbox(cat)} 
          key={cat} 
        />
      ))}

      <S.Title>Trier par:</S.Title>
      <select 
        onChange={(e) => handleSortChange(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px', borderRadius: '4px' }}
      >
        <option value="">Sélectionner</option>
        <option value="lowestprice">Prix croissant</option>
        <option value="highestprice">Prix décroissant</option>
        <option value="toprated">Meilleures notes</option>
      </select>

      <S.Title>Tranche de prix :</S.Title>
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="number" 
          placeholder="Min"
          value={minPrice}
          style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          onChange={(e) => handlePriceChange(Number(e.target.value), maxPrice)} 
        />
        <span style={{ alignSelf: 'center' }}>à</span>
        <input 
          type="number" 
          placeholder="Max"
          value={maxPrice}
          style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))} 
        />
      </div>

      <S.Title>Note minimale :</S.Title>
      <S.RatingContainer>
        {[1, 2, 3, 4].map((star) => (
          <S.RatingButton
            key={star}
            isActive={minRating === star}
            onClick={() => handleRatingChange(star)}
          >
            {star}+ ⭐
          </S.RatingButton>
        ))}
        
        {minRating > 0 && (
          <S.RatingButton onClick={() => handleRatingChange(0)}>
            Toutes
          </S.RatingButton>
        )}
      </S.RatingContainer>
    </S.Container>
  );
};

export default Filter;