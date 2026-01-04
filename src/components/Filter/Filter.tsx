import { useProducts } from 'contexts/products-context';
import * as S from './style';

/**
 * Filter component
 * - Displays category checkboxes, sorting options, price range inputs and
 *   minimum rating buttons.
 * - Uses `useProducts` context to read current filter state and invoke
 *   handlers (filterProducts, handlePriceChange, handleRatingChange, ...).
 * - Toggling a category updates the selected filters via `filterProducts`.
 */

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

  // Toggle a category checkbox.
  // - We store selected categories in a Set to ensure uniqueness.
  // - After toggling we call `filterProducts` with the new selection array.

  return (
    <S.Container>
      <S.Title>Categories:</S.Title>
      {/* Category checkboxes: toggle a category to include/exclude it from results */}
      {availableCategories.map(cat => (
        <S.Checkbox 
          label={cat} 
          handleOnChange={() => toggleCheckbox(cat)} 
          key={cat} 
        />
      ))}

      <S.Title>Sort by:</S.Title>
      {/* Sorting select: triggers `handleSortChange` with the selected option */}
      <select 
        onChange={(e) => handleSortChange(e.target.value)}
        style={{ width: '100%', padding: '8px', marginBottom: '20px', borderRadius: '4px' }}
      >
        <option value="">Select</option>
        <option value="lowestprice">Price: Low to High</option>
        <option value="highestprice">Price: High to Low</option>
        <option value="toprated">Top Rated</option>
      </select>
      <S.Title>Price range:</S.Title>
      {/* Price range inputs: call `handlePriceChange(min, max)` on change */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          type="number" 
          placeholder="Min"
          value={minPrice}
          style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          onChange={(e) => handlePriceChange(Number(e.target.value), maxPrice)} 
        />
        <span style={{ alignSelf: 'center' }}>to</span>
        <input 
          type="number" 
          placeholder="Max"
          value={maxPrice}
          style={{ width: '80px', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          onChange={(e) => handlePriceChange(minPrice, Number(e.target.value))} 
        />
      </div>

      <S.Title>Minimum rating:</S.Title>
      {/* Rating buttons: select a minimum rating; pressing "All" clears the filter */}
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
            All
          </S.RatingButton>
        )}
      </S.RatingContainer>
    </S.Container>
  );
};

export default Filter;