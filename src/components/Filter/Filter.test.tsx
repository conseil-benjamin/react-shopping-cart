import { renderWithThemeProvider } from 'utils/test/test-utils';
import { ProductsProvider } from 'contexts/products-context/';

import Filter from '.';
// On importe availableCategories au lieu de availableSizes
import { availableCategories } from './Filter'; 

describe('[components] - Filter', () => {
  const setup = () => {
    return renderWithThemeProvider(
      <ProductsProvider>
        <Filter />
      </ProductsProvider>
    );
  };

  test('should render correctly', () => {
    const view = setup();
    expect(view).toMatchSnapshot();
  });

  // Mise à jour du test pour vérifier les catégories
  test('should render every filter category available', () => {
    const { getByText } = setup();
    
    // On vérifie que chaque catégorie est bien présente dans le document
    expect(
      availableCategories.every((category) => getByText(category))
    ).toBe(true);
  });
});